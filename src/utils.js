import {ENDPOINT} from './constants.js'

export  var packageQuery = (order, settings, id) => {
  return new Promise(function(res){
    var currency = settings.currencyCodeIso
    for (var item in order.products) {
      var content = [];
      _takeOrderPoint(order.products[item], currency).then(orderPoint =>
       {
        content.push(orderPoint);
        if(content.length == Object.keys(order.products).length){
          var query = {poster_waiter_id: "coinypay_1_4", coiny_id:id, innerid: order.id, amount:1/*order.subtotal*/, currency:settings.currencyCodeIso, content:content, posterAccount:settings.accountUrl, transaction: {spot_id:settings.spotId, spot_tablet_id:settings.spotTabletId, transaction_id:order.orderName, payed_card:order.subtotal}}
          res(query);
        }
      })
    }
  })
}


function _takeOrderPoint(productOrder, currency) {
  return new Promise(function(resolve, reject) {
    Poster.makeApiRequest('menu.getProduct?product_id=' + productOrder.id, {
        method: 'get',
        type: 'type'
      },
      (product) => {
        let orderPoint = product.product_name + " [" + productOrder.price+ currency + " * " + productOrder.count +"]";
        console.log(product);
        resolve(orderPoint);
      }
    )
  })
}



export function checkWaiter(poster_waiter_id) {
  return new Promise(function(res){
    Poster.makeRequest(ENDPOINT + '/waiter-status', {
      method: 'post',
      contentType: 'application/json',
      data: {poster_waiter_id: poster_waiter_id},
      timeout: 10000
    }, (answer) => {
      console.log(answer);
      res(JSON.parse(answer.result));
    })
  })
}

export function checkStatus(bill_id) {
  return new Promise(function(res){
    let response;
  Poster.makeRequest(ENDPOINT + '/bill-status', {
    method: 'post',
    contentType: 'application/json',
    data: {bill_id: bill_id},
    timeout: 10000
  }, (answer) => {
    console.log(answer);
    response = JSON.parse(answer.result);
    res(response.message);
  })
})
}

export function cancelOrder(bill_id) {
  return new Promise(function(res){
    let response;
    Poster.makeRequest(ENDPOINT + '/bill-cancel', {
      method: 'post',
      contentType: 'application/json',
      data: {bill_id: bill_id},
      timeout: 10000
    }, (answer) => {
      response = JSON.parse(answer.result);
      console.log(answer);
      res(response.message);
    })
})
}

export function objToArr (obj) {
  let content = [];
  for (let key in obj) {
    content.push(obj[key])
  }
  return content;
}
