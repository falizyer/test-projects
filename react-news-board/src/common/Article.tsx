import React, { PropsWithChildren } from "react";
import { Article } from "../model/NewsApi.model";

export default function (props: PropsWithChildren<Article>) {
    return (
        <section key={props.title}>
            <header>
                <h3>{props.title}</h3>
                <div>{props.source?.name}</div>
            </header>
            <div>
                {props.description}
            </div>
            <footer>
                <div>{props.publishedAt}</div>
                <div>{props.author}</div>
            </footer>
        </section>
    );
}