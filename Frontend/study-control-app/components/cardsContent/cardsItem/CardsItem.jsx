import React from "react";
import Image from "next/image";
import style from "./CardsItem.module.scss";
import { useRouter } from "next/router";
import { observer } from "mobx-react-lite";
import stateSubjectItem from "../../../store/stateSubjectItem";

export default observer(function CardsItem(props) {
    console.log("props", props);

    let data = props.data;
    let allData = props.allData;
    let router = useRouter();

    //регистрация формы
    const updatingDataServer = async (id,newAllData) => {
        const res = await fetch(
            `https://backend.revenant-games.online/api/subjectcards/${id}`,
            {
                method: "DELETE",
            }
        );
        const respons = await res;
        if (respons.ok) {
            props.setSubject(newAllData);
        }
    };
    const removeCard = () => {
        let newAllData = allData.filter(
            (dataItem) =>
                Number(dataItem.subjectCardId) != Number(data.subjectCardId)
        );
        updatingDataServer(data.subjectCardId, newAllData);
    };

    const handleClick = (href) => {
        console.log("данные по предмету", data);
        // нужен контекст
        stateSubjectItem.setData(data);
        console.log("stateSubjectItem: ", stateSubjectItem);
        //router.push("/subjectPages");
    };

    return (
        <a onClick={handleClick}>
            {/* <a onClick={event=>(props.click(event.target)) }> */}
            <div className={style.card}>
                <div
                    className={style.cardButtonRemoveCard}
                    onClick={removeCard}
                >
                    <span className={style.cardButtonRemoveCardText}>x</span>
                </div>
                <h3 className={style.cardTitle}>{data.subjectName}</h3>
                <div className={style.cardTeacherBlock}>
                    <Image
                        src="/teacherIcon.png"
                        alt="subject-icon"
                        width="22"
                        height="22"
                    />
                    <span className={style.teacherName}>
                        {data.teacherName}
                    </span>
                </div>
                <div className={style.controlDateBlock}>
                    <span className={style.controlDateText}>
                        Дата контроля:
                    </span>
                    <strong className={style.controlDateTextStrong}>
                        {data.controlDate}
                    </strong>
                </div>
                <div className={style.separator}></div>
                <div className={style.complitedBlock}>
                    <span className={style.complitedText}>Выполнено:</span>
                    <strong className={style.complitedTextStrong}>
                        {data.complited}
                    </strong>
                </div>
            </div>
        </a>
    );
});
