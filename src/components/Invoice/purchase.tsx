import InvoicePatient from "./tables/patient";
import InvoicePayments from "./tables/payment";

export default function PurchaseInvoice() {
  return (
    <div style={{ padding: "6.65%" }}>
      <div
        className="flex flex-row items-center"
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <div style={{ flexGrow: 1 }}>
          <img
            src="https://res.cloudinary.com/maxime-associates/image/upload/w_400/v1665381954/RapidSTDTesting/rst_logo.png"
            alt="RST logo"
            style={{ width: "50%" }}
          />
        </div>
        <div style={{ fontSize: "8pt" }}>
          Maxime, Prosper & Associates
          <br />
          1000 Great American Way
          <br />
          Orlando, FL 32838
        </div>
      </div>
      <div
        style={{
          color: "rgb(17 102 155 / 0.8)",
          fontWeight: 600,
          fontSize: "20pt",
          lineHeight: "24pt",
          textAlign: "center",
          marginTop: 60,
        }}
      >
        Order Confirmation
      </div>
      <InvoicePatient />
      <InvoicePayments />
    </div>
  );
}
