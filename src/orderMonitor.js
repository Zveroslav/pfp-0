import {paidOrder, deleteOrder, cancelBill} from "./AC";
import {checkStatus} from "./utils";

const go = (time) => {
  setTimeout( () =>  {
  const {tableForCheck, tablePaidOrders} = store.getState(),
        arrCheckOrder = Object.keys(tableForCheck),
        arrHoldBill = Object.keys(tablePaidOrders),
        newTime = 5000;
        console.log(tableForCheck, tablePaidOrders);

  if(arrCheckOrder.length > 0){
        checkStatusOrder(0, arrCheckOrder, tableForCheck);
  }
  if(arrHoldBill.length > 0){
       checkStatusHoldBills(0, arrHoldBill);
  }
  let t = newTime * (arrCheckOrder.length + arrHoldBill.length);
  if(t == 0){ t = 5000 }
  console.log(arrCheckOrder);
  go(t);
}, time)}

go(5000);


  const checkStatusOrder = (i, arrCheckOrder, tableForCheck) => {
    checkStatus(arrCheckOrder[i]).then(res => {
      console.log(res);
      if (res === "order") {
        store.dispatch(paidOrder(tableForCheck[arrCheckOrder[i]]));
        store.dispatch(deleteOrder(arrCheckOrder[i]));
      }
      i++;
      if (i < arrCheckOrder.length) {
        checkStatusOrder(i, arrCheckOrder, tableForCheck);
      }
    })
  }

  const checkStatusHoldBills = (i, arrHoldBill) => {
    checkStatus(arrHoldBill[i]).then(res => {
      console.log(res);

      if (res != "order") {
        store.dispatch(cancelBill(arrHoldBill[i]));
      }
      i++;
      if (i < arrHoldBill.length) {
        console.log("==+==", i);
        checkStatusHoldBills(i, arrHoldBill);
      }
    })
  }
