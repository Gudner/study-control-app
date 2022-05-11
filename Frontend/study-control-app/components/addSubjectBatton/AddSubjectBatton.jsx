import React from "react";
import style from "./AddSubjectBatton.module.scss";

export default function AddSubjectBatton(props) {
  return (
    <div className={style.Container} >
      <div className={style.ConteinerButton} onClick={props.click}>
        <div className={style.plusConteiner}>
          <span className={style.plus}>+</span>
        </div>
        <span className={style.AddSubjectText}>{props.addSubjectText}</span>
      </div>
    </div>
  );
}
