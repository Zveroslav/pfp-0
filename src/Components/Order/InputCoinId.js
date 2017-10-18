import React from 'react';

class InputCoinId extends React.Component {
  render () {
    console.log(this.props.order)
    return(
      <div id="CoinyPay">
        <h3>Введите CoinyID</h3>
        <div id="body">
          <div>
            <input className="inputId" />
          </div>
          <button className="btn-green pay">Оплатить</button>
        </div>
        <div id="info">
        <p>Введите CoinyID клиента и отслеживайте статус оплаты в таблице заказов CoinyPay.</p>
        </div>
      </div>
    )
  }
}

export default InputCoinId;
