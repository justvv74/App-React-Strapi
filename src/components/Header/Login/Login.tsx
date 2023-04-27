import React, { ChangeEvent, useRef, useState } from "react";
import styles from "./login.module.scss";
import ReactDOM from "react-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { postListRequestAsync } from "../../../store/cardList/action";
import useOnClickOutside from "../../../hooks/useOnClickOutside";

interface ILogin {
  modalClose: (e: boolean) => void;
  refBtn: any;
}

export function Login({ modalClose, refBtn }: ILogin) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch<any>();

  useOnClickOutside(ref, () => modalClose(false), refBtn);

  function handleClick() {
    modalClose(false);
  }

  function handleSubmit(event: ChangeEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    axios
      .post("http://localhost:1337/api/auth/local", {
        identifier: username,
        password: password,
      })
      .then((res) => {
        sessionStorage.setItem("token", res.data.jwt);
        dispatch(postListRequestAsync());
        modalClose(false);
      })
      .catch((err) => {
        setError(String(err));
      })
      .finally(() => setLoading(false));
  }

  function handleChangeUsername(event: ChangeEvent<HTMLInputElement>) {
    setUsername(event.target.value);
  }

  function handleChangePassword(event: ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);
  }

  const node = document.getElementById("modal-root");
  if (!node) return null;
  return ReactDOM.createPortal(
    <div className={styles.login} ref={ref}>
      <button className={styles.login__closeBtn} onClick={handleClick}>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0.666641 15.3044L15.3333 0.000153846L16 0.695801L1.33331 16L0.666641 15.3044Z"
            fill="currentColor"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0.666687 -0.000125032L15.3334 15.3041L14.6667 15.9998L1.94673e-05 0.695522L0.666687 -0.000125032Z"
            fill="currentColor"
          />
        </svg>
      </button>
      <form className={styles.login__form} onSubmit={handleSubmit}>
        <input
          className={styles.login__input}
          value={username}
          onChange={handleChangeUsername}
          type="text"
          name="username"
          placeholder="username or email"
          required
        />
        <input
          className={styles.login__input}
          value={password}
          onChange={handleChangePassword}
          type="password"
          name="password"
          placeholder="password"
          required
        />
        <button className={styles.login__formBtn}>login</button>
      </form>
      {loading && <div className={styles.spinner}></div>}
      {error && <p className={styles.login__error}>{error}</p>}
    </div>,
    node
  );
}
