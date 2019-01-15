import React from 'react';
import OrdersTable from './OrdersTable.js';
import InputCoinId from './InputCoinId.js';
import WaiterNotFound from './WaiterNotFound.js';
import AnswerFromServer from './OrdersTable.js';
import {orderCollectionForCheck} from '../../utils.js';




class Order extends React.Component {
  constructor(props) {
        super(props);
  }

  render () {
    var {modalData, order} = this.props;
    var ContentModal;
    if (modalData.otp) {
      ContentModal =  WaiterNotFound;
    } else {
      ContentModal = this.routeDataInModal(modalData);
    }
    return(
          <ContentModal {...this.props} />
    )
  }

  routeDataInModal = (modalData, order) => {
    switch (modalData.place) {
      case 'functions':
        return OrdersTable
        break;
      case 'order':
        return InputCoinId
        break;
      default:
        return OrdersTable
    }
  }
}




export default Order;
