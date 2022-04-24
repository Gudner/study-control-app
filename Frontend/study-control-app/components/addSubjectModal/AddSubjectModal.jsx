import React, { useEffect, useRef } from "react";
import style from "./AddSubjectModal.module.scss";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { InputText } from "../inputText/InputText.jsx";
import { observer } from "mobx-react-lite";
import stateFormAddSubject from "../../store/stateFormAdd";

export default observer(function AddSubjectModal(props) {
    const ref = useRef();
    // console.log("props", props.addSubject);

    useEffect(() => {
        const onClick = (e) =>
            ref.current.contains(e.target) ||
            stateFormAddSubject.removeFlagForm();
        document.addEventListener("click", onClick);
        return () => {
            document.removeEventListener("click", onClick);
        };
    }, []);
    // ====== валидация  для 1 шага=====
    const validateAddSubject = Yup.object().shape({
        subjectName: Yup.string()
            .min(2, "Слишком короткое название!")
            .max(50, "Слишком длинное название!")
            .required("Это поле является обязателным!"),
        teacherName: Yup.string()
            .matches(/^([^0-9]*)$/, "ФИО не должно содержать цифры")
            .min(2, "Слишком короткое имя!")
            .max(50, "Слишком длинное имя!")
            .required("Это поле является обязателным!"),
    });
    //регистрация формы
    const registrForm = async (values) => {
        const res = await fetch(
            "https://backend.revenant-games.online/api/subjectcards",
            {
                headers: { "Content-Type": "application/json" },
                method: "PUT",
                body: JSON.stringify(values, null, 2),
            }
        );

        const respons = await res;
        if (respons.ok) {
            let obj = {
                subjectCardId: props.addSubject.length + 1,
                subjectName: values.subjectName,
                teacherName: values.teacherName,
                controls: null,
            };
            props.setSubject([...props.addSubject, obj]);
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
                initialValues={{ subjectName: "", teacherName: "" }}
                onSubmit={(values) => submit(values)}
                validationSchema={validateAddSubject}
            >
                {(formik) => (
                    <Form className={style.form} ref={ref}>
                        <h3 className={style.formHeader}>
                            Добавление предмета
                        </h3>
                        <div className={style.inputWrap}>
                            <InputText
                                id="subjectName"
                                type="text"
                                placeholder="Название предмета"
                                name="subjectName"
                            />
                            <InputText
                                id="teacherName"
                                type="text"
                                placeholder="ФИО преподавателя"
                                name="teacherName"
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
