import { Contributors } from "./contributors";

export interface ArticleDto {
    articleAbstract: string;
    categoryId: string;
    categoryName:string;
    contributors: Contributors[];
    coverPage: Blob;
    image:string;
    createdAt: string
    document:string
    id: string
    price: number
    title: string
    toc: string
    updatedAt: string
    userId: string
}

export interface PayArticleDto {
    nameOfArticle: string,
    accountNumber:string,
}