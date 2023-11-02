// Import constants
import { DISPLAY, MODAL_TYPE, STATUS, TABS, VISIBILITY } from '../constants';

// Import DOM Manipulation
import {
  modalAdd,
  titleModalAdd,
  buttonAdd,
  buttonCancelModalAdd,
  buttonCancelModalDelete,
  buttonConfirmDelete,
  buttonSidebar,
  modalDelete,
  titleModalDelete,
  formUpdate,
  formSearch,
  modalOverlay,
  sidebar,
  tabHeadings,
  textWarning,
  noProductFound,
  tableProduct,
  loadingSpinner,
  searchButton,
  inputFields,
  overlayClose,
  modalCloseButton,
} from '../dom';

// Import main sections
import {
  addNewProduct,
  deleteProductById,
  editProductById,
  getAllProducts,
} from '../services/productService';

// Import render products function
import { createToast, renderProducts, renderSidebar } from '../render';

// Import utils
import { checkValidate } from '../utils/validate';
import { filterArrayByValue } from '../utils/helpers';

// Import message title
import { MESSAGE_TITLE } from '../constants/message';
import { Product, ProductDto } from '../interfaces/product';
import { ModalType } from '../interfaces/common';

let isBestSeller = false;
let isShowed = false;
let currentId: number | undefined;

/*
 * eventLoader() contains all events of my application
 */
export const eventLoader = () => {
  // DOM load events
  handleRenderAllProducts();
  renderSidebar();

  // Common modal Events
  buttonCancelModalDelete.addEventListener('click', toggleModalConfirm);

  // Modal Update Events
  formUpdate.addEventListener('submit', submitForm);
  buttonAdd.addEventListener('click', toggleModalUpdate);
  overlayClose.addEventListener('click', closeModal);
  modalCloseButton.forEach((button) => {
    button.addEventListener('click', closeModal);
  });

  // Modal Confirm Events
  buttonCancelModalAdd.addEventListener('click', toggleModalUpdate);
  buttonConfirmDelete.addEventListener('click', handleDeleteProduct);

  // Search events
  formSearch.addEventListener('submit', (event) => {
    handleSearchProduct(event);
  });
  searchButton.addEventListener('click', handleSearchProduct);

  // Sidebar events
  buttonSidebar.addEventListener('click', toggleSidebar);

  // Util events
  handleSwitchTabs();
};

/*
 * handleRenderAllProducts() handle render all product to the table
 * If there are no product, it will display no product found error
 */
const handleRenderAllProducts = async () => {
  toggleLoadingSpinner(true);
  try {
    const response = await getAllProducts();
    renderProducts(response, isBestSeller);
  } catch (error) {
    createToast(STATUS.ERROR, (error as Error).message);
  } finally {
    toggleLoadingSpinner(false);
  }
};

/*
 * submitForm() submit the update modal form
 * It will get value from form
 * If user edit product, I will update the target product for user
 * Else it will add new product
 * Disabled button when click to avoid spam clicking
 */
const submitForm = async (event: Event) => {
  event.preventDefault();
  const submitButton = (event.target as HTMLFormElement).querySelector(
    'input[type="submit"]',
  ) as HTMLButtonElement;
  textWarning.forEach((warning) => {
    warning.style.visibility = VISIBILITY.HIDDEN;
  });
  const formData = new FormData(formUpdate);
  const product: ProductDto = {
    name: (formData.get('product-name') as string).trim(),
    price: Number(formData.get('product-price')),
  };
  if (checkValidate(product)) {
    try {
      let response;
      submitButton.disabled = true;
      currentId
        ? (response = await editProductById(currentId, product))
        : (response = await addNewProduct(product));
      toggleModalUpdate();
      submitButton.disabled = false;
      tableProduct.innerHTML = '';
      await handleRenderAllProducts();
      createToast(STATUS.SUCCESS, response);
    } catch (error) {
      toggleModalUpdate();
      createToast(STATUS.ERROR, (error as Error).message);
    }
  } else {
    handleInputField();
  }
};

/*
 * showEditModal() display the form with target product value
 * @param productId
 */
export const showEditModal = async (product: Product) => {
  currentId = product.id;
  toggleModal(MODAL_TYPE.UPDATE, MESSAGE_TITLE.EDIT_PRODUCT);
  inputFields[0].value = product.name;
  inputFields[1].value = product.price.toString();
};

/*
 * handleDeleteProduct() delete product with currentId
 * @param productId
 */
export const handleDeleteProduct = async () => {
  buttonConfirmDelete.disabled = true;
  try {
    const response = await deleteProductById(currentId);
    await handleRenderAllProducts();
    createToast(STATUS.SUCCESS, response);
  } catch (error) {
    createToast(STATUS.ERROR, (error as Error).message);
  } finally {
    buttonConfirmDelete.disabled = false;
    toggleModalConfirm();
  }
};

/*
 * handleSearchProduct() take search value from form
 * If searchString is empty, it will render all products
 * Else it will search products by name
 */
export const handleSearchProduct = async (event: Event) => {
  event.preventDefault();
  tableProduct.innerHTML = '';
  noProductFound.style.display = DISPLAY.NONE;
  const formData = new FormData(formSearch);
  const searchString = formData.get('search-field') as string;
  toggleLoadingSpinner(true);
  const products = await getAllProducts();
  searchString === ''
    ? renderProducts(products, isBestSeller)
    : searchProductsByName(products, searchString);
  toggleLoadingSpinner(false);
};

/*
 * handleSwitchTabs() handle click event when user click on tab item
 * If tab's classes doesn't have text-active class, it will remove all class with text-active class
 * Each tab will has its id and function
 */
const handleSwitchTabs = () => {
  tabHeadings.forEach((tab) => {
    tab.addEventListener('click', async function () {
      if (!this.classList.contains('text-active')) {
        tableProduct.innerHTML = '';
        resetTabs('text-active');
        this.classList.add('text-active');
        switch (this.id) {
          case TABS.ALL_PRODUCT:
            isBestSeller = false;
            handleRenderAllProducts();
            break;
          case TABS.BEST_SELLER:
            isBestSeller = true;
            handleRenderAllProducts();
            break;
        }
      }
    });
  });
};

/*
 * handleInputField() will remove class invalid-field when click on the input
 */
const handleInputField = () => {
  let index = 0;
  inputFields.forEach((field) => {
    const order = index;
    if (field.classList.contains('invalid-field')) {
      field.addEventListener('click', () => {
        field.classList.remove('invalid-field');
        textWarning[order].style.visibility = VISIBILITY.HIDDEN;
      });
    }
    index += 1;
  });
};

/*
 * searchProductByName() will search products with input name from all products
 * If found, it will render products to the table
 * Else, it will display no product found error
 * @param searchString
 */
const searchProductsByName = (products: Product[], searchString: string) => {
  const searchProducts = filterArrayByValue(products, searchString);
  renderProducts(searchProducts, isBestSeller);
};

/*
 * toggleModal() will toggle display of target type modal
 * If modal is showed, base on type it will be hidden and do actions
 * Else, base on type it will be visible and load title
 * @param type, title
 */
const toggleModal = (type: ModalType, title: string) => {
  if (isShowed) {
    closeModal();
  } else {
    isShowed = true;
    modalOverlay.style.visibility = VISIBILITY.VISIBLE;
    switch (type) {
      case MODAL_TYPE.UPDATE:
        modalAdd.style.visibility = VISIBILITY.VISIBLE;
        titleModalAdd.innerHTML = title;
        break;
      case MODAL_TYPE.CONFIRM:
        modalDelete.style.visibility = VISIBILITY.VISIBLE;
        titleModalDelete.innerHTML = title;
        break;
    }
  }
};

/*
 * toggleModalUpdate() toggle modal update display
 */
const toggleModalUpdate = () => {
  resetFormUpdate();
  toggleModal(MODAL_TYPE.UPDATE, MESSAGE_TITLE.ADD_PRODUCT);
};

/*
 * setCurrentId() set value of currentId base on productId
 * This currentId is used to edit/delete product
 * @param productId
 */
export const setCurrentId = (productId: number) => {
  currentId = productId;
};

/*
 * toggleModalConfirm() toggle display of modal confirm
 * It will set currentId equal productId to handle delete product
 * @param productId
 */
export const toggleModalConfirm = () => {
  toggleModal(MODAL_TYPE.CONFIRM, MESSAGE_TITLE.DELETE_PRODUCT);
};

/*
 * toggleSidebar() switch display block and none of sidebar
 */
const toggleSidebar = () => {
  sidebar.classList.toggle('close');
};

/*
 * toggleLoadingSpinner() switch display flex and none of loading indicator
 * If true, it will display flex
 * Else, it will display none
 */
const toggleLoadingSpinner = (status: boolean) => {
  loadingSpinner.style.display = status ? DISPLAY.FLEX : DISPLAY.NONE;
};

/*
 * resetTabs will remove target class name from DOM : tabHeadings
 * @param className
 */
const resetTabs = (className: string) => {
  tabHeadings.forEach((tab) => {
    tab.classList.remove(className);
  });
};

/*
 * resetFormUpdate() will reset form update & invalid display of form
 */
const resetFormUpdate = () => {
  textWarning.forEach((warning) => {
    warning.style.visibility = VISIBILITY.HIDDEN;
  });
  inputFields.forEach((field) => {
    field.classList.remove('invalid-field');
  });
  formUpdate.reset();
};

/*
 * closeModal() will close all modals
 */
const closeModal = () => {
  resetFormUpdate();
  isShowed = false;
  currentId = undefined;
  modalOverlay.style.visibility = VISIBILITY.HIDDEN;
  modalAdd.style.visibility = VISIBILITY.HIDDEN;
  modalDelete.style.visibility = VISIBILITY.HIDDEN;
};
