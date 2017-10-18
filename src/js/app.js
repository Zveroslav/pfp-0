import "../css/main.less";
import React from 'react';
import {render} from 'react-dom';
import Order from "../Components/Order/";
class CoinyPay extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
          name: '',
          modalData: ''
        };
        Poster.on('applicationIconClicked', (data) => {
            this.setState({modalData:data})
            Poster.interface.popup({
                width: 490,
                height: 600,
                title: "CoinyPay"
            });
        });
        Poster.interface.showApplicationIconAt({order: 'Оплатить через CoinyPay', functions: 'Таблица заказов CoinyPay'});
    }
	  render () {
        const order = this.state.modalData.order || null;
        return(
            <div id="CoinyPay">
              <img width="450px" src='https://static.tildacdn.com/tild6461-3431-4262-b134-656264333332/1_big.png' />
              <Order modalData={this.state.modalData} order = {order}/>
            </div>
        );
	  }
}

render(
    <CoinyPay/>,
    document.getElementById('app-container')
);
