import { ShoppingCart } from './shopping-cart';

export class Order {
    datePlace: number;
    items: any[];
    constructor(public userId, public shipping: any, shoppingCart: ShoppingCart) {
        this.datePlace = new Date().getTime();

        this.items = shoppingCart.items.map(i => {
            return {
                product: {
                    title: i.title,
                    imageUrl: i.imageUrl,
                    price: i.price,
                },
                quantity: i.quantity,
                totalPrice: i.totalPrice
            }
        })
    }


    private storeItems() {

    }
}