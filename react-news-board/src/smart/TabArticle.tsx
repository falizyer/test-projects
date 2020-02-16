import React, { PropsWithChildren, useEffect, useState } from 'react';
import { withRouter, RouteProps } from 'react-router';
import { Article, Source } from "../model/NewsApi.model";
import NewsApiRepository from 'repository/NewsApi.repository';
import './TabArticle.scss';

export interface TabArticleProps extends RouteProps {
    source: Source;
}

const TabArticle: React.FC<TabArticleProps> = (props: PropsWithChildren<TabArticleProps>) => {
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
        <div className="tab-article">
            {props.source.name}
            <br/>
            {loading && <div>loading</div>}
            <div className={loading ? 'tab-article__loading' : ''}>
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
export default withRouter(TabArticle);
