import LocalStorageDB from '../Core/LocalStorageDB.js';

/**
 * PizzaApp Cart
 */
class Cart
{
    /**
     * 
     * @param {LocalStorageDB} storage put all user selected pizzas into localStorage
     */
    constructor(storage) {
        this.storage = storage;
    }


    add(product) {
        this.storage.save(product.id, product);
    }


    remove(product) {
        this.storage.delete(product.id);
    }


    all(id) {
        this.storage.fetch(id);
    }

}


export default Cart;