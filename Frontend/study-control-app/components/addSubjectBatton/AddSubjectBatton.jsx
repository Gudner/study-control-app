import React from "react";
import style from "./AddSubjectBatton.module.scss";

export default function AddSubjectBatton(props) {
  return (
    <div className={style.Container} onClick={props.click}>
      <div className={style.ConteinerButton}>
        <div className={style.plusConteiner}>
          <span className={style.plus}>+</span>
        </div>
        <span className={style.AddSubjectText}>Добавить контроль</span>
      </div>
    </div>
  );
}
