export const validationError = error => ({
  type: 'VALIDATION_ERROR',
  payload: error
});

export const clearError = () => ({
  type: 'CLEAR_ERROR'
});
