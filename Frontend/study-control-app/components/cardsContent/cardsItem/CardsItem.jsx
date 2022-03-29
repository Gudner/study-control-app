import React from "react";
import Image from "next/image";
import style from "./CardsItem.module.scss";
import { useRouter } from 'next/router';


export default function CardsItem(props, ) {
  let data = props.data;
  let router = useRouter();

  const handleClick = (href)=>{
    router.push('/subjectPages');
  };

  return (
<<<<<<< HEAD
    //  <a href={href} onClick={handleClick}>
      <div className={style.card} onClick={handleClick}>
        <h3 className={style.cardTitle}>{data.title}</h3>
=======
    <a href="#">
      <div className={style.card}>
        <h3 className={style.cardTitle}>{data.subjectName}</h3>
>>>>>>> e6b8140911d5d8f408de44fc664d1126551641ad
        <div className={style.cardTeacherBlock}>
          <Image
            src="/teacherIcon.png"
            alt="subject-icon"
            width="22"
            height="22"
          />
          <span className={style.teacherName}>{data.teacherName}</span>
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
  // </a>
  );
}
