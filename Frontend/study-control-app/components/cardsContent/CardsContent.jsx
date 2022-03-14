import React from "react";
import AddSubjectBatton from "../addSubjectBatton/AddSubjectBatton";
import AddSubjectModal from "../addSubjectModal/AddSubjectModal";
import style from "./CardsContent.module.scss";
import CardsItem from "./cardsItem/CardsItem";
import stateFormAddSubject from "../../store/stateFormAddSubject";
import { observer } from "mobx-react-lite";

export default observer(function CardsContent(props) {
    const addSubject = () => {};
    let subjectItem = props.data;
    console.log("stateFormAddSubject.flag", stateFormAddSubject.flag);
    return (
        <>
            <div className={style.container}>
                {subjectItem.map((item, key) => (
                    <CardsItem key={key} data={item} />
                ))}
                <AddSubjectBatton addSubject={addSubject} />

                {stateFormAddSubject.flag == true ? (
                    <AddSubjectModal />
                ) : (
                    <></>
                )}
            </div>
        </>
    );
});
