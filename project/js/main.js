"use strict";

// class ProductList {
//     _goods;
//     _allProducts;
//     _prop;
//     _totalPrice;
//     _totalQuantity;

//     constructor(container = ".products") {
//         this.container = container;
//         this._goods = [];
//         this._allProducts = [];

//         this._fetchGoods();
//         this._render();
//         this._cartPriceAndQuantity();
//     }

//     get property() {
//         return this._prop;
//     }

//     set property(value) {
//         this._prop = value;
//     }

//     _fetchGoods() {
//         this._goods = [
//             { id: 1, title: "Notebook", price: 20000 },
//             { id: 2, title: "Mouse", price: 1500 },
//             { id: 3, title: "Keyboard", price: 5000 },
//             { id: 4, title: "Gamepad", price: 4500 },
//         ];
//     }

//     _render() {
//         const block = document.querySelector(this.container);

//         for (const good of this._goods) {
//             const productObject = new ProductItem(good);
//             // console.log(productObject);
//             this._allProducts.push(productObject);
//             block.insertAdjacentHTML("afterbegin", productObject.render());
//         }
//     }

//     _cartPriceAndQuantity() {
//         this._totalPrice = 0;
//         this._totalQuantity = 0;
//         this._totalPrice += this._allProducts.reduce(
//             (totalPrice, CartItem) => totalPrice + CartItem.price,
//             0
//         );
//         this._totalQuantity += this._allProducts.reduce(
//             (totalCost, cartItem) => totalCost + cartItem.quantity,
//             0
//         );
//         // this.render_AllQuantityAndPrice();
//     }

//     _renderAllPriceAndQuantity() {
//         const PriceItemsAndQUantity = document.querySelector(".products");
//         PriceItemsAndQUantity.insertAdjacentHTML(
//             "beforeend",
//             `<div>
//         <h4 class = "desc__head">Total Price = ${this._totalPrice}</h4>
//         <p class = "desc__price">Total Quantity  = ${this._totalQuantity}</p>
//         </div>`
//         );
//     }
// }
// class ProductItem {
//     constructor(product, img = "https://via.placeholder.com/200x150") {
//         this.title = product.title;
//         this.price = product.price;
//         this.id = product.id;
//         this.img = img;
//     }

//     render() {
//         return `<div class="product-item" data-id="${this.id}">
//                       <img src="${this.img}" alt="Some img">
//                       <div class="desc">
//                           <h3>${this.title}</h3>
//                           <p>${this.price} \u20bd</p>
//                           <button class="buy-btn">Купить</button>
//                       </div>
//                   </div>`;
//     }
// }

// const pl = new ProductList();
// const products = [
//     {id: 1, title: 'Notebook', price: 20000},
//     {id: 2, title: 'Mouse', price: 1500},
//     {id: 3, title: 'Keyboard', price: 5000},
//     {id: 4, title: 'Gamepad', price: 4500},
// ];
//
// const renderProduct = (item, img = 'https://via.placeholder.com/200x150') => `<div class="product-item" data-id="${this.id}">
//               <img src="${img}" alt="Some img">
//               <div class="desc">
//                   <h3>${item.title}</h3>
//                   <p>${item.price} \u20bd</p>
//                   <button class="buy-btn">Купить</button>
//               </div>
//           </div>`;
//
// const renderProducts = list => {
//     document.querySelector('.products')
//         .insertAdjacentHTML('beforeend', list.map(item => renderProduct(item)).join(''));
// };
//
// renderProducts(products);

// 1. Добавьте пустые классы для корзины товаров и элемента корзины товаров. Продумайте, какие методы понадобятся для работы с этими сущностями.

// .CartItem__Add * добавление в корзину
// .CartRemoveItem * удаление из корзины
// .CartRecalc * пересчет корзины

// *Нужен модуль корзины для получения данных из массива

const API =
    "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";

// Переделать в ДЗ не использовать fetch а Promise

// let getRequest = (url) => {
//     return new Promise((resolve, reject) => {
//         let xhr = new XMLHttpRequest();
//         xhr.open('GET', url, true);
//         xhr.onreadystatechange = () => {
//             if (xhr.readyState === 4) {
//                 resolve(xhr.response)
//                 if (xhr.status !== 200) {
//                     reject('Error');
//                 } else {
//                     reject(xhr.responseText);
//                 }
//             }
//         };

//         xhr.send();

//     })
// }

// getRequest(`${API}/catalogData.json`)
//     .then(response => console.log(response))
//     .catch(error => console.log(error))

class ProductList {
    constructor(container = ".products__block") {
        this.container = container;
        this._goods = [];
        this._allProducts = [];
        this._basketGoods = [];
        this._basketProduct = [];

        this._getProducts().then((data) => {
            this._goods = data;
            this._render();

            document
                .getElementById("product__id")
                .addEventListener("click", (event) => {
                    if (event.target.className === "buy-btn") {
                        this.addToBasket();
                    }
                });
        });

        this._getProductsBasket().then((data) => {
            this._basketGoods = data.contents;

            this.renderBasket();
            this._renderAllQuantityAndPrice();
            document
                .getElementById("basket__id")
                .addEventListener("click", (event) => {
                    if (event.target.className === "del-btn") {
                        this.deleteItem();
                    }
                });

            document
                .getElementById("delete__button")
                .addEventListener("click", (event) => {
                    if (event.target.className === "basket__button") {
                        this.deleteAllItems();
                    }
                });
        });
    }

    _getProducts() {
        return fetch(`${API}/catalogData.json`)
            .then((response) => response.json())
            .catch((error) => {
                console.log(error);
            });
    }

    _render() {
        const block = document.querySelector(this.container);
        for (const good of this._goods) {
            const productObject = new ProductItem(good);
            this._allProducts.push(productObject);
            block.insertAdjacentHTML("afterbegin", productObject.render());
        }
    }

    _cartCost() {
        return this._basketGoods.reduce(
            (totalCost, cartItem) => totalCost + cartItem.price * cartItem.quantity,
            0
        );
    }
    _cartQuantity() {
        return this._basketGoods.reduce(
            (totalQuantity, cartItem) => totalQuantity + cartItem.quantity,
            0
        );
    }

    _renderAllQuantityAndPrice() {
        const priceItemsAndQuantity = document.querySelector(".basket__info");
        priceItemsAndQuantity.innerHTML = "";
        priceItemsAndQuantity.insertAdjacentHTML(
            "beforeend",
            `<div>
            <h4 class="desc__head">Total Price = ${this._cartCost()}</h4>
            <p class="desc__price">Total Quantity = ${this._cartQuantity()}</p>
        </div>`
        );
    }

    _getProductsBasket() {
        return fetch(`${API}/getBasket.json`)
            .then((response) => response.json())
            .catch((error) => {
                console.log(error);
            });
    }
    renderBasket() {
        this._renderAllQuantityAndPrice();
        const block = document.querySelector(".basket__items");
        block.innerHTML = "";
        for (const basket of this._basketGoods) {
            const productObject = new BasketItem(basket);
            this._basketProduct.push(productObject);
            block.insertAdjacentHTML("afterbegin", productObject.render());
        }
    }

    addToBasket() {
        this._basketProduct = [];

        let basketToken = this._basketGoods.find(
            (item) => item.id_product === Number(event.target.id)
        );
        let basketFoo = this._goods.find(
            (item) => item.id_product === Number(event.target.id)
        );
        basketFoo["quantity"] = 1;
        if (basketToken === undefined) {
            this._basketGoods.push(Object.assign({}, basketFoo));
            console.log(basketToken);
            this.renderBasket();
        } else basketToken.quantity += 1;
        this.renderBasket();
    }
    deleteItem() {
        this._basketProduct = [];
        let basketToken = this._basketGoods.findIndex(
            (item) => item.id_product === Number(event.target.id)
        );
        this._basketGoods.splice(basketToken, 1);
        this.renderBasket();
    }
    deleteAllItems() {
        this._basketProduct = [];
        this._basketGoods = [];
        this.renderBasket();
    }
}

class ProductItem {
    constructor(
        product,
        img = "https://via.placeholder.com/200x150",
        quantity = 1
    ) {
        this.id_product = product.id_product;
        this.product_name = product.product_name;
        this.price = product.price;
        this.img = img;
    }

    render() {
        return `<div class="product-item" data-id="${this.id_product}">
                      <img src="${this.img}" alt="Some img">
                      <div class="desc">
                          <h3 class="desc__head">${this.product_name}</h3>
                          <p class="desc__price">${this.price} \u20bd</p>
                          <button id="${this.id_product}" class="buy-btn">Купить</button>
                      </div>
                  </div>`;
    }
}

class BasketItem extends ProductItem {
    constructor(product, img = "https://via.placeholder.com/200x150") {
        super(product);
        this.quantity = product.quantity;
    }

    render() {
        return `<div class="product-item basket__desc" data-id="${this.id_product}">
                      <img src="${this.img}" alt="Some img">
                      <div class="desc ">
                          <h3 class="desc__head">${this.product_name}</h3>
                          <p class="desc__price">${this.price} \u20bd</p>
                          <p class="desc__price">${this.quantity}</p>
                          <button id="${this.id_product}" class="del-btn">Удалить</button>
                      </div>
                  </div>`;
    }
}

const pl = new ProductList();