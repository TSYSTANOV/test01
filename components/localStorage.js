

class LocalStorage{

    getCategory(name){
        return JSON.parse(localStorage.getItem(name))
    }
    getItems(name){
        return localStorage.getItem(name) ? JSON.parse(localStorage.getItem(name)) : []
    }
    setItems(name, data){
        localStorage.setItem(name, JSON.stringify(data))
    }
}

const LocalStor = new LocalStorage()

export {LocalStor}