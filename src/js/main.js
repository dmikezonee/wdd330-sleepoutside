import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';
import Alert from './Alert.js';
import {
  qs,
  loadHeaderFooter,
} from './utils.mjs';

// Load the shared header and footer
loadHeaderFooter();

// Load and display products
const dataSource = new ProductData('tents');
const listElement = qs('.product-list');

const productList = new ProductList('tents', dataSource, listElement);

productList.init();

// Load and display alerts
const alert = new Alert();
alert.init();