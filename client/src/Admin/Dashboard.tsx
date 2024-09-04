import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Users, ShoppingBasket, BadgeDollarSign, LoaderCircle } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import { host } from "@/utils/constants"
import { useAuth } from "@/context/AuthContext"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useEffect, useState } from "react"

function Dashboard() {
    const { token } = useAuth();
    const [productCount, setProductCount] = useState<string>("")
    const [userCount, setUserCount] = useState<string>("")
    const {isLoading, data, error} = useQuery({
        queryKey: ["count"],
        queryFn: () =>
            fetch(`${host}/count`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            }).then((res) => {
                if (!res.ok) {
                    throw new Error("Network Error")
                }
                return res.json();
            }) 
    })

    useEffect(() => {
        if (data) {
            setProductCount(data["productCount"])
            setUserCount(data["userCount"])
        }
    },[data])
    
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
  return (
    <div className="flex justify-center m-5 gap-7">
        <Card className="w-2/6">
        <CardHeader>
            <CardTitle>
            Total Users
            </CardTitle>
        </CardHeader>
        <CardContent>
            <div className="flex justify-between">
            <Users />
            <p>{userCount}</p>
            </div>
        </CardContent>
        </Card>
        <Card className="w-2/6">
        <CardHeader>
            <CardTitle>
            Total Products
            </CardTitle>
        </CardHeader>
        <CardContent>
            <div className="flex justify-between">
            <ShoppingBasket />
            <p>{productCount}</p>
            </div>
        </CardContent>
        </Card>
        <Card className="w-2/6">
        <CardHeader>
            <CardTitle>
            Total Sales
            </CardTitle>
        </CardHeader>
        <CardContent>
            <div className="flex justify-between">
            <BadgeDollarSign />
            <p>$ 1000</p>
            </div>
        </CardContent>
        </Card>
    </div>
  )
}

export default Dashboard