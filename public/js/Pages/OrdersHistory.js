import { format_date, log, el } from "../Core/helpers.js";
import {calcOrderTotal, priceInEuro, ExchangeRate } from '../Core/finance.js';



function ProductItem({ name, price, quantity }) 
{
    return /* html */`
        <div class="order-history__item">
            <span class="order-history__item-name">${name}</span>
            <span>${price}</span>
            <span>x${quantity}</span>
        </div>
    `;
}


function OrderHistoryItem({id, products, date })
{
    const totalPrice = calcOrderTotal(products);

    return /* html */`
        <tr>
            <td>#${id}</td>
            <td>${products.map(ProductItem).join('')}</td>
            <td>$${totalPrice} / €${priceInEuro(totalPrice, ExchangeRate)}</td>
            <td>${format_date(date)}</td>
        </tr>
    `;
}



class OrdersHistory
{

    constructor() {
        
    }


    eventHandler() {
        
        fetch('/api/v1/orders')
            .then(res => res.json())
            .then(orders => {

                let list = orders.map(order => {
                    
                    const id = order.id;
                    const products = JSON.parse(order.products);
                    const date = new Date(order.created_at);

                    return OrderHistoryItem({id, products, date})

                }).join('');


                if( 0 === list.length ) {

                    el('.page__content').innerHTML = /* html */`
                        <p>Orders history empty!</p>
                    `;
                }
                else {
                    el('.orders__history').innerHTML = list;
                }
            });
    }


    render() {
        return /* html */`
            <div class="page">
                <div class="page__title">Orders History</div>
                
                <div class="page__content">
                    
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Products</th>
                                <th>Total Price</th>
                                <th>Order Date</th>
                            </tr>
                        </thead>
                        <tbody class="orders__history">
                           
                        </tbody>
                    </table>

                </div>
            </div>
        `;
    }
}


export default OrdersHistory;