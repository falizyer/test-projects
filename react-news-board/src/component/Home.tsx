import React, { useState } from 'react';
import ApiRecord from '../common/ApiRecord';
import { ArticleParams, useGetTopHeadlines } from '../repository/NewsApi.repository';
import ArticleComponent from '../common/Article';
import { Article, Countries } from '../model/NewsApi.model';
import TopHeadLinesFormComponent from './home/TopHeadLinesForm';
import { useTranslation } from 'react-i18next';

import './Home.scss';

export default function () {
    const { t } = useTranslation();
    const [ filter, setFilter ] = useState<ArticleParams>({
        country: Countries.us,
        q: void 0,
        page: void 0,
        category: void 0,
        pageSize: void 0,
        sources: void 0
    });
    const { articles, isPending, error } = useGetTopHeadlines(filter);
    return (
        <section className="rnb-home-component">
            <header className="rnb-home-component__header rnb-header">{t('app.header.title.home')}</header>
            <div className="rnb-home-component__content rnb-content">
                <TopHeadLinesFormComponent
                    defaultValues={filter}
                    onSubmit={value => setFilter(value)}
                />

                <ApiRecord records={articles} isPending={isPending} error={error}>
                    {(article: Article) => (
                        <ArticleComponent key={article.title} {...article}/>
                    )}
                </ApiRecord>
            </div>
        </section>
    )
};
