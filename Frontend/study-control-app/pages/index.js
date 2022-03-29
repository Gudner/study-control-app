import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import CardsContent from "../components/cardsContent/CardsContent";
import style from "../styles/Home.module.scss";
import { useEffect, useState } from "react";

export default function Home() {
    /* ===== получение данных и запись в state ====*/
    const [subject, setSubject] = useState([]);
    /* ===== получение данных и запись в state ====*/
    useEffect(() => {
        getData();
        return () => {};
    }, []);

    const getData = () => {
        let url = "https://backend.revenant-games.online/api/subjectcards";
        fetch(url)
            .then((res) => {
                if (res.ok) {
                    console.log("res", res);
                    return res.json();
                }
                throw new Error("Ошибка запроса!");
            })
            .then((subject) => {
                console.log("subject", subject);
                setSubject(subject);
            })
            .catch((error) => {
                console.log("Error", error);
            });
    };

    return (
        <div className={style.wrapApp}>
            <Header title="Предметы" />
            <CardsContent data={subject} />
            <Footer />
        </div>
    );
}
