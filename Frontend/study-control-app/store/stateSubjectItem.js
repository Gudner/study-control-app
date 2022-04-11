import { makeAutoObservable } from "mobx";

class StateSubjectItem {
  newData = {};

  constructor() {
    makeAutoObservable(this);
  }
  setData(data){
    this.newData = data;
    console.log('newData: ', this.newData);
  }
  
}

export default new StateSubjectItem();
