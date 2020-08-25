import userOrders from "../var/user_orders.js";
import { format_date } from "../Core/helpers.js";



function calcTotalPrice(products) 
{
    const total = products.reduce(
        (total, current) => total + (current.price * current.quantity), 0
    );
    
    return Math.round(total, 2);
}


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


function OrderHistoryItem({ id, products, date })
{
    const totalPrice = calcTotalPrice(products);

    return /* html */`
        <tr>
            <td>#${id}</td>
            <td>${products.map(ProductItem).join('')}</td>
            <td>$${totalPrice} / €${totalPrice}</td>
            <td>${format_date(date)}</td>
        </tr>
    `;
}



class OrdersHistory
{
    render() {
        return /* html */`
            <div class="page">
                <div class="page__title">Orders History</div>
                
                <div class="page__body">
                    
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Products</th>
                                <th>Total Price</th>
                                <th>Order Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${userOrders.map(OrderHistoryItem).join('')}
                        </tbody>
                    </table>

                </div>
            </div>
        `;
    }
}


export default OrdersHistory;