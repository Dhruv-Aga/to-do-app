<template>
  <v-container fluid class="px-8">
    <v-row justify="space-between">
      <v-col lg="1" md="2" sm="6">
        <v-btn
          class="ma-2 pa-2"
          icon
          outlined
          color="primary"
          v-on:close="newTask = false"
          @click="newTask = true"
        >
          <v-icon large>mdi-plus</v-icon>
        </v-btn>
      </v-col>
      <v-col lg="6" md="6" sm="6">
        <v-chip-group v-model="sortBy" @change="getData()" active-class="accent white--text" column>
          <div :outline="false" color="accent" class="ma-1 pt-1">Filtered By</div>
          <v-chip filter class="ml-1">Creation Date</v-chip>
          <v-chip filter class="ml-1">Updated Date</v-chip>
          <v-chip @click="sortBy = null" class="ml-1">Clear</v-chip>
        </v-chip-group>
      </v-col>
    </v-row>
    <v-row>
      <v-dialog v-model="newTask" width="480">
        <new-task v-on:close="newTask = false; getData()"></new-task>
      </v-dialog>
      <v-col
        v-show="sortBy === null || sortBy === 2"
        v-for="(item, index) in tasks"
        lg="4"
        md="4"
        sm="6"
        :key="index"
      >
        <task :value="item" v-on:delete="tasks.splice(index, 1)"></task>
      </v-col>
      <v-expansion-panels v-if="sortBy === 0 || sortBy === 1 ">
        <v-expansion-panel v-for="(category, i) in tasks" :key="i">
          <v-expansion-panel-header>Date: {{category._id}}</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-row>
              <v-col
                v-show="sortBy != null"
                v-for="(item, index) in category.list"
                lg="4"
                md="4"
                sm="6"
                :key="index"
              >
                <task :value="item" v-on:delete="category.list.splice(index, 1)"></task>
              </v-col>
            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-row>
  </v-container>
</template>

<script>
import NewTask from "@/apps/common/components/NewTask";
import Task from "@/apps/common/components/Task";
import TASK_API from "./../store/task.store.js";

export default {
  name: "About",
  data: () => ({
    newTask: false,
    sortBy: null,
    tasks: [],
  }),
  methods: {
    getData: async function () {
      var data = { sort: this.sortBy };
      if (this.sortBy === 2 || this.sortBy === null) {
        data = {};
        this.sortBy = null;
      }

      var res = await TASK_API.get_task(data);
      if (!res.error) this.tasks = res;
    },
  },
  components: {
    "new-task": NewTask,
    task: Task,
  },
  mounted: async function () {
    await this.getData();
  },
};
</script>
