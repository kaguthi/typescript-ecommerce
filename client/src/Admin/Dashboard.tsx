import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import { Users, ShoppingBasket, BadgeDollarSign } from "lucide-react"

function Dashboard() {
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
            <p>5</p>
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
            <p>8</p>
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