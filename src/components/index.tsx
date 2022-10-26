import PurchaseInvoice from "./Invoice/purchase";

export default function ConfirmationPDF({ tx_data }: { tx_data?: any }) {
  return (
    <div className="container mx-auto">
      <div
        className="bg-white border border-gray-200 my-6 mx-auto max-w-4xl shadow-md aspect-ratio"
        style={{ paddingBottom: "77.2%" }}
      >
        <PurchaseInvoice />
      </div>
    </div>
  );
}
