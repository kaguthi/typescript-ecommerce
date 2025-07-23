import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useAuth } from "@/context/AuthContext"
import { formatPrice, host } from "@/utils/constants"
import { order } from "@/utils/types"
import { useQuery } from "@tanstack/react-query"
import { Eye, LoaderCircle } from "lucide-react"
function LatestOrder() {
  const { token } = useAuth()
  const {isLoading, data: latestOrder, error} = useQuery<order[], Error>({
    queryKey: ["order"],
    enabled: !!token,
    queryFn: () => 
      fetch(`${host}/order/latestOrder`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        if (!res.ok) {
          throw new Error("Something Went Wrong!! Please try again")
        }
        return res.json()
      })
  })
  if (isLoading)
    return (
      <div className="flex items-center justify-center mt-5">
        <LoaderCircle className="animate-spin size-14" />
      </div>
    );
  if (error)
    return (
      <Alert variant="destructive" className="mt-5 p-3">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error.message}</AlertDescription>
      </Alert>
    );

  return (
    <div className="flex flex-col m-5">
        <p className="font-bold underline">Latest Order</p>
        <div className="mt-5">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>profile Image</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              { latestOrder && latestOrder.length > 0 ?  (
                  latestOrder.map((order, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{index + 1 }</TableCell>
                      <TableCell>{order.userId.username}</TableCell>
                      <TableCell>{order.userId.email}</TableCell>
                      <TableCell className="text-right">
                        <img className="w-10 h-10 object-contain rounded-full" src={`${order.userId.profileImage}`} alt="user image" />
                      </TableCell>
                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline"><Eye /></Button>
                          </DialogTrigger>
                          <DialogContent>
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Name</TableHead>
                                  <TableHead>Price</TableHead>
                                  <TableHead>Image</TableHead>
                                  <TableHead>Quantity</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                               {order.productId.map((item, i) => (
                                  <TableRow key={i}>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{item.price}</TableCell>
                                    <TableCell>
                                      <img className="w-10 h-10 object-contain rounded-full" src={`${item.image}`} alt="product image" />
                                    </TableCell>
                                    <TableCell>{order.quantity[i]}</TableCell>
                                  </TableRow>
                               ))}
                              </TableBody>
                              <TableFooter>
                                <TableRow>
                                  <TableCell colSpan={3}>Total</TableCell>
                                  <TableCell className="text-right">{formatPrice(order.totalPrice / 100)}</TableCell>
                                </TableRow>
                              </TableFooter>
                            </Table>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))
              ) : 
              (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">
                    No orders found
                  </TableCell>
                </TableRow>
              )
              }
              </TableBody>
          </Table>
        </div>
    </div>
  )
}

export default LatestOrder