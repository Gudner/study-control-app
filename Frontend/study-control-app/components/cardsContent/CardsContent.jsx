import React from "react";
import style from "./CardsContent.module.scss";
import CardsItem from "./cardsItem/CardsItem";

export default function CardsContent(props) {
  let subjectItem = props.data;
  return (
    <div className={style.container}>
      {subjectItem.map((item, key) => (
        <CardsItem data={item} />
      ))}
    </div>
  );
}
