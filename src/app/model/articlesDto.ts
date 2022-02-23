import { Contributors } from "./contributors";

export interface ArticleDto {
    articleAbstract: string;
    categoryId: string;
    categoryName:string;
    contributors: Contributors[];
    coverPage: string;
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
    nameOfArticle:string
    accountNumber:string,
   
}

export interface CardItems{
    id:string
}

export interface PayListArticleDto {
    articles: CardItems[],
    accountNumber:string,
    userId:string
}