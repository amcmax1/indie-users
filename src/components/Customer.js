import { useState } from "react";
import { useCustomerContext } from ".././customer-context";

export default function Customer(props) {
  const [digest, setDigest] = useState(); // TODO: await
  const { dispatch } = useCustomerContext();

  function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  return (
    <tr
      scope="row"
      className={` border-b dark:bg-gray-800 dark:border-gray-700 ${
        props.customer.isActive
          ? "bg-green-100 hover:bg-green-200"
          : "bg-blue-100 hover:bg-blue-200"
      }`}
    >
      <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {props.customer.name.first} {props.customer.name.last}
      </td>
      <td className="py-4 px-6">{toTitleCase(props.customer.company)}</td>
      <td className="py-4 px-6">
        {props.customer.address
          .split(", ")
          .slice(1, 1 + 2)
          .join(", ")}
      </td>
      <td className="py-4 px-6 font-medium">{props.activeStatus}</td>
      <td className="py-4 px-6">{digest ? digest : "...loading"}</td>

      <td className="py-4 px-6" onClick={() => dispatch({ type: "activate" })}>
        Activate
      </td>
    </tr>
  );
}
