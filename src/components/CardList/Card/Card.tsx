import React from "react";
import styles from "./card.module.scss";
import { IItem } from "../CardList";
import { Link } from "react-router-dom";
import { CardAction } from "./CardAction";

interface ICard {
  data: IItem;
}

export function Card({ data }: ICard) {
  const token = sessionStorage.getItem("token");

  return (
    <li className={styles.card}>
      <Link to={`posts/${data.id}`}>
        <h2 className={styles.card__title}>{data.attributes.title}</h2>
        <p className={styles.card__descr}>
          {data.attributes.descr.length > 200
            ? `${data.attributes.descr.substring(0, 200)}...`
            : data.attributes.descr}
        </p>
        <p className={styles.card__info}>
          <span className={styles.card__created}>
            {data.attributes.createdAt !== data.attributes.updatedAt
              ? "Updated: " + data.attributes.updatedAt.substring(0, 10)
              : "Published: " + data.attributes.publishedAt.substring(0, 10)}
          </span>
          <span className={styles.card__tag}>
            {"Tag: " + data.attributes.tag}
          </span>
        </p>
      </Link>
      {token !== null && <CardAction id={data.id} post={false} />}
    </li>
  );
}
