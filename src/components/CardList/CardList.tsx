import { useSelector } from "react-redux";
import styles from "./cardlist.module.scss";
import { RootState } from "../../store/store";
import { Card } from "./Card/Card";
import { useRef, useState } from "react";
import { CreatePostModal } from "../CreatePostModal";

export interface IItem {
  id: number;
  attributes: {
    title: string;
    descr: string;
    tag: string;
    createdAt: string;
    publishedAt: string;
    updatedAt: string;
  };
}

export function CardList() {
  const list = useSelector<RootState, []>((state) => state.postList.data);
  const loading = useSelector<RootState, boolean>(
    (state) => state.postList.loading
  );
  const error = useSelector<RootState, string>((state) => state.postList.error);
  const token = sessionStorage.getItem("token");
  const [isCreatePostModalOpened, setIsCreatePostModalOpened] = useState(false);
  const modalRoot = document.getElementById("modal-root");
  const refBtn = useRef<HTMLButtonElement>(null);

  function modalClose(value: boolean) {
    setIsCreatePostModalOpened(value);

    document.body.classList.remove("body-noscroll");

    if (modalRoot) {
      modalRoot.classList.remove("modal-root-active");
    }
  }

  function handleClick() {
    setIsCreatePostModalOpened(true);
    document.body.classList.add("body-noscroll");

    if (modalRoot) {
      modalRoot.classList.add("modal-root-active");
    }
  }

  return (
    <>
      <h1 className={styles.title}>News</h1>
      {token && (
        <button className={styles.addBtn} onClick={handleClick} ref={refBtn}>
          Add post
        </button>
      )}
      <ul className={styles.cardList}>
        {list.map((item: IItem) => (
          <Card key={item.id} data={item} />
        ))}
        {error && <p className={styles.cardList__error}>{error}</p>}
      </ul>
      {loading && <div className={styles.spinner}></div>}
      {isCreatePostModalOpened && (
        <CreatePostModal modalClose={modalClose} refBtn={refBtn} />
      )}
    </>
  );
}
