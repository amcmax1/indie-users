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
    <></> // render prop/element for table presentation
  );
}
