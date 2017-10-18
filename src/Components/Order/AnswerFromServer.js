import React from 'react';

class AnswerFromServer extends React.Component {
  render () {
    return(
      <div id="CoinyPay">
        <h3>Сообщение с сервера</h3>
        <div id="body">
        <p>Здесь будут отображаться сообщения с сервера</p>
        </div>
      </div>
    )
  }
}

export default AnswerFromServer;
