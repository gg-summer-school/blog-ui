import {Contributors} from "./contributors";
import {Categories} from "./categories";

export interface Articles {
  id: string;
  title: string;
  articleAbstract: string;
  toc: string;
  coverPage: string;
  document: string;
  price: number;
  category:Categories;
  contributors: Contributors[];
}
