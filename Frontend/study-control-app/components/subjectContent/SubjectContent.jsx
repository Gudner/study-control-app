import Image from "next/image";
import React, { useEffect, useState } from "react";
import AddSubjectBatton from "../addSubjectBatton/AddSubjectBatton";
import style from "./SubjectContent.module.scss";
import stateFormAdd from "../../store/stateFormAdd";

import { observer } from "mobx-react-lite";
import AddControlModal from "../addControlModal/AddControlModal";
import AddTasckModal from "../addTasckModal/AddTasckModal";
import stateSubjectItem from "../../store/stateSubjectItem";
import { toJS } from "mobx";

export default observer(function SubjectContent(props) {
    let id = toJS(stateSubjectItem.newCardId);
    console.log("id: ", id);

    /* ===== получение данных и запись в state ====*/
    const [subjectContent, setSubjectContent] = useState([]);
    const [controlItem, setControlItem] = useState([]);
    const [controlTasks, setControlTasks] = useState();

    const [idControl, setIdControl] = useState();

    const [idControlInMass, setIdControlInMass] = useState();

    console.log("controlItem from Subject content", controlItem);

    useEffect(() => {
        getData();
        return () => {};
    }, []);

    useEffect(() => {
        let indexArr;
        controlItem.forEach((element, index) => {
            if (element.controlId == idControl) {
                setIdControlInMass(index);
            }
        });
        console.log("idControlInMass: ", idControlInMass);
        console.log("data", data);
        return () => {};
    });

    const getData = () => {
        let url = `https://backend.revenant-games.online/api/subjectcards/${id}`;
        fetch(url)
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                throw new Error("Ошибка запроса!");
            })
            .then((subjectContentRes) => {
                setSubjectContent(subjectContentRes);
                setControlItem(subjectContentRes.controls);
                console.log("subjectContent", subjectContentRes);
            })
            .catch((error) => {
                console.log("Error", error);
            });
    };

    // //функция удаления элемента и обнавления стейта
    let data = props.data;
    //функция удаления элемента и обнавления стейта
    //регистрация формы
    const updatingDataServer = async (id, newAllData) => {
        const res = await fetch(
            `https://backend.revenant-games.online/api/controltasks/${id}`,
            {
                method: "DELETE",
            }
        );
        const respons = await res;
        if (respons.ok) {
            props.setSubject(newAllData);
        }
    };
    const removeTask = () => {
        let newAllData = data.filter(
            (controlTasks) =>
                Number(controlTasks.controlTaskId) !=
                Number(controlTasks.controlTaskId)
        );
        updatingDataServer(data.controlTaskId, newAllData);
    };

    return (
        <div className={style.container}>
            <h2 className={style.title}>Список контролей</h2>
            {controlItem.map((item, key) => {
                let tasks = item.controlTasks;
                return (
                    <div key={item.controlId} className={style.controlWrap}>
                        <h3 className={style.controlTitle}>
                            {item.controlType == 0 ? "ТК - 1. " : ""}
                            {item.controlType == 2 ? "ТК - 2. " : ""}
                            {item.controlType == 1 ? "ПК - 1. " : ""}
                            {item.controlType == 3 ? "ПК - 2. " : ""}
                            Срок проведения: до
                            {" " +
                                new Date(
                                    item.deadlineDate
                                ).toLocaleDateString()}
                        </h3>
                        {tasks.map((task) => {
                            let key = task.controlTaskId;
                            return (
                                <div key={key} className={style.tasckWrap}>
                                    {/* <input
                                        type="checkbox"
                                        className={style.tasckCheck}
                                    /> */}
                                    <div className={style.tasckWrapText}>
                                        <span className={style.tasckText}>
                                            {task.taskText}
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
                                            //обработчик удаления
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
                            onClick={(e) => {
                                setIdControl(e.target.id);
                                console.log("idControl", idControl);
                                console.log("controlItem", controlItem);
                                let data = controlItem.filter(
                                    (item, index) =>
                                        item.controlId == e.target.id
                                );
                                //  let indexArr;
                                //   controlItem.forEach((element, index) => {
                                //     if (element.controlId == idControl) {
                                //       setIdControlInMass(index);
                                //     }
                                //   });
                                //   console.log('idControlInMass: ', idControlInMass);
                                //   console.log('data', data);
                                setControlTasks(data);
                                console.log("controlTasks", controlTasks);
                                stateFormAdd.setFlagFormTasck();
                            }}
                        >
                            <button
                                className={style.controlButtonAdd}
                                id={item.controlId}
                            >
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
            {stateFormAdd.flag == true ? (
                <AddControlModal
                    controlItem={controlItem}
                    setControlItem={setControlItem}
                    subjectCardId={id}
                />
            ) : (
                <></>
            )}
            {stateFormAdd.flagTask == true ? (
                <AddTasckModal
                    controlItem={controlItem}
                    setControlItem={setControlItem}
                    idControl={idControl}
                    setControlTasks={setControlTasks}
                    controlTasks={controlTasks}
                    idControlInMass={idControlInMass}
                />
            ) : (
                <></>
            )}
        </div>
    );
});
