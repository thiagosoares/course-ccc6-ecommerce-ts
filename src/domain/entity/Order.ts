import Coupon from "./Coupon";
import Cpf from "./Cpf";
import OrderItem from "./OrderItem";
import Freight from "./Freight";
import Item from "./Item";

export default class Order {

    readonly cpf: Cpf
    private coupon?: Coupon
    private items: OrderItem[]
    freight = new Freight();

    constructor(cpf: string, coupon?: Coupon) {
        this.cpf = new Cpf(cpf)
        this.coupon = coupon
        this.items = []
    }

    getOrderSize() {
        return this.items.length
    }

    addItem (item: Item, quantity: number) {
        this.freight.addItem(item, quantity);
        this.items.push(new OrderItem(item.idItem, item.price, quantity));
    }

    applyCoupon(coupon: Coupon) {
        this.coupon = coupon;
    }

    getTotalOrder() {
        let total = this.buildTotal()
        total = this.applyCouponDiscount(total);
        total = this.applyFreight(total);
        return total
    }

    private buildTotal() {
        return this.items.reduce((total, item) => {
            total += item.getTotal()
            return total
        }, 0);
    }

    private applyCouponDiscount(total: number) {
        if (this.coupon) {
            total = this.coupon.applyDiscount(total)
        }
        return total;
    }

    private applyFreight(total: number) {
        total += this.freight.getTotal();
        return total;
    }

}