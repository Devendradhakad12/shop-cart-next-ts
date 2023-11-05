interface QueryStr {
  keyword: string | null;
  page: string | null;
  price: { gte: string | null; lte: string | null };
  category: string | null;
}
 
export default class ApiFeatures {
  query;
  queryStr;
  constructor(query: any, queryStr: any) {
    (this.query = query), (this.queryStr = queryStr);
  }

  //* Search products
  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};
    this.query = this.query.find({ ...keyword });
    return this;
  }

  //* filter product with price and category
  filter() {
    const queryCopy = { ...this.queryStr };
    //console.log(queryCopy.category)
    const removeFileds =queryCopy.category === null ?  ["keyword", "page","category"] : ["keyword", "page"] ;
 
    //  delete queryCopy["keyword"]
    removeFileds.forEach((key) => delete queryCopy[key]);
    let queryStr = JSON.stringify(queryCopy);
    //   console.log(querySty)
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);
    //   console.log(JSON.parse(querySty))
    queryStr = JSON.parse(queryStr);
  //  console.log(queryStr)
    this.query = this.query.find(queryStr);
    return this;
  }

  //* pagination
  pagination(resultPerPage:number){
       const currentPage = Number(this.queryStr.page) || 1;
       const skip = resultPerPage * (currentPage - 1)
       this.query = this.query.limit(resultPerPage).skip(skip)
       return this
  }
}
