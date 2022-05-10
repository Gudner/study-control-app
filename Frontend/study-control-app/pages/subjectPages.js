import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import style from "../styles/Home.module.scss";
import SubjectContent from "../components/subjectContent/SubjectContent";
import { observer } from "mobx-react-lite";
import { toJS } from "mobx";
import stateSubjectItem from "../store/stateSubjectItem";

export default observer(function SubjectPages() {
  let subjectName = toJS(stateSubjectItem.newSubjectName);
  return (
    <div className={style.wrapApp}>
      <Header title={subjectName} />
      <SubjectContent />
      <Footer />
    </div>
  );
});
