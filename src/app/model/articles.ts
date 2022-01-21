import {Contributors} from "./contributors";

export interface Articles {
  title: string;
  articleAbstract: string;
  toc: string;
  price: number;
  contributors: Contributors[];
}
export interface Payment {
  nameOfArticle: string;
}
