import {combineReducers} from 'redux';
import tableForCheck from './tableForCheck';
import tablePaidOrders from './tablePaidOrders';
import tableOrder from './tableOrder';

export default combineReducers({
    tableForCheck: tableForCheck,
    tablePaidOrders: tablePaidOrders,
    tableOrder: tableOrder
})
