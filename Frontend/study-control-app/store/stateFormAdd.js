import { makeAutoObservable } from "mobx";

class StateFormAdd {
  flag = false;
  flagTask = false;

  constructor() {
    makeAutoObservable(this);
  }
  setFlagForm() {
    this.flag = !this.flag;
  }
  setFlagFormTasck() {
    this.flagTask = !this.flagTask;
  }
  removeFlagForm(state) {
    this.flag = false;
    this.flagTask = false;
  }
}

export default new StateFormAdd();
