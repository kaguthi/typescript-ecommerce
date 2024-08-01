import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useAuth } from "@/context/AuthContext";
import { host } from "@/utils/constants";
import { order } from "@/utils/types";
import { useQuery } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import { useSearchParams } from "react-router-dom";

function View() {
  const { token } = useAuth();
  const [order] = useSearchParams();
  const orderId = order.get("orderId");
  const {isLoading, data, error } = useQuery<order[], Error>({
    queryKey: ["order", orderId],
    queryFn: () => 
      fetch(`${host}/order/orderById/${orderId}`, {
        headers: {
          "authorization" : `Bearer ${token}`
        }
      }).then((res) => {
        if (!res.ok) {
          throw new Error("Something went wrong")
        }
        return res.json();
      })
  });
  if (isLoading)
    return (
      <div className="flex items-center justify-center mt-10">
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
    <div className="flex items-center justify-center mt-5">
      <div>
        {
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product Name</TableHead>
                <TableHead>Product Price</TableHead>
                <TableHead>Product Image</TableHead>
                <TableHead>Product Quantity</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              { data && data ?
                data.productId.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.price}</TableCell>
                    <TableCell>
                      <img src={`${host}/uploads/${item.image}`} alt={item.name} className="h-10 w-10"/>
                    </TableCell>
                  </TableRow>
                ))
                : 
                <TableRow>
                  <TableCell
                    colSpan={4}
                      className="h-10 text-center"
                  >No data found.</TableCell>
                </TableRow>
              }
            </TableBody>
          </Table>
        }
      </div>
    </div>
  )
}

export default View