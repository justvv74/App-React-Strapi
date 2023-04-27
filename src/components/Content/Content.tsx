import { CardList } from "../CardList";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { postListRequestAsync } from "../../store/cardList/action";
import styles from "./content.module.scss";
import { Route, Routes } from "react-router-dom";
import { Post } from "../Post";

export function Content() {
  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(postListRequestAsync());
  });

  return (
    <main className={styles.main}>
      <Routes>
        <Route path="/" element={<CardList />} />
        <Route path="/posts/:id" element={<Post />} />
      </Routes>
    </main>
  );
}
