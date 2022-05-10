import React, { useEffect, useRef } from "react";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { InputText } from "../inputText/InputText.jsx";
import { observer } from "mobx-react-lite";
import stateFormAdd from "../../store/stateFormAdd.js";
import stateFormAddSubject from "../../store/stateFormAdd";
import style from "./AddTasckModal.module.scss";
import { toJS } from "mobx";

export default observer(function AddTasckModal(props) {
  let controlItem = props.controlItem;
  let controlItemControlTasks = props.controlItem.controlTasks;
  console.log("controlItem: ", controlItem);
  let setControlItem = props.setControlItem;
  console.log("setControlItem: ", setControlItem);
  let idControl = props.idControl;
  console.log("idControl: ", idControl);

  let setControlTasks = props.setControlTasks;
  console.log("setControlTasks: ", setControlTasks);
  let controlTasks = props.controlTasks;
  console.log("controlTasks: ", controlTasks);

  const ref = useRef();

  useEffect(() => {
    const onClick = (e) =>
      ref.current.contains(e.target) || stateFormAdd.removeFlagForm();
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("click", onClick);
    };
  }, []);

  // ====== валидация  для 1 шага=====
  const validateAddTasck = Yup.object().shape({
    taskText: Yup.string()
      .min(2, "Слишком короткое название!")
      .max(50, "Слишком длинное название!")
      .required("Это поле является обязателным!"),
  });

  const submit = (values) => {
    stateFormAddSubject.removeFlagForm();
    let obj = {
      controlId: idControl,
      taskText: values.taskText,
    };
    registrForm(obj);
  };

  //регистрация формы
  const registrForm = async (values) => {
    console.log("values", values);

    const res = await fetch(
      "https://backend.revenant-games.online/api/controltasks",
      {
        headers: { "Content-Type": "application/json" },
        method: "PUT",
        body: JSON.stringify(values, null, 2),
      },
    );

    const respons = await res.json();
    if (res.ok) {
      console.log("respons from add task modal", respons);
      //вот тут обновляем стейт
      //   let obj = {
      //     controlId: 5,
      //     controlTasks: [...props.controlItem, values],
      //     controlType: 2,
      //     deadlineDate: "2022-04-24T17:35:48.697",
      //     subjectCardId: 19,
      //   };
      //console.log("test1", test1);
      /*вот тут обнавляем стейт */
      console.log("setControlItem: ", setControlItem);
    }
  };

  return (
    <div className={style.container}>
      <Formik
        initialValues={{ taskText: "" }}
        onSubmit={(values) => submit(values)}
        validationSchema={validateAddTasck}
      >
        {(formik) => (
          <Form className={style.form} ref={ref}>
            <h3 className={style.formHeader}>Добавление задания</h3>
            <div className={style.inputWrap}>
              <InputText
                id="taskText"
                type="text"
                placeholder="Текст задания"
                name="taskText"
              />
            </div>
            <button type="submit" className={style.addSubjecButton}>
              Добавить
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
});
