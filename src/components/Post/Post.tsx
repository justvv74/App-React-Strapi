import React, { ChangeEvent, useEffect, useState } from "react";
import styles from "./post.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { CardAction } from "../CardList/Card/CardAction";
import { useNavigate } from "react-router-dom";
import { textSearch } from "../../utils/search";

interface IData {
  id?: number;
  attributes?: {
    title: string;
    descr: string;
    tag: string;
    createdAt: string;
    publishedAt: string;
    updatedAt: string;
  };
}

export function Post() {
  const [data, setData] = useState<IData>({});
  const list = useSelector<RootState, []>((state) => state.postList.data);
  const token = sessionStorage.getItem("token");
  const [isEdit, setIsEdit] = useState(false);
  const [title, setTitle] = useState("");
  const [descr, setDescr] = useState("");
  const [tag, setTag] = useState("");
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const id = Number(window.location.pathname.replace("/posts/", ""));
    const postData = list.find((item: { id: number }) => item.id === id);

    if (postData !== undefined) {
      setData(postData);
    }
  }, [list]);

  useEffect(() => {
    const query = document.location.search;
    const searchParams = new URLSearchParams(query);
    const searchParamsEdit = searchParams.get("edit");
    if (searchParamsEdit) {
      setIsEdit(true);
    }

    textSearch();
  }, []);

  function handleChangeSearch(event: ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value);
  }

  function handleChangeTitle(event: ChangeEvent<HTMLInputElement>) {
    setTitle(event.target.value);
  }

  function handleChangeDescr(event: ChangeEvent<HTMLTextAreaElement>) {
    setDescr(event.target.value);
  }

  function handleChangeTag(event: ChangeEvent<HTMLInputElement>) {
    setTag(event.target.value);
  }

  function changeIsEdit(value: boolean) {
    setIsEdit(value);
  }

  useEffect(() => {
    if (data.attributes) {
      setTitle(data.attributes.title);
      setDescr(data.attributes.descr);
      setTag(data.attributes.tag);
    }
  }, [isEdit]);

  return (
    <>
      <div className={styles.actions}>
        <button
          className={styles.actions__backBtn}
          onClick={() => navigate("/")}
        >
          Back
        </button>
        <input
          className={styles.actions__search}
          id="search"
          type="text"
          name="search"
          value={search}
          onChange={handleChangeSearch}
        />
      </div>
      <div className={styles.card}>
        {isEdit ? (
          <input
            className={styles.card__inputTitle}
            type="text"
            name="title"
            value={title}
            onChange={handleChangeTitle}
          />
        ) : (
          <h2 className={styles.card__title}>
            {data.attributes ? data.attributes.title : ""}
          </h2>
        )}
        {isEdit ? (
          <textarea
            className={styles.card__inputDescr}
            name="descr"
            value={descr}
            onChange={handleChangeDescr}
            placeholder="descr"
          />
        ) : (
          <p className={styles.card__descr}>
            {data.attributes ? data.attributes.descr : ""}
          </p>
        )}
        <p className={styles.card__info}>
          <span className={styles.card__created}>
            {data.attributes
              ? data.attributes.createdAt !== data.attributes.updatedAt
                ? "Updated: " + data.attributes?.updatedAt.substring(0, 10)
                : "Published: " + data.attributes?.publishedAt.substring(0, 10)
              : ""}
          </span>

          <span className={styles.card__tag}>
            <span className={styles.card__tagTitle}>Tag: </span>
            <span className={styles.card__tagValue}>
              {isEdit ? (
                <input
                  className={styles.card__inputTag}
                  type="text"
                  name="tag"
                  value={tag}
                  onChange={handleChangeTag}
                  placeholder="tag"
                />
              ) : data.attributes ? (
                data.attributes?.tag
              ) : (
                ""
              )}
            </span>
          </span>
        </p>
        {token !== null && data.id && (
          <CardAction
            id={data.id}
            post={true}
            changeIsEdit={changeIsEdit}
            title={title}
            descr={descr}
            tag={tag}
            edit={isEdit}
          />
        )}
      </div>
    </>
  );
}
