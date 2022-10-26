import Section from "./_section";
export default function InvoiceTesting() {
  return (
    <Section title="Payments">
      <div style={{ display: "flex" }}>
        <div style={{ width: "100%" }}>
          <table
            style={{
              width: "100%",
            }}
          >
            <thead
              style={{
                background: "rgb(17 102 155 / 0.05)",
                color: "rgb(17 102 155 / 0.8)",
                fontSize: "9pt",
                fontWeight: 600,
                //lineHeight: "22pt",
                padding: "0 2px",
                textAlign: "left",
              }}
            >
              <tr>
                <th
                  style={{
                    padding: "0 2px",
                    width: "20%",
                  }}
                >
                  Transaction ID
                </th>
                <th
                  style={{
                    padding: "0 2px",
                    width: "25%",
                  }}
                >
                  Date Processed
                </th>
                <th
                  style={{
                    padding: "0 2px",
                  }}
                >
                  Detail
                </th>
                <th
                  style={{
                    padding: "0 2px",
                    textAlign: "right",
                    width: "14%",
                  }}
                >
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  id: "r68ujkw9lz",
                  updatedAt: "06/9/2021 8:43AM",
                  creditCard: "378282******0005",
                  amount: "$18,704.15",
                },
              ].map((item: any, idx: number) => {
                const { id, updatedAt, creditCard, amount } = item;
                return (
                  <tr key={idx} style={{ fontSize: "9pt" }}>
                    <td
                      style={{
                        border: "1px solid",
                        borderColor: "rgb(17 102 155 / 0.05)",
                        borderCollapse: "collapse",
                        padding: "2px 4px",
                        verticalAlign: "top",
                      }}
                    >
                      {id}
                    </td>
                    <td
                      style={{
                        border: "1px solid",
                        borderColor: "rgb(17 102 155 / 0.05)",
                        borderCollapse: "collapse",
                        padding: "2px 4px",
                        verticalAlign: "top",
                      }}
                    >
                      {updatedAt}
                    </td>
                    <td
                      style={{
                        border: "1px solid",
                        borderColor: "rgb(17 102 155 / 0.05)",
                        borderCollapse: "collapse",
                        padding: "2px 4px",
                        verticalAlign: "top",
                      }}
                    >
                      {creditCard.cardType} {creditCard.maskedNumber}
                    </td>
                    <td
                      style={{
                        border: "1px solid",
                        borderColor: "rgb(17 102 155 / 0.05)",
                        borderCollapse: "collapse",
                        padding: "2px 4px",
                        textAlign: "right",
                        verticalAlign: "top",
                      }}
                    >
                      ${amount}
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot
              style={{
                background: "rgb(17 102 155 / 0.05)",
                color: "rgb(17 102 155 / 0.8)",
                fontSize: "9pt",
                fontWeight: 600,
                //lineHeight: "22pt",
                padding: "0 2px",
                textAlign: "left",
              }}
            >
              <tr>
                <td
                  colSpan={2}
                  style={{
                    padding: "0 2px",
                    textDecoration: "uppercase",
                    width: "20%",
                  }}
                >
                  Total Payments(s) Received
                </td>
                <td
                  style={{
                    padding: "0 2px",
                  }}
                >
                  1
                </td>
                <td
                  style={{
                    padding: "0 2px",
                    textAlign: "right",
                    width: "14%",
                  }}
                >
                  $18,704.15
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </Section>
  );
}
