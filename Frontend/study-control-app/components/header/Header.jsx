import React from "react";
import style from "./Header.module.scss";

export default function Header() {
  return (
    <div className={style.header}>
      <div className={style.header__inner}>
        <div className={style.header__arrow}></div>
        <h3 className={style.header__title}>Предметы</h3>
      </div>
    </div>
  );
}
