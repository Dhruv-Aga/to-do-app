/* 
 * User Route for task and manager script apis
*/

// Basic express imports
var router = require('express').Router();
var {ObjectId} = require('mongodb');

var mailer = require('@/bin/mailer');
var constants = require('./../constants/constant');

var auth = require('@/apps/auth');
const Task = require('../models/Task');


/* 
 * Create API
*/
router.post('/',  auth.required, async function (req, res) {
    // Basic validation checks
    if (!req.body.task.title) {
        return res.status(422).json({ error: 1, msg: "title can't be blank" });
    }
    if (req.body.task.state === undefined || req.body.task.state === null ) {
        return res.status(422).json({ error: 1, msg: "state can't be blank" });
    }

    // Adding task creator details
    req.body.task.task_created_by = req.payload.id
    // Creating new Task
    const task = await Task.create(req.body.task);

    var info = null;
    if (task) {    
        info = {
            error: 0,
            msg: "Task has been successfully added"
        }
        return res.json(info);
    } else {
        info = {
            error: 1,
            msg: "Error occured while creating! Please try again"
        }
        return res.status(422).json(info);
    }
});


/* 
 * Update Task API
*/
router.put('/', auth.required, async function (req, res) {

    if (req.body.task.state === undefined || req.body.task.state === null ) {
        return res.status(422).json({ error: 1, msg: "status can't be blank" });
    }
    
    var id = req.body.task['_id']
    var updatedTask = {
        title: req.body.task.title,
        description: req.body.description,
        state: req.body.task.state,
    }

    const task = await Task.findOneAndUpdate({_id: id, task_created_by: req.payload.id}, updatedTask);
    
    var info = null
    if (task) {
        info = {
            error: 0,
            msg: "Task has been successfully updated"
        }
        return res.json(info);
    } else {
        info = {
            error: 1,
            msg: "Error occured while updating! Please try again"
        }
        return res.status(422).json(info);
    }
});


/* 
 * Delete Task API
*/
router.delete('/', auth.required, async function (req, res) {
    var id = req.body.task['id']
    var updatedTask = {active: false}

    const task = await Task.findOneAndUpdate({_id: id, task_created_by: req.payload.id}, updatedTask);
    
    var info = null;
    if (task) {
        info = {
            error: 0,
            msg: "Successfully deleted"
        };
        return res.status(200).json(info);
    } else {
        info = {
            error: 1,
            msg: "Error occured while deleting! Please try again"
        }
        return res.status(422).json(info);
    }
});


/* 
 * Fetch All Task API (both Sorted and Unsorted)
*/
router.get('/', auth.required, async function (req, res) {
    var sort = {}
    var data = null
    var date = ""
    // Filter details
    var filter = {
        active: { '$ne': false },
        task_created_by: { '$eq': ObjectId(req.payload.id) }
    }

    // Adding sorting and aggreagation details based on request params
    if(!req.query['sort'] || req.query === null || req.query === undefined){
        sort = { createdAt: -1,  updatedAt: -1, title: 1}  
    } else if (req.query.sort === 0) {
        date = "$createdAt"
        sort = { createdAt: -1, title: 1}  
    } else {
        sort = { updatedAt: -1, title: 1}
        date = "$updatedAt"
    }

    if(date !== ""){
        // Adding aggregate function to filter --> sort --> group details 
        // based on params(date) in request
        data = await Task.aggregate([
            {
                $match: filter
            }, {
                $sort: sort
            }, {
                $group : {
                    _id :{ $dateToString: { format: "%Y-%m-%d", date: date} },
                    list: { $push: "$$ROOT" },
                    count: { $sum: 1 }
                }
            }
        ]).exec()
    }
    else {
        data = Task.find(filter).sort(sort)
    }
    const result = await data
    if (result.length > 0) {
        return res.status(200).json(result);
    } else {
        var info = {
            error: 1,
            msg: "Error occured while fetching! Please try again"
        }
        return res.status(422).json(info);
    }   
});


/* 
 * Mailing Script for Manager
*/
router.get('/script/', async function (req, res) {
    // Adding aggregate function to filter --> sort --> group details 
    // based on employees
    var data = await Task.aggregate(
        [
            {
              '$match': {
                'active': {
                  '$ne': false
                }
              }
            }, {
              '$sort': {
                'updatedAt': -1, 
                'title': 1
              }
            }, {
              '$lookup': {
                'from': 'users', 
                'localField': 'task_created_by', 
                'foreignField': '_id', 
                'as': 'task_created_detail'
              }
            }, {
              '$unwind': {
                'path': '$task_created_detail'
              }
            }, {
              '$group': {
                '_id': {
                  'user': '$task_created_by', 
                  'user_name': '$task_created_detail.name'
                }, 
                'list': {
                  '$push': '$$ROOT'
                }, 
                'count': {
                  '$sum': 1
                }
              }
            }
          ]
    ).exec()
    if (data.length > 0) {
        /* Generating HTML for Mail */
        var html = "<h3>Progess of task by employees under: </h3><br>"
        data.forEach(element => {
            html += `<h4>============================== Employee: ${element._id.user_name} ==============================</h3><br>`
            html += `<table border="1" cellpadding="10" cellspacing="0">`
            html += `<thead><tr>`
            html += `<th>S.No</th>`
            html += `<th>Title</th>`
            html += `<th>Description</th>`
            html += `<th>Created On</th>`
            html += `<th>Last Updated On</th>`
            html += `<th>Status</th>`
            html += `</tr></thead>`
            html += `<tbody>`
            var i = 1
            element.list.forEach(task => {
                html += `<tr>
                            <td>${i++}</td>
                            <td>${task.title}</td>
                            <td>${task.description || '---'}</td>
                            <td>${task.createdAt.toDateString()}</td>
                            <td>${task.updatedAt.toDateString()}</td>
                            <td>${constants.STATUS[task.state]}</td>
                        </tr>`
                
            })
            html += `</tbody>`
            html += `</table>`
        });
        mailer.send(
            '"Dhruv" <dhruvaga11@gmail.com>', // sender address
            "dhruvaga11@gmail.com", // list of receivers
            "Progress Report", // Subject line
            html, // html body
        )
        return res.status(200).json(data);
    } else {
        var info = {
            error: 1,
            msg: "Error occured while fetching! Please try again"
        }
        return res.status(422).json(info);
    }   
});

module.exports = router;