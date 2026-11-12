// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

// save data to local storage
export function setLocalStorage(key, data) {
  const storedData = getLocalStorage(key);

  const existingData = Array.isArray(storedData)
    ? storedData
    : storedData
      ? [storedData]
      : [];

  existingData.push(data);

  localStorage.setItem(key, JSON.stringify(existingData));
}

// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener('touchend', (event) => {
    event.preventDefault();
    callback();
  });

  qs(selector).addEventListener('click', callback);
}

// get a parameter from the URL
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}

// render a list of items using a template function
export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = 'afterbegin',
  clear = false,
) {
  if (clear) {
    parentElement.innerHTML = '';
  }

  const htmlStrings = list.map(templateFn);

  parentElement.insertAdjacentHTML(position, htmlStrings.join(''));
}

// render a template into an HTML element
export function renderWithTemplate(
  template,
  parentElement,
  data,
  callback,
) {
  parentElement.innerHTML = template;

  if (callback) {
    callback(data);
  }
}

// load an HTML template from a file
export async function loadTemplate(path) {
  const response = await fetch(path);

  if (!response.ok) {
    throw new Error(`Could not load template: ${path}`);
  }

  return response.text();
}

// load the shared header and footer
export async function loadHeaderFooter() {
  const base = import.meta.env.BASE_URL;

  let headerTemplate = await loadTemplate(
    `${base}partials/header.html`,
  );

  let footerTemplate = await loadTemplate(
    `${base}partials/footer.html`,
  );

  // Replace the base URL placeholder with the correct project path
  headerTemplate = headerTemplate.replaceAll('{{BASE_URL}}', base);

  footerTemplate = footerTemplate.replaceAll('{{BASE_URL}}', base);

  const headerElement = qs('#main-header');
  const footerElement = qs('#main-footer');

  if (headerElement) {
    renderWithTemplate(headerTemplate, headerElement);
  }

  if (footerElement) {
    renderWithTemplate(footerTemplate, footerElement);
  }
}