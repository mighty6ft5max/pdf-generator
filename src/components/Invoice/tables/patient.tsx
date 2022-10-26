import Section from "./_section";
export default function InvoicePatient() {
  return (
    <Section title="Patient Information">
      <div style={{ display: "flex" }}>
        <div style={{ width: "100%" }}>
          <table
            style={{
              width: "100%",
            }}
          >
            <tbody>
              {[
                {
                  c1: `Name`,
                  c2: `Terrance Julienne`,
                  c3: "Invoice",
                  c4: "r68ujkw9lz",
                },
                {
                  c1: "Date of Birth",
                  c2: "05/18/1988",
                  c3: "Date Purchased",
                  c4: "06/9/2021 8:43AM",
                },
                {
                  c1: "Address",
                  c2: (
                    <>
                      134 Valley Stream Dr.
                      <br />
                      Novato, CA 52088
                    </>
                  ),
                  c3: "Payment Status",
                  c4: "Paid in Full",
                },
              ].map((item: any, idx: number) => {
                const { c1, c2, c3, c4 } = item;
                return (
                  <tr key={idx} style={{ fontSize: "9pt" }}>
                    <td
                      style={{
                        fontWeight: 600,
                        width: "16%",
                        border: "1px solid",
                        borderColor: "rgb(17 102 155 / 0.1)",
                        borderCollapse: "collapse",
                        padding: "2px 4px",
                        verticalAlign: "top",
                      }}
                    >
                      {c1}
                    </td>
                    <td
                      style={{
                        border: "1px solid",
                        borderColor: "rgb(17 102 155 / 0.1)",
                        borderCollapse: "collapse",
                        padding: "2px 4px",
                        verticalAlign: "top",
                      }}
                    >
                      {c2}
                    </td>
                    <td
                      style={{
                        fontWeight: 600,
                        width: "21%",
                        border: "1px solid",
                        borderColor: "rgb(17 102 155 / 0.1)",
                        borderCollapse: "collapse",
                        padding: "2px 4px",
                        verticalAlign: "top",
                      }}
                    >
                      {c3}
                    </td>
                    <td
                      style={{
                        width: "21%",
                        border: "1px solid",
                        borderColor: "rgb(17 102 155 / 0.1)",
                        borderCollapse: "collapse",
                        padding: "2px 4px",
                        verticalAlign: "top",
                      }}
                    >
                      {c4}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </Section>
  );
}
