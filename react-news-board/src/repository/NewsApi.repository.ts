import {
  Article,
  Categories,
  Countries,
  Languages,
  ResponseStatus,
  Source
} from "../model/NewsApi.model";
import { Reducer, useEffect, useMemo, useReducer } from "react";
import axios from "axios";

import { SignInTrayForm } from "../component/SignInTray";
import { UserToken } from "../model/Authorization.model";

const newsApiAxios = axios.create({
  baseURL: process.env.REACT_APP_API_NEWSAPI_HOST as string
});

newsApiAxios.interceptors.request.use(config => {
  config.params.apiKey = process.env.REACT_APP_API_NEWSAPI_KEY as string;
  return config;
});

newsApiAxios.interceptors.response.use(
  config => config,
  error => {
    if (error.response && error.response.status === 400) {
      console.log(error.response.data, error);
    }
    return error;
  }
);

const CancelToken = axios.CancelToken;

export interface ArticleResponse {
  status: ResponseStatus.OK;
  totalResults: number;
  articles: Article[];
}

export interface AuthResponse {
  token: UserToken;
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
  language?: Languages;
}

export interface SourcesParams {
  category?: Categories;
  language?: Languages;
  country?: Countries;
}

export enum RepositoryActionType {
  PENDING = "pending",
  SUCCESS = "success",
  FAILED = "failed"
}

export interface RepositoryAction<T> {
  type: RepositoryActionType;
  payload?: T;
}

type NewsApiAction =
  | RepositoryAction<Partial<ArticlesState>>
  | RepositoryAction<Partial<AuthState>>
  | any;
type ArticlesReducer = Reducer<ArticlesState, NewsApiAction>;
type SourcesReducer = Reducer<SourcesState, NewsApiAction>;
type LatestNewsReducer = Reducer<ArticlesState, NewsApiAction>;
type AuthReducer = Reducer<SourcesState, NewsApiAction>;

const reducerArticles: ArticlesReducer = (
  state: ArticlesState,
  action: NewsApiAction
) => {
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

const reducerSources: ArticlesReducer = (
  state: ArticlesState,
  action: NewsApiAction
) => {
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

const reducerAuth: ArticlesReducer = (
  state: AuthState,
  action: NewsApiAction
) => {
  switch (action.type) {
    case RepositoryActionType.SUCCESS:
      return {
        token: {},
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

export interface AuthState extends RepositoryState<ArticleResponse> {
  token?: UserToken;
}

export const useGetTopHeadlines = (params: ArticleParams): ArticlesState => {
  const source = useMemo(() => CancelToken.source(), []);
  const [state, dispatch] = useReducer<ArticlesReducer>(reducerArticles, {
    isPending: true
  });

  useEffect(() => {
    if (!state.isPending) {
      dispatch({ type: RepositoryActionType.PENDING });
    }
    newsApiAxios
      .get<ArticleResponse>(`/top-headlines`, {
        params,
        cancelToken: source.token
      })
      .then(response => {
        const { articles, totalResults } = response.data;
        dispatch({
          type: RepositoryActionType.SUCCESS,
          payload: { articles, totalResults }
        });
      })
      .catch(error => {
        dispatch({ type: RepositoryActionType.FAILED, payload: error });
      });
    return () => {
      source.cancel("cancel request");
    };
  }, [
    params.pageSize,
    params.category,
    params.page,
    params.q,
    params.country,
    params.sources
  ]);

  return state;
};

export const useGetEverything = (params: EverythingParams) => {
  const [state, dispatch] = useReducer<ArticlesReducer>(reducerArticles, {
    isPending: true
  });

  useEffect(() => {
    dispatch({ type: RepositoryActionType.PENDING });
    const source = CancelToken.source();
    newsApiAxios
      .get<ArticleResponse>(`/everything`, {
        params,
        cancelToken: source.token
      })
      .then(response => {
        const { articles, totalResults } = response.data;
        dispatch({
          type: RepositoryActionType.SUCCESS,
          payload: { articles, totalResults }
        });
      })
      .catch(error => {
        dispatch({ type: RepositoryActionType.FAILED, payload: error });
      });
    return () => {
      source.cancel("cancel request");
    };
  }, [params]);

  return state;
};

export const useGetSources = (params: SourcesParams) => {
  const [state, dispatch] = useReducer<SourcesReducer>(reducerSources, {
    isPending: true
  });

  useEffect(() => {
    dispatch({ type: RepositoryActionType.PENDING });
    const source = CancelToken.source();
    newsApiAxios
      .get<SourceResponse>(`/sources`, { params, cancelToken: source.token })
      .then(response => {
        const { sources } = response.data;
        dispatch({ type: RepositoryActionType.SUCCESS, payload: { sources } });
      })
      .catch(error => {
        dispatch({ type: RepositoryActionType.FAILED, payload: error });
      });
    return () => {
      source.cancel("cancel request");
    };
  }, [params]);

  return state;
};

export function useSignIn(
  defaultParams?: SignInTrayForm
): [AuthState, (params: SignInTrayForm) => void] {
  const [state, dispatch] = useReducer<AuthReducer>(reducerAuth, {
    isPending: true
  });
  return [
    state,
    (params: SignInTrayForm) => {
      dispatch({ type: RepositoryActionType.SUCCESS, payload: {} });
      // newsApiAxios.post<AuthResponse>(``, params)
      //     .then(response => {
      //         const { token } = response.data;
      //         dispatch({ type: RepositoryActionType.SUCCESS, payload: token });
      //     })
      //     .catch(error => {
      //         dispatch({ type: RepositoryActionType.FAILED, payload: error });
      //     })
    }
  ];
}
