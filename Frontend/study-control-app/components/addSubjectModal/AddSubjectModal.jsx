import React from "react";
import style from "./AddSubjectModal.module.scss";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { InputText } from "../inputText/inputText";

export default function addSubjectModal() {
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

    return (
        <div className={style.container}>
            <Formik
                initialValues={{ subjectName: "", teacherName: "" }}
                //onSubmit={handleSubmit}
                onSubmit={() => console.log(JSON.stringify(values, null, 2))}
                validationSchema={validateAddSubject}
            >
                {(formik) => (
                    <Form className={style.form}>
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
                        <button
                            onClick={() => console.log(formik.values)}
                            type="submit"
                            className={style.addSubjecButton}
                        >
                            Добавить
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}
