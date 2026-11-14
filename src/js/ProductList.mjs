import { renderListWithTemplate } from './utils.mjs';

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    try {
      const list = await this.dataSource.getData(this.category);
      this.renderList(list);
    } catch (error) {
      console.error('Error loading products:', error);
    }
  }

  renderList(list) {
    renderListWithTemplate(
      this.productCardTemplate,
      this.listElement,
      list,
      'afterbegin',
      true,
    );
  }

  productCardTemplate(product) {
    const imagePath = product.Image.replace(
      '../images/',
      `${import.meta.env.BASE_URL}images/`,
    );

    return `
      <li class="product-card">
        <a href="${import.meta.env.BASE_URL}product_pages/index.html?product=${product.Id}">
          <img src="${imagePath}" alt="${product.Name}" />
          <h3 class="card__brand">${product.Brand.Name}</h3>
          <h2 class="card__name">${product.NameWithoutBrand}</h2>
          <p class="product-card__price">$${product.FinalPrice}</p>
        </a>
      </li>
    `;
  }
}