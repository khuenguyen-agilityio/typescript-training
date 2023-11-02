export const MESSAGE_TITLE = {
  ADD_PRODUCT: 'ADD NEW PRODUCT',
  EDIT_PRODUCT: 'EDIT PRODUCT',
  DELETE_PRODUCT: 'DELETE THIS PRODUCT ?'
} as const

export const MESSAGE_SUCCESS = {
  GET_ALL_PRODUCT: 'Get all products successfully',
  ADD_PRODUCT: 'New product has been added successfully',
  EDIT_PRODUCT: 'Product has been updated successfully',
  DELETE_PRODUCT: 'Product has been deleted successfully'
} as const

export const MESSAGE_ERROR = {
  ADD_PRODUCT: 'Can not add new product',
  EDIT_PRODUCT: 'Can not update product',
  DELETE_PRODUCT: 'Can not delete product',
  GET_ALL_PRODUCT: 'Can not get all products information',
  EMPTY_FIELD: 'This field must not be empty',
  CHARACTERS: 'This field must have more than 8 alphabet characters.',
  GREATER_ZERO: 'This field must be greater than 0'
} as const
