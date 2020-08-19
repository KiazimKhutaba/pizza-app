const  ProductView = (pizza) => {

    const { name, image, desc, price, currency } = pizza;


    return /* html */`
        <div class="product">
            <img src="${image}" alt="pizza" class="product__image">
            <div class="product__name">${name}</div>
            <div class="product__description">${desc}</div>
            <div style="display: grid; grid-template-columns: 1fr 2fr">
                <div class="product__price">
                    <span class="product__price-currency">${currency}</span>${price}
                </div>
                <div class="actions" style="justify-self:end; padding-top: 10px; padding-right: 15px">
                    <button class="actions__remove">-</button>
                    <span class="actions__quantity">1</button>
                    <button class="actions__add">+</button>
                    <button class="actions__add-to-cart">Cart</button>
                </div>
            </div>
        </div>
    `;
}

export default ProductView;
