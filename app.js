import { el, log } from './js/helpers.js';
import LocalStorageDB from './js/LocalStorageDB.js';
import Cart from './js/Component/Cart.js';
import CartView from './js/Container/CartView.js';
import LoginView from './js/Container/LoginView.js';
import ProductsList from './js/Container/ProductsList.js';
import NotFound from './js/Container/NotFound.js';


const APP_NAME = 'PizzaApp';


/**
 * 
 * @param {HTMLElement} app 
 * @param {Object} screens 
 */
function Router(app, screens)
{

    /**
     * 
     * @param {string} component HTML markup
     */
    const render = (component) => app.innerHTML = component;


    const hashChangeHandler = (e) => {

        const { hash } = new URL(e.newURL);
        //log(!!hash);

        // if hash empty - this is regular link
        if( 0 == hash.length ) {
            return;
        }

        if( hash.startsWith('#!') ) 
        {
            // stops default actiom
            e.preventDefault();

            const Component = screens[hash.slice(2)];

            //log(screen);

            if( !Component ) {
                render(NotFound(hash.slice(2)));
            }
            else {
                render(Component());
            }

            
            location.hash = hash;
        }
    }
    
    
    app.innerHTML = screens['main']();
    window.addEventListener('hashchange', hashChangeHandler);


    

    // element.addEventListener('click', e => {

    //     // if we click on hyperlink
    //     if( e.target instanceof HTMLAnchorElement ) 
    //     {  
    //         const { hash } = new URL(e.target.href);
    //         //log(!!hash);

    //         // if hash empty - this is regular link
    //         if( 0 == hash.length ) {
    //             return;
    //         }

    //         if( hash.startsWith('#!') ) 
    //         {
    //             // stop propagination
    //             e.preventDefault();

    //             app.innerHTML = screens[hash.slice(2)]();
    //             location.hash = hash;
    //         }
    //     }

    // })
}


function main() 
{
    let app = el('#app');
    

    class TestView
    {

        constructor() {
            log('Test object created!!!');
        }


        someMethod(e) {
            alert(e.target.dataset.name)
        }


        eventHandler() {
            el('#jKsnsn').addEventListener('click', this.someMethod);
        }


        render = () => (

            /* html */
            `
                <div id="jKsnsn">
                    <h4 data-name="test1">Test Closure Component 1</h4>
                    <h4 data-name="test2">Test Closure Component 2</h4>
                    <h4 data-name="test3">Test Closure Component 3</h4>
                </div>
            `
        )
    }

    const obj = new TestView();
    app.innerHTML = obj.render();
    obj.eventHandler();
    


    const screens = {
        'main': ProductsList,
        'cart': CartView, 
        'login': LoginView,
        'test': TestView
    };



   

    //Router(app, screens);
    //let root = el('.products-list__items');


   

    //app.innerHTML = ProductsList();

    /**
     * 
     * Product card actions
     */
    // root.addEventListener('click', (e) => {
    
    //     const Actions = {
    //         PRODUCT_ADD:    'product.add',
    //         PRODUCT_REMOVE: 'product.remove',
    //         CART_ADD:       'card.add'
    //     };

    //     //log('Element dataset: ', e.target.className);

    //     // handle action buttons events
    //     if( e.target.className.startsWith('actions__') )
    //     {
    //         let product = e.target.closest('div.product').dataset;
    //         let action  = e.target && e.target.dataset.action; // dataset can be empty
    //         let productCount = el('#product-count-' + product.id);


    //         const db = new LocalStorageDB(APP_NAME);
    //         const cart = new Cart(db);
        

    //         //log('action', action, ', product.id', product.id, ', product.count', productCount.textContent)

    //         if( Actions.PRODUCT_ADD === action ) {
    //             productCount.textContent = +productCount.textContent + 1;
    //             cart.add(product.id, product);
    //         }


    //         if( Actions.PRODUCT_REMOVE === action ) {

    //             let count = +productCount.textContent;
    //             if( count === 0 ) return;

    //             productCount.textContent = +productCount.textContent - 1;
    //             cart.remove(product.id);
    //         }

    //         if( Actions.CART_ADD === action ) {
    //             e.target.disabled = true;
    //             e.target.style.background = 'grey';
    //         }
    //     }
    // })

}


// run after document content loadedd
document.addEventListener('DOMContentLoaded', main)