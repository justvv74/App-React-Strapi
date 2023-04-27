import React, { useState } from "react";
import styles from "./editbtnbox.module.scss";
import axios from "axios";
import { useDispatch } from "react-redux";
import { postListRequestAsync } from "../../../../../store/cardList/action";

interface IEditBtnBox {
  closeEditBtnBox: (e: boolean) => void;
  id: number;
  title?: string;
  descr?: string;
  tag?: string;
}

export function EditBtnBox({
  closeEditBtnBox,
  id,
  title,
  descr,
  tag,
}: IEditBtnBox) {
  const token = sessionStorage.getItem("token");
  const dispatch = useDispatch<any>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleClickSave() {
    setLoading(true);
    setError("");
    axios
      .put(
        `http://localhost:1337/api/posts/${id}`,
        {
          data: {
            title: title,
            descr: descr,
            tag: tag,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        dispatch(postListRequestAsync());
        closeEditBtnBox(false);
      })
      .catch((err) => setError(String(err)))
      .finally(() => setLoading(false));
  }

  return (
    <div className={styles.btnBox}>
      <button
        className={`${styles.btnBox__btn} ${styles.btnBox__btn_edit}`}
        onClick={() => closeEditBtnBox(false)}
      >
        Cancel
      </button>

      <button
        className={`${styles.btnBox__btn} ${styles.btnBox__btn_save}`}
        onClick={handleClickSave}
      >
        Save
      </button>
      {loading && <div className={styles.spinner}></div>}
      {error && <p className={styles.btnBox__error}>{error}</p>}
    </div>
  );
}
