import ProductView from '../Container/ProductView.js';
import pizzasList from '../data.js';
import {el} from '../Core/helpers.js';
import LocalStorageDB from '../Core/LocalStorageDB.js';
import Cart from '../Component/Cart.js';
import config from '../config.js';



class ProductsList
{

    eventHandler() {
        el('.products-list__items').addEventListener('click', this.eventProduct);
    }


    eventProduct(e)
    {
    
        const Actions = {
            PRODUCT_ADD:    'product.add',
            PRODUCT_REMOVE: 'product.remove',
            CART_ADD:       'card.add'
        };
    
        //log('Element dataset: ', e.target.className);

        // handle action buttons events
        if( e.target.className.startsWith('actions__') )
        {
            let product = e.target.closest('div.product').dataset;
            let action  = e.target && e.target.dataset.action; // dataset can be empty
            let productCount = el('#product-count-' + product.id);


            const db = new LocalStorageDB(config.APP_NAME);
            const cart = new Cart(db);
        

            //log('action', action, ', product.id', product.id, ', product.count', productCount.textContent)

            if( Actions.PRODUCT_ADD === action ) {
                productCount.textContent = +productCount.textContent + 1;
                cart.add(product.id, product);
            }


            if( Actions.PRODUCT_REMOVE === action ) {

                let count = +productCount.textContent;
                if( count === 0 ) return;

                productCount.textContent = +productCount.textContent - 1;
                cart.remove(product.id);
            }

            if( Actions.CART_ADD === action ) {
                e.target.disabled = true;
                e.target.style.background = 'grey';
            }
        }
    }


    render() 
    {
        let items = '';

        pizzasList.forEach(pizza => items += ProductView(pizza))



        let list = /* html */`
            <div class="products-list">
                <h2 class="products-list__title">Most Popular Pizzas</h2>

                <div class="products-list__items">${items}</div>
            </div>
        `;

   
        return list;
    }

    
}

export default ProductsList;