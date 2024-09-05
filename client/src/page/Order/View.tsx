import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useAuth } from "@/context/AuthContext";
import { host } from "@/utils/constants";
import { order } from "@/utils/types";
import { useQuery } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { PDFViewer, Document, Text, Page, View, Image } from "@react-pdf/renderer"
import  ebuylogo from "../../assets/ebuylogo.jpg"
import { format } from "date-fns"
import { styles  } from "./styles";

function ViewData() {
  const { token } = useAuth();
  const [order] = useSearchParams();
  const orderId = order.get("orderId");
  const {isLoading, data, error } = useQuery<order, Error>({
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

  const OrderTable = () => (
    <View style={styles.table}>
      <View style={styles.tableRow}>
        <View style={styles.tableColHeader}>
          <Text style={styles.tableCellHeader}>Product Name</Text>
        </View>
        <View style={styles.tableColHeader}>
          <Text style={styles.tableCellHeader}>Product Price</Text>
        </View>
        <View style={styles.tableColHeader}>
          <Text style={styles.tableCellHeader}>Product Image</Text>
        </View>
        <View style={styles.tableColHeader}>
          <Text style={styles.tableCellHeader}>Product Quantity</Text>
        </View>
      </View>
      {data && data.productId.length > 0 ? (
        data.productId.map((item, index) => (
          <View style={styles.tableRow} key={index}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{item.name}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{item.price}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                <Image
                  src={`${host}/uploads/${item.image}`}
                  style={{ width: 50, height: 50 }}
                />
              </Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{data.quantity[index]}</Text>
            </View>
          </View>
        ))
      ) : (
        <View style={styles.tableRow}>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>No data found.</Text>
          </View>
        </View>
      )}
    </View>
  );
  const MyDocument = () => (
    <Document title={`${orderId}`}>
      <Page size="A4" style={styles.page}>
        <View style={styles.headerDetails}>
          <View>
            <Image 
              src={ebuylogo}
              style={{ width: 100, height: 50, backgroundColor: "white"}}
            />
          </View>
          <View style={styles.companyDetails}>
            <Text>Email: e-buy@shopping.com</Text>
            <Text>Phone: +254 712 345 678</Text>
            <Text>Address: Moi Avenue, Nairobi city</Text>
            <Text>Postal: 340 hs Moi Avenue, Nairobi city</Text>
          </View>
        </View>
        <View>
          <Text style={styles.details}>Order Receipt: {`${orderId}`}</Text>
          <Text style={styles.note}>
            This receipt was generated on {format(new Date(data?.createdAt), 'yyyy-MM-dd HH:mm:ss')}
          </Text>
          <Text style={styles.note}>The Total Price is ${data?.totalPrice}</Text>
        </View>
          <OrderTable />
      </Page>
    </Document>
  )

  return (
    <PDFViewer style={styles.viewer}>
      <MyDocument />
    </PDFViewer>
  )
}

export default ViewData
