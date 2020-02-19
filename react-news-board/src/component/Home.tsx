import React, { useState } from 'react';
import ApiRecord from "../common/ApiRecord";
import { useGetTopHeadlines } from "../repository/NewsApi.repository";
import ArticleComponent from "../common/Article";
import { Article, Countries } from "../model/NewsApi.model";

export default function () {
    const [ country, setCountry ] = useState(Countries.us);
    const { articles, isPending, error } = useGetTopHeadlines({
        country
    });
    return (
        <section>
            <header>home</header>
            <div>
                <select value={country} onChange={e => setCountry(e.target.value as Countries)}>
                    {Object.values(Countries).map(country => (
                        <option value={country} label={country}/>
                    ))}
                </select>
                <ApiRecord records={articles} isPending={isPending} error={error}>
                    // @ts-ignore
                    {(article: Article) => (
                        // @ts-ignore
                        <ArticleComponent key={article.title} {...article}/>
                    )}
                </ApiRecord>
            </div>
        </section>
    )
};
