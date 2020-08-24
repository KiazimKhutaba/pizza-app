import ProductView from '../Container/ProductView.js';
import pizzasList from '../var/data.js';
import { el, log } from '../Core/helpers.js';
import LocalStorageDB from '../Core/LocalStorageDB.js';
import Cart from '../Component/Cart.js';
import config from '../config.js';


class ProductsList 
{

    constructor() 
    {
        this.products = new Map();

        window.products = this.products;
    }


    _actionProduct(product, count)
    {
        if( this.products.has(product.id) ) {

            this.products.get(product.id).quantity = count;
            return;
        }

        product.quantity = count;
        this.products.set(product.id, product)
    }


    add(product, count) 
    {
        this._actionProduct(product, count);
    }


    remove(product, count) 
    {
        this._actionProduct(product, count);
    }



    eventHandler() 
    {
        el('.products-list__items').addEventListener('click', this.eventProduct);
    }


    // arrow function - this refers to ProductsList
    eventProduct = (e) => 
    {
        // handle action buttons events
        if (e.target.className.startsWith('actions__')) {

            let productData = e.target.closest('div.product').dataset;
            let action = e.target && e.target.dataset.action; // dataset can be empty
            let productCount = el('#product-count-' + productData.id);
            let cartActionBtn = el('#cart-action-btn-' + productData.id);

             // pull the item out of the cart
             const getProduct = (productId) => this.products.get(+productId);


            const db = new LocalStorageDB(config.APP_NAME);
            //const cart = new Cart(db);

            let product = { 
                id:    +productData.id, 
                name:  productData.name, 
                image: productData.image, 
                price: productData.price
            };


            if ( 'product.add' === action ) 
            {
                // write value to markup
                productCount.textContent = +productCount.textContent + 1; 

                // get products number
                const count = +productCount.textContent;
                this.add(product, count);

                if( 'true' == cartActionBtn.dataset.itemsAdded ) {
                    
                    db.save('products', Array.from(this.products.values()));
                }

            }


            if ( 'product.remove' === action ) 
            {
                let cartHandleBtn = e.target.nextElementSibling;
                let count = +productCount.textContent;

                if (count == 0) {
                    return;
                }

                productCount.textContent = +productCount.textContent - 1;
                count =  +productCount.textContent;
                
                this.remove(product, count);


                if( 'true' === cartHandleBtn.dataset.itemsAdded ) {
                    
                    db.save('products', Array.from(this.products.values()));
                }


                // set base state for cart add/remove button
                if( count == 0 && 'true' === cartHandleBtn.dataset.itemsAdded ) {

                    cartHandleBtn.dataset.itemsAdded = 'false';
                    cartHandleBtn.textContent = cartHandleBtn.dataset.textAdd;
                    cartHandleBtn.style.background = 'rgba(255, 238, 6, 0.884)';
                }
            }


            if ( 'cart.handle' === action ) 
            {
                let btn = e.target;
                let productData = e.target.closest('div.product').dataset;

                let count = +productCount.textContent;
                //let products = Array.from(this.products.values()) || [];


                if( count == 0 ) {
                    alert('Add at least one item, please!');
                    return;
                }

                // if product already in cart - remove
                if( btn.dataset.itemsAdded === 'true' ) {

                    // remove from map
                    this.products.delete(productData.id);
                    
                    // remove product from cart completely
                    let products = db.fetch('products');


                    // if cart contains products
                    if( products.length > 0 ) {

                        // find product
                        let product = products.find(product => product.id == productData.id);

                        // if product with given id exists
                        if( product ) {

                            let cartWithoutProduct = products.filter(product => product.id != productData.id);
                            db.save('products', cartWithoutProduct);
                            //log(cartWithoutProduct);
                        }
                    }
                    

                    // update DOM
                    productCount.textContent = 0;
                    btn.dataset.itemsAdded = 'false';
                    btn.textContent = btn.dataset.textAdd;
                    btn.style.background = 'rgba(255, 238, 6, 0.884)';
                    return;
                }

                // add product
                let dbProducts = db.fetch('products') || [];
                
                // if db already contains products
                if( dbProducts.length > 0 ) {

                    // find product
                    let product = dbProducts.find(product => product.id == productData.id);

                    // if product with given id exists in db
                    if( product ) {

                        // delete it from db result set, as it contains old quantity
                        let filteredStorageData = dbProducts.filter(product => product.id != productData.id);
                        filteredStorageData.push(getProduct(productData.id))

                        // update product with new quantity
                        db.save('products', filteredStorageData);
                    }
                    else {
                        
                        // product still does not exist in db, so push it to list and save 
                        dbProducts.push(getProduct(productData.id));
                        db.save('products', dbProducts);
                    }
                } 
                else {

                    db.save('products', [getProduct(productData.id)]);
                }

                //db.save('products', products);

                btn.dataset.itemsAdded = 'true';
                btn.textContent = btn.dataset.textRemove;
                btn.style.background = 'orange';
            }
        }
    }


    render() {
        
        return /* html */`
            <div class="products-list">
                <h2 class="products-list__title">Most Popular Pizzas</h2>

                <div class="products-list__items">
                    ${pizzasList.map(ProductView).join('')}
                </div>
            </div>
        `;
    }

}

export default ProductsList;