import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import style from "../styles/Home.module.scss";
import SubjectContent from "../components/subjectContent/SubjectContent";
import stateSubjectItem from "../store/stateSubjectItem";
import { toJS } from "mobx";

export default function SubjectPages() {
  let dataFromState = toJS(stateSubjectItem.newData); //data с которой будем работать
  let nameSabject = dataFromState.subjectName;
  let controls = dataFromState.controls;
  console.log("controls: ", controls);
  console.log("dataFromState: ", dataFromState);
  return (
    <div className={style.wrapApp}>
      <Header title={nameSabject} />
      <SubjectContent data={controls} />
      <Footer />
    </div>
  );
}
