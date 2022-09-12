class apiFeatures{
    constructor(query , querystr){

        this.query = query , 
        this.querystr = querystr
    }
    search(){
  
        const keyword = this.querystr.keyword
        ?{
            
            name:{
                $regex:this.querystr.keyword,
                $options:'i'
            }
        }
        :
        {};
       
        this.query = this.query.find({...keyword})
        return this
    }
    filter(){

        var querycopy = {...this.querystr}
        const boundStr = ['limit' , 'page' , 'keyword']
        boundStr.forEach(key=>delete querycopy[key])
        
        var querystr = JSON.stringify(querycopy)
       querystr = querystr.replace(/\b(gt|lt|gte|lte)\b/g , (key)=>`$${key}`)
        this.query = this.query.find(JSON.parse(querystr))
        return this 
    }
    pagination(numberOfPerPage)
    {
        const currenPage = this.querystr.page || 1 
        const skip = numberOfPerPage * (currenPage-1)
        this.query = this.query.limit(numberOfPerPage).skip(skip)

        return this
    }
}

module.exports = apiFeatures 