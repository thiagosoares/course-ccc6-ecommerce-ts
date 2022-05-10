
export default class Coupon {

    static ERROR_INVALID_COUPON = "Invalid coupon"

    constructor(
        readonly code: string,
        readonly percentage: number,
        readonly expireDate: Date = new Date()
    ) {
        this.validate(percentage)
    }

    private validate(percentage: number) {
        this.validatePercentage(percentage)
    }

    private validatePercentage(percentage: number) {
        if (percentage < 0) {
            throw new Error(Coupon.ERROR_INVALID_COUPON)
        }
    }

    isExpired (today: Date) {
        return today.getTime() > this.expireDate.getTime();
    }

    applyDiscount(total: number) {
        return Number((total * (100 - this.percentage) / 100).toFixed(2))
    }
}