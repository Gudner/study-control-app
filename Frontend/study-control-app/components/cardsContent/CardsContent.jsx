import React from "react";
import AddSubjectBatton from "../addSubjectBatton/AddSubjectBatton";
import AddSubjectModal from "../addSubjectModal/AddSubjectModal";
import style from "./CardsContent.module.scss";
import CardsItem from "./cardsItem/CardsItem";

export default function CardsContent(props) {

  const addSubject = () =>{
    
  };
    let subjectItem = props.data;
    return (
        <>
            <div className={style.container}>
                {subjectItem.map((item, key) => (
                    <CardsItem key={key} data={item} />
                ))}
                <AddSubjectBatton addSubject={addSubject}/>
                <AddSubjectModal />
            </div>
            
        </>
    );
}
