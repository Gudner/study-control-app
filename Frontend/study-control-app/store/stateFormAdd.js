import { makeAutoObservable } from "mobx";

class StateFormAdd {
  flag = false;
  flagTask = false;
  idControl;

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
  setIdControl(idControl) {
    console.log("idControl", idControl);
    this.idControl = idControl;
  }
}

export default new StateFormAdd();
