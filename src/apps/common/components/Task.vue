<template>
  <v-card style="width:100%" raised outlined>
    <div>
      <v-card-text>
        <v-chip-group
          v-model="value.state"
          @change="update"
          active-class="primary accent-4 white--text"
          column
        >
          <v-chip filter class="ml-1">Not Started</v-chip>
          <v-chip filter class="ml-1">Work In Progress</v-chip>
          <v-chip filter class="ml-1">Done</v-chip>
        </v-chip-group>
      </v-card-text>
      <div v-if="!edit">
        <v-list-item three-line>
          <v-list-item-content>
            <div class="overline mb-8">{{ value.title }}</div>
            <v-list-item-subtitle v-html="value.description"></v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-avatar size="60" color="primary">
            <span class="white--text headline" v-if="value.title">{{modifyAvatar}}</span>
          </v-list-item-avatar>
        </v-list-item>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="edit = true">Edit</v-btn>
          <v-btn text @click="deleteTask( value._id )">Delete</v-btn>
        </v-card-actions>
      </div>
      <div v-if="edit">
        <v-form ref="form" v-model="valid">
          <v-list-item>
            <v-list-item-content>
              <div class="overline mb-4">Edit Task</div>
              <v-list-item-title class="pt-1">
                <v-text-field
                  label="Title"
                  :rules="titleRules"
                  v-model="value.title"
                  outlined
                  dense
                ></v-text-field>
                <v-text-field
                  style="display:none"
                  label="Description"
                  v-model="value.description"
                  outlined
                  dense
                ></v-text-field>
              </v-list-item-title>
            </v-list-item-content>
            <v-list-item-avatar size="60" color="primary">
              <v-icon dark>mdi-pencil</v-icon>
            </v-list-item-avatar>
          </v-list-item>
          <v-card-text>
            <Editor :field="value" />
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text @click="edit = false">Back</v-btn>
            <v-btn text @click="update()">Update</v-btn>
          </v-card-actions>
        </v-form>
      </div>
    </div>
  </v-card>
</template>

<script>
import Editor from "@/apps/common/components/Editor";
import TASK_API from "./../store/task.store.js";

export default {
  name: "data",
  props: {
    value: Object,
  },
  data: () => ({
    edit: false,
    titleRules: [
      (v) => !!v || "Title is required",
      (v) =>
        (v && v.trim().length > 4) || "Name must be greater than 4 characters",
    ],
    valid: true,
  }),
  computed: {
    // a computed getter
    reversedMessage: function () {
      // `this` points to the vm instance
      return this.message.split('').reverse().join('')
    },
    modifyAvatar: function () {
      var words = this.value.title.split(" ");
      if (words.length == 0) words = "HI";
      if (words.length == 1) words = (words[0][0] + words[0][1]).toUpperCase();
      if (words.length > 1) words = (words[0][0] + words[1][0]).toUpperCase();
      return words;
    }
  },
  methods: {
    update() {
      // Update Task API Call
      var data = this.value;
      if (this.valid === false) return;
      TASK_API.update_task(data);
      this.edit = false;
    },
    async deleteTask(id) {
      // Delete Task API Call
      var data = {
        task: {
          id: id,
        },
      };
      var res = await TASK_API.delete_task(data);
      if (!res.error) this.$emit("delete");
    },
  },
  components: {
    Editor,
  },
};
</script>
