<template>
  <div class="container">
    <header class="jumbotron">
      <h3>USERS</h3>
      <div class="field">
        <label class="label" for="userSearch">Search</label>
        <div class="control">
          <input name="userSearch" v-model="userSearch" type="text" class="input" autocomplete="off" />
        </div>
      </div>

    </header>

    <table class="table" v-if="users.length">
      <thead>
        <tr>
          <th><abbr title="Username Column">Username</abbr></th>
          <th><abbr title="Email Column">Email</abbr></th>
          <th><abbr title="Roles">Roles</abbr></th>
          <th><abbr title="Edit User">Edit</abbr></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user._id">
          <td>{{ user.username }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.roles ? user.roles.map((role) => role.name).join(', ') : '' }}</td>
          <td>
            <router-link :to="{ name: 'user', params: { userId: user._id } }">
              Edit
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>
    <h5 v-else>{{ message }}</h5>
  </div>
</template>

<script setup lang="ts">

import { ref, watch, watchEffect, onMounted } from 'vue'

import UserService from "../services/user.service";

const users = ref<IUser[]>([]);
const userSearch = ref('');
const message = ref('');

const getUsers = (search?: string) => {
  UserService.getAllUsers(search)
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      message.value = data.length ? '' : 'No users found';
      users.value = data;
    }).catch(
      (error) => {
        console.error(error);
        message.value =
          error?.response?.data?.message ||
          error.message ||
          error.toString();
      }
    );
}

watch(userSearch, (newSearch, oldSearch) => {
  if (newSearch !== oldSearch) {
    console.log('watch:', newSearch, oldSearch);
  }
});

watchEffect(() => {
  console.log('watch EFFECT:,', userSearch.value);
  getUsers(userSearch.value);
});

onMounted(() => {
  getUsers();
});
</script>