import Item from "../../src/domain/entity/Item";
import Dimension from "../../src/domain/entity/Dimension";
import ItemRepository from "../../src/domain/repository/ItemRepository";

export default class MockData {

    static loadItemMockData(itemRepository: ItemRepository) {
        itemRepository.save(this.getHelmetItem());
        itemRepository.save(this.getGloveItem());
        itemRepository.save(this.getBootItem());
    }

    static getHelmetItem() {
        return new Item(1, "Helmet", 1000, new Dimension(100, 30, 10), 3)
    }

    static getGloveItem() {
        return new Item(2, "Amplificador", 5000, new Dimension(50, 50, 50), 20)
    }

    static getBootItem() {
        return new Item(3, "Cabo", 30, new Dimension(10, 10, 10), 1)
    }

}