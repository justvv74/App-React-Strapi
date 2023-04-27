import { useEffect, useRef, useState } from "react";
import styles from "./cardaction.module.scss";
import { DeleteModal } from "./DeleteModal";
import { EditBtnBox } from "./EditBtnBox";
import { useNavigate } from "react-router-dom";

interface ICardAction {
  id: number;
  post: boolean;
  changeIsEdit?: (e: boolean) => void;
  title?: string;
  descr?: string;
  tag?: string;
  edit?: boolean;
}

export function CardAction({
  id,
  post,
  changeIsEdit,
  title,
  descr,
  tag,
  edit,
}: ICardAction) {
  const [isDeleteModalOpened, setIsDeleteModalOpened] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const modalRoot = document.getElementById("modal-root");
  const refBtn = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (edit) {
      setIsEdit(true);
    }
  }, []);

  function handleClickEdit() {
    if (changeIsEdit) {
      changeIsEdit(true);
    }

    setIsEdit(true);
    navigate(`/posts/${id}?edit=true`);
  }

  function handleClickDelete() {
    setIsDeleteModalOpened(true);
    document.body.classList.add("body-noscroll");

    if (modalRoot) {
      modalRoot.classList.add("modal-root-active");
    }
  }

  function modalCloseDelete(value: boolean) {
    setIsDeleteModalOpened(value);
    document.body.classList.remove("body-noscroll");

    if (modalRoot) {
      modalRoot.classList.remove("modal-root-active");
    }
  }

  function closeEditBtnBox(value: boolean) {
    setIsEdit(value);
    if (changeIsEdit) {
      changeIsEdit(false);
    }
  }

  return (
    <div className={styles.btnBox}>
      {isEdit && (
        <EditBtnBox
          closeEditBtnBox={closeEditBtnBox}
          id={id}
          title={title}
          descr={descr}
          tag={tag}
        />
      )}
      {!isEdit && (
        <button
          className={`${styles.btnBox__btn} ${styles.btnBox__btn_edit}`}
          onClick={handleClickEdit}
        >
          Edit
        </button>
      )}

      {!isEdit && (
        <button
          className={`${styles.btnBox__btn} ${styles.btnBox__btn_delete}`}
          onClick={handleClickDelete}
          ref={refBtn}
        >
          Delete
        </button>
      )}
      {isDeleteModalOpened && (
        <DeleteModal
          modalCloseDelete={modalCloseDelete}
          id={id}
          refBtn={refBtn}
          post={post}
        />
      )}
    </div>
  );
}
