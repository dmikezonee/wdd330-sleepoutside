import { setLocalStorage } from './utils.mjs';

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.dataSource = dataSource;
  }

  async init() {
    this.product = await this.dataSource.findProductById(this.productId);

    if (!this.product) {
      console.error('Product not found');
      return;
    }

    this.renderProductDetails();
    this.addToCart();
  }

  renderProductDetails() {
    document.querySelector('h3').textContent = this.product.Brand.Name;

    document.querySelector('h2.divider').textContent =
      this.product.NameWithoutBrand;

    const productImage = document.querySelector('img.divider');

    const imagePath = this.product.Image.replace(
      '../images/',
      `${import.meta.env.BASE_URL}images/`,
    );

    productImage.src = imagePath;
    productImage.alt = this.product.Name;

    document.querySelector('.product-card__price').textContent =
      `$${Number(this.product.FinalPrice).toFixed(2)}`;

    document.querySelector('.product__color').textContent =
      this.product.Colors[0].ColorName;

    document.querySelector('.product__description').innerHTML =
      this.product.DescriptionHtmlSimple;

    document.title = `Sleep Outside | ${this.product.Name}`;
  }

  addToCart() {
    const addToCartButton = document.getElementById('addToCart');

    addToCartButton.dataset.id = this.product.Id;

    addToCartButton.addEventListener('click', () => {
      setLocalStorage('so-cart', this.product);
    });
  }
}