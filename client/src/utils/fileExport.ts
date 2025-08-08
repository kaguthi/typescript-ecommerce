/* eslint-disable @typescript-eslint/no-explicit-any */
import { saveAs } from 'file-saver';
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";


export const exportToExcel = (rows: any[], fileName: string) => {
    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, fileName);
}

export const exportToPDF = (rows: any[], fileName: string) => {
    const doc = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: 'a4'
    });
    const columns = Object.keys(rows[0]);
    const data = rows.map(row => columns.map(col => row[col]));

    autoTable(doc, {
        head: [columns],
        body: data,
    });

    doc.save(fileName);
}

export const exportToCSV = (rows: any[], fileName: string) => {
    const csvContent = rows.map(row => Object.values(row).join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, fileName);
}