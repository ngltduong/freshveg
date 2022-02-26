import {useEffect, useRef, useContext} from 'react'
import { patchData } from '../utils/fetchData'
import { DataContext } from '../store/GlobalState'
import { updateItem } from '../store/Actions'
const PaypalBtn = ({order}) =>{

    const paypalRef = useRef()
    const {state, dispatch} = useContext(DataContext)

    const { auth, orders } = state

    useEffect(()=>{
        paypal.Buttons({

            // Sets up the transaction when a payment button is clicked
            createOrder: function(data, actions) {
              return actions.order.create({
                purchase_units: [{
                  amount: {
                    value: order.total // Can reference variables or functions. Example: `value: document.getElementById('...').value`
                  }
                }]
              });
            },
    
            // Finalize the transaction after payer approval
            onApprove: function(data, actions) {

              dispatch({type: 'NOTIFY', payload: {loading: true}})
              
              return actions.order.capture().then(function(orderData) {
                // Successful capture! For dev/demo purposes:
                    
                    // console.log(orderData)
                    patchData(`order/payment/${order._id}`, {
                      paymentId: orderData.payer.payer_id
                    }, auth.token)
                    .then(res => {
                      if(res.err) return dispatch({type: 'NOTIFY', payload: {error: res.err}})

                      
                      dispatch(updateItem(orders, order._id, {
                        ...order, 
                        paid: true, 
                        dateOfPayment: orderData.create_time,
                        paymentId: orderData.payer.payer_id,
                        method: 'Paypal'

                      }, 'ADD_ORDERS'))

                      return dispatch({type: 'NOTIFY', payload: {success: res.msg}})
                    })
                     
                    // console.log('Capture result', orderData, JSON.stringify(orderData, null, 2));
                    // var transaction = orderData.purchase_units[0].payments.captures[0];
                    // alert('Transaction '+ transaction.status + ': ' + transaction.id + '\n\nSee console for all available details');
    
                // When ready to go live, remove the alert and show a success message within this page. For example:
                // var element = document.getElementById('paypal-button-container');
                // element.innerHTML = '';
                // element.innerHTML = '<h3>Thank you for your payment!</h3>';
                // Or go to another URL:  actions.redirect('thank_you.html');
              });
            }
          }).render(paypalRef.current);
    
    },[])

    return(
        <div ref={paypalRef}>
            
        </div>
    )

}

export default PaypalBtn