import {el, log} from '../Core/helpers.js';
import Cart from '../Component/Cart.js';
import LocalStorageDB from '../Core/LocalStorageDB.js';
import config from '../config.js';


class OrderPage {


    constructor() {

        const db = new LocalStorageDB(config.APP_NAME);
        
        this.cart = new Cart(db);
        this.cart.loadFromStorage();
    }


    eventHandler() {
        
        el('#checkout').addEventListener('click', this.createOrderEvent);
    }


    createOrderEvent = (e) => {

        e.preventDefault();

        let userName     = el('#uname').value.trim();
        let phone        = el('#phone').value.trim();
        let address      = el('#address').value.trim();
        let instructions = el('#instructions').value.trim();


        let body = new FormData();
        body.append('name', userName);
        body.append('phone', phone);
        body.append('address', address);
        body.append('instructions', instructions);
        body.append('products', JSON.stringify(this.cart.productsList));

        
        fetch('/api/v1/order', {

            method: 'POST',
            body: body
        })
        .then(res => res.json())
        .then(data => {
           
            if( 100 === data.code ) {
                location.hash = '!order/received';
            }
            else {
                alert('Something goes wrong! Please, wait little, and try again!')
            }
        });

    }


    render() {
        return /* html */`

            <div class="order-form">
                
                <div class="order-form__title">Order Form</div>

                <div class="order-form__container">

                    <div class="order-form__container-item">
                        <label for="uname">Name</label>
                        <input type="text" id="uname" placeholder="John Doe"/>
                    </div>

                    
                    <div class="order-form__container-item">
                        <label for="phone">Phone</label>
                        <input type="text" id="phone" placeholder="+1 (234) 567-89-00" />
                    </div>

                    <div class="order-form__container-item">
                        <label for="address">Address</label>
                        <input type="text" id="address" placeholder="Street, Home" />
                    </div>

                    <div class="order-form__container-item">
                        <label for="instructions">Additional instructions</label>
                        <textarea type="text" id="instructions"  rows="6" placeholder="Some text"></textarea>
                    </div>

                    <div class="order-form__container-item">
                        <a class="btn btn-submit" id="checkout" href="#!order/received">Checkout</a>
                    </div>

                </div>

            </div>
        `;
    }


}


export default OrderPage;