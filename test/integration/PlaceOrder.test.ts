import ItemRepositoryMemory from "../../src/infra/repository/memory/ItemRepositoryMemory";
import OrderRepositoryMemory from "../../src/infra/repository/memory/OrderRepositoryMemory";
import PlaceOrder from "../../src/application/PlaceOrder";
import MockData from "./MockData";

test("GIVEN a order input, WHERE execute, THEN calculate the total", async function () {
	const itemRepository = new ItemRepositoryMemory();
	MockData.loadItemMockData(itemRepository)
	const orderRepository = new OrderRepositoryMemory();
	const placeOrder = new PlaceOrder(itemRepository, orderRepository);
	const input = {
		cpf: "935.411.347-80",
		orderItems: [
			{ idItem: 1, quantity: 1 },
			{ idItem: 2, quantity: 1 },
			{ idItem: 3, quantity: 3 }
		]
	};
	const output = await placeOrder.execute(input);
	expect(output.total).toBe(6350);
});
