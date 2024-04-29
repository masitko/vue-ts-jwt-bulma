<template>
  <nav class="navbar" role="navigation">
    <div class="navbar-brand">
      <a href="/" class="navbar-item">TEST MAREK</a>
      <a role="button" class="navbar-burger" :class="{ 'is-active': isActive }" aria-label="menu" aria-expanded="false"
        data-target="navbarMenu" @click="toggle">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarMenu" class="navbar-menu" :class="{ 'is-active': isActive }">
      <div class="navbar-start">
        <a class="navbar-item">
          <router-link to="/home" class="nav-link">
            <font-awesome-icon icon="home" /> Home
          </router-link>
        </a>
        <a v-if="showAdminBoard" class="navbar-item">
          <router-link to="/admin" class="nav-link">Admin Board</router-link>
        </a>
        <a v-if="showModeratorBoard" class="navbar-item">
          <router-link to="/mod" class="nav-link">Moderator Board</router-link>
        </a>
        <a class="navbar-item">
          <router-link v-if="currentUser" to="/user" class="nav-link">User Board</router-link>
        </a>
        <a class="navbar-item">
          <router-link v-if="currentUser" to="/users" class="nav-link">Users</router-link>
        </a>
      </div>

      <div v-if="!currentUser" class="navbar-end">
        <a class="navbar-item">
          <router-link to="/register" class="nav-link">
            <font-awesome-icon icon="user-plus" /> Sign Up
          </router-link>
        </a>
        <a class="navbar-item">
          <router-link to="/login" class="nav-link">
            <font-awesome-icon icon="sign-in-alt" /> Login
          </router-link>
        </a>
      </div>

      <div v-if="currentUser" class="navbar-end">
        <a class="navbar-item">
          <router-link to="/profile" class="nav-link">
            <font-awesome-icon icon="user" />
            {{ currentUser.username }}
          </router-link>
        </a>
        <a class="navbar-item" @click.prevent="logOut">
          <font-awesome-icon icon="sign-out-alt" /> LogOut
        </a>
      </div>
    </div>

  </nav>
</template>

<script setup lang="ts">

import { ref, computed } from 'vue';
import { useRouter } from 'vue-router'

import { useAuthStore } from '@/stores/auth.store';
import { useAuthService } from '../services/auth.service';
import { RoleNames } from '../globals.d';

const isActive = ref(false);
const currentUser = computed(() => useAuthStore().getUser);
const router = useRouter();

console.log('currentUser', currentUser);
const toggle = () => {
  console.log('toggle');
  isActive.value = !isActive.value;
}

const logOut = () => {
  console.log('logout');
  useAuthService().logout();
  router.push('/login');
}
const showAdminBoard = computed(() => {
  if (currentUser.value && currentUser.value['roles']) {
    return currentUser.value['roleNames']?.includes(RoleNames.Admin);
  }

  return false;
})
const showModeratorBoard = computed(() => {
  if (currentUser.value && currentUser.value['roles']) {
    return currentUser.value['roleNames']?.includes(RoleNames.Moderator);
  }

  return false;
})

</script>