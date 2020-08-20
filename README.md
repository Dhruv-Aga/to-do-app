# To Do App

---

## Requirements

For development, you will need Node.js ( a node global package ), MongoDB.

### Node

- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
  Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      sudo apt install nodejs
      sudo apt install npm

- #### Other Operating Systems

  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v12.16.3

    $ npm --version
    6.14.5

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

    npm install npm -g

## Installation of projects

`
git clone https://gitlab.com/to-do-app/to-do-app.git
`

- ## Configure backend

    $ cd to-do-app
    $ npm install

  - Running Scripts

    - Compiles and hot-reloads for development

        ```npm run api-dev```

    - Compiles for production

        ```npm run api```

- ## Configure frontend

      cd to-do-app
      npm install

  - Running Scripts

    - Compiles and hot-reloads for frontend development

      ```npm run serve```

    - Compiles and minifies for frontend production

      ```npm run build```

    - Lints and fixes files for frontend

      ```npm run lint```

---

## Starting the projects

- Run the following commands to start frontend.

      cd to-do-app
      npm run serve

- Run the following commands to start backend ( in separate terminal ).

      cd to-do-app
      npm run dev

- Run the following commands to start cron-jobs ( in separate terminal ).

      cd to-do-app
      npm bin/cron

- You should be able to open the following URL: <http://127.0.0.1:8080/>

- To login/sign-up go to this URL: <http://127.0.0.1:8080/login/>

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
