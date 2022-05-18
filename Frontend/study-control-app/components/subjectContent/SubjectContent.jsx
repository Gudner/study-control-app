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

  /* ===== получение данных и запись в state ====*/
  const [subjectContent, setSubjectContent] = useState([]);
  const [controlItem, setControlItem] = useState([]);
  const [controlTasks, setControlTasks] = useState();

  const [idControl, setIdControl] = useState();

  const [idControlInMass, setIdControlInMass] = useState();

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
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  // //функция удаления элемента и обнавления стейта
  let data = props.data;
  //функция удаления элемента и обнавления стейта
  //регистрация формы

  const deleteTasck = (tasckId, controlId) => {
    const updatingDataServer = async () => {
      const res = await fetch(
        `https://backend.revenant-games.online/api/controltasks/${tasckId}`,
        {
          method: "DELETE",
        },
      );

      if (res.ok) {
        /*d случае удачного завершения */
        let controls = controlItem[0].controlTasks;
        let newcontrols = controls.filter(
          (item) => item.controlTaskId != tasckId,
        );
        let indexMass;

        controlItem.forEach((item, index) => {
          if (item.controlId == controlId) {
            indexMass = index;
          }
        });
        controlItem[indexMass].controlTasks = newcontrols;
        let newControlItem = [...controlItem];
        setControlItem(newControlItem);
      }
    };
    updatingDataServer();
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
              {" " + new Date(item.deadlineDate).toLocaleDateString()}
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
                    <span className={style.tasckText}>{task.taskText}</span>
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
                      id={task.controlTaskId}
                      data-control={item.controlId}
                      onClick={(event) => {
                        let idControlEl = event.target;
                        let idControl = idControlEl.dataset.control;
                        deleteTasck(event.target.id, idControl);
                      }}
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
                let data = controlItem.filter(
                  (item, index) => item.controlId == e.target.id,
                );
                setControlTasks(data);
                stateFormAdd.setFlagFormTasck();
              }}
            >
              <button className={style.controlButtonAdd} id={item.controlId}>
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
