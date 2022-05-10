import GetItems from "../../src/application/GetItems";
import ItemRepositoryMemory from "../../src/infra/repository/memory/ItemRepositoryMemory";
import MockData from "./MockData";

test("GIVEN in memory database, WHEN query, THEN get items", async function () {
	const itemRepository = new ItemRepositoryMemory();
	MockData.loadItemMockData(itemRepository);
	const getItems = new GetItems(itemRepository);
	const output = await getItems.execute();
	expect(output).toHaveLength(3);
});

