import ProductView from './ProductView.js';
import pizzasList from '../data.js';


function ProductsList()
{
    let list = '';

     // add pizzas to DOM
    pizzasList.forEach((pizza) => list += ProductView(pizza))

    return list;
}

export default ProductsList;