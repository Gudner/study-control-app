import React, { useEffect, useRef } from "react";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { InputText } from "../inputText/InputText.jsx";
import { observer } from "mobx-react-lite";
import stateFormAdd from "../../store/stateFormAdd.js";
import stateFormAddSubject from "../../store/stateFormAdd";
import style from "./AddTasckModal.module.scss";

export default observer(function AddTasckModal(props) {
    const ref = useRef();
    console.log("props", props.addSubject);

    useEffect(() => {
        const onClick = (e) =>
            ref.current.contains(e.target) ||
            stateFormAdd.removeFlagForm();
        document.addEventListener("click", onClick);
        return () => {
            document.removeEventListener("click", onClick);
        };
    }, []);
    // ====== валидация  для 1 шага=====
    const validateAddTasck = Yup.object().shape({
        tasckText: Yup.string()
            .min(2, "Слишком короткое название!")
            .max(50, "Слишком длинное название!")
            .required("Это поле является обязателным!"),
    });
    //регистрация формы
    const registrForm = async (values) => {
        
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
            let obj = {
               
                controlId: props.addTasck.length+1,
                tasckText: values.tasckText
                // subjectCardId: props.addSubject.length + 1,
                // subjectName: values.subjectName,
                // teacherName: values.teacherName,
                // controls: null,
            };
            props.setTasck([...props.addTasck, obj]);
        }
    };
    const submit = (values) => {
        
        stateFormAddSubject.removeFlagForm();
        registrForm(values);
        console.log(JSON.stringify(values, null, 2));
    };

    return (
        <div className={style.container}>
            <Formik
                initialValues={{ controlId: 0, tasckText: "" }}
                onSubmit={(values) => submit(values)}
                validationSchema={validateAddTasck}
            >
                {(formik) => (
                    <Form className={style.form} ref={ref}>
                        <h3 className={style.formHeader}>
                            Добавление задания
                        </h3>
                        <div className={style.inputWrap}>
                            <InputText
                                id="tasckText"
                                type="text"
                                placeholder="Текст задания"
                                name="tasckText"
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
