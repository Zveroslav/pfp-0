import React from 'react';

class OrdersTable extends React.Component {
  render () {
    return(
      <div id="body">
      <h3>Таблица Заказов</h3>
      <table>
        <tbody>
          <tr>
            <th>№</th>
            <th>Время</th>
            <th>Статус</th>
            <th>Действие</th>
          </tr>
          <tr>
            <td>007</td>
            <td>00:00</td>
            <td>Ожидает оплаты</td>
            <td><button className="btn-green pay">Повторить</button></td>
          </tr>
          <tr>
            <td>003</td>
            <td>00:00</td>
            <td>Оплачен</td>
            <td><button className="btn-red pay">Отменить</button></td>
          </tr>

        </tbody>
      </table>
      </div>
    )
  }
}

export default OrdersTable;
