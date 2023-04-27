import { useRef, useState } from "react";
import styles from "./deletemodal.module.scss";
import ReactDOM from "react-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { postListRequestAsync } from "../../../../../store/cardList/action";
import { useNavigate } from "react-router-dom";
import useOnClickOutside from "../../../../../hooks/useOnClickOutside";

interface IDeleteModal {
  modalCloseDelete: (e: boolean) => void;
  id: number;
  refBtn: any;
  post: boolean;
}

export function DeleteModal({
  modalCloseDelete,
  id,
  refBtn,
  post,
}: IDeleteModal) {
  const ref = useRef<HTMLDivElement>(null);
  const token = sessionStorage.getItem("token");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  useOnClickOutside(ref, () => modalCloseDelete(false), refBtn);

  function handleClick() {
    setLoading(true);
    axios
      .delete(`http://localhost:1337/api/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (post) {
          navigate(-1);
        }
      })
      .catch((err) => {
        setError(String(err));
      })
      .finally(() => {
        setLoading(false);
        modalCloseDelete(false);
        dispatch(postListRequestAsync());
      });
  }

  const node = document.getElementById("modal-root");
  if (!node) return null;

  return ReactDOM.createPortal(
    <div className={styles.modal} ref={ref}>
      <h4 className={styles.modal__title}>Delete post?</h4>
      <div className={styles.modal__btnBox}>
        <button
          className={`${styles.modal__btn} ${styles.modal__btn_cancel}`}
          onClick={() => modalCloseDelete(false)}
        >
          Cancel
        </button>
        <button
          className={`${styles.modal__btn} ${styles.modal__btn_delete}`}
          onClick={handleClick}
        >
          Delete
        </button>
      </div>
      {loading && <div className={styles.spinner}></div>}
      {error !== "" && (
        <p className={styles.modal__error}>{error.substring(0, 25)}</p>
      )}
    </div>,
    node
  );
}
