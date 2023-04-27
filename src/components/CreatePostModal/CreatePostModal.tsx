import { ChangeEvent, useRef, useState } from "react";
import styles from "./createpostmodal.module.scss";
import ReactDOM from "react-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useDispatch } from "react-redux";
import { postListRequestAsync } from "../../store/cardList/action";
import { useFormik } from "formik";
import useOnClickOutside from "../../hooks/useOnClickOutside";

interface ICreatePostModal {
  modalClose: (e: boolean) => void;
  refBtn: any;
}

export function CreatePostModal({ modalClose, refBtn }: ICreatePostModal) {
  const list = useSelector<RootState, any>((state) => state.postList.data);
  const ref = useRef<HTMLDivElement>(null);
  const token = sessionStorage.getItem("token");
  const dispatch = useDispatch<any>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useOnClickOutside(ref, () => modalClose(false), refBtn);

  const node = document.getElementById("modal-root");
  if (!node) return null;

  function handleSubmit(event: ChangeEvent<HTMLFormElement>) {
    formik.handleSubmit();
    setError("");
    event.preventDefault();
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const formik = useFormik({
    initialValues: {
      title: "",
      descr: "",
      tag: "",
    },
    validate,
    onSubmit: (values) => {
      setLoading(true);
      const maxIndex = list.length > 0 ? list[list.length - 1].id : 1;
      axios
        .post(
          "http://localhost:1337/api/posts",
          {
            data: {
              title: formik.values.title,
              descr: formik.values.descr,
              tag: formik.values.tag,
              id: maxIndex + 1,
            },
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          modalClose(false);
          dispatch(postListRequestAsync());
        })
        .catch((err) => setError(String(err)))
        .finally(() => setLoading(false));
    },
  });

  function validate(values: any) {
    const errors: any = {};
    if (!values.title) {
      errors.title = "Required";
      console.log("req");
    } else if (values.title.length > 200) {
      errors.title = "Must be 200 characters or less";
    } else if (values.title.length < 2) {
      errors.title = "Must be more than 2 characters.";
    }

    if (!values.descr) {
      errors.descr = "Required";
    } else if (values.descr.length > 1000) {
      errors.descr = "Must be 20 characters or less";
    } else if (values.descr.length < 10) {
      errors.descr = "Must be more than 10 characters.";
    }

    if (!values.tag) {
      errors.tag = "Required";
    } else if (values.tag.length < 2) {
      errors.tag = "Must be more than 2 characters.";
    } else if (values.tag.length > 20) {
      errors.tag = "Must be 20 characters or less";
    }

    return errors;
  }

  return ReactDOM.createPortal(
    <div className={styles.modal} ref={ref}>
      <button
        className={styles.modal__closeBtn}
        onClick={() => modalClose(false)}
      >
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
      <h2 className={styles.modal__title}>{"Create post"}</h2>
      <form className={styles.modal__form} onSubmit={handleSubmit}>
        <input
          className={styles.modal__input}
          style={formik.errors.title ? { outline: "1px solid red" } : {}}
          type="text"
          name="title"
          value={formik.values.title}
          onChange={formik.handleChange}
          placeholder="title"
        />
        <textarea
          className={`${styles.modal__input} ${styles.modal__textarea}`}
          style={formik.errors.descr ? { outline: "1px solid red" } : {}}
          name="descr"
          value={formik.values.descr}
          onChange={formik.handleChange}
          placeholder="descr"
        />
        <input
          className={styles.modal__input}
          style={formik.errors.tag ? { outline: "1px solid red" } : {}}
          type="text"
          name="tag"
          value={formik.values.tag}
          onChange={formik.handleChange}
          placeholder="tag"
        />
        <button className={styles.modal__btn} type="submit">
          Create
        </button>
      </form>
      {loading && <div className={styles.spinner}></div>}
      {error && <p className={styles.modal__error}>{error}</p>}
    </div>,
    node
  );
}
