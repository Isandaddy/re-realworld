import {
  Module,
  VuexModule,
  getModule,
  Mutation,
  Action,
} from "vuex-module-decorators";
import store from "../index";

@Module({ store, name: "error", namespaced: true, dynamic: true })
class ErrorStore extends VuexModule {
  errorMessages: string | null = null;
  isAuthenticated: boolean = false;

  get hasError() {
    return this.errorMessages !== null;
  }

  @Mutation
  setErrorMessage(message: string) {
    this.errorMessages = message;
  }

  @Mutation
  setAuthenticated(auth: boolean) {
    this.isAuthenticated = auth;
  }

  @Mutation
  clearErrorMessage() {
    this.errorMessages = null;
  }

  @Action({ rawError: true })
  fetchErrorMessage(message: string) {
    this.setErrorMessage(message);
  }

  @Action({ rawError: true })
  clearError() {
    this.clearErrorMessage();
  }
}

export default getModule(ErrorStore);
