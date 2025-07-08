// import {PayPalButtons, PayPalScriptProvider} from "@paypal/react-paypal-js";


// const PayPalButton = ({amount, onSuccess, onError}) => {
//   return (
//     <PayPalScriptProvider 
//         options={{
//             "client-id":
//             `${import.meta.env.VITE_PAYPAL_CLIENT_ID}`,
//         }}
//     >


//         <PayPalButtons style={{layout: "vertical"}}
    
//             createOrder={(data, actions) => {
//             return actions.order.create({
//                     purchase_units: [{amount: {value: parseFloat(amount).toFixed(2)}},
                        
//                     ]
//                 })
//             }}
//             onApprove={(data, actions) => {
//             return actions.order.capture().then(onSuccess)
          
//             }}
//             onError={onError}
//         />

//     </PayPalScriptProvider>
//   );
// };

// export default PayPalButton;

import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

const PayPalButton = ({ amount, onSuccess, onError }) => {
  const validAmount = parseFloat(amount);

  // Early return if amount is invalid
  if (isNaN(validAmount)) {
    console.error("❌ Invalid amount passed to PayPalButton:", amount);
    return <p className="text-red-500">Error: Invalid payment amount.</p>;
  }

  return (
    <PayPalScriptProvider
      options={{
        "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID,
        currency: "USD",
      }}
    >
      <PayPalButtons
        style={{ layout: "vertical" }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: validAmount.toFixed(2),
                },
              },
            ],
          });
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then(onSuccess);
        }}
        onError={(err) => {
          console.error("🛑 PayPal Error:", err);
          onError(err);
        }}
      />
    </PayPalScriptProvider>
  );
};

export default PayPalButton;
