import { el, log } from './js/Core/helpers.js';
import CartView from './js/Pages/CartView.js';
import LoginView from './js/Pages/LoginView.js';
import ProductsList from './js/Pages/ProductsList.js';
import Router from './js/Core/Router.js';
import CreditsPage from './js/Pages/CreditsPage.js';
import OrderPage from './js/Pages/OrderPage.js';


function main() 
{
    let app = el('#app');

    window.el = el;

    const screens = {
        'main': ProductsList,
        'cart': CartView, 
        'login': LoginView,
        'credits': CreditsPage,
        'order': OrderPage

    };

    Router(app, screens);

}


// run after document content loadedd
document.addEventListener('DOMContentLoaded', main)