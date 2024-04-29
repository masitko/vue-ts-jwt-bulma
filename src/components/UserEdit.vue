<template>
  <div class="container columns is-centered">
    <div class="column is-half has-text-centered">
      <img id="profile-img" src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" class="profile-img-card" />
      <form @submit="onSubmit" v-if="user">
        <!-- <div v-if="!successful"> -->
        <div class="field">
          <label class="label" for="username">Username</label>
          <div class="control">
            <input v-model="username" v-bind="usernameAttrs" name="username" type="text" class="input" autocomplete="off" />
          </div>
          <div class="error-feedback">{{ errors.username }}</div>
        </div>
        <div class="field">
          <label class="label" for="email">Email</label>
          <div class="control">
            <input v-model="email" v-bind="emailAttrs" name="email" type="email" class="input" autocomplete="off" />
          </div>
          <div class="help">{{ errors.email }}</div>
        </div>
        <div class="field">

          <label class="label" for="roles">Roles</label>
          <div class="select is-multiple">
            <select class="select is-multiple" name="roles" v-model="roles" v-bind="rolesAttrs" multiple>
              <option v-for="role in allRoles" :key="role._id" :value="role._id" :selected="user.roles?.some(r => r._id === role._id)">{{
        role.name
      }}
              </option>
            </select>
            <div class="error-feedback">{{ errors.roles }}</div>
          </div>
        </div>

        <div class="control">
          <button class="button is-primary" :disabled="loading">
            <span v-show="loading" class="spinner-border spinner-border-sm"></span>
            Save
          </button>
        </div>
        <!-- </div> -->
      </form>

      <div v-if="message" class="alert" :class="successful ? 'alert-success' : 'alert-danger'">
        {{ message }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useForm } from "vee-validate";
import { useRoute } from 'vue-router'

// import * as yup from "yup";
import UserService from "../services/user.service";
import RoleService from "../services/role.service";

import { object, string } from 'zod';
import { toTypedSchema } from '@vee-validate/zod';

const { errors, handleSubmit, defineField } = useForm({
  validationSchema: toTypedSchema(
    object({
      username: string().min(5),
      email: string().min(5),
      roles: string().array().min(1),
    }),
  )
});
const [username, usernameAttrs] = defineField('username');
const [email, emailAttrs] = defineField('email');
const [roles, rolesAttrs] = defineField('roles');

const user = ref<IUser | null>(null);
const allRoles = ref<IRole[]>([]);

const loading = ref(false);
const successful = ref(false);
const message = ref('');

const userId = useRoute().params.userId as string;

const getRoles = () => {
  RoleService.getAllRoles()
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      allRoles.value = data;
    }).catch(
      (error) => {
        message.value =
          error?.response?.data?.message ||
          error.message ||
          error.toString();
      }
    );
}

const getUser = (userId: string) => {
  UserService.getUser(userId)
    .then((response) => response.json())
    .then((response) => {
      console.log(response)
      user.value = response;
      username.value = response.username;
      email.value = response.email;
    }).catch(
      (error) => {
        message.value =
          error?.response?.data?.message ||
          error.message ||
          error.toString();
      }
    );

}

const onSubmit = handleSubmit(user => {
  console.log('onSumbit', user)

  message.value = "";
  successful.value = false;
  loading.value = true;
  UserService.updateUser(userId, {
    username: user.username,
    email: user.email,
    roles: user.roles,
  })
    .then((response) => response.json())
    .then(
      (data) => {
        message.value = data.message;
        successful.value = true;
        loading.value = false;
      },
      (error) => {
        message.value =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        successful.value = false;
        loading.value = false;
      }
    );
})

onMounted(() => {
  getRoles();
  getUser(userId);
});

</script>