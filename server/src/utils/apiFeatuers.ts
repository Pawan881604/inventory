class ApiFeatures {
    private query: any;
    private queryStr: any;
  
    constructor(query: any, queryStr: any) {
      this.query = query;
      this.queryStr = queryStr;
    }
  
    search() {
      const keyword = this.queryStr.keyword
        ? {
            $or: [
              { phone_number: { $regex: this.queryStr.keyword, $options: "i" } },
              { status: { $regex: this.queryStr.keyword, $options: "i" } },
              { email: { $regex: this.queryStr.keyword, $options: "i" } },
              { branch: { $regex: this.queryStr.keyword, $options: "i" } },
            ],
          }
        : {};
      this.query = this.query.find({ ...keyword });
      return this;
    }
  
    filter() {
      const queryCopy = { ...this.queryStr };
  
      // Removing some fields for category
      const removeField = ["keyword", "page", "limit"];
      removeField.forEach((key) => delete queryCopy[key]);
  
      if (queryCopy["user.role"]) {
        this.query = this.query.find({ role: queryCopy["user.role"] });
        delete queryCopy["user.role"];
      }
  
      let queryStr = JSON.stringify(queryCopy);
      queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);
      this.query = this.query.find(JSON.parse(queryStr));
      return this;
    }
  
    sort() {
      if (this.queryStr.sort) {
        const sortBy = this.queryStr.sort.split(",").join(" ");
        this.query = this.query.sort(sortBy);
      } else {
        this.query = this.query.sort({ creditAt: 1 });
      }
      return this;
    }
  
    pagination(resultPerPage: number) {
      const currentPage = Number(this.queryStr.page) || 1;
      const skip = resultPerPage * (currentPage - 1);
      this.query = this.query.limit(resultPerPage).skip(skip).sort({ _id: -1 });
      return this;
    }
  
    // New method to execute the query
    async exec() {
      return await this.query;
    }
  }
  
  export default ApiFeatures;
  