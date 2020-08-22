import { el, log } from './js/Core/helpers.js';
import CartPage from './js/Pages/CartPage.js';
import LoginView from './js/Pages/LoginView.js';
import ProductsList from './js/Pages/ProductsList.js';
import Router from './js/Core/Router.js';
import CreditsPage from './js/Pages/CreditsPage.js';
import OrderPage from './js/Pages/OrderPage.js';


function main() {
    let app = el('#app');


    const screens = {
        'main': ProductsList,
        'cart': CartPage,
        'login': LoginView,
        'credits': CreditsPage,
        'order': OrderPage
    };

    Router(app, screens);

}


// run after document content loadedd
document.addEventListener('DOMContentLoaded', main)