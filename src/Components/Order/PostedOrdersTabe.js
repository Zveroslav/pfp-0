import React from 'react';
import {connect} from 'react-redux';
import {objToArr} from '../../utils';
import {deleteOrder} from '../../AC';


class PostedOrdersTabe extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tableForCheck: props.tableForCheck, logStatusOrder: ""};
  }

  render () {
    let {deleteOrder, show} = this.props;
    let {logStatusOrder} = this.state;
    let content = (<tr><td colSpan="4"><h2 className="messege" align="center">Таблица отправленных платежей пуста, пока что...</h2></td>
</tr>);
    console.log(this.state.tableForCheck);
    let arrContent = objToArr(this.props.tableForCheck);
    const deleteOrderFromCheckTable = (id) => () => {
      deleteOrder(id);
      this.setState({logStatusOrder: (<p className='status-order'>Платеж № {id} отменен</p>)})
      setTimeout(() => {  this.setState({logStatusOrder:""}) }, 5000)
    }

    if (arrContent.length > 0) {
      content = arrContent.map(item => {
        let {bill_id, coiny_id, amount, currency} = item;
        return (
          <tr key={bill_id}>
            <td>{bill_id}</td>
            <td>{coiny_id}</td>
            <td>{amount +"("+ currency+")"}</td>
            <td><button className="btn-red" onClick={deleteOrderFromCheckTable(bill_id)} >Отменить</button></td>
          </tr>
        )
      })
    }

    const checkStatusOrder = (i, arrCheckOrder, tableForCheck) => {
      checkStatus(arrCheckOrder[i]).then(res => {
        if (res === "order") {
          console.log("checkOrder", arrCheckOrder);
          paidOrder(tableForCheck[arrCheckOrder[i]]);
          deleteOrder(arrCheckOrder[i]);
        }
        i++;
        if (i < arrCheckOrder.length) {
          checkStatusOrder(i, arrCheckOrder, tableForCheck);
        }
      })
    }

    return this.getBody(show, logStatusOrder, content);

  }
  getBody(show, logStatusOrder, content){
   return show && (
     <div className="ordersTable">
    {logStatusOrder}
     <table>

     <tbody>
       <tr>
         <th>№</th>
         <th>COINY ID</th>
         <th>СУММА ЗАКАЗА</th>
         <th>Действие</th>
       </tr>
       {content}
     </tbody>
     </table>
</div>
   )
 }
}


const mapStateToProps = store => {
  return {
    tableForCheck: store.tableForCheck
  }
}

export default connect(mapStateToProps, {deleteOrder})(PostedOrdersTabe);
