import { makeAutoObservable } from "mobx";

class StateSubjectItem {
  newData;

  constructor() {
    makeAutoObservable(this);
  }
  setData(data){
    this.newData = data;
  }
  
}

export default new StateSubjectItem();
