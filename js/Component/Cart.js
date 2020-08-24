import LocalStorageDB from '../Core/LocalStorageDB.js';

/**
 * PizzaApp Cart
 */
class Cart
{

    static STORAGE_KEY = 'products';

    /**
     * 
     * @param {LocalStorageDB} storage put all user selected producs into localStorage
     */
    constructor(storage) {

        this.storage = storage;
        this.products = new Map();
    }


    /**
     * @returns number of products in map
     */
    get count() {
        return this.products.size;
    }


    /**
     * @returns {object} one product from map
     */
    getProduct(productId) {
        return this.products.get(+productId);
    }

    /**
     * 
     * @param {object} product 
     * @param {Number} count 
     */
    updateProductCount(product, count)
    {
        if( this.products.has(product.id) ) {

            this.products.get(product.id).quantity = count;
            return;
        }

        product.quantity = count;
        this.products.set(product.id, product)
    }


    /**
     * Adds item to Cart (localStorage)
     * 
     * @param {object} item 
     */
    add(item) 
    {
        let storageProducts = this.all();
                
        // if storage already contains products
        if( storageProducts.length > 0 ) {

            // find product
            let product = storageProducts.find(product => product.id == item.id);

            // if product with given id exists in storage
            if( product ) {

                // delete it from storage result set, as it contains old quantity
                let filteredStorageData = storageProducts.filter(product => product.id != item.id);
                filteredStorageData.push(this.getProduct(item.id))

                // update product with new quantity
                this.putItem(filteredStorageData);
            }
            else {
                
                // product still does not exist in db, so push it to list and save 
                storageProducts.push(this.getProduct(item.id));
                this.putItem(storageProducts);
            }
        } 
        else {

            this.putItem( [ getProduct(item.id) ] );
        }
    }


    /**
     * Completely deletes product from Cart (localStorage)
     * 
     * @param {Number} id item key in products map
     */
    remove(id) {
       
        // remove from map ???руку
        this.products.delete(id);
                    
        let products = this.all();

        // if cart contains products
        if( products.length > 0 ) {

            // find product
            let product = products.find(product => product.id == id);

            // if product with given id exists
            if( product ) {

                let cartWithoutProduct = products.filter(product => product.id != id);
                this.putItem(cartWithoutProduct);
            }
        }
    }


    /**
     * Put all products list to storage
     */
    putAll() {
        return this.storage.save(Cart.STORAGE_KEY, Array.from(this.products.values()));
    }


    /**
     * Put item/items into storage
     * @param {object} item 
     */
    putItem(item) {
        this.storage.save(Cart.STORAGE_KEY, item);
    }


    /**
     * @returns {array} Get all products from storage they if exists, otherwise empty array
     */
    all() {
        return this.storage.fetch(Cart.STORAGE_KEY) || [];
    }

}


export default Cart;