<template>
  <div class="container columns is-centered">
    <div class="column is-one-third has-text-centered">
      <img id="profile-img" src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" class="profile-img-card" />
      <form @submit.prevent="onSubmit">
        <div class="field">
          <label class="label" for="username">Username</label>
          <div class="control">
            <input v-model="username" v-bind="usernameAttrs" name="username" type="text" class="input" autocomplete="off" />
          </div>
          <div class="error-feedback">{{ errors.username }}</div>
        </div>
        <div class="field">
          <label class="label" for="password">Password</label>
          <div class="control">
            <input v-model="password" v-bind="passwordAttrs" name="password" type="password" class="input" />
          </div>
          <div class="error-feedback">{{ errors.password }}</div>
        </div>
        <div class="control">
          <button class="button is-primary" :disabled="loading">
            <span v-show="loading" class="spinner-border spinner-border-sm"></span>
            <span>Login</span>
          </button>
        </div>
        <div class="form-group">
          <div v-if="message" class="alert alert-danger" role="alert">
            {{ message }}
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'


import { useForm } from "vee-validate";
import { object, string } from 'zod';
import { toTypedSchema } from '@vee-validate/zod';

import { useAuthStore } from '@/stores/auth.store';
import { useAuthService } from '@/services/auth.service';

const router = useRouter();
const authService = useAuthService();

const loading = ref(false);
const message = ref('');

if (useAuthStore().isLoggedIn) {
  router.push("/profile");
}

const { errors, handleSubmit, defineField } = useForm({
  validationSchema: toTypedSchema(
    object({
      username: string().min(5),
      password: string().min(5),
    }),
  )
});

const [username, usernameAttrs] = defineField('username');
const [password, passwordAttrs] = defineField('password');

const onSubmit = handleSubmit(user => {
  console.log('onSumbit', user)
  loading.value = true;
  const lUser: Partial<IUser> = {
    username: user.username,
    password: user.password
  };

  authService.login(lUser).then(
    (response) => {
      console.log(response);
      router.push("/profile");
    },
    (error) => {
      loading.value = false;
      message.value =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
    }
  );
});
</script>

<style scoped>
.card-container {
  max-width: 300px;
  margin: auto;
}
</style>