import { API_REQUEST } from "./api.js";
import { LocalStor } from "./localStorage.js";


class Cart{
    ROOT_element
    constructor(root){
        this.ROOT_element = root
    }
    showCount(count){
        document.querySelector(`[data-cat-name="cart"]`).dataset.productsLength = count
    }
    async renderCart(){
        const IDstore = LocalStor.getItems('cart')

        let nonVisibleDiv = document.createElement("div");
        nonVisibleDiv.className = "nonVisibleDiv";
       console.log(IDstore)

        let div = document.createElement("div");
        div.className = "modal-cart";
        let span = document.createElement("span");
        span.className = "modal-cart-close";
        span.textContent = "X";
        span.addEventListener("click", () => {
          this.removeCart()
        });
        div.append(span);
      
        let table = document.createElement("table");
        table.className = "table";
        div.append(table);
      
        for (let i = 0; i < IDstore.length; i++) {
          let product = IDstore[i];
            
          let spanPlus = document.createElement("span");
          spanPlus.className = "numbers";
          spanPlus.textContent = "+";
          spanPlus.addEventListener('click',()=>{
            // IDstore[i].count++
            // p1.textContent = IDstore[i].count
            // LocalStor.setItems('cart',IDstore)
            // this.sumTotal(IDstore)
            // tdsum.innerHTML = `
            // Summary:<p>${
            //     IDstore[i].count * IDstore[i].price
            // }USD</p>`
          })
          
      
          let spanMinus = document.createElement("span");
          spanMinus.className = "numbers";
          spanMinus.textContent = "-";
          spanMinus.addEventListener('click',()=>{
            // console.log(IDstore[i])
            // IDstore[i].count--
            // if(IDstore[i].count < 1){
            //     IDstore.splice(IDstore.indexOf(product),1)
            //     // IDstore.splice
            //     div2.remove()
            //     // IDstore.splice(i,1)
            //     LocalStor.setItems('cart', IDstore)
            //     console.log(IDstore)
            //     return
            // }
            // LocalStor.setItems('cart', IDstore)

            // p1.textContent = IDstore[i].count
            // tdsum.innerHTML = `
            // Summary:<p>${
            //     IDstore[i].count * IDstore[i].price
            // }USD</p>`
            // console.log(IDstore)



            // this.sumTotal(IDstore)
          })
      
          let div2 = document.createElement("tr");
          div2.className = "modal-cart-item";
          div2.dataset.tdTableId = product.id;
          div2.innerHTML = `
          <td><img class='modal-cart-item-image' src='${product.image}'/></td>
          <td class='modal-cart-item-title'>${product.title}</td>
          <td class='modal-cart-item-price'>${product.price} USD</td>
          <td class='modal-cart-btns'></td>
        
          `;
          const tdsum = document.createElement('td')
          tdsum.dataset.summaryPriceId = product.id
          tdsum.innerHTML = `
          Summary:<p>${
            product.count * product.price
          }USD</p>`


          div2.querySelector(".modal-cart-btns").prepend(spanMinus);
          div2.querySelector(".modal-cart-btns").append(spanPlus);
          const p1 = document.createElement('p')
         p1.dataset.countIncart = product.id
            p1.className = 'modal-cart-item-count'
        p1.textContent = product.count
        div2.querySelector('.modal-cart-btns').prepend(p1)
          div2.append(tdsum)
          div2.querySelector('.modal-cart-btns').append()


          table.append(div2);


        }
        
        let p = document.createElement("p");
        p.className = "total-price";
      
        div.append(p);
        nonVisibleDiv.append(div);
        document.getElementById(this.ROOT_element).append(nonVisibleDiv)
        this.sumTotal(IDstore)
    }
    removeCart(){
        document.getElementById(this.ROOT_element).innerHTML = ''
    }
    sumTotal(array){
        const sum = array.reduce((acc,el)=>{
            acc += el.price * el.count
            return acc
        },0)
        document.querySelector('.total-price').textContent = sum
    }
 
}

const CART_component = new Cart('cart')

export {CART_component}