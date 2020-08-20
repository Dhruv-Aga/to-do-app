<template>
  <v-card style="width:100%">
    <v-form ref="form" v-model="valid">
      <v-list-item>

        <v-list-item-content>
          <div class="overline mb-4">
            <h3>Add Task</h3>
          </div>
          <v-list-item-title class="pt-1">
            <!-- Form fields Title and Description -->
            <v-text-field label="Title" :rules="titleRules" v-model="newTask.title" outlined dense></v-text-field>
            <v-text-field style="display:none" label="Description" v-model="newTask.description" outlined dense></v-text-field>
          </v-list-item-title>
        </v-list-item-content>

        <v-list-item-avatar size="60" color="primary">
          <v-icon dark>mdi-plus</v-icon>
        </v-list-item-avatar>
      </v-list-item>

      <v-card-text>
        <!-- Description Editor -->
        <Editor :field="newTask" />
        <h4 class="sub-title mt-2">Choose State of task</h4>

        <!-- Status Selector -->
        <v-chip-group v-model="newTask.state" active-class="primary accent-4 white--text" column>
          <v-chip filter class="ml-1">Not Started</v-chip>
          <v-chip filter class="ml-1">Work In Progress</v-chip>
          <v-chip filter class="ml-1">Done</v-chip>
        </v-chip-group>
      </v-card-text>

      <!-- Action Btns -->
      <v-card-actions>
        <v-btn dark color="primary" v-on:click="$emit('close')">Close</v-btn>
        <v-spacer></v-spacer>
        <v-btn dark color="secondary" @click="reset" text>Clear</v-btn>
        <v-btn dark color="primary" @click="save" text>Save</v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
// Default value for new task
var defaultNewTask = {
  title: "I'm your new task Title",
  description: "I'm your new task Description",
  state: 0,
};

import Editor from "@/apps/common/components/Editor";
import TASK_API from './../store/task.store.js';

export default {
  name: "NewTask",
  data: () => ({
    newTask: { ...defaultNewTask },
    editable: null,
    titleRules: [
      (v) => !!v || "Title is required",
      (v) =>
        (v && v.trim().length > 4) || "Name must be greater than 4 characters",
    ],
    sortBy: 0,
    valid: true,
  }),
  methods: {
    // Validate form details
    validate() {
      this.$refs.form.validate();
    },
    // Reset form details
    reset() {
      this.$refs.form.reset();
      this.newTask = { ...defaultNewTask };
    },
    async save() {
      this.$refs.form.validate();
      
      if (this.valid === false) return 
      
      // Save API Call for creating new Task
      var res = await TASK_API.save_task(this.newTask)
      
      if (res.error) return

      this.$refs.form.resetValidation();
      this.$refs.form.reset();

      // Calling parent property close
      this.$emit("close");
    },
  },
  components: {
    Editor,
  },
};
</script>
