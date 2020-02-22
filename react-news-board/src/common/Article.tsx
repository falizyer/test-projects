import React, { PropsWithChildren } from "react";

import { Article } from "../model/NewsApi.model";

export default function(props: PropsWithChildren<Article>) {
  return (
    <section key={props.title} className="article-section">
      <header className="article-section__header">
        <h3>{props.title}</h3>
        <div>{props.source?.name}</div>
      </header>
      <div className="article-section__content">{props.description}</div>
      <footer className="article-section__footer">
        <div>{props.publishedAt}</div>
        <div>{props.author}</div>
      </footer>
    </section>
  );
}
