import React, { PropsWithChildren, useEffect, useState } from 'react';
import { withRouter, RouteProps } from 'react-router';
import { Article, Source } from "../model/NewsApi.model";
import NewsApiRepository from 'repository/NewsApi.repository';
import './TabArticles.scss';

export interface TabArticleProps extends RouteProps {
    source: Source;
}

const TabArticles: React.FC<TabArticleProps> = (props: PropsWithChildren<TabArticleProps>) => {
    const [ loading, setLoading ] = useState(true);
    const [ _articles, setArticles ] = useState<Article[]>([]);

    useEffect(() => {
        setLoading(true);
        NewsApiRepository.getTopHeadlines({
            sources: [ props.source.name ]
        }).then(response => {
            const { articles } = response.data;
            console.log(response);
            setArticles(articles);
            setLoading(false);
        })
    }, [ props.source ]);

    return (
        <div className="tab-articles">
            {props.source.name}
            <br/>
            {loading && <div>loading</div>}
            <div className={loading ? 'tab-articles__loading' : ''}>
                {_articles.length
                    ? _articles.map(article => (
                        <>
                            <div>{article.title}</div>
                            <div>{article.description}</div>
                        </>
                    ))
                    : <>No Articles</>}
            </div>
        </div>
    );
};

// @ts-ignore
export default withRouter(TabArticles);
