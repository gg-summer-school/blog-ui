import {Contributors} from "./contributors";
import {Categories} from "./categories";

export interface Articles {
  title: string;
  articleAbstract: string;
  toc: string;
  price: number;
  contributors: Contributors[];
}
