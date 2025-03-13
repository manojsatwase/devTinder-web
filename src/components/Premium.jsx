import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useState } from "react";

const Premium = () => {
  const [isUserPremium, setIsUserPremium] = useState(false);

  const verifyPremiumUser = async () => {
    const res = await axios.get(`${BASE_URL}/premium/verify`, {
      withCredentials: true
    })
 
    if (res.data.isPremium) {
      setIsUserPremium(true)
    }
  }

  const handleBuyClick = async (type) => {
    try {
      const order = await axios.post(`${BASE_URL}/payment/create`, {
        membershipType: type
      }
        , {
          withCredentials: true
        })

      const { keyId, amount, currency, orderId, notes } = order?.data;

      const options = {
        key: keyId, // Replace with your Razorpay key_id
        amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency,
        name: 'Dev Tinder',
        description: 'Connect to other developers',
        order_id: orderId, // This is the order_id created in the backend
        // callback_url: `${BASE_URL}/paymentverification`, 
        prefill: {
          name: `${notes?.firstName} ${notes?.lastName}`,
          email: notes?.emailId,
          contact: '9405035308'
        },
        theme: {
          color: '#F37254'
        },
        handler: verifyPremiumUser,
      };

      // it should open this Razorpay Dialog Box
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err.reponse?.data?.message);
    }
  }
  
  return (
    <div className="m-10">
      {isUserPremium ? (<div>You're already a premium user</div>) : (
        <div className="flex w-full flex-col lg:flex-row">
          {/* Silver Membership Card */}
          <div className="card bg-base-300 rounded-box grid h-70 grow place-items-center mx-5">
            <h1 className="font-bold text-3xl">Silver Membership</h1>
            <ul>
              <li>- Chat with other people</li>
              <li>- 100 connection requests per day</li>
              <li>- Blue Tick</li>
              <li>- 3 months</li>
            </ul>
            <button
              onClick={() => handleBuyClick("silver")}
              className="btn bg-blue-800 px-5 py-2 border-0 font-bold"
            >
              Buy Silver
            </button>
          </div>

          <div className="divider lg:divider-horizontal">OR</div>

          {/* Gold Membership Card */}
          <div className="card bg-base-300 rounded-box grid h-70 grow place-items-center mx-5">
            <h1 className="font-bold text-3xl">Gold Membership</h1>
            <ul>
              <li>- Chat with other people</li>
              <li>- Infinite connection requests per day</li>
              <li>- Blue Tick</li>
              <li>- 6 months</li>
            </ul>
            <button
              onClick={() => handleBuyClick("gold")}
              className="btn bg-amber-600 px-5 py-2 border-0 font-bold"
            >
              Buy Gold
            </button>
          </div>
        </div>
      ) }
    </div>
  );
};

export default Premium;