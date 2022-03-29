import React from "react";
import AddSubjectBatton from "../addSubjectBatton/AddSubjectBatton";
import AddSubjectModal from "../addSubjectModal/AddSubjectModal";
import style from "./CardsContent.module.scss";
import CardsItem from "./cardsItem/CardsItem";
import stateFormAddSubject from "../../store/stateFormAddSubject";
import { observer } from "mobx-react-lite";

export default observer(function CardsContent(props) {
<<<<<<< HEAD
    const addSubject = () => {};
    let subjectItem = props.data;
    console.log("stateFormAddSubject.flag", stateFormAddSubject.flag);
    return (
        <>
            <div className={style.container}>
                {subjectItem.map((item, key) => (
                    <CardsItem key={key} data={item} href='/subjectPages' />
                ))}
                <AddSubjectBatton addSubject={addSubject} />
=======
  const addSubject = () => {};
  let subjectItem = props.data;
  console.log("stateFormAddSubject.flag", stateFormAddSubject.flag);
  return (
    <>
      <div className={style.container}>
        {subjectItem.map((item, key) => (
          <CardsItem key={key} data={item} />
        ))}
        <AddSubjectBatton
          addSubject={addSubject}
          click={() => stateFormAddSubject.setFlagForm()}
        />
>>>>>>> e6b8140911d5d8f408de44fc664d1126551641ad

        {stateFormAddSubject.flag == true ? <AddSubjectModal /> : <></>}
      </div>
    </>
  );
});
