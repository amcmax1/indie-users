import { useDeferredValue, useEffect, useState, useLayoutEffect } from "react";
import Customer from "./Customer";
import Resource from "../helpers/Resource";

const renderLoader = () => <p>Loading</p>;
const API_URL = "https://api.hashify.net/hash/md4/hex?value=";

export default function CustomersList(props) {
  const [rawData, setRawData] = useState(props.rawCustomersData);

  function constructCustomerObjects(rawData) {
    let customerObjects = [];
  }

  let fullNames = props.rawCustomersData.map(
    (c) => `${c.name.first + c.name.last}`
  );

  const urlsArray = function (fullNames) {
    let urls = [];
    fullNames
      .slice(0, 10) //TODO: REMOVE
      .forEach((fullName) => urls.push(`${API_URL + fullName}`));
    return urls;
  };

  let fullNamesUrls = urlsArray(fullNames);

  const digests = async (urls) =>
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

  const [userDigests, setUserDigests] = useState([]);
  const [promiseState, setPromiseState] = useState(null);
  const [digestUrls, setDigestUrls] = useState(fullNamesUrls);

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

  return props.rawCustomersData.map((customer) => (
    <Customer
      key={customer._id}
      fullName={customer.name.first + customer.name.last}
      customer={customer}
      promiseState={promiseState}
      activeStatus={customer.isActive ? "active" : "inactive"}
      userDigests={userDigests}
    />
  ));
}
