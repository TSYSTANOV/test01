import { API_REQUEST } from "./api.js";
import { LocalStor } from "./localStorage.js";

class Cart {
  ROOT_element;
  constructor(root) {
    this.ROOT_element = root;
  }
  showCount(count) {
    document.querySelector(`[data-cat-name="cart"]`).dataset.productsLength =
      count;
  }
  async renderCart() {
    const storeGoods = LocalStor.getItems("cart");

    let nonVisibleDiv = document.createElement("div");
    nonVisibleDiv.className = "nonVisibleDiv";

    let div = document.createElement("div");
    div.className = "modal-cart";
    let span = document.createElement("span");
    span.className = "modal-cart-close";
    span.textContent = "X";
    span.addEventListener("click", () => {
      this.removeCart();
    });
    div.append(span);

    let table = document.createElement("table");
    table.className = "table";
    div.append(table);
    const elements = storeGoods.map((el, index) => {
      let spanPlus = document.createElement("span");
      spanPlus.className = "numbers";
      spanPlus.textContent = "+";
      spanPlus.addEventListener("click", () => {
        this.addCount(el.id, p1);
      });
      let spanMinus = document.createElement("span");
      spanMinus.className = "numbers";
      spanMinus.textContent = "-";
      spanMinus.addEventListener("click", () => {
        this.removeCount(el.id, p1);
      });

      let trString = document.createElement("tr");
      trString.className = "modal-cart-item";
      trString.dataset.tdTableId = el.id;
      trString.innerHTML = `
          <td><img class='modal-cart-item-image' src='${el.image}'/></td>
          <td class='modal-cart-item-title'>${el.title}</td>
          <td class='modal-cart-item-price'>${el.price} USD</td>
          <td class='modal-cart-btns'></td>
        
          `;
      const tdsum = document.createElement("td");
      tdsum.dataset.summaryPriceId = el.id;
      tdsum.innerHTML = `
          Summary:<p>${el.count * el.price}USD</p>`;

      trString.querySelector(".modal-cart-btns").prepend(spanMinus);
      trString.querySelector(".modal-cart-btns").append(spanPlus);
      const p1 = document.createElement("p");
      p1.dataset.countIncart = el.id;
      p1.className = "modal-cart-item-count";
      p1.textContent = el.count;
      trString.querySelector(".modal-cart-btns").prepend(p1);
      trString.append(tdsum);
      trString.querySelector(".modal-cart-btns").append();
      return trString;
    });
    table.append(...elements);
    let p = document.createElement("p");
    p.className = "total-price";
    div.append(p);
    nonVisibleDiv.append(div);
    document.getElementById(this.ROOT_element).append(nonVisibleDiv);
    this.sumTotal(storeGoods);
  }
  addCount(id, textElem) {
    const storeGoods = LocalStor.getItems("cart");
    storeGoods.forEach((el) => {
      if (el.id === id) {
        el.count++;
        document.querySelector(
          `[data-summary-price-id="${id}"]`
        ).innerHTML = `Summary:<p>${el.count * el.price}USD</p>`;
        textElem.textContent = el.count;
      }
    });
    this.sumTotal(storeGoods);
    LocalStor.setItems("cart", storeGoods);
  }
  removeCount(id, textElem) {
    let i = null;
    let identificator = null;

    const storeGoods = LocalStor.getItems("cart");
    storeGoods.forEach((el, index) => {
      if (el.id === id) {
        el.count--;
        document.querySelector(
          `[data-summary-price-id="${id}"]`
        ).innerHTML = `Summary:<p>${el.count * el.price}USD</p>`;
        textElem.textContent = el.count;
        if (el.count === 0) {
          i = index;
          identificator = el.id;
        }
      }
    });
    if (i !== null) {
      storeGoods.splice(i, 1);
      this.showCount(storeGoods.length);
      document.querySelector(`[data-td-table-id='${identificator}']`).remove();
      if (document.querySelector(`[data-item-goods-id="${identificator}"]`)) {
        const element = document.querySelector(
          `[data-item-goods-id="${identificator}"]`
        );
        element.querySelector(".Add-toCart").textContent = "Add-toCart";
      }
    }
    this.sumTotal(storeGoods);
    LocalStor.setItems("cart", storeGoods);
  }

  removeCart() {
    document.getElementById(this.ROOT_element).innerHTML = "";
  }
  sumTotal(array) {
    const sum = array.reduce((acc, el) => {
      acc += el.price * el.count;
      return acc;
    }, 0);
    document.querySelector(".total-price").textContent = sum;
  }
}

const CART_component = new Cart("cart");

export { CART_component };
