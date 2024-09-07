import * as Yup from 'yup'

export const doctValidationSchema = Yup.object({
    doctorName: Yup.string()
      .required("Name is required")
      .min(3, "Name must be at least 3 characters")
      .max(20, "Name must be at most 20 characters")
      .test(
        "is-first-letter-capital", 
        "The first letter must be capitalized", 
        (value) => value && value.charAt(0) === value.charAt(0).toUpperCase() 
      ),
    lastName: Yup.string()
      .required("Degree is required")
      .test(
        "is-uppercase",
        "Degree should be uppercase",
        (value) => value === value.toUpperCase()
      ),
    doctorEmail: Yup.string()
      .email("Invalid email")
      .required("Email is required"),
    doctorMobile: Yup.string()
      .required("Mobile is required")
      .min(10, "Mobile must be 10 digits"),
    doctorPass: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    doctorConfimPass: Yup.string()
      .oneOf([Yup.ref("doctorPass"), null], "Passwords must match")
      .required("Confirm Password is required"),
    specialization: Yup.string().required("Specialization is required"),
    certificate: Yup.mixed().required("Certificate is required"),
    experience:Yup.string().required("Experience is required"),
    profile:Yup.mixed().required("Profileimge is required"),
    aboutyou:Yup.string().required("About you is required"),
    Location:Yup.string().required("Location is required"),
    Country:Yup.string().required("Country is required"),
    State:Yup.string().required("State is required")

  });



  export const doctorInitialValues = {
    doctorName: "",
    lastName: "",
    doctorEmail: "",
    doctorMobile: "",
    doctorPass: "",
    doctorConfimPass: "",
    specialization: "",
    certificate: null,
    experience: "",
    profile:null,
    aboutyou:"",
    Location:"",
    Country:"",
    State:""
  };