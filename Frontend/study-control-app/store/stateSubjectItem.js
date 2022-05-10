import { makeAutoObservable } from "mobx";

class StateSubjectItem {
  newCardId;
  newSubjectName;
  constructor() {
    makeAutoObservable(this);
  }
  setCardId(cardId) {
    this.newCardId = cardId;
  }
  setSubjectName(subjectName) {
    this.newSubjectName = subjectName;
  }
}

export default new StateSubjectItem();
