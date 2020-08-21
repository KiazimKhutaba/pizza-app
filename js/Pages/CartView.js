import cartItems from '../var/cart_data.js';
import { el, log } from '../Core/helpers.js';



function OrderSummary() {
    
    return /* html */`

        <div class="order-summary">

            <h4>Order Summary</h4>

            <ul>
                <li>
                    <strong class="text-muted">Order Subtotal</strong>
                    <strong>$390.00</strong>
                </li>
                <li>
                    <strong class="text-muted">Delivery</strong>
                    <strong>$10.00</strong>
                </li>
                <li>
                    <strong class="text-muted">Total</strong>
                    <h5 class="font-weight-bold">$400.00</h5>
                </li>
            </ul>
            <a href="#!order" class="btn">Checkout</a>
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

            <div class="total-price">$${price}</div>

            <div class="buttons">
                <span class="delete-btn"></span>
            </div>
        </div>
    `;
}



class CartView 
{

    eventHandler() {

        let minusBtns = Array.from(el('.minus-btn', true))
        let plusBtns = Array.from(el('.plus-btn', true))


        minusBtns.forEach(btn => {

            btn.addEventListener('click', function(e) {

                
                var $this = el(e.target);
                var $input = $this.closest('div').find('input');
                var value = parseInt($input.val());
    
                if (value > 1) {
                    value = value - 1;
                } else {
                    value = 0;
                }
    
                $input.textContent = (value);
    
            });
        })



    	el('.plus-btn').addEventListener('click', function(e) {

            e.preventDefault();
            
            log(document.querySelectorAll(this));

    		var $this = el(this);
    		var $input = $this.closest('div').find('input');
    		var value = parseInt($input.val());

    		if (value < 100) {
      		value = value + 1;
    		} else {
    			value =100;
    		}

    		$input.val(value);
        });
    }


    render() {
        return /* html */`
            <div class="shopping-cart">
                <!-- Title -->
                <div class="title">Your Cart</div>

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