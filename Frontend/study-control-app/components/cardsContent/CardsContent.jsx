import React from "react";
import AddSubjectBatton from "../addSubjectBatton/AddSubjectBatton";
import AddSubjectModal from "../addSubjectModal/AddSubjectModal";
import style from "./CardsContent.module.scss";
import CardsItem from "./cardsItem/CardsItem";
import stateFormAdd from "../../store/stateFormAdd";
import { observer } from "mobx-react-lite";

export default observer(function CardsContent(props) {
  let subjectItem = props.data;
  console.log("subjectItem: ", subjectItem);
  console.log("stateFormAddSubject.flag", stateFormAdd.flag);

  // const clickCard = (event) =>{
  //     console.log(event);
  // };
  return (
    <>
      <div className={style.container}>
        {subjectItem.map((item, key) => (
          <CardsItem
            key={key}
            data={item}
            allData={subjectItem}
            setSubject={props.setSubject}
            href="/subjectPages"
          />
          // <CardsItem key={key} data={item}  click={clickCard}/>
        ))}
        <AddSubjectBatton
          click={() => stateFormAdd.setFlagForm()}
          addSubjectText="Добавить предмет"
        />

        {stateFormAdd.flag == true ? (
          <AddSubjectModal
            addSubject={subjectItem}
            setSubject={props.setSubject}
          />
        ) : (
          <></>
        )}
      </div>
    </>
  );
});
