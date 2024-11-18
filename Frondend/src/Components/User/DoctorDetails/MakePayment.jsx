import React from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";

const MakePayment = ({ selectedDate ,selectedTimes }) => {
    const {userData} = useSelector((state) => state.user)
    let price = 1000
    const total  = price * selectedTimes.length
  return (
    <div className="flex items-end justify-end">
      <button
        className="p-2 rounded-lg text-white text-sm bg-gradient-to-r from-teal-700 to-blue-900"
        onClick={() => toast.warning(total)}
      >
        Make payment
      </button>
    </div>
  );
};

export default MakePayment;
