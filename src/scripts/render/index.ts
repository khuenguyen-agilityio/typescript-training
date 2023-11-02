// Import constants
import { DISPLAY, TOAST_TIME_OUT, TOAST_TYPE } from '../constants';
import { SIDEBAR_ITEMS } from '../constants/sidebar';

// Import button & table DOM
import {
  buttonDelete,
  buttonEdit,
  noProductFound,
  notifications,
  sidebarList,
  tableProduct,
} from '../dom';

// Import event
import {
  setCurrentId,
  showEditModal,
  toggleModalConfirm,
} from '../events';

//Import interface
import { Product } from '../interfaces/product';
import { ToastType } from '../interfaces/common';

// Import utils
import { filterArrayByValue } from '../utils/helpers';

/*
 * renderProducts() will render all products into a table
 * @param isBestSeller, products
 */
export const renderProducts = (products: Product[], isBestSeller: boolean) => {
  if (products.length > 0) {
    noProductFound.style.display = DISPLAY.NONE;
    tableProduct.innerHTML = '';
    let order = 1;
    let temp = `
    <p class="table-item item-active">NO</p>
    <p class="table-item item-active">PRODUCT NAME</p>
    <p class="table-item item-active">PRICE</p>
    <p class="table-item item-active">ACTIONS</p>
  `;
    const tableRow = document.createElement('li');
    tableRow.className = 'table-row item-active';
    tableRow.innerHTML = temp;
    tableProduct.appendChild(tableRow);
    isBestSeller
      ? (products = filterArrayByValue(products))
      : products.reverse();
    products.forEach((product: Product) => {
      temp = `
    <p class="table-item">${order}</p>
    <p class="table-item">${product.name}</p>
    <p class="table-item item-active">$${product.price}</p>
    <div class="wrapper-btn d-flex-center-center">
      <button id="edit-${product.id}" class="btn btn-primary" aria-label="This button open update modal">
        <p class="text-regular">Update</p>
        <i class="fa-solid fa-pencil"></i>
        </button>
      <button id="delete-${product.id}" class="btn btn-secondary" aria-label="This button open the confirm delete modal">
        <p class="text-regular">Delete</p>
        <i class="fa-solid fa-eraser"></i>
      </button>
    </div>
    `;
      const newRow = document.createElement('li');
      newRow.className = 'table-row';
      newRow.innerHTML = temp;
      tableProduct.appendChild(newRow);
      buttonEdit(product.id).addEventListener('click', () => {
        showEditModal(product);
      });
      buttonDelete(product.id).addEventListener('click', () => {
        setCurrentId(product.id);
        toggleModalConfirm();
      });
      order += 1;
    });
  } else {
    noProductFound.style.display = DISPLAY.FLEX;
  }
};

/*
 * removeToast() will add 'hide' class into the target toast
 * The target toast will be remove after 500ms
 * @param toast
 */
const removeToast = (toast: HTMLLIElement) => {
  toast.classList.add('hide');
  setTimeout(() => toast.remove(), 500);
};

/*
 * createToast() display the toast in top right corner
 * The toast will be hide after 5 seconds or click close icon
 * @param type, message
 */
export const createToast = (type: ToastType, message: string) => {
  const toast = document.createElement('li');
  toast.className = `toast ${type.toLowerCase()} d-flex-between-center`;
  toast.innerHTML = `
    <div class="wrapper-message">
    <i class="fa-solid ${TOAST_TYPE[type]}"></i>
    <span class="text-regular">${message}</span>
    </div>
    <i id="toast-close-btn" class="fa-solid fa-xmark"></i>`;
  const closeIcon = toast.querySelector('#toast-close-btn') as HTMLElement;
  closeIcon.addEventListener('click', () => {
    removeToast(toast);
  });
  notifications.appendChild(toast);
  setTimeout(() => removeToast(toast), TOAST_TIME_OUT);
};

/*
 * renderSidebar() render the sidebar of project
 */
export const renderSidebar = () => {
  SIDEBAR_ITEMS.forEach((item) => {
    const newItem = document.createElement('li');
    if (item.TEXT === 'SUPPORT') {
      newItem.className = 'sidebar-title text-side-item';
      newItem.innerHTML = item.TEXT;
    } else {
      item.ACTIVE
        ? (newItem.className = 'sidebar-item item-active')
        : (newItem.className = 'sidebar-item');
      const temp = `
        <a class="wrapper-item" href="#">
        <img
          class="item-icon"
          src="${item.URL}"
          alt="${item.ALT}"
          width="20"
          height="20"
        >
        <span class="text-side-item">${item.TEXT}</span>
        </a>
      `;
      newItem.innerHTML = temp;
    }
    sidebarList.appendChild(newItem);
  });
};
