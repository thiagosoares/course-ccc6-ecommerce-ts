import Item from "../entity/Item";

export default interface ItemRepository {

	get(id: number): Promise<Item>;
	save(item: Item): Promise<void>;
	list(): Promise<Item[]>;

}
