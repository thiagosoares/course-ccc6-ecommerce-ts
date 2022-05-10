import ItemRepositoryDatabase from "../../src/infra/repository/database/ItemRepositoryDatabase";
import PostgreSqlConnectionAdapter from "../../src/infra/database/PostgreSqlConnectionAdapter"
import Connection from "../../src/infra/database/Connection";


let connection: Connection;

beforeAll(() => {
	connection = new PostgreSqlConnectionAdapter();
});

afterAll(() => {
	return connection.close
});

test("GIVEN a database, WHEN query, THEN get items", async function () {
	// const connection = new PostgreSqlConnectionAdapter();
	const itemRepository = new ItemRepositoryDatabase(connection);
	const items = await itemRepository.list();
	expect(items).toHaveLength(3);
});
