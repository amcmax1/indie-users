import * as React from "react";

import { useParams, useNavigate } from "react-router-dom";

export default function CustomerView() {
  let navigate = useNavigate();
  let params = useParams();
  let customer = getInvoice(parseInt(params.customerId, 10));

  return (
    <main style={{ padding: "1rem" }}>
      <h2>Total Due: {invoice.amount}</h2>
      <p>{customer}</p>
    </main>
  );
}
