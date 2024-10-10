//sideReceipt buttons function
showDate();
function toggleActive(button) {
  const buttons = document.querySelectorAll(".ordBtn");
  buttons.forEach((btn) => btn.classList.remove("activeBtn"));
  button.classList.add("activeBtn");
}
//main page date function
function showDate() {
  let today = new Date();
  let options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  let dateStr = today.toLocaleDateString("en-US", options);
  document.getElementById("dateDisplay").innerText = dateStr;
}
/////////////////////////
function renderProduct() {
  tabsDiv.innerHTML = "";
  for (const cat in data) {
    tabsDiv.innerHTML += `<li onclick="openProducts('${cat}')" class="${
      cat == openCat ? "activeNav" : ""
    }" >${cat}</li>`;
  }
}
function openProducts(cat, array = 0) {
  let products = [];
  if (!cat) {
    products = array;
  } else {
    openCat = cat;
    renderProduct();
    products = data[cat];
  }
  oneProducts.innerHTML = "";
  products.forEach((el, index) => {
    oneProducts.innerHTML += `
    <div class="productCard col-10 col-md-4 col-lg-3 m-3" onclick="addProductToSideReceipt('${cat}',${index})">
                  <img class="productImg" src="${el.productImg}" />
                  <div class="dishTitle">${el.dishTitle}</div>
                  <div class="price">${el.price}$</div>
                  <div class="available">${el.available}</div>
                </div>
    `;
  });
}
function addProductToSideReceipt(cat, productIndex) {
  let product = data[cat][productIndex];
  let index = sideReceipt.findIndex((pro) => {
    return pro.dishTitle == product.dishTitle;
  });
  if (index == -1) {
    product.qty = 1;
    sideReceipt.push(product);
  } else {
    sideReceipt[index].qty++;
  }
  renderSideReceipt();
  saveSideReceiptToLS();
}
function renderSideReceipt() {
  orderList.innerHTML = "";
  let CheckTotal = 0;
  sideReceipt.forEach((el, index) => {
    let rowTotal = el.price * el.qty;
    CheckTotal += rowTotal;
    orderList.innerHTML += `
      <div class="orderExample">
                  <div>
                    <div class="topOrd">
                      <div class="orderDetailsImg">
                        <img class="smallOrdImg" src="${el.productImg}" />
                        <div class="Orderdetails">
                          <div class="title">${el.dishTitle}</div>
                          <div class="price">${el.price}$</div>
                        </div>
                      </div>
                      <div class="pricingDetails">
                        <div onclick="decreasingQty(${index})" class="pointer">-</div>
                        <div class="orderQty">${el.qty}</div>
                        <div onclick="increasingQty(${index})" class="pointer">+</div>
                        <div class="orderPrice">${el.price * el.qty}$</div>
                      </div>
                    </div>
                  </div>
                  <div class="bottomOrd">
                    <input class="note" type="text" placeholder="Order Note..." />
                    <button onclick="deleteFromOrderList(${index})" class="delete"><i class="exit fa-solid fa-trash"></i></button>
                  </div>
                </div>
      `;
  });
  CheckTotalDiv.innerHTML = CheckTotal;
}
function deleteFromOrderList(productIndex) {
  sideReceipt.splice(productIndex, 1);
  renderSideReceipt();
}
function increasingQty(productIndex) {
  sideReceipt[productIndex].qty++;
  renderSideReceipt();
}
function decreasingQty(productIndex) {
  if (sideReceipt[productIndex].qty > 1) {
    sideReceipt[productIndex].qty--;
    renderSideReceipt();
  } else {
    deleteFromOrderList();
  }
}
function turnObjectToArray(object) {
  let arr = [];
  for (const key in object) {
    object[key].forEach((el) => {
      arr.push(el);
    });
  }
  return arr;
}
function filterData(event) {
  let searchTerm = event.target.value.toLowerCase();
  let final = dataArray.filter((el) => {
    return (
      el.dishTitle.toLowerCase().includes(searchTerm) ||
      el.price.toString().includes(searchTerm)
    );
  });
  if (final.length === dataArray.length) {
    openProducts(openCat);
  } else {
    openProducts(undefined, final);
  }
}
function saveSideReceiptToLS() {
  localStorage.setItem("sideReceipt", JSON.stringify(sideReceipt));
}
function loadSideReceiptFromLS() {
  sideReceipt = JSON.parse(localStorage.getItem("sideReceipt")) || [];
  renderSideReceipt();
}
function continueToPayment() {
  sideReceipt = [];
  localStorage.removeItem("sideReceipt");
  renderSideReceipt();
}
//modalCart
function openModal() {
  modalIndex = true;
  Modal.style.display = "flex";
}
function closeModal() {
  modalIndex = false;
  Modal.style.display = "none";
}
function openContent() {
  contentIndex = true;
  inside.style.display = "flex";
}
function closeContent() {
  contentIndex = false;
  inside.style.display = "none";
}
