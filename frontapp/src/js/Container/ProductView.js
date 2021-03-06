import RatingStars from './RatingStars.js';
import {log} from '../Core/helpers.js';


function ProductView(product)
{
    const { id, name, image, desc, rating, price, currency } = product;

    return /* html */`
        <div class="product"
            data-id="${id}"
            data-name="${name}"
            data-image="${image}"
            data-price="${price}">

            <img src="assets/${image}" alt="pizza" class="product__image">
            <div class="product__text">
                <div class="product__name">${name}</div>
                ${RatingStars(rating)}
                <div class="product__description">${desc}</div>
                <div class="product__bottom">
                    <div class="product__price">
                        <span class="product__price-currency">$</span>${price}
                    </div>
                    <div class="actions">
                        <button class="actions__add" data-action="product.add">+</button>
                        <span class="actions__quantity" id="product-count-${id}">0</span>
                        <button class="actions__remove" data-action="product.remove">-</button>
                        <button
                            id="cart-action-btn-${id}"
                            class="actions__add-to-cart" 
                            data-action="cart.handle" 
                            data-items-added="false" 
                            data-text-remove="Remove"
                            data-text-add="Add">Add</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
}

export default ProductView;
