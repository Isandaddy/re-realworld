<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">{{ signUp ? "Sign up" : "Sign in" }}</h1>
          <p class="text-xs-center">
            <a href="">{{
              signUp ? "Have an account?" : "Need an account?"
            }}</a>
          </p>

          <ul v-show="errorMessages" class="error-messages">
            <li>{{ errorMessages }}</li>
          </ul>

          <form>
            <fieldset v-show="signUp" class="form-group">
              <input
                v-model="username"
                class="form-control form-control-lg"
                type="text"
                placeholder="Your Name"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                v-model="email"
                class="form-control form-control-lg"
                type="text"
                placeholder="Email"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="password"
                v-model="password"
                placeholder="Password"
              />
            </fieldset>
            <button
              v-if="signUp"
              type="button"
              class="btn btn-lg btn-primary pull-xs-right"
              @click="userSignUp"
            >
              Sign up
            </button>
            <button
              v-else
              type="button"
              class="btn btn-lg btn-primary pull-xs-right"
              @click="userSignIn"
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import AuthStore from "@/store/modules/auth";
import ErrorStore from "@/store/modules/error";

@Component
export default class Login extends Vue {
  signUp: boolean = false;
  username: string = "";
  email: string = "";
  password: string = "";

  created() {
    if (this.$route.name === "register") {
      this.signUp = true;
    }
  }

  get errorMessages() {
    return ErrorStore.errorMessages;
  }

  async userSignUp() {
    const user = await AuthStore.postSignup({
      username: this.username,
      email: this.email,
      password: this.password,
    });
    if (user) {
      this.$router.push({ name: "home" });
    }
  }

  async userSignIn() {
    const user = await AuthStore.postSignin({
      email: this.email,
      password: this.password,
    });
    if (user) {
      this.$router.push({ name: "home" });
    }
  }
}
</script>

<style scoped></style>
