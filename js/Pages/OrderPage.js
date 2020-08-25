
class OrderPage {


    render() {
        return /* html */`

            <div class="order-form">
                
                <div class="order-form__title">Order Form</div>

                <div class="order-form__container">

                    <div class="order-form__container-item">
                        <label for="uname">Name</label>
                        <input type="text" id="uname" placeholder="John Doe" />
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
                        <a class="btn btn-submit" href="#!order/received">Checkout</a>
                    </div>

                </div>

            </div>
        `;
    }


}


export default OrderPage;