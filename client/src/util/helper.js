export function renderFromProp(prop, field) {
  if (prop) {
    return prop[field] || '';
  }
  return '';
}

export function getCurrentPath() {
  const pathname = window.location.pathname;
  if (pathname.match(/folder/)) {
    return '/app/folder';
  } else if (pathname.match(/document/)) {
    return '/app/document'
  }
  return pathname;
}

export function setLocalstorage(key, value) {
  console.log('setting locastorage');
  let storedValue;
  return new Promise((resolve) => {
    if (!window.localStorage) {
      resolve('testtoken');
    } else {
      window.localStorage.setItem(key, value);
      storedValue = window.localStorage.getItem(key);
      if (storedValue) {
        resolve(storedValue);
      }
    }
  });
}
