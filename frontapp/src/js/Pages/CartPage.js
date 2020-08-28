import { el, log } from '../Core/helpers.js';
import LocalStorageDB from '../Core/LocalStorageDB.js';
import config from '../config.js';
import Cart from '../Component/Cart.js';
import { priceInEuro, calcOrderTotal, calcProductTotal } from '../Core/finance.js';
import '../../style/shopping-cart.css';



function OrderSummary(products) {

    const delivery = 10;
    const exchangeRate = 1.21;

    const subtotal = calcOrderTotal(products);
    const total = subtotal + delivery;

    const subtotalEUR = priceInEuro(subtotal, exchangeRate);
    const deliveryEUR = priceInEuro(delivery, exchangeRate);
    const totalEUR = priceInEuro(total, exchangeRate);


    return /* html */`

        <div class="order-summary">

            <h4>Order Summary</h4>

            <ul>
                <li>
                    <strong class="text-muted">Order Subtotal</strong>
                    <strong><span id="orderSubTotal">$${subtotal} / €${subtotalEUR}</span></strong>
                </li>
                <li>
                    <strong class="text-muted">Delivery</strong>
                    <strong><span id="orderDelivery">$${delivery} / €${deliveryEUR}</span></strong>
                </li>
                <li>
                    <strong class="text-muted">Total</strong>
                    <h5 class="font-weight-bold"><span id="orderTotal">$${total} / €${totalEUR}</span></h5>
                </li>
            </ul>
            <a href="#!order" class="btn">Order</a>
        </div>
    `;
}




function CartItem(product) {

    const { id, name, image, price, quantity } = product;

    return /* html */`

        <div class="item"
            data-id="${id}"
            data-name="${name}"
            data-image="${image}"
            data-price="${price}"
            data-quantity="${quantity}">

            <div class="image">
                <img class="rounded-border" src="assets/${image}" width="120" height="80" lt="" />
            </div>

            <div class="description">
                ${name}
            </div>

            <div class="quantity">
                <button class="plus-btn" type="button" name="button">
                    <img src="assets/icons/cart/plus.svg" alt="" class="__plus" />
                </button>
                <span id="product-counter-${id}" style="padding: 0 10px">${quantity}</span>
                <button class="minus-btn" type="button" name="button">
                    <img src="assets/icons/cart/minus.svg" alt="" class="__minus"/>
                </button>
            </div>

            <div class="total-price">$<span id="itemTotalPrice-${id}">${calcProductTotal(product)}</span></div>

            <div class="buttons">
                <span class="delete-btn"></span>
            </div>
        </div>
    `;
}




class CartPage {

    constructor() {
        const db = new LocalStorageDB(config.APP_NAME);
        this.cart = new Cart(db);
        this.cart.loadFromStorage();

        this.updateCartSummary = this.updateCartSummary.bind(this);
        this.updateItem = this.updateItem.bind(this);
    }



    eventHandler() {

        el('.cart__items') && el('.cart__items').addEventListener('click', this.eventItem);

        document.addEventListener('product.delete', this.updateCartSummary);
        document.addEventListener('product.add', this.updateCartSummary);
        document.addEventListener('product.remove', this.updateCartSummary);

        document.addEventListener('product.add', this.updateItem);
        document.addEventListener('product.remove', this.updateItem);
    }


    /**
     * 
     * @param {Event} e 
     */
    updateItem(e) {

        let product = e.detail;

        el('#itemTotalPrice-' + product.id).textContent = calcProductTotal(product);
        //log(product)
    }


    updateCartSummary(e) {

        const storageProducts = this.cart.all().filter(p => p.quantity > 0);


        const delivery = 10;
        const exchangeRate = 1.21;

        const subtotalUSD = calcOrderTotal(storageProducts);
        const subtotalEUR = priceInEuro(subtotalUSD, exchangeRate);


        const deliveryEUR = priceInEuro(delivery, exchangeRate);
        const totalUSD = subtotalUSD + delivery;
        const totalEUR = priceInEuro(totalUSD, exchangeRate);


        el('#orderDelivery').textContent = `$${delivery} / €${deliveryEUR}`;
        el('#orderSubTotal').textContent = `$${subtotalUSD} / €${subtotalEUR}`;
        el('#orderTotal').textContent = `$${totalUSD} / €${totalEUR}`;


        if (subtotalUSD == 0) {

            el('#orderTotal').textContent = '$0 / €0';
            el('#orderDelivery').textContent = '$0 / €0';
        }

    }


    deleteProduct(product) {
        product.style.display = 'none';
        this.cart.removeDbItem(product.dataset.id);
    }



    eventItem = (e) => 
    {

        const elem = e.target;
        let product = elem.closest('div.item');
        let productCounter = el('#product-counter-' + product.dataset.id);


        let productObj = {
            id: +product.dataset.id,
            name: product.dataset.name,
            image: product.dataset.image,
            price: product.dataset.price
        };


        switch (elem.className) {
            case 'delete-btn':
            {
                this.deleteProduct(product);

                if( this.cart.countStorage == 0 ) {
                    el('.cart__content').innerHTML = this.content([]);
                }
                else {
                    
                    let event = new CustomEvent('product.delete', {
                        detail: this.cart.getProduct(product.dataset.id),
                        bubbles: true,
                        cancelable: true
                    });

                    elem.dispatchEvent(event);
                }

                break;
            }


            case 'plus-btn':
            case '__plus':
            {
                // update DOM
                productCounter.textContent = +productCounter.textContent + 1;

                // get products number
                const count = +productCounter.textContent;
                this.cart.updateProductCounter(productObj, count);
                this.cart.putAll();

                let event = new CustomEvent('product.add', {
                    detail: this.cart.getProduct(product.dataset.id),
                    bubbles: true,
                    cancelable: true
                });

                elem.dispatchEvent(event);

                break;
            }


            case 'minus-btn':
            case '__minus':
            {
                let count = +productCounter.textContent;

                if (count == 0) {
                    break;
                }

                productCounter.textContent = +productCounter.textContent - 1;
                count = +productCounter.textContent;

                // if( count == 0 ) {
                //     product.style.display = 'none';
                // }

                this.cart.updateProductCounter(productObj, count);
                this.cart.putAll();

                let event = new CustomEvent('product.remove', {
                    detail: this.cart.getProduct(product.dataset.id),
                    bubbles: true,
                    cancelable: true
                });


                elem.dispatchEvent(event);

                break;
            }
        }
    }


    /**
     * 
     * @param {Array} items cart items
     */
    content(items) {
        return (
            !items || 0 === items.length

                ? /* html */`
                <div class="page__content">
                    <h2>Your cart is empty :(</h2>
                </div>
            `
                : /* html */`
                <div class="cart__box">
                    <div class="cart__items">
                        ${items.map(CartItem).join('')}
                    </div>
                    
                    <div class="cart__summary">
                        ${OrderSummary(items)}
                    </div>
                </div>
            `
        );
    }


    render() {

        const items = this.cart.all().filter(product => product.quantity > 0);

        return /* html */`
            <div class="shopping-cart">
                <!-- Title -->
                <div class="title">Your Cart</div>

                <span class="cart__content">
                    ${this.content(items)}
                </span>
            </div>
        `;
    }
}

export default CartPage;