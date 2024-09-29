import { useQuery } from "@tanstack/react-query"
import { useAuth } from "@/context/AuthContext"
import { host } from "@/utils/constants"
import { order } from "@/utils/types";
import { LoaderCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";


function Order() {
    const { token } = useAuth();
    const {isLoading, data, error } = useQuery<order[], Error>({
        queryKey: ["order"],
        queryFn: () => 
            fetch(`${host}/order`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            }).then((res) => {
                if (!res.ok) {
                    throw new Error("Network Error");
                }
                return res.json()
            })
    });

    if (isLoading)
        return (
          <div className="flex items-center justify-center mt-5">
            <LoaderCircle className="animate-spin size-14" />
          </div>
        );
      if (error)
        return (
          <Alert variant="destructive" className="mt-5">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error.message}</AlertDescription>
          </Alert>
        );

    console.log(data)
  return (
    <div>order</div>
  )
}

export default Order