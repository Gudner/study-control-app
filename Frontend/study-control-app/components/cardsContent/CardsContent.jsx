import React from "react";
import AddSubjectBatton from "../addSubjectBatton/AddSubjectBatton";
import AddSubjectModal from "../addSubjectModal/AddSubjectModal";
import style from "./CardsContent.module.scss";
import CardsItem from "./cardsItem/CardsItem";
import stateFormAdd from "../../store/stateFormAdd";
import { observer } from "mobx-react-lite";

export default observer(function CardsContent(props) {
  let subjectItem = props.data;
  subjectItem.map((item) => {
    console.log("subjectItem: ", item.subjectCardId);
  });

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
