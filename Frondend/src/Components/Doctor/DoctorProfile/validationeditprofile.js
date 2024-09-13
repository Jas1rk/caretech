import * as Yup from 'yup'

export const validationEditProfileSchema = Yup.object({
    doctorname: Yup.string().required('Name is required')
    .min(3, "Name must be at least 3 char")
    .max(20, "Name must be at most 20 char")
    .test(
      "is-first-letter-capital",
      "The first letter must be capital",
      (value) => value && value.charAt(0) === value.charAt(0).toUpperCase()
    ),
    doctormobile: Yup.string()
    .required("Mobile is required")
    .min(10, "Mobile must be 10 digits"),
    doctorstate: Yup.string().required("State is required"),
    doctorcountry:Yup.string().required("Country is required"),
    doctorlocation:Yup.string().required("Location is required"),
    doctorexperience:Yup.string().required("Experience is required"),
    doctordescription:Yup.string().required('doctor description is required'),
    doctorprofile: Yup.mixed()
    .required("Profileimge is required")
    .test("fileType", "Only jpg files are supported", (value) => {
      if (!value) return false;
      return value.type === "image/jpeg";
    }),
})