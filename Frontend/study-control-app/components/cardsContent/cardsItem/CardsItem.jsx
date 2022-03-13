import React from "react";
import Image from "next/image";
import style from "./CardsItem.module.scss";

export default function CardsItem(props) {
  let data = props.data;
  return (
    <a href="#">
      <div className={style.card}>
        <h3 className={style.cardTitle}>{data.title}</h3>
        <div className={style.cardTeacherBlock}>
          <Image
            src="/teacherIcon.png"
            alt="subject-icon"
            width="22"
            height="22"
          />
          <span className={style.teacherName}>{data.teacher}</span>
        </div>
        <div className={style.controlDateBlock}>
          <span className={style.controlDateText}>Дата контроля:</span>
          <strong className={style.controlDateTextStrong}>
            {data.controlDate}
          </strong>
        </div>
        <div className={style.separator}></div>
        <div className={style.complitedBlock}>
          <span className={style.complitedText}>Выполнено:</span>
          <strong className={style.complitedTextStrong}>
            {data.complited}
          </strong>
        </div>
      </div>
    </a>
  );
}
