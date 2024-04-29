<template>
  <div class="container">
    <header class="jumbotron">
      <h2>
        <strong>{{ currentUser?.username }}</strong> Profile:
      </h2>
    </header>
    <p>
      <strong>Token:</strong>
      {{ currentUser?.accessToken.substring(0, 20) }} ... {{
          currentUser?.accessToken.substr(currentUser.accessToken.length -
            20) }}
    </p>
    <p>
      <strong>Id:</strong>
      {{ currentUser?.id }}
    </p>
    <p>
      <strong>Email:</strong>
      {{ currentUser?.email }}
    </p>
    <strong>Authorities:</strong>
    <ul>
      <li v-for="role in currentUser?.roleNames" :key="role">{{ role }}</li>
    </ul>
  </div>
</template>

<script setup lang="ts">

import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth.store';
import { onMounted } from 'vue';

const currentUser = useAuthStore().getUser;

if (!currentUser) {
  useRouter().push('/login');
}

onMounted(() => {
  console.log('ProfilePage mounted');
});

</script>