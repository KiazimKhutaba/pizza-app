import { el, log } from './js/Core/helpers.js';
import CartView from './js/Pages/CartView.js';
import LoginView from './js/Pages/LoginView.js';
import ProductsList from './js/Pages/ProductsList.js';
import Router from './js/Core/Router.js';



function main() 
{
    let app = el('#app');



    const screens = {
        'main': ProductsList,
        'cart': CartView, 
        'login': LoginView
    };

    Router(app, screens);

}


// run after document content loadedd
document.addEventListener('DOMContentLoaded', main)