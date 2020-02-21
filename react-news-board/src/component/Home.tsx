import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";

import { ThemeStoreContext } from "@app/store";
import ApiRecord from "@app/common/ApiRecord";
import {
  ArticleParams,
  useGetTopHeadlines
} from "@app/repository/NewsApi.repository";
import ArticleComponent from "@app/common/Article";
import { Article, Countries } from "@app/model/NewsApi.model";

import TopHeadLinesFormComponent from "./home/TopHeadLinesForm";

import "./Home.scss";

export default function() {
  const { theme } = useContext(ThemeStoreContext);
  const { t } = useTranslation();
  const [filter, setFilter] = useState<ArticleParams>({
    country: Countries.us,
    q: void 0,
    page: void 0,
    category: void 0,
    pageSize: void 0,
    sources: void 0
  });
  const { articles, isPending, error } = useGetTopHeadlines(filter);
  return (
    <section className={`rnb-home-component rnb-${theme}-theme`}>
      <header className="rnb-home-component__header">
        {t("app.header.title.home")}
      </header>

      <div className="rnb-home-component__content">
        <TopHeadLinesFormComponent
          defaultValues={filter}
          onSubmit={value => setFilter(value)}
        />

        <ApiRecord records={articles} isPending={isPending} error={error}>
          {(article: Article) => (
            <ArticleComponent key={article.title} {...article} />
          )}
        </ApiRecord>
      </div>
    </section>
  );
}
