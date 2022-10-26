export default function InvoiceSection({
  children,
  title,
}: {
  children: any;
  title: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        margin: "24px 0",
      }}
    >
      <div
        style={{
          background: "rgb(17 102 155 / 0.025)",
          color: "rgb(17 102 155 / 0.8)",
          fontSize: "18pt",
          fontWeight: 600,
          lineHeight: "22pt",
          padding: "0 2px",
        }}
      >
        {title}
      </div>
      {children}
    </div>
  );
}
