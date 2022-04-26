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
<<<<<<< HEAD
    // console.log("props123322", props.controlItem);
    let taskData = toJS(stateFormAddSubject.setTaskItem);
    
    console.log("taskData: ", taskData);
=======
  console.log("props123322", props.controlItem);
  console.log("stateFormAdd", stateFormAdd.setIdControl());

  const ref = useRef();
>>>>>>> 4b6f557814ebdad158bf5b19ebb406d586ce4bff

    console.log("props.idControl", props.idControl);
    //console.log("props.idControl", props.idControl);
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
          controlId: props.idControl, //???
          taskText: values.taskText,
      };
      // controlId: 4;
      // controlTaskId: 2;
      // isDone: false;
      // taskText: "sdnclksdscdcnsdk skdjncksd lnsdjncsk";
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
            }
        );

        const respons = await res;
        if (respons.ok) {
            console.log("values123434", values);
            //вот тут обновляем стейт
            //   let obj = {
            //     controlId: 5,
            //     controlTasks: [...props.controlItem, values],
            //     controlType: 2,
            //     deadlineDate: "2022-04-24T17:35:48.697",
            //     subjectCardId: 19,
            //   };
            //console.log("test1", test1);
            props.setControlItem([...props.controlItem, values]);
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
<<<<<<< HEAD
=======

    const respons = await res;
    if (respons.ok) {
      console.log("values123434", values);
      //вот тут обновляем стейт
      //   let obj = {
      //     controlId: 5,
      //     controlTasks: [...props.controlItem, values],
      //     controlType: 2,
      //     deadlineDate: "2022-04-24T17:35:48.697",
      //     subjectCardId: 19,
      //   };
      //console.log("test1", test1);
      props.setControlItem([...props.controlItem, values]);
      console.log("setControlItem: ", setControlItem);
    }
  };
  const submit = (values) => {
    stateFormAddSubject.removeFlagForm();
    let obj = {
      controlId: 4, //???
      taskText: values.taskText,
    };
    // controlId: 4;
    // controlTaskId: 2;
    // isDone: false;
    // taskText: "sdnclksdscdcnsdk skdjncksd lnsdjncsk";
    registrForm(obj);
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
>>>>>>> 4b6f557814ebdad158bf5b19ebb406d586ce4bff
});
