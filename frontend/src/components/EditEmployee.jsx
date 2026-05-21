import {useEffect}from 'react'
import { useForm } from 'react-hook-form'
import { useLocation,useNavigate } from 'react-router'
import axios from 'axios'
function EditEmployee() {
 
  const {
     register,
      handleSubmit,
    setValue
   } = useForm()
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

    //get empobj from navigate hook
    const { state } = useLocation();
     const navigate = useNavigate();

    useEffect(()=>{
      if (state) {
        setValue("name",state.name);
        setValue("email",state.email);
        setValue("mobile",state.mobile);
        setValue("designation",state.designation);
        setValue("companyName",state.companyName);
      }
    }, [state, setValue]);

    //modify the form
    const saveModifiedEmp = async (modifiedEmp) => {
      //make http put req
      const res=await axios.put(`${API_URL}/emp-api/employees/${state._id}`,modifiedEmp);
      if(res.status===200){
        //navigate list of users
        navigate("/list");
      }

    }
  return (
    <div>
      <h1 className="text-5xl text-center text-green-800">Edit Employee</h1>
      {/* form */}
      <form className=" max-w-md mx-auto mt-10"  onSubmit={handleSubmit(saveModifiedEmp)} >
        <input
          type="text"
          {...register("name")}
          className="mb-3 border border-2 p-3 w-full rounded-2xl"
        />
        <input
          type="email"
          {...register("email")}
          className="mb-3 border border-2 p-3 w-full rounded-2xl"
        />

        <input
          type="number"
          {...register("mobile")}
          className="mb-3 border border-2 p-3 w-full rounded-2xl"
        />
        <input
          type="text"
          {...register("designation")}
          className="mb-3 border border-2 p-3 w-full rounded-2xl"
        />
        <input
          type="text"
          {...register("companyName")}
          className="mb-3 border border-2 p-3 w-full rounded-2xl"
        />

        <button type="submit" className="text-2xl rounded-2xl bg-green-600 text-white block mx-auto p-4">
          Save
        </button>
      </form>
    </div>
  )
}

export default EditEmployee