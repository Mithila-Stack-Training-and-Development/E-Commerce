// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import PayPalButton from "./PayPalButton";
// import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";
// import { createCheckout } from "../../redux/slices/checkoutSlice";





// const Checkout = () => {
// 	const navigate = useNavigate();
// 	const dispatch = useDispatch();
// 	const {cart, loading,error} = useSelector((state) => state.cart);
// 	const { user } = useSelector((state) => state.auth);
// 	const [checkoutId, setCheckoutId] = useState(null);
	
// 	const [shippingAddress, setShippingAddress] = useState({
// 		firstName: "",
// 		lastName: "",
// 		address: "",
// 		city: "",
// 		postalCode: "",
// 		country: "",
// 		phone: "",
// 	});

// 	//Ensure cart is loaded before proceeding

// 	useEffect(() => {
// 		if(!cart || !cart.products || cart.products.length === 0){
// 			navigate("/");
// 		}
// 	}, [cart, navigate]);

// 	// const handleCreateCheckout = async (e) => {
// 	// 	e.preventDefault();
// 	// 	// setCheckoutId(12345); 
// 	// 	if(cart && cart.products.length > 0){
// 	// 		const res = await dispatch(
// 	// 			createCheckout({
// 	// 				checkoutItems: cart.products,
// 	// 				shippingAddress,
// 	// 				paymentMethod : "Paypal",
// 	// 				totalPrice: cart.totalPrice,
// 	// 			})
// 	// 		);
// 	// 		if(res.payload && res.payload._id){
// 	// 			setCheckoutId(res.payload._id); //set Checkout ID if checkot was successful 
// 	// 		}
// 	// 	}
// 	// };

// 	const handleCreateCheckout = async (e) => {
//   e.preventDefault();

//   if (cart && cart.products.length > 0) {
//     const totalPrice = cart.products.reduce(
//       (acc, item) => acc + item.price * item.quantity,
//       0
//     );

//     const res = await dispatch(
//       createCheckout({
//         checkoutItems: cart.products, // ✅ typo fixed
//         shippingAddress,
//         paymentMethod: "Paypal",
//         totalPrice, // ✅ calculated manually
//       })
//     );

//     if (res.payload && res.payload._id) {
//       setCheckoutId(res.payload._id);
//     }
//   }
// };


// 	const handlePaymentSuccess = async (details) => {
// 		try {
// 			const response = await axios.put(
// 				`${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/pay`,
// 				{
// 					paymentStatus: "paid", paymentDetails: details
// 				},
// 				{
// 					headers: {
// 						Authorization : `Bearer ${localStorage.getItem("userToken")}`,
// 					},
// 				}
// 			);
			
// 				await handleFinalizeCheckout(checkoutId); //Finalize checkout if payment is successful
			
			
// 		} catch (error) {
// 			console.error(error);
			
// 		}
		
		
// 	};

// 	const handleFinalizeCheckout = async( checkoutId ) => {
// 		try {
// 			const response = await axios.post(
// 				`${
// 				import.meta.env.VITE_BACKEND_URL
// 				}/api/checkout/${checkoutId}/finalize`,
// 				{},
// 				{
// 					headers:{
// 						Authorization: `Bearer ${localStorage.getItem("userToken")}`,
// 					},
// 				}
// 			);
			
// 				navigate("order-confirmation");
			
			
// 		} catch (error) {
// 			console.error(error);
// 		}
// 	};

// 	if(loading) return <p>Loading Cart...</p>
// 	if(error) return <p>Error: {error}</p>
// 	if(!cart || !cart.products || cart.products.length === 0){
// 		return <p>Your Cart is empty....</p>
// 	}

// 	return (
// 		<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl max-auto py-10 px-6 tracking-tighter">
// 			{/* Left Section */}
// 			<div className="bg-white  rounded-lg p-6">
		
    

// 				<h2 className="text-2xl uppercase mb-6">Checkout</h2>
// 				<form	onSubmit={handleCreateCheckout}>
// 					<h3 className="text-lg mb-4">Contact Details</h3>
// 					<div className="mb-4">
// 						<label className="block text-gray-700">Email</label>
// 						<input
// 							type="email"
// 							value={user? user.email : ""}
// 							className="-full p-2 border-rounded"
// 							disabled
// 						/>
// 					</div>
// 					<h3 className="text-lg mb-4">Delivery</h3>
// 					<div className="mb-4 grid grid-cols-2 gap-4">
// 						<div>
// 							<lable className="block text-gray-700">
// 								First Name
// 							</lable>
// 							<input
// 								type="text"
// 								value={shippingAddress.firstName}
// 								onChange={(e) =>
// 									setShippingAddress({
// 										...shippingAddress,
// 										firstName: e.target.value,
// 									})
// 								}
// 								className="w-full p-2 border rounded"
// 							/>
// 						</div>


//                         <div>
// 							<lable classNameblock text-gray-700>
// 								Last Name
// 							</lable>
// 						<input
// 							type="text"
// 								value={shippingAddress.lastName}
// 								onChange={(e) =>
// 									setShippingAddress({
// 										...shippingAddress,
// 										lastName: e.target.value,
// 									})
// 								}
// 								className="w-full p-2 border rounded"
// 							/>
// 						</div>
// 					</div>
					

// 					<div className="mb-4">
// 						<label className="block text-gray-700">Address</label>
// 						<input 
// 							type="text"
// 							value={shippingAddress.address}
// 							onChange={(e) =>
// 								setShippingAddress({
// 									...shippingAddress,
// 									address: e.target.value,
// 								})
// 							}
// 							className="w-full p-2 border rounded"
// 							required
// 						/>
// 					</div>

// 					<div className="mb-4 grid grid-cols-2 gap-4">
// 						<div>
// 							<lable className="block text-gray-700">
// 								City
// 							</lable>
// 							<input
// 								type="text"
// 								value={shippingAddress.city}
// 								onChange={(e) =>
// 									setShippingAddress({
// 										...shippingAddress,
// 										city: e.target.value,
// 									})
// 								}
// 								className="w-full p-2 border rounded"
// 							/>
// 						</div>


//                         <div>
// 							<lable classNameblock text-gray-700>
// 								Postal Code
// 							</lable>
// 						<input
// 							type="text"
// 								value={shippingAddress.postalCode}
// 								onChange={(e) =>
// 									setShippingAddress({
// 										...shippingAddress,
// 										postalCode: e.target.value,
// 									})
// 								}
// 								className="w-full p-2 border rounded"
// 							/>
// 						</div>
// 					</div>
					
// 					<div className="mb-4">
// 						<label className="block text-gray-700">Country</label>
// 						<input 
// 							type="text"
// 							value={shippingAddress.country}
// 							onChange={(e) =>
// 								setShippingAddress({
// 									...shippingAddress,
// 									country: e.target.value,
// 								})
// 							}
// 							className="w-full p-2 border rounded"
// 							required
// 						/>
// 					</div>

					
// 					<div className="mb-4">
// 						<label className="block text-gray-700">Phone</label>
// 						<input 
// 							type="tel"
// 							value={shippingAddress.phone}
// 							onChange={(e) =>
// 								setShippingAddress({
// 									...shippingAddress,
// 									phone: e.target.value,
// 								})
// 							}
// 							className="w-full p-2 border rounded"
// 							required
// 						/>
// 					</div>

// 					<div className="mt-6">
// 						{!checkoutId ? (
// 							<button type="submit"
// 								className="w-full bg-black text-white py-3 rounded"
// 							>
// 								Continue to Payment
// 							</button>

// 						) : (
// 							<div>
// 								<h3 className="text-lg mb-4">Pay with PayPal</h3>
// 								{/* Paypal Component */}
// 								<PayPalButton 
// 									amount={cart.totalPrice} 
// 									onSuccess={handlePaymentSuccess}
// 									onError={(error) => alert("Payment failed. Try again.",{error})} 
// 								/>
// 							</div>

// 						)}
// 					</div>

// 				</form>
// 			</div>

// 			{/* Right Section */}
// 			<div className="bg-gray-50 p-6 rounded-lg">
			
// 				<h3 className="text-lg mb-4">Order Summary</h3>
// 				<div className="border-t py-4 mb-4">
// 					{cart.products.map((product, index) => (
// 						<div key={index} className="flex items-start justify-between py-2 border-b">
// 							<div className="flex items-start">
// 								<img src={product.image} alt={product.name} className="w-20  h-24 object-cover mr-4"/>
// 								<div>
// 									<h3 className="text-md">{product.name}</h3>
// 									<p className="text-gray-500">Size: {product.size}</p>
// 									<p className="text-gray-500">Color: {product.color}</p>
// 							    </div>
// 							</div>
// 							<div>
// 								<p className="text-xl">${product.price?.toLocaleString()}</p>
// 							</div>
// 						</div>
// 					))}
// 				</div>
// 				<div className="flex justify-between items-center text-lg mb-4">
// 					<p>Subtotal</p>
// 					<p>${cart.totalPrice?.toLocaleString()}</p>
// 				</div>
// 				<div className="flex justify-between items-center text-lg">
// 					<p>Shipping</p>
// 					<p>Free</p>
// 				</div>
// 				<div className="flex justify-between items-center text-lg mt-4 border-l pt-4">
// 					<p>Total</p>
// 					<p>${cart.totalPrice?.toLocaleString()}</p>
// 				</div>
// 			</div>

// 		</div>
// 	);
// };

// export default Checkout;






import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PayPalButton from "./PayPalButton";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { createCheckout } from "../../redux/slices/checkoutSlice";

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart, loading, error } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const [checkoutId, setCheckoutId] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0); // ✅ added for PayPal amount
  const [shippingAddress, setShippingAddress] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    phone: "",
  });

  useEffect(() => {
    if (!cart || !cart.products || cart.products.length === 0) {
      navigate("/");
    }
  }, [cart, navigate]);

  const handleCreateCheckout = async (e) => {
    e.preventDefault();

    if (cart && cart.products.length > 0) {
      const calculatedTotal = cart.products.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );

      setTotalPrice(calculatedTotal); // ✅ set for PayPalButton

      const res = await dispatch(
        createCheckout({
          checkoutItems: cart.products,
          shippingAddress,
          paymentMethod: "Paypal",
          totalPrice: calculatedTotal,
        })
      );

      if (res.payload && res.payload._id) {
        setCheckoutId(res.payload._id);
      }
    }
  };

  const handlePaymentSuccess = async (details) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/pay`,
        { paymentStatus: "paid", paymentDetails: details },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );

      await handleFinalizeCheckout(checkoutId);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFinalizeCheckout = async (checkoutId) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/finalize`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );

      navigate("/order-confirmation");
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <p>Loading Cart...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!cart || !cart.products || cart.products.length === 0) {
    return <p>Your Cart is empty...</p>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto py-10 px-6 tracking-tighter">
      {/* Left Section */}
      <div className="bg-white rounded-lg p-6">
        <h2 className="text-2xl uppercase mb-6">Checkout</h2>
        <form onSubmit={handleCreateCheckout}>
          <h3 className="text-lg mb-4">Contact Details</h3>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={user ? user.email : ""}
              className="w-full p-2 border rounded"
              disabled
            />
          </div>

          <h3 className="text-lg mb-4">Delivery</h3>
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700">First Name</label>
              <input
                type="text"
                value={shippingAddress.firstName}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    firstName: e.target.value,
                  })
                }
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block text-gray-700">Last Name</label>
              <input
                type="text"
                value={shippingAddress.lastName}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    lastName: e.target.value,
                  })
                }
                className="w-full p-2 border rounded"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Address</label>
            <input
              type="text"
              value={shippingAddress.address}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  address: e.target.value,
                })
              }
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700">City</label>
              <input
                type="text"
                value={shippingAddress.city}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    city: e.target.value,
                  })
                }
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block text-gray-700">Postal Code</label>
              <input
                type="text"
                value={shippingAddress.postalCode}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    postalCode: e.target.value,
                  })
                }
                className="w-full p-2 border rounded"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Country</label>
            <input
              type="text"
              value={shippingAddress.country}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  country: e.target.value,
                })
              }
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Phone</label>
            <input
              type="tel"
              value={shippingAddress.phone}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  phone: e.target.value,
                })
              }
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="mt-6">
            {!checkoutId ? (
              <button
                type="submit"
                className="w-full bg-black text-white py-3 rounded"
              >
                Continue to Payment
              </button>
            ) : (
              <div>
                <h3 className="text-lg mb-4">Pay with PayPal</h3>
                <PayPalButton
                  amount={totalPrice}
                  onSuccess={handlePaymentSuccess}
                  onError={(error) =>
                    alert("Payment failed. Try again.", { error })
                  }
                />
              </div>
            )}
          </div>
        </form>
      </div>

      {/* Right Section */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg mb-4">Order Summary</h3>
        <div className="border-t py-4 mb-4">
          {cart.products.map((product, index) => (
            <div
              key={index}
              className="flex items-start justify-between py-2 border-b"
            >
              <div className="flex items-start">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-20 h-24 object-cover mr-4"
                />
                <div>
                  <h3 className="text-md">{product.name}</h3>
                  <p className="text-gray-500">Size: {product.size}</p>
                  <p className="text-gray-500">Color: {product.color}</p>
                </div>
              </div>
              <div>
                <p className="text-xl">${product.price?.toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center text-lg mb-4">
          <p>Subtotal</p>
          <p>${totalPrice.toFixed(2)}</p>
        </div>
        <div className="flex justify-between items-center text-lg">
          <p>Shipping</p>
          <p>Free</p>
        </div>
        <div className="flex justify-between items-center text-lg mt-4 border-t pt-4">
          <p>Total</p>
          <p>${totalPrice.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default Checkout;






