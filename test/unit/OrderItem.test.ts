import OrderItem from "../../src/domain/entity/OrderItem";

test("GIVEN a valid input, WHEN create a Order item, THEN create a valid order item", function() {
	const orderItem = new OrderItem(1, 1000, 2);
	expect(orderItem.getTotal()).toBe(2000);
});
