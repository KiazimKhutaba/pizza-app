import ProductView from '../Container/ProductView.js';
import pizzasList from '../var/data.js';
import { el, log } from '../Core/helpers.js';
import LocalStorageDB from '../Core/LocalStorageDB.js';
import Cart from '../Component/Cart.js';
import config from '../config.js';




class ProductsList {

    constructor() {
        const db = new LocalStorageDB(config.APP_NAME);
        this.cart = new Cart(db);
    }


    updateProductList() 
    {
        fetch('/api/v1/products')
            .then(res => res.json())
            .then(list =>
                el('.products-list__items').innerHTML = list.map(ProductView).join('')
            );
    }


    eventHandler() {
        el('.products-list__items').addEventListener('click', this.eventProduct);
        this.updateProductList();
    }



    addProduct(productCounter, cartActionBtn, product) {
        // write value to DOM
        productCounter.textContent = +productCounter.textContent + 1;

        // get products number
        const count = +productCounter.textContent;
        this.cart.updateProductCounter(product, count);


        if ('true' == cartActionBtn.dataset.itemsAdded) {
            this.cart.putAll()
        }

    }


    removeProduct(productCounter, cartActionBtn, product) {
        let cartHandleBtn = cartActionBtn;
        let count = +productCounter.textContent;

        if (count == 0) {
            return;
        }

        productCounter.textContent = +productCounter.textContent - 1;
        count = +productCounter.textContent;

        this.cart.updateProductCounter(product, count);


        if ('true' === cartHandleBtn.dataset.itemsAdded) {
            this.cart.putAll();
        }


        // set base state for cart add/remove button
        if (count == 0 && 'true' === cartHandleBtn.dataset.itemsAdded) {

            cartHandleBtn.dataset.itemsAdded = 'false';
            cartHandleBtn.textContent = cartHandleBtn.dataset.textAdd;
            cartHandleBtn.style.background = 'rgba(255, 238, 6, 0.884)';
        }
    }


    cartHandle(e, productCounter) {
        let btn = e.target;
        let productData = e.target.closest('div.product').dataset;

        let count = +productCounter.textContent;

        if (count == 0) {
            alert('Add at least one item, please!');
            return;
        }

        // if product already in cart - remove
        if (btn.dataset.itemsAdded === 'true') {

            this.cart.remove(productData.id);

            // update DOM
            productCounter.textContent = 0;
            btn.dataset.itemsAdded = 'false';
            btn.textContent = btn.dataset.textAdd;
            btn.style.background = 'rgba(255, 238, 6, 0.884)';
            return;
        }

        // add product
        this.cart.add(productData.id);

        // update DOM
        btn.dataset.itemsAdded = 'true';
        btn.textContent = btn.dataset.textRemove;
        btn.style.background = 'orange';
    }



    // arrow function - this refers to ProductsList
    eventProduct = (e) => {
        // handle action buttons events
        if (e.target.className.startsWith('actions__')) {

            let productData = e.target.closest('div.product').dataset;
            let action = e.target && e.target.dataset.action; // dataset can be empty
            let productCount = el('#product-count-' + productData.id);
            let cartActionBtn = el('#cart-action-btn-' + productData.id);


            let product = {
                id: +productData.id,
                name: productData.name,
                image: productData.image,
                price: productData.price
            };


            if ('product.add' === action) {
                this.addProduct(productCount, cartActionBtn, product);
            }


            if ('product.remove' === action) {
                this.removeProduct(productCount, cartActionBtn, product)
            }


            if ('cart.handle' === action) {
                this.cartHandle(e, productCount);
            }
        }
    }


    render() {

        return /* html */`
            <div class="products-list">
                <h2 class="products-list__title">Most Popular Pizzas</h2>

                <div class="products-list__items">
                    
                </div>
            </div>
        `;
    }

}

export default ProductsList;