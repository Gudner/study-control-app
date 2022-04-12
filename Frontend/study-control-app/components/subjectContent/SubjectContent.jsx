import Image from "next/image";
import React, { useState } from "react";
import AddSubjectBatton from "../addSubjectBatton/AddSubjectBatton";
import style from "./SubjectContent.module.scss";
import stateFormAdd from "../../store/stateFormAdd";

import { observer } from "mobx-react-lite";
import AddSubjectModal from "../addSubjectModal/AddSubjectModal";
import AddControlModal from "../addControlModal/AddControlModal";
import AddTasckModal from "../addTasckModal/AddTasckModal";

export default observer(function SubjectContent(props) {
    console.log("props", props.data);

    let data = [
        {
            idControl: 0,
            deadline: "13.09.2022",
            item: [
                {
                    idTasck: "0",
                    status: false,
                    tasckText:
                        "Подготовить реферат об инструментах моделирования в соответствии с вариантом",
                },
                {
                    idTasck: "1",
                    status: false,
                    tasckText:
                        "Подготовить реферат об инструментах моделирования в соответствии с вариантом",
                },
                {
                    idTasck: "2",
                    status: true,
                    tasckText: "Выполнить лабораторную работу №1",
                },
            ],
        },
        {
            idControl: 1,
            deadline: "23.10.2022",
            item: [
                {
                    idTasck: "0",
                    status: false,
                    tasckText:
                        "Подготовить реферат об инструментах моделирования в соответствии с вариантом",
                },
            ],
        },
        {
            idControl: 2,
            deadline: "23.10.2022",
            item: [
                {
                    idTasck: "0",
                    status: false,
                    tasckText:
                        "Подготовить реферат об инструментах моделирования в соответствии с вариантом",
                },
            ],
        },
        {
            idControl: 3,
            deadline: "23.10.2022",
            item: [
                {
                    idTasck: "0",
                    status: false,
                    tasckText:
                        "Подготовить реферат об инструментах моделирования в соответствии с вариантом",
                },
            ],
        },
        {
            idControl: 4,
            deadline: "23.10.2022",
            item: [
                {
                    idTasck: "0",
                    status: false,
                    tasckText:
                        "Подготовить реферат об инструментах моделирования в соответствии с вариантом",
                },
            ],
        },
    ];
    //let data = [];
    const [controlItem, setControlItem] = useState(data); //установка состояния
    //console.log("controlItem", controlItem);
    return (
        <div className={style.container}>
            <h2 className={style.title}>Список контролей</h2>

            {controlItem.map((item, key) => {
                console.log("item", item.deadline);
                let tascks = item.item;
                return (
                    <div key={item.idControl} className={style.controlWrap}>
                        <h3 className={style.controlTitle}>
                            ТК - 1. Срок проведения: до: {item.deadline}
                        </h3>
                        {tascks.map((tasck) => {
                            let key = tasck.idTasck;
                            return (
                                <div key={key} className={style.tasckWrap}>
                                    {/* <input
                                        type="checkbox"
                                        className={style.tasckCheck}
                                    /> */}
                                    <div className={style.tasckWrapText}>
                                        <span className={style.tasckText}>
                                            {tasck.tasckText}
                                        </span>
                                    </div>
                                    <div className={style.tasckButtonWrap}>
                                        {/* <Image
                                            src="/calendar.png"
                                            alt="calendar-icon"
                                            width="24"
                                            height="24"
                                        /> */}
                                        <Image
                                            src="/del.png"
                                            alt="del-icon"
                                            width="24"
                                            height="24"
                                        />
                                    </div>
                                </div>
                            );
                        })}
                        <div
                            className={style.controlButtonAddWrap}
                            onClick={() => stateFormAdd.setFlagFormTasck()}
                        >
                            <button className={style.controlButtonAdd}>
                                +
                            </button>
                        </div>
                    </div>
                );
            })}
            <AddSubjectBatton
                click={() => stateFormAdd.setFlagForm()}
                addSubjectText="Добавить контроль"
            />
            {stateFormAdd.flag == true ? <AddControlModal /> : <></>}
            {stateFormAdd.flagTask == true ? (
                <AddTasckModal></AddTasckModal>
            ) : (
                <></>
            )}
        </div>
    );
});
