import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { backendUrl } from "../../service/backendUrl";
import admin_Api from "../../service/AxiosInstance";

export const adminLogin = createAsyncThunk(
  "admin/adminLogin",
  async ({ email, password, toast }, { rejectWithValue }) => {
    if (email.trim() === "" || password.trim() === "") {
      toast.error("Please fill in all fields");
      return rejectWithValue("Please fill in all fields");
    } else {
      try {
        const response = await axios.post(`${backendUrl}/admin/adminlogin`, {
          email,
          password,
        });
        if (response.data === "incorrectemail") {
          toast.error("Incorrect email");
          return rejectWithValue("Incorrect email");
        } else if (response.data === "incorrectpassaword") {
          toast.error("Incorrect password");
          return rejectWithValue("Incorrect password");
        } else {
          return response.data;
        }
      } catch (err) {
        toast.error("An error ouccurs Please try again");
        return rejectWithValue(err.message);
      }
    }
  }
);

export const fetchUsers = createAsyncThunk("admin/fetchUsers", async () => {
  const response = await admin_Api.get("/admin/fetchusers");
  return response.data;
});

export const createCategory = createAsyncThunk(
  "admin/createCategory",
  async ({ category, description, toast }, { rejectWithValue }) => {
    if (category.trim() === "" || description.trim() === "") {
      toast.error("Please fill in all fields");
      return rejectWithValue("Please fill in all fields");
    } else if (category.length < 3) {
      toast.error("Category name must be at least 3 characters");
      return rejectWithValue("Category name must be at least 3 characters");
    } else if (!/^[A-Z\s]+$/.test(category)) {
      toast.error("Category name must be in uppercase");
      return rejectWithValue("Category name must be in uppercase");
    } else if (!/^[a-zA-Z0-9\s,'/.()-]+$/.test(description)) {
      toast.error("Description must be in the correct format");
      return rejectWithValue("Description must be in the correct format");
    } else {
      try {
        const response = await admin_Api.post("/admin/addcategory", {
          category,
          description,
        });
        if (response.data === "alreadyexist") {
          toast.error("Category already exist");
          return rejectWithValue("Category already exist");
        } else {
          return response.data;
        }
      } catch (err) {
        toast.error("An error occurs Please try again");
        return rejectWithValue(err.message);
      }
    }
  }
);

export const fetchCategories = createAsyncThunk(
  "admin/fetchCategories",
  async () => {
    const response = await admin_Api.get("/admin/fetchcategories");
    return response.data;
  }
);

export const editCategory = createAsyncThunk(
  "admin/editCategory",
  async ({ categoryid, category, description, toast }, { rejectWithValue }) => {
    if (category.trim() === "" || description.trim() === "") {
      toast.error("Please fill in all fields");
      return rejectWithValue("Please fill in all fields");
    } else if (category.length < 3) {
      toast.error("Category name must be at least 3 characters");
      return rejectWithValue("Category name must be at least 3 characters");
    } else if (!/^[A-Z\s]+$/.test(category)) {
      toast.error("Category name must be in uppercase");
      return rejectWithValue("Category name must be in uppercase");
    } else if (!/^[a-zA-Z0-9\s,'/.()-]+$/.test(description)) {
      toast.error("Description must be in the correct format");
      return rejectWithValue("Description must be in the correct format");
    } else {
      try {
        const response = await admin_Api.post("/admin/editcategory", {
          categoryid,
          category,
          description,
        });
        return response.data;
      } catch (err) {
        toast.error("An error occurs Please try again");
      }
    }
  }
);


export const fetchNewDoctors = createAsyncThunk('admin/fetchNewDoctors',async()=>{
  try{
      const {data} = await admin_Api.get('/admin/doctors')
      return data
  }catch(err){
    console.log(err.message)
  }
})