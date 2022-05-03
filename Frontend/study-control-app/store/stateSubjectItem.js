import { makeAutoObservable } from "mobx";

class StateSubjectItem {
  newData;
  subjectCardId;

  constructor() {
    makeAutoObservable(this);
  }
  setData(data) {
    this.newData = data;
  }
  setSubjectCardId(subjectCardId) {
    this.subjectCardId = subjectCardId;
  }
}

export default new StateSubjectItem();
