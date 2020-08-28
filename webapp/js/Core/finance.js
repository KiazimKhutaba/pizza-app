
export const ExchangeRate = 1.21;

export const priceInEuro = (priceInDollars, exchangeRate) => 
    (priceInDollars * exchangeRate).toFixed(2);


export const calcOrderTotal = (products) => {

    const total =  products.reduce((total, product) => total + product.price * product.quantity, 0);
    return +total.toFixed(2);
}


export const calcProductTotal = (product) => 
    (product.price * product.quantity).toFixed(2)