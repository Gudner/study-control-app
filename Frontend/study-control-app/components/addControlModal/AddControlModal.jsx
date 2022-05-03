import React, { useEffect, useRef, useState } from "react";
import style from "./AddControlModal.module.scss";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { InputText } from "../inputText/InputText.jsx";
import { observer } from "mobx-react-lite";
import stateFormAddSubject from "../../store/stateFormAdd";
import Select from "react-select";

export default observer(function AddControlModal(props) {
  const ref = useRef();
  const [selectValue, setSelectValue] = useState("0");
  let subjectCardId = props.subjectCardId; //id карточки дисциплины
  let subjectCardControls = props.subjectCardControls;
  console.log("subjectCardControls: ", subjectCardControls);
  const options = [
    { value: "TK1", label: "Тк-1" },
    { value: "PK1", label: "Пк-1" },
    { value: "TK2", label: "Тк-2" },
    { value: "PK2", label: "Пк-2" },
  ];

  useEffect(() => {
    console.log("ref: ", ref);
    const onClick = (e) => {
      ref.current.contains(e.target) ||
        e.target.classList.contains("custom-select__option") ||
        stateFormAddSubject.removeFlagForm();
    };
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("click", onClick);
    };
  }, []);

  const validateAddControl = Yup.object().shape({
    deadlineDate: Yup.string().required("Это поле является обязателным!"),
  });

  const addingNewControl = async (values, selectValue) => {
    let sendData = {
      subjectCardId: subjectCardId,
      controlType: selectValue,
      deadlineDate: values.deadlineDate,
    };
    console.log("sendData", sendData);
    const res = await fetch(
      "https://backend.revenant-games.online/api/controls",
      {
        headers: { "Content-Type": "application/json" },
        method: "PUT",
        body: JSON.stringify(sendData, null, 2),
      },
    );
    const respons = await res;
    console.log("respons: ", respons);
    if (respons.ok) {
      //меняем стейт из mobx
      if (props.controlItem.length != 0) {
        console.log(
          "subjectCardControls[length - 1].controlId",
          props.controlItem[props.controlItem.length - 1].controlId,
        );

        let controlId =
          props.controlItem[props.controlItem.length - 1].controlId;
        sendData.controlId = controlId + 1;
        sendData.controlTasks = [];

        props.setControlItem([...props.controlItem, sendData]);
        console.log("subjectCardControls: ", props.controlItem);
      }
    }
  };

  const submit = (values) => {
    stateFormAddSubject.removeFlagForm();
    addingNewControl(values, selectValue);
  };

  return (
    <div className={style.container}>
      <Formik
        initialValues={{ deadlineDate: "" }}
        onSubmit={(values) => submit(values)}
        validationSchema={validateAddControl}
      >
        {(formik) => (
          <Form className={style.form} ref={ref}>
            <h3 className={style.formHeader}>Добавление контроля</h3>
            <div className={style.inputWrap}>
              <Select
                options={options}
                classNamePrefix="custom-select"
                defaultValue={options[0]}
                onChange={(event) => setSelectValue(event.value)}
              />
              <InputText
                id="deadlineDate"
                type="date"
                placeholder="Сроки проведения до:"
                name="deadlineDate"
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
