import { makeAutoObservable } from "mobx";

class StateFormAdd {
  flag = false;

  constructor() {
    makeAutoObservable(this);
  }
  setFlagForm() {
    this.flag = !this.flag;
  }
  removeFlagForm(state) {
    this.flag = false;
  }
}

export default new StateFormAdd();
