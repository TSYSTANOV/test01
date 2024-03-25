import { API_REQUEST } from "./api.js";
import { LocalStor } from "./localStorage.js";
import { CART_component } from "./cart.js";

class Products{
    ROOT_element
    activeText
    passiveText
    constructor(root, activeText, passiveText){
        this.ROOT_element = root
        this.activeText = activeText
        this.passiveText = passiveText
    }
    async renderProducts(param){
                document.getElementById(this.ROOT_element).innerHTML = ''
                const dataProducts = param === 'All' ?  await API_REQUEST.getAllData() : await API_REQUEST.getData('category', param)
                const getProductOfStorage = LocalStor.getItems('cart') ? LocalStor.getItems('cart') : []

                let container = document.createElement("div");
                container.className = "products";
            
                const products = dataProducts.map((el)=>{
                    let div = document.createElement("div");
                  div.className = "item";
                  div.dataset.itemGoodsId = el.id;
              
                  div.innerHTML = `
                  <img class='product-image' src='${el.image}'/>
                  <h2 class='product-title'>${el.title}</h2>
                  <p class='product-price'>${el.price} USD</p>
                  `
                  const addToCart = document.createElement('span')
                  addToCart.className = 'Add-toCart'
                  addToCart.textContent = getProductOfStorage.find((elem)=> elem.id === el.id) ? this.passiveText : this.activeText
                  addToCart.addEventListener('click',()=>{
                        let  i = null
                        const element = getProductOfStorage.some((elem, index)=>
                        {
                            i = index
                            return elem.id === el.id
                        })
                        if(element){
                            addToCart.textContent = this.activeText
                            getProductOfStorage.splice(i , 1)
                        }else{
                            addToCart.textContent = this.passiveText
                            el.count = 1
                            getProductOfStorage.push(el)
                        }
                        LocalStor.setItems('cart', getProductOfStorage)
                        CART_component.showCount(getProductOfStorage.length)
                  })
                  div.append(addToCart)
                  return div
                })
                container.append(...products)                    
                document.getElementById(this.ROOT_element).append(container)
    }
}

const PRODUCTS_component = new Products('products', 'Add-toCart', 'RemoveFromCart')

export {PRODUCTS_component}