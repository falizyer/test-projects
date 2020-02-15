import axios, { AxiosPromise, AxiosRequestConfig } from 'axios';

export interface RequestParams {
    url: string;
}

export interface RequestDataParams<D = {}> extends RequestParams {
    data?: D;
}

export interface AbstractRepositoryConfig {
    baseUrl: string;
}

export default abstract class AbstractRepository {

    constructor(private config: AbstractRepositoryConfig) {
    }

    protected callGet<R>(params: RequestParams, config: AxiosRequestConfig = {}): AxiosPromise<R> {
        this.setRequestConfig(config);
        return axios.get<R>(`${this.config.baseUrl}/${params.url}`, config);
    }

    protected callPost<R, D>(params: RequestDataParams, config: AxiosRequestConfig = {}): AxiosPromise<R> {
        this.setRequestConfig(config);
        return axios.post<R>(`${this.config.baseUrl}/${params.url}`, params.data, config);
    }

    protected callPut<R, D>(params: RequestDataParams<D>, config: AxiosRequestConfig = {}): AxiosPromise<R> {
        this.setRequestConfig(config);
        return axios.put<R>(`${this.config.baseUrl}/${params.url}`, params.data, config);
    }

    protected callDelete<R, D>(params: RequestParams, config: AxiosRequestConfig = {}): AxiosPromise<R> {
        this.setRequestConfig(config);
        return axios.delete<R>(`${this.config.baseUrl}/${params.url}`, config);
    }

    protected setRequestConfig(config: AxiosRequestConfig): void {
        const authorization: string = this.getAuthorization();
        if (!config.headers) {
            config.headers = {};
        }
        if (authorization) {
            config.headers.authorization = authorization;
        }
    }

    protected abstract getAuthorization(): string;
}
