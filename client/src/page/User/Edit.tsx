import { useEffect, useState, FormEvent } from "react";
import { useSearchParams, useNavigate } from "react-router-dom"
import { userDetail } from "@/utils/types";
import { Button } from "@/components/ui/button";
import { host } from "@/utils/constants";
import toast from "react-hot-toast";

function Edit() {
    const [student] = useSearchParams();
    const navigate = useNavigate();

    const [studentDetail, setStudentDetails] = useState<userDetail>({ username: "", email: "" });
    const stud = student.get("studentId");
    useEffect(() =>{
      if (stud) {
        fetch(`${host}/users/${stud}`,
          {
            headers: {
              "authorization": document.cookie
            }
          }
        )
          .then(response => response.json())
          .then(data => setStudentDetails(data))
          .catch(error => console.error('Error fetching student details:', error));
      }
    },[stud]);

    // submitting the form
    const handleSubmit = async (e: FormEvent) => {
      e.preventDefault();
      if (!stud) {
        toast.error("Student ID is missing");
        return;
      }
  
      try {
        const response = await fetch(`${host}/update/${stud}`, {
          method: "PUT",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(studentDetail),
        });
  
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Error updating student details: ${errorText}`);
        }
  
        const data = await response.json();
        toast.success(data.message);
        navigate('/student');
      } catch (error: any) {
        toast.error(`Error updating student details: ${error.message}`);
      }
    };
  return (
    <div>
      <form onSubmit={handleSubmit} className="flex items-center justify-center flex-col m-5">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          className="p-3 border border-orange-500 rounded-md w-full" 
          value={studentDetail.username} 
          onChange={(e) => setStudentDetails({ ...studentDetail, username: e.target.value })} 
        />
        <label htmlFor="email">Email</label>
        <input 
          type="email"
          className="p-3 m-5 border border-orange-500 rounded-md w-full"
          value={studentDetail.email} 
          onChange={(e) => setStudentDetails({ ...studentDetail, email: e.target.value })} />
          <Button type="submit" className="mt-3 w-full">Edit</Button>
      </form>
  </div>
  )
}

export default Edit