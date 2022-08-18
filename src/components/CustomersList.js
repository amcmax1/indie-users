import { useDeferredValue, useEffect, useState, useReducer } from "react";
import Customer from "./Customer";
import { useCustomerContext } from "../customer-context";
const renderLoader = () => <p>Loading</p>;
const API_URL = "https://api.hashify.net/hash/md4/hex?value=";

export default function CustomersList(props) {
  const { dispatch } = useCustomerContext();
  useReducer(dispatch({ type: "setUsers", users: props.rawCustomersData }));

  let fullNames = props.rawCustomersData.map(
    //TODO: extract
    (c) => `${c.name.first + c.name.last}`
  );
  const [userDigests, setUserDigests] = useState([]);
  const [promiseState, setPromiseState] = useState(null);
  const urlsArray = function (fullNames) {
    //TODO: extract
    let urls = [];
    fullNames
      .slice(0, 10) //TODO: REMOVE
      .forEach((fullName) => urls.push(`${API_URL + fullName}`));
    return urls;
  };

  const [digestUrls, setDigestUrls] = useState(urlsArray(fullNames));

  const digests = async (
    urls //TODO: extract
  ) =>
    await Promise.all(
      urls.map(async (url) => {
        const resp = await fetch(url);
        let fullName = url.split(API_URL)[1];
        let data = await resp.json();
        let userDigest = {
          fullName: fullName,
          digest: data.Digest,
          raw: data,
        };

        return userDigest;
      })
    ).then((userDigest) => {
      return userDigest;
    });

  useEffect(() => {
    setPromiseState("pending");
    digests(digestUrls)
      .then((usersData) => {
        setPromiseState("fullfilled");
        setUserDigests(usersData);
      })
      .catch((err) => {
        setPromiseState("failed");
      });
  }, [props.rawCustomersData]);

  return (
    <div class="overflow-x-auto w-full">
      <table className="text-sm text-left mx-auto max-w-4xl w-full whitespace-nowrap rounded-lg bg-white divide-y divide-gray-300 overflow-hidden">
        <thead className="text-xs text-gray-700 uppercase bg-red-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="py-3 px-6">
              Name
            </th>
            <th scope="col" className="py-3 px-6">
              Company
            </th>
            <th scope="col" className="py-3 px-6">
              Address
            </th>
            <th scope="col" className="py-3 px-6">
              Status
            </th>
            <th scope="col" className="py-3 px-6">
              Digest Value
            </th>
            <th scope="col" className="py-3 px-6">
              Activate
            </th>
          </tr>
        </thead>
        <tbody>
          {props.rawCustomersData.map((customer) => (
            <Customer
              key={customer._id}
              fullName={customer.name.first + customer.name.last}
              customer={customer}
              promiseState={promiseState}
              activeStatus={customer.isActive ? "active" : "inactive"}
              userDigests={userDigests}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
