import ProductView from './ProductView.js';
import pizzasList from '../data.js';


function ProductsList()
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

export default ProductsList;