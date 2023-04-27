import React, { useRef, useState } from "react";
import styles from "./header.module.scss";
import { Login } from "./Login";

export function Header() {
  const [isLoginModalOpened, setIsLoginModalOpened] = useState(false);
  const modalRoot = document.getElementById("modal-root");
  const refBtn = useRef<HTMLButtonElement>(null);

  function handleClick() {
    setIsLoginModalOpened(true);
    document.body.classList.add("body-noscroll");

    if (modalRoot) {
      modalRoot.classList.add("modal-root-active");
    }
  }

  function modalClose(value: boolean) {
    setIsLoginModalOpened(value);
    document.body.classList.remove("body-noscroll");
    if (modalRoot) {
      modalRoot.classList.remove("modal-root-active");
    }
  }

  return (
    <header className={styles.header}>
      <h1 className={styles.header__title}>Posts</h1>
      <button
        className={styles.header__login}
        onClick={handleClick}
        ref={refBtn}
      >
        Login
      </button>
      {isLoginModalOpened && <Login modalClose={modalClose} refBtn={refBtn} />}
    </header>
  );
}
