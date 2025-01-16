import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useAuth } from "@/context/AuthContext"
import { host } from "@/utils/constants"
import { userSchema } from "@/utils/types"
import { useQuery } from "@tanstack/react-query"
import { LoaderCircle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Edit from "./Edit"

function Profile () {
  const { token, userId } = useAuth()

  const { isLoading, data, error } = useQuery<userSchema, Error>({
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
    <div className="flex flex-col items-center justify-center mt-3 p-4">
      <h3 className="my-3 text-2xl font-semibold">User Profile</h3>

      <div className="w-full max-w-xs">
        <img className="w-full h-auto rounded-full" src={`${host}/uploads/${data?.profileImage}`} alt={data?.username} />
      </div>
      <div className="mt-4">
        <p className="mt-2"><span className="font-semibold">Username: </span>{data?.username}</p>
        <p className="mt-2"><span className="font-semibold">Email: </span>{data?.email}</p>
        <Dialog>
          <DialogTrigger className="bg-primary p-2 text-slate-100 rounded-md mt-2">Edit profile</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Profile</DialogTitle>
            </DialogHeader>
            <DialogDescription>
              Make changes to your profile and click save once you're finished.
            </DialogDescription>
            {data && <Edit userdata={data} />}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

export default Profile