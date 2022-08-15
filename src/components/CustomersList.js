import { useEffect, useLayoutEffect } from "react";
import Customer from "./Customer";

// DataLoader boilerplate
// const URL = "https://api.hashify.net/hash/md4/hex?value=mokemoka";
// const requests = [];
// const fetcher = async (requests) => {};
// const loader = new DataLoader(fetcher, {
//   batchScheduleFn: (callback) => setTimeout(callback, 100),
// });
// const { data } = useQuery(getKey(request), () => loader.load(request));

export default function CustomersList(props) {
  useLayoutEffect(() => {
    props.setUsers(props.data);
    props.setActiveUsersCount(props.getTotalActiveUsersCount(props.data));
  }, [props]);
  return props.data.map((customer) => <Customer customer={customer} />);
}
