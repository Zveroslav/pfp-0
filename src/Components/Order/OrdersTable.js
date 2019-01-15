import React from 'react';
import PostedOrdersTabe from './PostedOrdersTabe';
import PaidOrdersTable from './PaidOrdersTable';
import {checkStatus} from '../../utils'
import {connect} from 'react-redux';
import {paidOrder, deleteOrder, changeStatus, cancelBill} from '../../AC';


class OrdersTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showCheck: true, showDelete: false, status: "" };
  }


  changeActiveTable = (tableName) => () => {
    if(this.state[tableName] != true) {
      this.setState({showCheck: !this.state.showCheck, showDelete: !this.state.showDelete})
    }
  }
  activeTable = (activeTab) => {
    if (activeTab) {
      return 'active';
    } else {
      return 'passive';
    }
  }



  render () {
    let {paidOrder, deleteOrder, changeStatus, cancelBill} = this.props;
    return(
      <div id="body">
        <h3>Таблица Заказов</h3>
        <div className="orders-table">
          <div className="tableMenu">
            <div onClick={this.changeActiveTable('showCheck')} className={this.activeTable(this.state.showCheck)}>Отправленные</div>
            <div onClick={this.changeActiveTable('showDelete')} className={this.activeTable(this.state.showDelete)}>Оплаченные</div>
          </div>
          <PostedOrdersTabe show={this.state.showCheck} status={this.state.status}/>
          <PaidOrdersTable show={this.state.showDelete}  />
        </div>
      </div>
    )
  }
}




const mapStateToProps = store => {
  return {
    tablePaidOrders: store.tablePaidOrders,
    tableForCheck:   store.tableForCheck,
    tableOrder:      store.tableOrder
  }
}

export default connect(null, {cancelBill})(connect(mapStateToProps, {deleteOrder})(connect(null, {paidOrder})(OrdersTable)));
