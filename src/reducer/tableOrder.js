import {CHANGE_STATUS} from '../constants'

export default ( tableOrder = {orderStatus: "status"}, action ) => {
  console.log(action);
    const { type, payload } = action
    switch (type) {
        case CHANGE_STATUS:
                let {str} = payload;
                tableOrder.orderStatus = str
                return tableOrder;
    }
    return tableOrder;
}
