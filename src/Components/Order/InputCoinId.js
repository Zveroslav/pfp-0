import React from 'react';
import OrdersTable from './OrdersTable.js';
import {packageQuery, orderCollectionForCheck, ordersNotAprroved} from '../../utils.js';
import {ENDPOINT} from '../../constants.js'
import {addOrder} from '../../AC';
import {connect} from 'react-redux';
//
class InputCoinId extends React.Component {
  constructor(props) {
      super(props);
      this.state = {coinyId: '212',displayStatus:"Введите CoinyID клиента и отслеживайте статус оплаты в таблице заказов CoinyPay"};
      Poster.on('afterPopupClosed', () => {
        this.setState({coinyId:""})
      });
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  setCoinyId = (e) => {
    if( !e.target.value.match(/[^0-9]/) ) {
      this.setState({coinyId:e.target.value})
    }
  }
  sendOrderToCoinyPay = () => {
    let {tableForCheck, addOrder} = this.props;
    this.setState({displayStatus: (<div id="progress-bar"></div>)})
    packageQuery(this.props.order, Poster.settings, this.state.coinyId).then(query => {
      console.log("--+-- Send Query --+--", query);
      Poster.makeRequest(ENDPOINT + '/bill', {
        method: 'post',
        contentType: 'application/json',
        data: query,
        timeout: 10000
      }, (answer) => {
        if (answer && Number(answer.code) === 200) {
          console.log(answer);
          let order = JSON.parse(answer.result);
          if (order.bill_id) {
            addOrder(order);
          }
          if (this._isMounted) {
            this.setState({displayStatus:order.message});
          }

          if (order.error){
            this.setState({displayStatus:order.error})
          }
        } else {
          console.log("------ ERROR ------",answer);
        }
      });
    });
  }

  render () {
    return(
      <div id="CoinyPay">
        <h3>Введите CoinyID</h3>
        <div id="body">
          <div>
            <input className="inputId" value={this.state.coinyId} onChange={this.setCoinyId}/>
          </div>
          <button className="btn-green pay" onClick={this.sendOrderToCoinyPay}>Оплатить</button>
        </div>
        <div id="info">
        <div align="center">{this.state.displayStatus}</div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = store => {
  return {
    tableForCheck: store.tableForCheck
  }
}


export default connect(mapStateToProps, {addOrder})(InputCoinId);
