import React, { useEffect, useState } from "react";
import Logo from "../../../assets/Logo/Logo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faClose } from "@fortawesome/free-solid-svg-icons";
import { DoctorSidebar } from "../..";

const Doctorheader = () => {
  const [openSidebar, setOpenSidebar] = useState(false);
 

  return (
    <>
      <div className="bg-white shadow-xl w-full h-20 flex z-50 justify-between p-2 items-center fixed">
        <Logo />
        {openSidebar ? (
          <FontAwesomeIcon
            icon={faClose}
            className="cursor-pointer text-2xl"
            onClick={() => setOpenSidebar(false)}
          />
        ) : (
          <FontAwesomeIcon
            icon={faBars}
            className="cursor-pointer text-2xl"
            onClick={() => setOpenSidebar(true)}
          />
        )}
      </div>
      {openSidebar && <DoctorSidebar open={openSidebar} setOpen={setOpenSidebar} />}
    </>
  );
};

export default Doctorheader;
