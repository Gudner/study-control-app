import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import CardsContent from "../components/cardsContent/cardsContent";
import style from "../styles/Home.module.scss";
import { useState } from "react";

export default function Home() {
  /*
 получение данных и запись в state
*/
  const [subject, setSubject] = useState([
    {
      title: "Парал. моделир. ЗМЖГ",
      teacher: "Гнатюк А. Б.",
      controlDate: "13.09.2022",
      complited: "3/4",
    },
    {
      title: "Выч. сист. и сети",
      teacher: "Сидоров С.Г.",
      controlDate: "14.09.2022",
      complited: "2/4",
    },
    {
      title: "Английский яз.",
      teacher: "Панкратова М.В.",
      controlDate: "17.09.2022",
      complited: "4/4",
    },
  ]);
  return (
    <div className={style.wrapApp}>
      <Header />
      <CardsContent data={subject} />
      <Footer />
    </div>
  );
}
