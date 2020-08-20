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


    add(id, product) {
        this.storage.save(id, product);
    }


    remove(id) {
        this.storage.delete(id);
    }


    all(id) {
        this.storage.fetch(id);
    }

}


export default Cart;