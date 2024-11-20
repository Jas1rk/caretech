import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import Logo from "../../../assets/Logo/Logo";
import user_Api from "../../../service/Userinstance";


const MakePayment = ({ selectedDate, selectedTimes }) => {
  const { userData } = useSelector((state) => state.user);
  let price = 1000;
  const total = price * selectedTimes.length;

  const handlePayment = async () => {
    const options = {
      key: "rzp_test_ymZP4ImziZlWcK",
      amount: total * 100,
      currency: "INR",
      name: "CareTech",
      description: "Booking Payment",
      image: Logo,
      "handler": async(response) => {
         handleSuccess(response)
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

  const handleSuccess = async(response) => {
    try{
      const response = await user_Api.post()
    }catch(err){
      console.log(err.message)
    }
  };
  return (
    <>
      <div className="flex items-end justify-end">
        <button
          className="p-2 rounded-lg text-white text-sm bg-gradient-to-r from-teal-700 to-blue-900"
          onClick={handlePayment}
        >
          Make payment
        </button>
      </div>
    </>
  );
};

export default MakePayment;
