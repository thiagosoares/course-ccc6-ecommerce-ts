import Order from "../../src/domain/entity/Order";
import Cpf from "../../src/domain/entity/Cpf";
import Coupon from "../../src/domain/entity/Coupon";
import Item from "../../src/domain/entity/Item";
import Dimension from "../../src/domain/entity/Dimension";

const VALID_CPF = "014.662.210-38"
const INVALID_CPF = "014.662.210-00"

test("GIVEN a valid cpf, WHEN create a Order, THEN create a empty order", () => {
    const order = new Order(VALID_CPF)
    expect(order.cpf.cpf).toBe(VALID_CPF)
    expect(order.getOrderSize()).toBe(0)

})

test("GIVEN a valid cpf and 3 items, WHEN create a Order, THEN create a non empty order", () => {
    const order = getValidOrder();
    expect(order.cpf.cpf).toBe(VALID_CPF)
    expect(order.getOrderSize()).toBe(3)
    expect(order.getTotalOrder()).toBe(1887.97)
})


test("GIVEN a valid cpf and 3 items and dimensions, WHEN create a Order, THEN create a order and get freight", () => {
    const order = getValidOrderWithDimensions();
    expect(order.cpf.cpf).toBe(VALID_CPF)
    expect(order.getOrderSize()).toBe(3)
    expect(order.getTotalOrder()).toBe(2007.97)
})


test("GIVEN a order with coupon, WHEN create a Order, THEN create a order ", () => {
    const order = getValidOrder();
    order.applyCoupon(new Coupon("20FF", 20))
    expect(order.cpf.cpf).toBe(VALID_CPF)
    expect(order.getOrderSize()).toBe(3)
    expect(order.getTotalOrder()).toBe(1510.38)
})

test("GIVEN a order with invalid coupon, WHEN create a Order, THEN get a coupon error", () => {
    const order = getValidOrder();
    expect(() => order.applyCoupon(new Coupon("20FF", -1))).toThrow(new Error(Coupon.ERROR_INVALID_COUPON))
})

test("GIVEN a empty order with coupon, WHEN create a Order, THEN create a order ", () => {
    const order = new Order(VALID_CPF)
    order.applyCoupon(new Coupon("20FF", 20))
    expect(order.cpf.cpf).toBe(VALID_CPF)
    expect(order.getOrderSize()).toBe(0)
    expect(order.getTotalOrder()).toBe(0)
})


test("GIVEN a invalid cpf, WHEN create a Order, THEN throw a error", () => {
    expect(() => new Order(INVALID_CPF)).toThrow(new Error(Cpf.ERROR_INVALID_CPF))
})

// TODO Test sem dimenções, sem frete


function getValidOrder() {
    const order = new Order(VALID_CPF)
    order.addItem(new Item(1, "Helmet", 159.99), 1)
    order.addItem(new Item(2, "Gloves", 113.99), 2)
    order.addItem(new Item(3, "Boots", 1500), 1)
    return order;
}

function getValidOrderWithDimensions() {
    const order = new Order(VALID_CPF)
    order.addItem(new Item(1, "Helmet", 159.99, new Dimension(40, 40, 40), 3), 1)
    order.addItem(new Item(2, "Gloves", 113.99, new Dimension(20, 30, 10), 3), 2)
    order.addItem(new Item(3, "Boots", 1500, new Dimension(50, 500, 100), 3), 1)
    return order;
}
