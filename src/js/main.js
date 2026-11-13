import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';
import Alert from './Alert.js';
import { qs, loadHeaderFooter } from './utils.mjs';

loadHeaderFooter();

// Load and display top products
const dataSource = new ProductData();
const listElement = qs('.product-list');

const productList = new ProductList('tents', dataSource, listElement);
productList.init();

// Load alerts
const alert = new Alert();
alert.init();