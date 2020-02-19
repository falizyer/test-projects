import AbstractRepository from "./AbstractRepository";
import {
    Article,
    Categories,
    Countries, Languages,
    ResponseStatus,
    Source
} from "../model/NewsApi.model";
import { AxiosError } from "axios";
import { Reducer, useEffect, useReducer } from "react";
import axios from 'axios';

const newsApiAxios = axios.create({
    baseURL: process.env.REACT_APP_API_NEWSAPI_HOST as string
});

newsApiAxios.interceptors.request.use(config => {
    config.params.apiKey = process.env.REACT_APP_API_NEWSAPI_KEY as string;
    return config;
});

newsApiAxios.interceptors.response.use(config => config, error => {
    if (error.response && error.response.status === 400) {
        console.log(error.response.data, error);
    }
    return error;
});

const CancelToken = axios.CancelToken;

export interface ArticleResponse {
    status: ResponseStatus.OK;
    totalResults: number;
    articles: Article[];
}

export interface SourceResponse {
    status: ResponseStatus.OK;
    sources: Source[];
}

/**
 * @description
 * Do not mix sources with country and category
 */
export interface ArticleParams {
    country?: Countries;
    category?: Categories;
    q?: string;
    pageSize?: number;
    page?: number;
    sources?: string[];
}

export interface EverythingParams {
    q?: string;
    qInTitle?: string;
    sources?: string[];
    domains?: string[];
    excludeDomains?: string[];
    from?: string;
    to?: string;
    language?: Languages
}

export interface SourcesParams {
    category?: Categories;
    language?: Languages;
    country?: Countries;
}

export enum RepositoryActionType {
    PENDING = 'pending',
    SUCCESS = 'success',
    FAILED = 'failed'
}

export interface RepositoryAction<T> {
    type: RepositoryActionType;
    payload?: T;
}

type NewsApiAction =
    RepositoryAction<Partial<ArticlesState>> | any ;
type ArticlesReducer = Reducer<ArticlesState, NewsApiAction>;
type SourcesReducer = Reducer<SourcesState, NewsApiAction>;
type LatestNewsReducer = Reducer<ArticlesState, NewsApiAction>;

const reducerArticles: ArticlesReducer = (state: ArticlesState,
                                          action: NewsApiAction) => {
    switch (action.type) {
        case RepositoryActionType.SUCCESS:
            return {
                articles: action.payload?.articles,
                totalResults: action.payload?.totalResults,
                isPending: false,
                error: void 0
            };
        case RepositoryActionType.FAILED:
            return {
                ...state,
                isPending: false,
                error: action.payload
            };
        case RepositoryActionType.PENDING:
            return {
                ...state,
                isPending: true
            };
    }
    return state;
};

const reducerSources: ArticlesReducer = (state: ArticlesState,
                                         action: NewsApiAction) => {
    switch (action.type) {
        case RepositoryActionType.SUCCESS:
            return {
                sources: action.payload?.sources,
                isPending: false,
                error: void 0
            };
        case RepositoryActionType.FAILED:
            return {
                ...state,
                isPending: false,
                error: action.payload
            };
        case RepositoryActionType.PENDING:
            return {
                ...state,
                isPending: true
            };
    }
    return state;
};

export interface RepositoryState<T> {
    isPending: boolean;
    error?: Error;
}

export interface ArticlesState extends RepositoryState<ArticleResponse> {
    articles?: Article[];
    totalResults?: number;
}

export interface SourcesState extends RepositoryState<ArticleResponse> {
    sources?: Source[];
}

export const useGetTopHeadlines = (params: ArticleParams): ArticlesState => {
    const [ state, dispatch ] = useReducer<ArticlesReducer>(reducerArticles, {
        isPending: true
    });

    useEffect(() => {
        if (!state.isPending) {
            dispatch({ type: RepositoryActionType.PENDING });
        }
        const source = CancelToken.source();
        newsApiAxios.get<ArticleResponse>(`/top-headlines`, { params, cancelToken: source.token })
            .then(response => {
                console.log(response);
                const { articles, totalResults } = response.data;
                dispatch({ type: RepositoryActionType.SUCCESS, payload: { articles, totalResults } });
            })
            .catch(error => {
                dispatch({ type: RepositoryActionType.FAILED, payload: error });
            });
        return () => {
            source.cancel('cancel request');
        };
    }, Object.values(params));

    return state;
};

export const useGetEverything = (params: EverythingParams) => {
    const [ state, dispatch ] = useReducer<ArticlesReducer>(reducerArticles, {
        isPending: true
    });

    useEffect(() => {
        dispatch({ type: RepositoryActionType.PENDING });
        const source = CancelToken.source();
        newsApiAxios.get<ArticleResponse>(`/everything`, { params, cancelToken: source.token })
            .then(response => {
                const { articles, totalResults } = response.data;
                dispatch({ type: RepositoryActionType.SUCCESS, payload: { articles, totalResults } });
            })
            .catch(error => {
                console.log(error);
                dispatch({ type: RepositoryActionType.FAILED, payload: error });
            });
        return () => {
            source.cancel('cancel request');
        };
    }, [ params ]);

    return state;
};

export const useGetSources = (params: SourcesParams) => {
    const [ state, dispatch ] = useReducer<SourcesReducer>(reducerSources, {
        isPending: true
    });

    useEffect(() => {
        dispatch({ type: RepositoryActionType.PENDING });
        const source = CancelToken.source();
        newsApiAxios.get<SourceResponse>(`/sources`, { params, cancelToken: source.token })
            .then(response => {
                const { sources } = response.data;
                dispatch({ type: RepositoryActionType.SUCCESS, payload: { sources } });
            })
            .catch(error => {
                dispatch({ type: RepositoryActionType.FAILED, payload: error });
            });
        return () => {
            source.cancel('cancel request');
        };
    }, [ params ]);

    return state;
};

export default module.exports;

// class NewsApiRepository extends AbstractRepository {
//
//     private apiKey: string = process.env.REACT_APP_API_NEWSAPI_KEY as string;
//
//     public getTopHeadlines(params: Omit<ArticleParams, AuthenticateFields> = {}): AxiosPromise<ArticleResponse> {
//         return this.callGet<ArticleResponse>({ url: `top-headlines` }, {
//             params: {
//                 ...params,
//                 apiKey: this.apiKey
//             }
//         });
//     }
//
//     public getEverything(params: Omit<EverythingParams, AuthenticateFields> = {}): AxiosPromise<ArticleResponse> {
//         return this.callGet<ArticleResponse>({ url: "everything" }, {
//             params: {
//                 ...params,
//                 apiKey: this.apiKey
//             }
//         });
//     }
//
//     public getSources(params: Omit<SourcesParams, AuthenticateFields> = {}): AxiosPromise<SourceResponse> {
//         return this.callGet<SourceResponse>({ url: "sources" }, {
//             params: {
//                 ...params,
//                 apiKey: this.apiKey
//             }
//         });
//     }
//
//     protected getAuthorization(): string {
//         return "";
//     }
// }
//
// export default new NewsApiRepository({
//     baseUrl: process.env.REACT_APP_API_NEWSAPI_HOST as string
// });
