import React from 'react';
import {connect} from 'react-redux';
import {objToArr, cancelOrder} from '../../utils';
import {cancelBill} from '../../AC';



class PostedOrdersTabe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {logStatusOrder: "", displayStatus:""};
  }
  render () {
    const cancelOrderFromPaidTable = (id) => () => {
      this.setState({displayStatus: (<div id="progress-bar"></div>)});
      cancelOrder(id).then(result => {
        this.setState({displayStatus: ""});
        if(result) {
          cancelBill(id);
          this.setState({logStatusOrder: (<p className='status-order'>{result}</p>)});
          setTimeout(() => {this.setState({logStatusOrder:""})}, 8000)
        } else {
          this.setState({logStatusOrder: (<p className='status-order'>Заказ № {id} не возможно отменить </p>)});
          cancelBill(id);
        }
      })
    }
    let {logStatusOrder} = this.state;
    let {cancelBill, show, status} = this.props;
    let content = (<tr><td colSpan="4"><h2 className="messege" align="center">Таблица подтвержденных заказов пуста, пока что...</h2></td>
</tr>);
    let arrContent = objToArr(this.props.tablePaidOrders);
    if (arrContent.length > 0) {
      content = arrContent.map(item => {
        let {bill_id, coiny_id, amount, currency} = item;
        return (
          <tr key={bill_id}>
            <td>{bill_id}</td>
            <td>{coiny_id}</td>
            <td>{amount +"("+ currency+")"}</td>
            <td><button className="btn-red" onClick={cancelOrderFromPaidTable(bill_id)}>Отменить</button></td>
          </tr>
        )
      })
    }
    return this.getBody(show, logStatusOrder, content)

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
       <tr>
       </tr>
       {content}
     </tbody>
     </table>
     <div>{this.state.displayStatus}</div>
     </div>
   )
 }
}



const mapStateToProps = store => {
  return {
    tablePaidOrders: store.tablePaidOrders
  }
}

export default connect(mapStateToProps, {cancelBill})(PostedOrdersTabe);
