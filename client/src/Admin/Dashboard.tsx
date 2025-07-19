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
import {formatPrice} from "@/utils/constants"

function Dashboard() {
    const { token } = useAuth();
    const [productCount, setProductCount] = useState<number | null>(null);
    const [userCount, setUserCount] = useState<number | null>(null);
    const [sales, setSales] = useState<number | null>(null);

    const {isLoading, data, error} = useQuery({
        queryKey: ["count"],
        enabled: !!token,
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
            setProductCount(data?.productCount ?? 0);
            setUserCount(data?.userCount ?? 0);
            setSales(data?.sales ?? 0);
        }
    }, [data]);

    
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
    <div className="flex item-center justify-center gap-9 mt-5 p-5">
        <Card className="w-2/6">
        <CardHeader>
            <CardTitle>
            Total Users
            </CardTitle>
        </CardHeader>
        <CardContent>
            <div className="flex justify-between">
            <Users />
            <p>{userCount ?? '-'}</p>
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
            <p>{productCount ?? '-'}</p>
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
            <p>{formatPrice(Number(sales)) ?? 0}</p>
            </div>
        </CardContent>
        </Card>
    </div>
  )
}

export default Dashboard