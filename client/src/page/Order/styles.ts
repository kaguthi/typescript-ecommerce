import { StyleSheet } from "@react-pdf/renderer"
export const styles = StyleSheet.create({
    viewer: {
      width: "100%",
      height: "100vh",
    },
    page : {
      flexDirection : "column",
      backgroundColor: "white"
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1
    },
    text: {
      marginBottom: 20,
      fontSize: 12,
    },
    table: {
      width: "auto",
      borderStyle: "solid",
      borderWidth: 1,
      borderRightWidth: 0,
      borderBottomWidth: 0,
      margin: 15,
    },
    tableRow: {
      flexDirection: "row",
    },
    tableColHeader: {
      width: "25%",
      borderStyle: "solid",
      borderWidth: 1,
      borderLeftWidth: 0,
      borderTopWidth: 0,
      backgroundColor: "#f2f2f2",
      padding: 5,
      fontSize: 12,
    },
    tableCol: {
      width: "25%",
      borderStyle: "solid",
      borderWidth: 1,
      borderLeftWidth: 0,
      borderTopWidth: 0,
      padding: 5,
      fontSize: 12,
    },
    tableCellHeader: {
      textAlign: "center",
      fontWeight: "bold",
    },
    tableCell: {
      textAlign: "center",
    },
    headerDetails: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      margin: 15,
      borderBottom: 2,
      padding: 5,
    },
    companyDetails: {
      fontSize: 12,
      marginBottom: 10
    },
    details: {
      margin: 15,
      textDecoration: "underline"
    },
    note: {
      fontSize: 12,
      margin: 15
    }
  })