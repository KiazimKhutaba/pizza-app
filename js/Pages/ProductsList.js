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

                // set base state for cart add/remove button
                if( count == 0 && cartHandleBtn.dataset.itemsAdded === 'true' ) {
                    cartHandleBtn.dataset.itemsAdded = 'false';
                    cartHandleBtn.textContent = cartHandleBtn.dataset.textAdd;
                    cartHandleBtn.style.background = 'rgba(255, 238, 6, 0.884)';
                }

                this.remove(product, count);
            }


            if ( 'cart.handle' === action ) 
            {
                let btn = e.target;
                let count = +productCount.textContent;

                if( count == 0 ) {
                    alert('Add at least one item, please!');
                    return;
                }

                // if product already in cart - remove
                if( btn.dataset.itemsAdded === 'true' ) {
                    
                    productCount.textContent = 0;
                    btn.dataset.itemsAdded = 'false';
                    btn.textContent = btn.dataset.textAdd;
                    btn.style.background = 'rgba(255, 238, 6, 0.884)';
                    return;
                }


                // add product

                let products = Array.from(this.products.values());
                log(products);

                db.save('products', products);

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