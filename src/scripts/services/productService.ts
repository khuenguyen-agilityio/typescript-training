/*
 * Import base url
 */
import { BASE_URL } from '../constants/apis';

/*
 * Import messages
 */
import { MESSAGE_ERROR, MESSAGE_SUCCESS } from '../constants/message';
import { Product, ProductDto } from '../interfaces/product';

const productUrl = `${BASE_URL}/products`;

/*
 * getAllProducts() call get all product API from MockAPI
 * It will display error toast when get products unsuccessfully
 */
export const getAllProducts = async (): Promise<Product[]> => {
  const response = await fetch(productUrl);
  if (!response.ok) throw new Error(MESSAGE_ERROR.GET_ALL_PRODUCT);
  const data = await response.json();
  return data;
};

/*
 * addNewProduct() call add API from MockAPI
 * It will display success toast when add new product successfully
 * It will display error toast when add new product unsuccessfully
 * @param product
 */
export const addNewProduct = async (product: ProductDto): Promise<string> => {
  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  };
  const response = await fetch(productUrl, config);
  if (!response.ok) throw new Error(`${MESSAGE_ERROR.ADD_PRODUCT}`);
  return MESSAGE_SUCCESS.ADD_PRODUCT;
};

/*
 * editProductById() call edit API from MockAPI
 * It will display success toast when update product successfully
 * It will display error toast when update product unsuccessfully
 * @param productId, product
 */
export const editProductById = async (
  productId: number,
  product: ProductDto,
): Promise<string> => {
  const config = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  };
  const response = await fetch(productUrl + `/${productId}`, config);
  if (!response.ok) throw new Error(`${MESSAGE_ERROR.EDIT_PRODUCT}`);
  return MESSAGE_SUCCESS.EDIT_PRODUCT;
};

/*
 * deleteProductById() call delete API from MockAPI
 * It will display success toast when successfully delete
 * It will display error toast when delete product unsuccessfully
 * @param productId
 */
export const deleteProductById = async (productId: number | undefined): Promise<string> => {
  const config = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const response = await fetch(productUrl + `/${productId}`, config);
  if (!response.ok) throw new Error(`${MESSAGE_ERROR.DELETE_PRODUCT}`);
  return MESSAGE_SUCCESS.DELETE_PRODUCT;
};
