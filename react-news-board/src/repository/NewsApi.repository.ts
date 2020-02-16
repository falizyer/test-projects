import AbstractRepository from "./AbstractRepository";
import {
    Article,
    Categories,
    Countries, Languages,
    ResponseStatus,
    Source
} from "../model/NewsApi.model";
import { AxiosPromise } from "axios";

export interface ArticleResponse {
    status: ResponseStatus.OK;
    totalResults: number;
    articles: Article[];
}

export interface SourceResponse {
    status: ResponseStatus.OK;
    sources: Source[];
}

export type AuthenticateFields = "apiKey";

export interface AuthenticationParams {
    apiKey: string;
}

/**
 * @description
 * Do not mix sources with country and category
 */
export interface ArticleParams extends AuthenticationParams {
    country?: Countries;
    category?: Categories;
    q?: string;
    pageSize?: number;
    page?: number;
    sources?: string[];
}

export interface EverythingParams extends AuthenticationParams {
    q?: string;
    qInTitle?: string;
    sources?: string[];
    domains?: string[];
    excludeDomains?: string[];
    from?: string;
    to?: string;
    language?: Languages
}

export interface SourcesParams extends AuthenticationParams {
    category?: Categories;
    language?: Languages;
    country?: Countries;
}

class NewsApiRepository extends AbstractRepository {

    private apiKey: string = process.env.REACT_APP_API_NEWSAPI_KEY as string;

    public getTopHeadlines(params: Omit<ArticleParams, AuthenticateFields> = {}): AxiosPromise<ArticleResponse> {
        return this.callGet<ArticleResponse>({ url: `top-headlines` }, {
            params: {
                ...params,
                apiKey: this.apiKey
            }
        });
    }

    public getEverything(params: Omit<EverythingParams, AuthenticateFields> = {}): AxiosPromise<ArticleResponse> {
        return this.callGet<ArticleResponse>({ url: "everything" }, {
            params: {
                ...params,
                apiKey: this.apiKey
            }
        });
    }

    public getSources(params: Omit<SourcesParams, AuthenticateFields> = {}): AxiosPromise<SourceResponse> {
        return this.callGet<SourceResponse>({ url: "sources" }, {
            params: {
                ...params,
                apiKey: this.apiKey
            }
        });
    }

    protected getAuthorization(): string {
        return "";
    }
}

export default new NewsApiRepository({
    baseUrl: process.env.REACT_APP_API_NEWSAPI_HOST as string
});
