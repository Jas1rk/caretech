import React, { useState, useEffect } from "react";
import axios from "axios";
import { backendUrl } from "../service/backendUrl";

const useFetchDoctor = (doctorid) => {
  const [doctor, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        const { data } = await axios.get(
          `${backendUrl}/doctor-details/${doctorid}`
        );
        setDoctors(data);
      } catch (err) {
        console.log(err);
      }
    };

    if (doctorid) {
      fetchDoctorDetails();
    }
  }, [doctorid]);

  return {doctor};
};

export default useFetchDoctor;
