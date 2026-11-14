function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error('Bad Response');
  }
}

export default class ProductData {
  constructor(category) {
    this.category = category;
    this.basePath = `${import.meta.env.BASE_URL}json/`;
  }

  async getData(category = this.category) {
    if (!category) {
      throw new Error('A product category is required.');
    }

    const response = await fetch(
      `${this.basePath}${category}.json`,
    );

    return convertToJson(response);
  }

  async findProductById(id) {
    const categories = ['tents', 'backpacks', 'sleeping-bags'];

    for (const category of categories) {
      const products = await this.getData(category);

      const product = products.find(
        (item) => String(item.Id) === String(id),
      );

      if (product) {
        return product;
      }
    }

    throw new Error(`Product with ID ${id} was not found.`);
  }
}