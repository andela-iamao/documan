export default (prop, field) => {
  if (prop) {
    return prop[field] || '';
  }
  return '';
};
