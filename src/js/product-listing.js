import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';
import { loadHeaderFooter, getParam, qs } from './utils.mjs';

// Load the shared header and footer
loadHeaderFooter();

// Get the selected category from the URL
const category = getParam('category') || 'tents';

// Create the data source
const dataSource = new ProductData(category);

// Get the product list element
const listElement = qs('.product-list');

// Create and initialize the product list
const productList = new ProductList(
  category,
  dataSource,
  listElement,
);

productList.init();