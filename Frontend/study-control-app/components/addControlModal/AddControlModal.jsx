import React, { useEffect, useRef } from "react";
import style from "./AddControlModal.module.scss";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { InputText } from "../inputText/InputText.jsx";
import { observer } from "mobx-react-lite";
import stateFormAddSubject from "../../store/stateFormAdd";

export default observer(function AddControlModal(props) {
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

    const validateAddControl = Yup.object().shape({
        deadlineDate: Yup.string().required("Это поле является обязателным!"),
        controlType: Yup.string().required("Это поле является обязателным!"),
    });
    const addingNewControl = async (values) => {
        console.log("values", values);
        let sendData = {
            deadlineDate: values.deadlineDate,
            controlType: values.controlType,
            //subjectCardId: //id subjectCardId
        };
        console.log("sendData", sendData);
        // const res = await fetch(
        //     "https://backend.revenant-games.online/api/subjectcards",
        //     {
        //         headers: { "Content-Type": "application/json" },
        //         method: "PUT",
        //         body: JSON.stringify(values, null, 2),
        //     }
        // );
    };
    //регистрация формы
    // const registrForm = async (values) => {
    //     const res = await fetch(
    //         "https://backend.revenant-games.online/api/subjectcards",
    //         {
    //             headers: { "Content-Type": "application/json" },
    //             method: "PUT",
    //             body: JSON.stringify(values, null, 2),
    //         }
    //     );

    //     const respons = await res;
    //     if (respons.ok) {
    //         let obj = {
    //             subjectCardId: props.addSubject.length + 1,
    //             subjectName: values.subjectName,
    //             teacherName: values.teacherName,
    //             controls: null,
    //         };
    //         props.setSubject([...props.addSubject, obj]);
    //     }
    // };
    const submit = (values) => {
        //stateFormAddSubject.removeFlagForm();
        addingNewControl(values);
        console.log(JSON.stringify(values, null, 2));
    };

    return (
        <div className={style.container}>
            <Formik
                initialValues={{ deadlineDate: "", controlType: "" }}
                onSubmit={(values) => submit(values)}
                validationSchema={validateAddControl}
            >
                {(formik) => (
                    <Form className={style.form} ref={ref}>
                        <h3 className={style.formHeader}>
                            Добавление контроля
                        </h3>
                        <div className={style.inputWrap}>
                            {/* тут должен быть select */}
                            <InputText
                                id="controlType"
                                type="text"
                                placeholder="Тип контроля:"
                                name="controlType"
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
