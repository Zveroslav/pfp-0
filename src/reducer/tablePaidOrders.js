import {BILL_ORDER, CANCEL_BILL} from '../constants'

export default ( tablePaidOrders = setDefaultTablePaidOrders(), action ) => {
    console.log(action);
    const { type, payload } = action
    switch (type) {
        case BILL_ORDER:
            let {order} = payload;
            if (order) {
              tablePaidOrders[order.bill_id] = order;
              localStorage.setItem('tablePaidOrders', JSON.stringify(tablePaidOrders));
            }
            return {...tablePaidOrders};
        case CANCEL_BILL:
            let {id} = payload;
            delete tablePaidOrders[id];
            localStorage.setItem('tablePaidOrders', JSON.stringify(tablePaidOrders));
            return {...tablePaidOrders};
    }
    return tablePaidOrders;
}


const setDefaultTablePaidOrders = () => {
  let result = {};
  if (localStorage.getItem('tablePaidOrders')) {
    result = JSON.parse(localStorage.getItem('tablePaidOrders'));
    return result;
  }
  return result;
}
