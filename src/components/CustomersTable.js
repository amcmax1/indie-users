import {
  Table,
  Header,
  HeaderRow,
  HeaderCell,
  Body,
  Row,
  Cell,
} from "@table-library/react-table-library/table";

import { useReducer, useState, useEffect } from "react";

export default function CustomersTable(props) {
  let data = { nodes: props.users };
  const [updatedUser, setUpdatedUser] = useState(null);

  const userStatusReducer = (state, action) => {
    console.log(state);
    let updatedUser = {
      previous: Object.assign({}, state[action.index]),
      current: state[action.index],
      action: action.type,
    };
    switch (action.type) {
      case "ACTIVATE":
        updatedUser.current.isActive = true;
        setUpdatedUser(updatedUser);

        let currentUser = updatedUser.current;
        return { ...state, currentUser };

      case "DEACTIVATE":
        updatedUser.current.isActive = false;
        setUpdatedUser(updatedUser);

        currentUser = updatedUser.current;
        return { ...state, currentUser };
      default:
        return state;
    }
  };

  const [customers, dispatch] = useReducer(userStatusReducer, props.users);

  useEffect(() => {
    props.bubbleUpdatedUser(updatedUser);
  }, [updatedUser]);

  // TODO: if customer is active, the row allows for a double clickable event routing to the complete details page
  // each row
  return (
    <>
      <Table data={data}>
        {(tableList) => (
          <>
            <Header>
              <HeaderRow>
                <HeaderCell>First Name</HeaderCell>
                <HeaderCell>Last Name</HeaderCell>
                <HeaderCell>Company</HeaderCell>
                <HeaderCell>Address</HeaderCell>
                <HeaderCell>Status</HeaderCell>
                <HeaderCell>Digest Value</HeaderCell>
                <HeaderCell>Activate</HeaderCell>
                <HeaderCell>Deactivate</HeaderCell>
              </HeaderRow>
            </Header>

            <Body>
              {tableList.map((user, index) => (
                <Row
                  key={user._id}
                  user={user}
                  className={`${
                    user.isActive ? "bg-green-200" : "bg-blue-200"
                  }`}
                >
                  <Cell>{user.name.first}</Cell>
                  <Cell>{user.name.last}</Cell>
                  <Cell>{user.company}</Cell>
                  <Cell>{user.address}</Cell>
                  <Cell>{user.isActive.toString()}</Cell>
                  <Cell>"..."</Cell>
                  <Cell
                    onClick={() => dispatch({ type: "ACTIVATE", index: index })}
                  >
                    {"Activate"}
                  </Cell>
                  <Cell
                    onClick={() =>
                      dispatch({ type: "DEACTIVATE", index: index })
                    }
                  >
                    {"Deactivate"}
                  </Cell>
                </Row>
              ))}
            </Body>
          </>
        )}
      </Table>
    </>
  );
}
