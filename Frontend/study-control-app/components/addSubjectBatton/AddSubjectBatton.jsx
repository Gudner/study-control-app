import React from "react";
import style from "./AddSubjectBatton.module.scss";

export default function AddSubjectBatton() {
    return (
        <div className={style.Container}>
            <div className={style.ConteinerButton}>
                <div className={style.plusConteiner}>
                    <span className={style.plus}>+</span>
                </div>
                <span className={style.AddSubjectText}>Добавить контроль</span>
            </div>
        </div>
    );
}
