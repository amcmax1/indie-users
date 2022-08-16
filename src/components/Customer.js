import { useState, useEffect } from "react";

export default function Customer(props) {
  const [digest, setDigest] = useState(null); // await

  useEffect(() => {
    if (!props.promiseState == "fulfilled") return;
    let fetchedDigest = props.userDigests.filter(
      (o) => o.fullName === props.fullName
    );
    setDigest(fetchedDigest);
  }, [props.promiseState]);

  return (
    <tr>
      <td>{props.customer.name.first}</td>
      <td>{props.customer.name.last}</td>
      <td>{props.customer.company}</td>
      <td>{props.customer.address}</td>
      <td>{props.activeStatus}</td>
      <td>digest</td>
      <td>"Activate"</td>
      <td>"Deactivate"</td>
    </tr>
  );
}
