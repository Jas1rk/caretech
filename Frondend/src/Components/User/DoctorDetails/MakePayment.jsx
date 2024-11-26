import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Logo from "../../../assets/Logo/Logo";
import user_Api from "../../../service/Userinstance";
import { loadScript } from "./loadrazorpay";
import { BookingSuccessConfirm } from "../..";

const MakePayment = ({
  selectedDate,
  selectedTimes,
  toast,
  doctorId,
  onCloseModal,
}) => {
  const { userData } = useSelector((state) => state.user);
  let price = 1000;
  const total = price * selectedTimes.length;
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    loadScript(toast);
    return () => {
      const script = document.querySelector(
        'script[src="https://checkout.razorpay.com/v1/checkout.js"]'
      );
      if (script) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const proceedToPayment = async () => {
    try {
      const { data, status } = await user_Api.post("/proceed-to-payment", {
        totalAmount: total,
      });
      if ([200].includes(status)) {
        onCloseModal();
        const { amount, id, receipt } = data.razorpayOrder;
        razorpayOpen({ totalAmount: amount, paymentId: receipt, order_id: id });
      }
    } catch (error) {
      const { response } = error;
      if (response?.status === 500) {
        toast.error(response.data.message);
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };

  const razorpayOpen = ({ totalAmount, paymentId, order_id }) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: totalAmount,
      currency: "INR",
      name: "CareTech",
      description: "Booking Payment",
      image: Logo,
      order_id: order_id,
      handler: (response) =>
        handleSuccess(
          response,
          paymentId,
          totalAmount,
          selectedDate,
          selectedTimes,
          { userId: userData.id },
          doctorId
        ),
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
    });

    rzp.open();
  };

  const handleSuccess = async (
    response,
    paymentId,
    totalAmount,
    selectedDate,
    selectedTimes,
    userId,
    doctorId
  ) => {
    const { razorpay_payment_id, razorpay_signature, razorpay_order_id } =
      response;
    try {
      const response = await user_Api.post("/payment-success", {
        razorpay_payment_id,
        razorpay_signature,
        razorpay_order_id,
        paymentId,
        totalAmount,
        selectedDate,
        selectedTimes,
        userId,
        doctorId,
      });
      console.log(response, "is here please check it out ");
      if (response.status === 200) {
        toast.info("helllo")
        setShowConfirm(true);
      }
    } catch (error) {
      const { response } = error;
      if (response?.status === 409) {
        toast.error(response.data.message);
      } else {
        console.error("Unexpected error:", error);
      }
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
      {showConfirm && <BookingSuccessConfirm />}
    </>
  );
};

export default MakePayment;
