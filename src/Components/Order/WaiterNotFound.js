import React from 'react';
import OrdersTable from './OrdersTable.js';
import {packageQuery, orderCollectionForCheck, ordersNotAprroved} from '../../utils.js';
import {ENDPOINT} from '../../constants.js'
import {addOrder} from '../../AC';
import {connect} from 'react-redux';

export class WaiterNotFound extends React.Component {
  componentDidMount() {
    this._isMounted = true;
  }
  componentWillUnmount() {
    this._isMounted = false;
  }

  render () {
    var {modalData} = this.props;
    console.log(this.props);
    return(
      <div id="CoinyPay">
        <div id="body">
        <div className="verify-block">
        <h3>Верификация CoinyPay</h3>
        <br />

        <h2>Чтобы бы выставлять счета и получать чаевые с помощью CoinyPay, Пожалуйста
        отправьте эту команду боту CoinyPay в FacbookMessenger</h2>
        <br />
        <br />
        <h3>ps{modalData.otp}</h3>
        </div>
        </div>
      </div>
    )
  }
}



export default WaiterNotFound;
