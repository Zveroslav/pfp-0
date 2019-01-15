import {ADD_ORDER, DELETE_ORDER, BILL_ORDER, CANCEL_BILL, CHANGE_STATUS} from '../constants.js'

export function addOrder(order) {
    return {
        type: ADD_ORDER,
        payload: {order} //tableForCheck
    }
}

export function deleteOrder(id) {
    return {
        type: DELETE_ORDER,
        payload: {id}
    }
}

export function paidOrder(order) {
    return {
        type: BILL_ORDER,
        payload: {order}
    }
}

export function cancelBill(id) {
  console.log(id);
    return {
        type: CANCEL_BILL,
        payload: {id}
    }
}

export function changeStatus(str) {
  console.log(str);
    return {
        type: CHANGE_STATUS,
        payload: {str}
    }
}
