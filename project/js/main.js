"use strict";

class ProductList {
    _goods;
    _allProducts;
    _prop;
    _totalPrice;
    _totalQuantity;

    constructor(container = ".products") {
        this.container = container;
        this._goods = [];
        this._allProducts = [];

        this._fetchGoods();
        this._render();
        this._cartPriceAndQuantity();
    }

    get property() {
        return this._prop;
    }

    set property(value) {
        this._prop = value;
    }

    _fetchGoods() {
        this._goods = [
            { id: 1, title: "Notebook", price: 20000 },
            { id: 2, title: "Mouse", price: 1500 },
            { id: 3, title: "Keyboard", price: 5000 },
            { id: 4, title: "Gamepad", price: 4500 },
        ];
    }

    _render() {
        const block = document.querySelector(this.container);

        for (const good of this._goods) {
            const productObject = new ProductItem(good);
            // console.log(productObject);
            this._allProducts.push(productObject);
            block.insertAdjacentHTML("afterbegin", productObject.render());
        }
    }

    _cartPriceAndQuantity() {
        this._totalPrice = 0;
        this._totalQuantity = 0;
        this._totalPrice += this._allProducts.reduce(
            (totalPrice, CartItem) => totalPrice + CartItem.price,
            0
        );
        this._totalQuantity += this._allProducts.reduce(
            (totalCost, cartItem) => totalCost + cartItem.quantity,
            0
        );
        // this.render_AllQuantityAndPrice();
    }

    _renderAllPriceAndQuantity() {
        const PriceItemsAndQUantity = document.querySelector(".products");
        PriceItemsAndQUantity.insertAdjacentHTML(
            "beforeend",
            `<div>
        <h4 class = "desc__head">Total Price = ${this._totalPrice}</h4>
        <p class = "desc__price">Total Quantity  = ${this._totalQuantity}</p>
        </div>`
        );
    }
}
class ProductItem {
    constructor(product, img = "https://via.placeholder.com/200x150") {
        this.title = product.title;
        this.price = product.price;
        this.id = product.id;
        this.img = img;
    }

    render() {
        return `<div class="product-item" data-id="${this.id}">
                      <img src="${this.img}" alt="Some img">
                      <div class="desc">
                          <h3>${this.title}</h3>
                          <p>${this.price} \u20bd</p>
                          <button class="buy-btn">Купить</button>
                      </div>
                  </div>`;
    }
}

const pl = new ProductList();
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