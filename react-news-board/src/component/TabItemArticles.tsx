import React, { PropsWithChildren } from "react";
import { RouteProps } from "react-router";

import { Article, Source } from "@app/model/NewsApi.model";
import { useGetEverything } from "@app/repository/NewsApi.repository";
import ApiRecordComponent from "@app/common/ApiRecord";
import ArticleComponent from "@app/common/Article";

import "./TabArticles.scss";

export interface TabArticleProps extends RouteProps {
  source: Source;
}

export default function(props: PropsWithChildren<TabArticleProps>) {
  const { articles, isPending, error } = useGetEverything({
    sources: [props.source.name]
  });

  return (
    <section className="tab-articles">
      <header>{props.source.name}</header>
      <div>
        <ApiRecordComponent
          records={articles}
          isPending={isPending}
          error={error}
        >
          {(article: Article) => <ArticleComponent {...article} />}
        </ApiRecordComponent>
      </div>
    </section>
  );
}
