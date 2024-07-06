import { useState, FormEvent } from "react"
import {useNavigate } from "react-router-dom"
import { loginDetail } from "@/utils/types";
import { Button } from "@/components/ui/button";
import { host } from "@/utils/constants";
import toast from "react-hot-toast";
import { useAuth } from "./AuthContext";

function Signin() {
  const navigate = useNavigate();
  const { setToken, setName, setProfileImage } = useAuth();

  const [studentDetail, setStudentDetails] = useState<loginDetail>({ username: "", password: ""});
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch (`${host}/login`,
        {
          method: "POST",
          headers: {
            "Content-Type" : "application/json"
          },
          body: JSON.stringify(studentDetail)
        }
      )
      const data = await response.json();
      if(data.success === true){
        const { profileImage, token, username } = data;
        toast.success(data.message);
        setProfileImage(profileImage);
        setToken(token)
        setName(username)
        navigate("/");
      }else{
        toast.error(data.message);
      }
    } catch (error: any) {
      toast.error("Something went wrong, Please try again");
      console.log(error.message)
    }
   }

  localStorage.setItem("username", studentDetail.username);
  return (
    <div>
      <form onSubmit={handleSubmit} className="flex items-center justify-center flex-col m-5">
        <label htmlFor="username">Username</label>
      <input
          className="p-3 border border-orange-500 rounded-md w-full" 
          type="text"
          name="username"
          required
          value={studentDetail.username} 
          onChange={(e) => setStudentDetails({ ...studentDetail, username: e.target.value })} />
        <label htmlFor="password">Password</label>
        <input 
          className="p-3 m-5 border border-orange-500 rounded-md w-full"
          type="password"
          name="password"
          required
          value={studentDetail.password} 
          onChange={(e) => setStudentDetails({ ...studentDetail, password: e.target.value })} />
          <Button type="submit" className="mt-3 w-full">Sign up</Button>
      </form>
  </div>
  )
}

export default Signin