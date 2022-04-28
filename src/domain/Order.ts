import Coupon from "./Coupon";
import Cpf from "./Cpf";
import OrderItem from "./OrderItem";

export default class Order {

    readonly cpf: Cpf
    private coupon?: Coupon
    private items: OrderItem[]

    constructor(cpf: string, coupon?: Coupon) {
        this.cpf = new Cpf(cpf)
        this.coupon = coupon
        this.items = []
    }

    getOrderSize() {
        return this.items.length
    }

    addItem(item: OrderItem) {
        this.items.push(item)
    }

    applyCoupon(coupon: Coupon) {
        this.coupon = coupon;
    }

    getTotalOrder() {
        let total = this.buildTotal()
        total = this.applyCouponDiscount(total);
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
}