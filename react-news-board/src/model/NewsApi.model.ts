export enum ResponseStatus {
  OK = "ok"
}

export interface Article {
  source: {
    id: null;
    name: string;
  };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

export interface Source {
  id: string;
  name: string;
  description: string;
  url: string;
  category: string;
  language: string;
  country: string;
}

export enum Categories {
  entertainment = "entertainment",
  general = "general",
  health = "health",
  science = "science",
  sports = "sports",
  technology = "technology"
}

export enum Languages {
  ar = "ar",
  de = "de",
  en = "en",
  es = "es",
  fr = "fr",
  he = "he",
  it = "it",
  nl = "nl",
  no = "no",
  pt = "pt",
  ru = "ru",
  se = "se",
  ud = "ud",
  zh = "zh"
}

export enum Countries {
  ar = "ar",
  at = "at",
  au = "au",
  be = "be",
  bg = "bg",
  br = "br",
  ca = "ca",
  ch = "ch",
  cn = "cn",
  co = "co",
  cu = "cu",
  cz = "cz",
  de = "de",
  eg = "eg",
  fr = "fr",
  gb = "gb",
  gr = "gr",
  hk = "hk",
  hu = "hu",
  id = "id",
  ie = "ie",
  il = "il",
  in = "in",
  it = "it",
  jp = "jp",
  kr = "kr",
  lt = "lt",
  lv = "lv",
  ma = "ma",
  mx = "mx",
  my = "my",
  ng = "ng",
  nl = "nl",
  no = "no",
  nz = "nz",
  ph = "ph",
  pl = "pl",
  pt = "pt",
  ro = "ro",
  rs = "rs",
  ru = "ru",
  sa = "sa",
  se = "se",
  sg = "sg",
  si = "si",
  sk = "sk",
  th = "th",
  tr = "tr",
  tw = "tw",
  ua = "ua",
  us = "us",
  ve = "ve",
  za = "za"
}
