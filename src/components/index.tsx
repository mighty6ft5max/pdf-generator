import PurchaseInvoice from "./Invoice/purchase";
import axios from "axios"
import { useState } from "react";
export default function ConfirmationPDF({ tx_data }: { tx_data?: any }) {
  const [loading, setLoading] = useState(false)
  const genPdf = ()=>{
   const html = document.getElementById("invoice-container")?.outerHTML;
   if(!html) return alert("invoice not found");
   setLoading(true)
   axios.post("/api/invoice/raw_email",{html, transaction: "r68ujkw9lz"},{responseType: 'blob'}).then((response)=>{
    // const url = window.URL.createObjectURL(new Blob([response.data]));
    // const link = document.createElement("a");
    // link.href = url;
    // link.setAttribute("download", "file.pdf"); //change "file.pdf" according to saved name you want, give extension according to filetype
    // document.body.appendChild(link);
    // link.click();
    // link.remove();
   }).finally(()=>{
    setLoading(false);
   })
  }

  return (
    <div className="container mx-auto">
      <div className="flex justify-end p-2">
        <button disabled={loading} onClick={genPdf} className="p-2 text-white bg-blue-500 rounded shadow hover:bg-blue-600 hover:shadow-md disabled:pointer-events-none disabled:opacity-40" >Download Pdf</button>
      </div>
      <div
        id="invoice-container"
        className="max-w-4xl mx-auto my-6 bg-white border border-gray-200 shadow-md aspect-ratio"
        style={{ paddingBottom: "77.2%" }}
      >
        <PurchaseInvoice />
      </div>
    </div>
  );
}
