import { makeAutoObservable } from "mobx";

class StateFormAdd {
<<<<<<< HEAD
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
=======
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
>>>>>>> 4b6f557814ebdad158bf5b19ebb406d586ce4bff
}

export default new StateFormAdd();
