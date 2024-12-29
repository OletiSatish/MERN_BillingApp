// Authentication
export const LOGIN = 'auth/login';
export const LOGOUT = 'auth/logout';
export const REGISTER = 'auth/register';
export const LOGIN_SUCCESS = 'auth/loginSuccess';
export const LOGIN_FAIL = 'auth/loginFail';
export const REGISTER_SUCCESS = 'auth/registerSuccess';
export const REGISTER_FAIL = 'auth/registerFail';
export const SET_USER = 'auth/setUser';
export const RESET_AUTH_STATE = 'auth/resetAuthState';

// Items
export const SET_ITEMS = 'item/setItems';
export const ADD_ITEM = 'item/addItem';
export const REMOVE_ITEM = 'item/removeItem';
export const UPDATE_ITEM = 'item/updateItem';
export const SET_ITEM_ERROR = 'item/setItemError';
export const RESET_ITEM_STATE = 'item/resetItemState';

// Billing
export const SET_BILLING = 'billing/setBilling';
export const CALCULATE_BILL = 'billing/calculateBill';
export const GENERATE_INVOICE = 'billing/generateInvoice';
export const SET_BILLING_ERROR = 'billing/setBillingError';
export const RESET_BILLING_STATE = 'billing/resetBillingState';

// Notifications
export const SET_NOTIFICATION = 'notification/setNotification';
export const CLEAR_NOTIFICATION = 'notification/clearNotification';

// User Profile
export const SET_PROFILE = 'profile/setProfile';
export const UPDATE_PROFILE = 'profile/updateProfile';
export const RESET_PROFILE = 'profile/resetProfile';

// Orders
export const SET_ORDERS = 'orders/setOrders';
export const ADD_ORDER = 'orders/addOrder';
export const REMOVE_ORDER = 'orders/removeOrder';
export const UPDATE_ORDER_STATUS = 'orders/updateOrderStatus';
export const SET_ORDER_ERROR = 'orders/setOrderError';
