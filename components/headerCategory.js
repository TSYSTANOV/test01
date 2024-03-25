import { API_REQUEST } from "./api.js";
import { PRODUCTS_component } from "./products.js";
import { LocalStor } from "./localStorage.js";
import { CART_component } from "./cart.js";

class HeaderCategory{
    activeCategory
    activeClass
    ROOT_element
    constructor(root, activeCategory, activeClass){
        this.ROOT_element = root
        this.activeCategory = activeCategory
        this.activeClass = activeClass
    }
    addActiveCategory(){
        document.querySelector(`[data-cat-name="${this.activeCategory}"]`).classList.add(this.activeClass)
    }
    removeActiveCategory(){
        document.querySelector(`[data-cat-name="${this.activeCategory}"]`).classList.remove(this.activeClass)
    }
    async renderCategory(){
        const Categories = await API_REQUEST.getData('categories')
        const activeCat = LocalStor.getCategory('activeCategory')
        this.activeCategory = activeCat ? activeCat : this.activeCategory
        
        
        let div = document.createElement("div");
        div.className = "categories";
        let btn = document.createElement("button");
        btn.textContent = "All";
        btn.className = "category-btn";
        btn.dataset.catName = "All";
        btn.addEventListener('click',()=>{
            this.removeActiveCategory()
            this.activeCategory = 'All'
            this.addActiveCategory()
            LocalStor.setItems('activeCategory', this.activeCategory)
            PRODUCTS_component.renderProducts(this.activeCategory)
        })

        div.append(btn);
        
        let btnCart = document.createElement("button");
        btnCart.textContent = "🛒 CART";
        btnCart.className = "category-btn Btncart";
        btnCart.dataset.catName = "cart";
        btnCart.dataset.productsLength = LocalStor.getItems('cart') ? LocalStor.getItems('cart').length : 0
        btnCart.addEventListener('click',()=>{
            CART_component.renderCart()
        })


        let btnToCompare = document.createElement("button");
        btnToCompare.textContent = "COMPARE";
        btnToCompare.className = "category-btn btnToCompare";
        btnToCompare.dataset.catName = "compare";

        for (let i = 0; i < Categories.length; i++) {
        let category = Categories[i];
        let button = document.createElement("button");
        button.className = "category-btn";
        button.textContent = `${category}`;
        button.dataset.catName = `${category}`;
        button.addEventListener('click',()=>{
            this.removeActiveCategory()
            this.activeCategory = category
            this.addActiveCategory()
            LocalStor.setItems('activeCategory', this.activeCategory)
            PRODUCTS_component.renderProducts(this.activeCategory)
        })

        div.append(button);
        }

        div.append(btnCart);
        div.append(btnToCompare);
        document.getElementById(this.ROOT_element).append(div);
        this.addActiveCategory()
        PRODUCTS_component.renderProducts(this.activeCategory)
        LocalStor.setItems('activeCategory', this.activeCategory)
    }
}
const HEADER_component = new HeaderCategory('header','All', 'activebBtn')
export {HEADER_component}
