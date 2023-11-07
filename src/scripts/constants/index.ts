// Regex variables
export const PRODUCT_NAME_REGEX = /^(?![\d\s]{8,})(?!.*\s{8,})[\s\S]{8,}$/;

// Display
export const DISPLAY = {
  NONE: 'none',
  BLOCK: 'block',
  FLEX: 'flex',
};

// Visibility
export const VISIBILITY = {
  VISIBLE: 'visible',
  HIDDEN: 'hidden',
};

// Toast
export const TOAST_TYPE = {
  SUCCESS: 'fa-circle-check',
  ERROR: 'fa-circle-xmark',
};
export const TOAST_TIME_OUT = 5000;

// Tabs
export const TABS = {
  ALL_PRODUCT: 'all-products-tab',
  BEST_SELLER: 'best-seller-tab',
};

// Status
export const enum STATUS {
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

// Modal
export const enum MODAL_TYPE {
  UPDATE = 'update',
  CONFIRM = 'confirm',
}
