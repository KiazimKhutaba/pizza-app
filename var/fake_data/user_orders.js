import { createCartItems } from './cart_data.js';
import pizzasList from './data.js';


// create facke items
const items = createCartItems(pizzasList);


// create fake orders
const userOrders = [
    { 
        id: 100101, 
        products: [items(1, 2), items(4, 1)], 
        date: 1598113361820
    },
    {
        id: 100102,
        products: [items(6, 4), items(5, 2), items(2, 4)],
        date: 1598113546498
    },
    {
        id: 100103,
        products: [items(6, 4), items(3, 1), items(7, 2)],
        date: 1598229916900
    }
];


window.orders = userOrders;

export default userOrders;