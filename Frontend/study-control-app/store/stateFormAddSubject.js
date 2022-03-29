import { makeAutoObservable } from "mobx";

class StateFormAddSubject {
  flag = false;

  constructor() {
    makeAutoObservable(this);
  }
  setFlagForm() {
    console.log("смена флага");
    this.flag = !this.flag;
  }
  removeFlagForm(state) {
    this.flag = false;
  }
}

export default new StateFormAddSubject();
