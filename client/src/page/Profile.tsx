import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/context/AuthContext"
import { host } from "@/utils/constants"
import { studentDetail } from "@/utils/types"
import { useQuery } from "@tanstack/react-query"
import { LoaderCircle } from "lucide-react"


function Profile() {
  const { token, userId } = useAuth()

  const { isLoading, data, error } = useQuery<studentDetail[], Error>({
    queryKey: ["user"],
    queryFn: () => 
      fetch(`${host}/users/${userId}`,{
        headers: {
          "authorization":`Bearer ${token}`
        }
      }).then((res) => {
        if (!res.ok) {
          throw new Error("Something went wrong");
        }
        return res.json()
      }
  )
  })
  
  if (isLoading) return <div className="flex items-center justify-center mt-10"><LoaderCircle className="animate-spin size-14"/></div>

  if (error) return (
    <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
            {error.message}
        </AlertDescription>
    </Alert>
  );
  
  return (
    <div className="flex flex-col items-center justify-center mt-3">
      <h3 className="my-3 text-2xl font-semibold">User Profile</h3>

      <div>
        <img className="size-36 rounded-full" src={`http://localhost:5000/uploads/${data?.profileImage}`} alt={data?.username} />
      </div>
      <div className="mt-4">
        <p><span className="font-semibold">Username: </span>{data?.username}</p>
        <p><span className="font-semibold">Email: </span>{data?.email}</p>
        <Button>Edit</Button>
      </div>
    </div>
  )
}

export default Profile