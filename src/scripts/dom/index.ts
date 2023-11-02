// Import DOM helper
import { querySelector, querySelectorAll } from '../utils/helpers';

// Layouts & components
export const tableProduct = querySelector<HTMLUListElement>('.table-bordered');
export const sidebar = querySelector<HTMLElement>('.sidebar');
export const noProductFound =
  querySelector<HTMLDivElement>('.no-product-found');
export const loadingSpinner = querySelector<HTMLDivElement>('.loading-spinner');
export const sidebarList = querySelector<HTMLUListElement>('.sidebar-list');

// Notifications
export const notifications = querySelector<HTMLUListElement>('.notifications');

// Modal
export const modalOverlay = querySelector('.modal');
export const overlayClose = querySelector<HTMLDivElement>('.overlay-close');
export const modalAdd = querySelector<HTMLDivElement>('.add-modal');
export const modalDelete = querySelector<HTMLDivElement>('.delete-modal');

// Form
export const formUpdate = querySelector<HTMLFormElement>('#form-update');
export const formSearch = querySelector<HTMLFormElement>('#form-search');
export const formSearchField = querySelector<HTMLInputElement>('.search-input');
export const tabHeadings = querySelectorAll(
  '.wrapper-tabheading .text-regular',
);
export const inputFields = querySelectorAll<HTMLInputElement>(
  '#form-update .input-field',
);

// Titles & texts
export const textWarning =
  querySelectorAll<HTMLParagraphElement>('.text-warning');
export const titleModalAdd = querySelector<HTMLHeadingElement>(
  '.add-modal .modal-title',
);
export const titleModalDelete = querySelector<HTMLHeadingElement>(
  '.delete-modal .modal-title',
);

// Buttons
export const buttonAdd = querySelector<HTMLButtonElement>('#btn-add-product');
export const buttonSubmit = querySelector<HTMLButtonElement>(
  '#form-update .wrapper-btn .btn-primary',
);
export const buttonCancelModalAdd = querySelector<HTMLButtonElement>(
  '#form-update .wrapper-btn .btn-secondary',
);
export const buttonConfirmDelete = querySelector<HTMLButtonElement>(
  '.delete-modal .wrapper-btn .btn-primary',
);
export const buttonCancelModalDelete = querySelector<HTMLButtonElement>(
  '.delete-modal .wrapper-btn .btn-secondary',
);
export const buttonEdit = (productId: number) =>
  querySelector<HTMLButtonElement>(`#edit-${productId}`);
export const buttonDelete = (productId: number) =>
  querySelector<HTMLButtonElement>(`#delete-${productId}`);
export const buttonSidebar = querySelector<HTMLButtonElement>('#btn-sidebar');
export const searchButton = querySelector<HTMLButtonElement>(
  '#form-search .search-icon',
);
export const modalCloseButton =
  querySelectorAll<HTMLButtonElement>('.modal .fa-xmark');
