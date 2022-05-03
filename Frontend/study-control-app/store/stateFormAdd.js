import { makeAutoObservable } from "mobx";

class StateFormAdd {
  flag = false;
  flagTask = false;
  newTaskData;

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
  setTaskItem(data) {
    this.newTaskData = data;
  }
}

export default new StateFormAdd();
