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
    let controlItem = props.controlItem; //вот это нужно
    console.log("controlItem: ", controlItem);

    // let controlItemControlTasks = props.controlItem;
    // console.log("controlItemControlTasks: ", controlItemControlTasks);
    let setControlItem = props.setControlItem;
    console.log("setControlItem: ", setControlItem);
    let idControl = props.idControl;
    console.log("idControl: ", idControl);

    let setControlTasks = props.setControlTasks;
    console.log("setControlTasks: ", setControlTasks);
    let controlTasks = props.controlTasks; // меняем вот тут данные и запихиваем в массив control item с index idcontrol in mass
    console.log("controlTasks: ", controlTasks);

    let controlTasksMass = controlTasks[0].controlTasks; //то что было
    console.log("controlTasksMass: ", controlTasksMass);

    let idControlInMass = props.idControlInMass;
    console.log("idControlInMass: ", idControlInMass);
    let newControlItem = controlItem;

    const ref = useRef();

    useEffect(() => {
        const onClick = (e) =>
            ref.current.contains(e.target) || stateFormAdd.removeFlagForm();
        document.addEventListener("click", onClick);
        return () => {
            document.removeEventListener("click", onClick);
        };
    }, []);

    // useEffect(() => {
    //     console.log(12334);
    //     setControlItem((сontrolItem) => newControlItem);
    //     return () => {};
    // });

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
            }
        );

        const respons = await res.json();
        if (res.ok) {
            
            console.log("respons from add task modal", respons);
            let newData = controlTasks[0].controlTasks;
            console.log("newData: ", newData);

            let newTasck = [...controlTasksMass, respons];
            console.log("newTasck: ", newTasck);
            controlTasks[0].controlTasks = newTasck;
            console.log("controlTasks[0]: ", controlTasks[0]);
            controlItem[idControlInMass] = controlTasks[0];

            newControlItem = [...controlItem];
            console.log("controlItem: ", controlItem);

            //setControlItem(newControlItem=>newControlItem);
             setControlItem(newControlItem);

            /*вот тут обнавляем стейт */
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
