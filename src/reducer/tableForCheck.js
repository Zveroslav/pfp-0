import {ADD_ORDER, DELETE_ORDER} from '../constants'

export default ( tableForCheck = setDefaultTableForCheck(), action ) => {
  console.log(action);
    const { type, payload } = action;
    switch (type) {
        case ADD_ORDER:
            let {order} = payload;
            if (order.bill_id) {
              tableForCheck[order.bill_id] = order;
            }
            localStorage.setItem('tableForCheck', JSON.stringify(tableForCheck));
            return {...tableForCheck};
        case DELETE_ORDER:
            let {id} = payload;
            delete tableForCheck[id];
            localStorage.setItem('tableForCheck', JSON.stringify(tableForCheck));
            return {...tableForCheck};
    }
    return tableForCheck;
}

const setDefaultTableForCheck = () => {
  let result = {};
  if (localStorage.getItem('tableForCheck')) {
    //localStorage.setItem('tableForCheck', JSON.stringify({}));
    result = JSON.parse(localStorage.getItem('tableForCheck'));
    console.log("defaultData ->" ,result);
    return result;
  }
  return result;
}
