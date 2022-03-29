import React, { useState } from "react";
import style from "./SubjectContent.module.scss";

export default function SubjectContent() {
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
    ];
    const [controlItem, setControlItem] = useState(data);
    console.log("controlItem", controlItem);
    return (
        <div className={style.container}>
            <h2 className={style.title}>Список контролей</h2>

            {controlItem.map((item, key) => {
                console.log('item', item.deadline);
                // <div key = {item.idControl} className = {style.controlWrap}>
                //     <h3 className={style.controlTitle}>
                //         ТК - 1. Срок проведения: до:{item.deadline}
                //     </h3>
                // </div>;
                //<button className={style.controlButtonAdd}>+</button>
            })}
            
        </div>
    );
}
