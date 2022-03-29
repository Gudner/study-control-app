import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

import style from "../styles/Home.module.scss";
import SubjectContent from "../components/subjectContent/SubjectContent";

export default function SubjectPages() {
    return (
        <div className={style.wrapApp}>
            <Header title="ЗМЖГ" />
            <SubjectContent />
            <Footer />
        </div>
    );
}
