import PurchaseInvoice from "./Invoice/purchase";
import axios from "axios";
import { useState } from "react";
export default function ConfirmationPDF({ tx_data }: { tx_data?: any }) {
  const [loading, setLoading] = useState(false);
  const genPdf = async () => {
    const html = document.getElementById("invoice-container")?.outerHTML;
    if (!html) return alert("invoice not found");
    try {
      setLoading(true);
      const { data } = await axios.post(
        "/api/pdf",
        {
          html,
        },
        { responseType: "blob" }
      );
      const doc = new Blob([data], { type: "application/pdf;base64" });
      const fileURL = URL.createObjectURL(doc);
      window.open(fileURL);
    } catch (err: any) {
      console.log("ERROR", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-end p-2">
        <button
          disabled={loading}
          onClick={genPdf}
          className="p-2 text-white bg-blue-500 rounded shadow hover:bg-blue-600 hover:shadow-md disabled:pointer-events-none disabled:opacity-40"
        >
          Download Pdf
        </button>
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
