
import {
  faBook,
  faCouch,
  faHome,
  faMessage,
  faPeopleGroup,
  faUserDoctor,
} from "@fortawesome/free-solid-svg-icons";

export const sidebarItems = [
  { path: "/", label: "Home", icon: faHome },
  { path: "/doctor/doctorprofile", label: "Profile", icon: faUserDoctor },
  { path: "/doctor/booking-details", label: "Bookings", icon: faBook },
  { path: "/doctor/followers", label: "Followers", icon: faPeopleGroup },
  {
    path: "/doctor/sloat-allocation",
    label: "Sloat Allocation",
    icon: faCouch,
  },
  { path: "/doctor/chat", label: "Chat", icon: faMessage },
];
