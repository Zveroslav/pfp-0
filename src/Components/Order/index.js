import React from 'react';
import OrdersTable from './OrdersTable.js';
import InputCoinId from './InputCoinId.js';
import AnswerFromServer from './OrdersTable.js';




class Order extends React.Component {
  render () {
    const {modalData} = this.props;
    const ContentModal = this.routeDataInModal(modalData);
    return(
      <div>
        <ContentModal />
      </div>
    )
  }
  routeDataInModal = modalData => {
    switch (modalData.place) {
      case 'functions':
        return OrdersTable
        break;
      case 'order':
        return InputCoinId
        break;
      default:
        return AnswerFromServer

    }
    console.log('RouteDataInModal',modalData);
  }
}


export default Order;
