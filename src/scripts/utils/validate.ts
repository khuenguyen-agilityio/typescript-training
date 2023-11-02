// Import REGEX
import { PRODUCT_NAME_REGEX } from '../constants';

// Import message
import { MESSAGE_ERROR } from '../constants/message';

//Import interface
import { ProductDto } from '../interfaces/product';

// Import helper function
import { displayWarningMessage } from './helpers';

/*
 * isValidProduct() validate field and display warning message
 * @param value
 TODO : find another way to optimize this code
 */
export const checkValidate = (value: ProductDto) => {
  let isValid = true;
  if (value.name === '') {
    isValid = false;
    displayWarningMessage(0, MESSAGE_ERROR.EMPTY_FIELD);
  } else if (!checkValidateByName(value.name)) {
    isValid = false;
    displayWarningMessage(0, MESSAGE_ERROR.CHARACTERS);
  }

  if (value.price <= 0) {
    isValid = false;
    displayWarningMessage(1, MESSAGE_ERROR.GREATER_ZERO);
  }
  return isValid;
};

/*
 * checkValidateByName() return true when value has at least 8 character & vice versa
 * @param value
 */
const checkValidateByName = (value: string) => {
  return PRODUCT_NAME_REGEX.test(value);
};
