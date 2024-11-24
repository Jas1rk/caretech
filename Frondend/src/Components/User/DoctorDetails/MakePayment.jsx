import React, { useState } from "react";
import { useSelector } from "react-redux";
import Logo from "../../../assets/Logo/Logo";
import user_Api from "../../../service/Userinstance";

const MakePayment = ({ selectedDate, selectedTimes, toast }) => {
  const { userData } = useSelector((state) => state.user);
  let price = 1000;
  const total = price * selectedTimes.length;

  const proceedToPayment = async () => {
    try {
      const { data, status } = await user_Api.post("/proceed-to-payment", {
        totalAmount: total,
      });
      if ([200].includes(status)) {
        const { amount, receipt } = data.razorpayOrder;
        razorpayOpen({ totalAmount: amount, paymentId, receipt });
      }
    } catch (error) {
      const { data, status } = response.error;
      if (status === 400) toast.error(data.message);
    }
  };

  const razorpayOpen = ({ totalAmount, paymentId }) => {
    const options = {
      key: "rzp_test_ymZP4ImziZlWcK",
      amount: totalAmount * 100,
      currency: "INR",
      name: "CareTech",
      description: "Booking Payment",
      image: Logo,
      order_id: paymentId,
      handler: async (response) => {
        console.log(response, "<==>Payment success response");
        await handleSuccess(response);
      },
      prefill: {
        name: userData.username,
        email: userData.email,
        contact: userData.mobile,
      },
      notes: {
        booking_date: selectedDate,
        times: selectedTimes.join(", "),
      },
      theme: {
        color: "#136a8a",
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.on("payment.failed", (response) => {
      toast.error(`Payment failed: ${response.error.description}`);
      console.error("Payment failed", response.error);
    });

    rzp.open();
  };

  const handleSuccess = async (response) => {
    const { razorpay_payment_id, razorpay_signature } = response;
    console.log(razorpay_signature, "the payment id is here");
    try {
      console.log(response, "====here is the response");
      // const response = await user_Api.post("/user/");
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <>
      <div className="flex items-end justify-end">
        <button
          className="p-2 rounded-lg text-white text-sm bg-gradient-to-r from-teal-700 to-blue-900"
          onClick={proceedToPayment}
        >
          Make payment
        </button>
      </div>
    </>
  );
};

export default MakePayment;
