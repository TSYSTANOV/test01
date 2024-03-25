class CompareList {
  ROOT_element;
  CompareElems = [];
  constructor(root) {
    this.ROOT_element = root;
  }
  set addToCompare(element) {
    this.CompareElems.push(element);
  }
  get CompareListLength() {
    return this.CompareElems;
  }
  renderCompareList() {
    let nonVisibleDiv = document.createElement("div");
    nonVisibleDiv.className = "nonVisibleDiv";

    let div = document.createElement("div");
    div.className = "modal-cart";
    let span = document.createElement("span");
    span.className = "modal-cart-close";
    span.textContent = "X";
    span.addEventListener("click", () => {
      this.closeCompareList();
    });
    div.append(span);

    let table = document.createElement("table");
    table.className = "tableCompare";
    const elems = this.CompareElems.map((item) => {
      let p1 = document.createElement("p");
      p1.className = "border-table";
      p1.innerHTML = `Rate: ${item.rating.rate}`;

      let p2 = document.createElement("p");
      p2.className = "border-table";
      p2.innerHTML = `Price: ${item.price} USD`;

      let td = document.createElement("td");
      td.className = "table-td-compare";
      td.innerHTML = `
    <img class='compare-table' src='${item.image}'/>
    <p class='border-table'>Title: ${item.title}</p>
    `;
      td.append(p1);
      td.append(p2);
      table.append(td);
      div.append(table);
      nonVisibleDiv.append(div);
      document.getElementById(this.ROOT_element).append(nonVisibleDiv);
    });

    div.append(table);
    nonVisibleDiv.append(div);
    document.getElementById(this.ROOT_element).append(nonVisibleDiv);
  }
  closeCompareList() {
    document.getElementById(this.ROOT_element).innerHTML = "";
    this.CompareElems = [];
  }
}

const COMPARE_component = new CompareList("compare-list");
export { COMPARE_component };
