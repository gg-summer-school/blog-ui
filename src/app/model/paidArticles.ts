export interface PaidArticles {
  title: string,
  articleAbstract: string,
  categoryId: string,
  categoryName: string,
  contentType: string,
  contributors: Contributors[],
  coverPage: string,
  createdAt: string,
  id: string,
  price: number,
  toc: string
  updatedAt: string,
  userId: string
}

export interface Contributors {
  id: string,
  name: string
}
