import pizzasList from './data.js';


/**
 * 
 * @param {Array} items products list
 * @param {number} id item id
 */
function getProduct(items, id) {
    return items.find(item => item.id == id);
}


/**
 * 
 * @param {Array} items 
 */
export function createCartItems(items) 
{
    return function(id, quantity) 
    {
        const product = getProduct(items, id);
    
        // if product with given id exists
        if( product ) {

            const { id, name, image, price, currency } = product;

            return { id, name, image, price, currency, quantity };
        }

        return false;
    }
}


const items = createCartItems(pizzasList);

const cartItems = [
    items(2, 30),
    items(4, 1),
    items(7, 2),
    items(5, 1),
    items(3, 1),
];


export default cartItems;