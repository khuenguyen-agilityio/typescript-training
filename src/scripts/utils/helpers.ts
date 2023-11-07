// Import visibility value
import { VISIBILITY } from '@/constants';

// Import text warning DOM
import { inputFields, textWarning } from '@/dom';
import { Product } from '@/interfaces/product';

/*
 * displayWarningMessage() display warning message
 * @param index, message
 */
export const displayWarningMessage = (index: number, message: string) => {
  inputFields[index].classList.add('invalid-field');
  textWarning[index].innerHTML = message;
  textWarning[index].style.visibility = VISIBILITY.VISIBLE;
};

/*
 * filterArrayByValue() return arrays with type filter and value filter
 * @param products, filterValue
 */
export const filterArrayByValue = (array: Product[], filterValue?: string) => {
  return array.filter((item) => {
    return filterValue
      ? item.name.toLowerCase().includes(filterValue.toLowerCase())
      : item.isBestSeller;
  });
};

/*
 * querySelector() queries an HTML element based on the given selector
 * @param selector
 */
export const querySelector = <T extends HTMLElement>(selector: string): T =>
  document.querySelector(selector) as T;

/*
 * querySelectorAll() queries all HTML element based on the given selector
 * @param selector
 */
export const querySelectorAll = <T extends HTMLElement>(
  selector: string,
): NodeListOf<T> => document.querySelectorAll(selector);
