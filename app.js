import { el } from './js/helpers.js';
import LocalStorageDB from './js/LocalStorageDB.js';
import Cart from './js/Component/Cart.js';
import CartView from './js/Container/CartView.js';
import LoginView from './js/Container/LoginView.js';
import ProductsList from './js/Container/ProductsList.js';
import pizzasList from './js/data.js';


const APP_NAME = 'PizzaApp';


/**
 * 
 * @param {Document} element 
 */
function Router(element, screens)
{
    element.addEventListener('click', e => {

        // stop propagination
        e.preventDefault();

        // if we click on hyperlink
        if( e.target instanceof HTMLAnchorElement ) {
            
            const { hash } = new URL(e.target.href)
            //log(hash.slice(1))

            root.innerHTML = screens[hash.slice(1)]();
            location.hash = hash;
        }

    })
}


function main() 
{
    let root = el('.products-list__items');

    const Views = {
        main: ProductsList,
        cart: CartView, 
        login: LoginView 
    };




    root.innerHTML = ProductsList(pizzasList);

    /**
     * 
     * Product card actions
     */
    root.addEventListener('click', (e) => {
    
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


            const db = new LocalStorageDB(APP_NAME);
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
    })

}


// run after document content loadedd
document.addEventListener('DOMContentLoaded', main)