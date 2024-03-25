
class API{
    BASE_URL
    constructor(url){
        this.BASE_URL = url
    }
    getData(params, category=''){
        return fetch(`${this.BASE_URL}/${params}/${category}`).then(response=>response.json())
    }
    getAllData(){
        return fetch(`${this.BASE_URL}`).then(response=>response.json())
    }
}

const API_REQUEST = new API('https://fakestoreapi.com/products')
export {API_REQUEST}