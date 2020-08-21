import cartItems from '../var/cart_data.js';



function OrderSummary() {
    return /* html */`
        <div class="p-4">
            <p class="font-italic mb-4">
                Shipping and additional costs are calculated based on values you have entered.
            </p>
            <ul class="list-unstyled mb-4">
                <li class="d-flex justify-content-between py-3 border-bottom">
                    <strong class="text-muted">Order Subtotal</strong>
                    <strong>$390.00</strong>
                </li>
                <li class="d-flex justify-content-between py-3 border-bottom">
                    <strong class="text-muted">Delivery</strong>
                    <strong>$10.00</strong>
                </li>
                <li class="d-flex justify-content-between py-3 border-bottom">
                    <strong class="text-muted">Total</strong>
                    <h5 class="font-weight-bold">$400.00</h5>
                </li>
            </ul>
            <a href="#" class="btn btn-dark rounded-pill py-2 btn-block">Procceed to checkout</a>
        </div>
    `;
}


function CartItem(data) {

    const { name, image, price, quantity } = data;

    return /* html */`

        <div class="item">

            <div class="image">
                <img class="rounded-border" src="assets/${image}" width="120" height="80" lt="" />
            </div>

            <div class="description">
                ${name}
            </div>

            <div class="quantity">
                <button class="plus-btn" type="button" name="button">
                    <img src="assets/icons/cart/plus.svg" alt="" />
                </button>
                <input type="text" name="name" value="${quantity}">
                <button class="minus-btn" type="button" name="button">
                    <img src="assets/icons/cart/minus.svg" alt="" />
                </button>
            </div>

            <div class="total-price">${price}</div>

            <div class="buttons">
                <span class="delete-btn"></span>
            </div>
        </div>
    `;
}



class CartView {

    render() {
        return /* html */`
            <style>

                .cart__box {
                    display: grid;
                    grid-template-columns: 2fr 1fr;
                }

                .cart__box > div {
                    
                }

            </style>

            <div class="shopping-cart">
                <!-- Title -->
                <div class="title">Your shopping cart</div>


                <div class="cart__box">
                    <div>
                        ${cartItems.map(CartItem).join('')}
                    </div>
                    
                    <div>
                        ${OrderSummary()}
                    </div>
                </div>
            </div>
        `;
    }
}

export default CartView;