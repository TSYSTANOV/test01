import { API_REQUEST } from "./api.js";
import { LocalStor } from "./localStorage.js";
import { CART_component } from "./cart.js";
import { COMPARE_component } from "./compareList.js";

class Products {
  ROOT_element;
  activeText;
  passiveText;
  constructor(root, activeText, passiveText) {
    this.ROOT_element = root;
    this.activeText = activeText;
    this.passiveText = passiveText;
  }
  async renderProducts(param) {
    const getProductOfStor = LocalStor.getItems("cart")
      ? LocalStor.getItems("cart")
      : [];
    document.getElementById(this.ROOT_element).innerHTML = "";
    const dataProducts =
      param === "All"
        ? await API_REQUEST.getAllData()
        : await API_REQUEST.getData("category", param);

    let container = document.createElement("div");
    container.className = "products";

    const products = dataProducts.map((el) => {
      let div = document.createElement("div");
      div.className = "item";
      div.dataset.itemGoodsId = el.id;

      div.innerHTML = `
                  <img class='product-image' src='${el.image}'/>
                  <h2 class='product-title'>${el.title}</h2>
                  <p class='product-price'>${el.price} USD</p>
                  `;
      const addToCart = document.createElement("span");
      addToCart.className = "Add-toCart";
      addToCart.textContent = getProductOfStor.find((elem) => elem.id === el.id)
        ? this.passiveText
        : this.activeText;
      addToCart.addEventListener("click", () => {
        const getProductOfStorage = LocalStor.getItems("cart")
          ? LocalStor.getItems("cart")
          : [];
        let i = null;
        const element = getProductOfStorage.some((elem, index) => {
          i = index;
          return elem.id === el.id;
        });
        if (element) {
          addToCart.textContent = this.activeText;
          getProductOfStorage.splice(i, 1);
        } else {
          addToCart.textContent = this.passiveText;
          el.count = 1;
          console.log(el);
          getProductOfStorage.push(el);
        }
        LocalStor.setItems("cart", getProductOfStorage);
        CART_component.showCount(getProductOfStorage.length);
      });
      const btnCompare = document.createElement("button");
      btnCompare.className = "compare-button";
      btnCompare.textContent = COMPARE_component.CompareListLength.some(
        (elem) => {
          return elem.id === el.id;
        }
      )
        ? "Added in CompareList"
        : "Add to Compare";

      btnCompare.addEventListener("click", () => {
        btnCompare.textContent = "Added in CompareList";
        COMPARE_component.addToCompare = el;
        if (COMPARE_component.CompareListLength.length === 2) {
          COMPARE_component.renderCompareList();
          products.forEach((item) => {
            if (
              +item.dataset.itemGoodsId ===
                COMPARE_component.CompareListLength[0].id ||
              +item.dataset.itemGoodsId ===
                COMPARE_component.CompareListLength[1].id
            ) {
              item.querySelector(".compare-button").textContent =
                "Add to Compare";
            }
          });
        }
      });
      div.append(addToCart, btnCompare);

      return div;
    });

    container.append(...products);
    document.getElementById(this.ROOT_element).append(container);
  }
  checkGoodsInCart() {}
}

const PRODUCTS_component = new Products(
  "products",
  "Add-toCart",
  "RemoveFromCart"
);

export { PRODUCTS_component };
