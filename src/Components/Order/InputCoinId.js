import React from 'react';
import {packageQuery} from '../../utils.js'

class InputCoinId extends React.Component {
  constructor(props) {
      super(props);
      this.state = {coinyId: ''};
      Poster.on('afterPopupClosed', () => {
        this.setState({coinyId:""})
      });
  }
  setCoinyId = (e) => {
    this.setState({coinyId:e.target.value})
  }
  sendOrderToCoinyPay = () => {
    let query = packageQuery(this.props.order, Poster.settings, this.state.coinyId);
    console.log(query);
    Poster.makeRequest('https://zed.coinypay.com/payapi', {
      method: 'post',
      data: query,
      timeout: 10000
    }, (answer) => {
      if (answer && Number(answer.status) === 200) {
          console.log(answer);
      } else {
        console.log(answer);
      }
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
        <p>Введите CoinyID клиента и отслеживайте статус оплаты в таблице заказов CoinyPay.</p>
        </div>
      </div>
    )
  }
}

export default InputCoinId;
