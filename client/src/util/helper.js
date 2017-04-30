export function renderFromProps(prop, field) {
  if (prop) {
    return prop[field] || '';
  }
  return '';
}

export function getCurrentPath() {
  return window.location.pathname;
}

export function setLocalstorage(key, value) {
  let storedValue;
  return new Promise((resolve) => {
    window.localStorage.setItem(key, value);
    storedValue = window.localStorage.getItem(key);
    if (storedValue) {
      resolve(storedValue);
    }
  });
}
