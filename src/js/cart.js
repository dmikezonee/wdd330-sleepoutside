import { getLocalStorage, loadHeaderFooter } from './utils.mjs';

const productList = document.querySelector('.product-list');

function renderCartContents() {
  const cartItems = getLocalStorage('so-cart') || [];

  if (cartItems.length === 0) {
    productList.innerHTML = '<li>Your cart is empty.</li>';
    return;
  }

  const htmlItems = cartItems.map((item) => cartItemTemplate(item));

  productList.innerHTML = htmlItems.join('');
}

function cartItemTemplate(item) {
  return `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img src="${item.Image}" alt="${item.Name}" />
    </a>

    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>

    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>

    <button
      type="button"
      class="cart-card__remove"
      data-id="${item.Id}"
      aria-label="Remove ${item.Name} from cart"
    >X</button>
  </li>`;
}

// Listen for clicks on remove buttons
productList.addEventListener('click', (event) => {
  const removeButton = event.target.closest('.cart-card__remove');

  if (!removeButton) return;

  const productId = removeButton.dataset.id;
  const cartItems = getLocalStorage('so-cart') || [];

  const itemIndex = cartItems.findIndex(
    (item) => String(item.Id) === String(productId),
  );

  if (itemIndex !== -1) {
    cartItems.splice(itemIndex, 1);

    localStorage.setItem('so-cart', JSON.stringify(cartItems));

    renderCartContents();
  }
});

loadHeaderFooter();
renderCartContents();