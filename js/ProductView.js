import RatingStars from './RatingStars.js';


const  ProductView = (pizza) => {

    const { name, image, desc, rating, price, currency } = pizza;


    return /* html */`
        <div class="product">
            <img src="${image}" alt="pizza" class="product__image">
            <div class="product__text">
                <div class="product__name">${name}</div>
                ${RatingStars(rating)}
                <div class="product__description">${desc}</div>
                <div class="product__bottom">
                    <div class="product__price">
                        <span class="product__price-currency">${currency}</span>${price}
                    </div>
                    <div class="actions">
                        <button class="actions__remove">-</button>
                        <span class="actions__quantity">1</button>
                        <button class="actions__add">+</button>
                        <button class="actions__add-to-cart">🛒</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

export default ProductView;
