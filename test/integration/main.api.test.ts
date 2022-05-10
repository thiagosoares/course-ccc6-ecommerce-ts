import axios from "axios";

test("GIVEN a running api, WHER get /items THEN get 3 items on response", async function () {
	const response = await axios({
		url: "http://localhost:3000/items",
		method: "get"
	});
	const items = response.data;
	expect(items).toHaveLength(3);
});
