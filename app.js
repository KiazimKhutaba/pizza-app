import PizzaApp from './js/PizzaApp.js';
import ProductView from './js/ProductView.js';
import pizzasList from './js/data.js';
import { el, log } from './js/helpers.js';



function main() 
{
    let root = el('.products-list__items');

    // add pizzas to DOM
    pizzasList.forEach(pizza => root.innerHTML += ProductView(pizza))

    // after get buttons
    let addButtons = el('.actions__add', true);
    let removeButton = el('.actions__remove', true);
    let quantity = el('.actions__quantity');


    root.addEventListener('click', (e) => {
        
        log(e.target);
    });

    // assing event listener for button
    // Array
    //     .from(addButtons)
    //     .forEach(btn => btn.addEventListener('click', e => alert(e)))
}


// run after document content loadedd
document.addEventListener('DOMContentLoaded', main)