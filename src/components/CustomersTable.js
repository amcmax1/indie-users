import {
  Table,
  Header,
  HeaderRow,
  HeaderCell,
  Body,
  Row,
  Cell,
} from "@table-library/react-table-library/table";
import { customersData } from "../data/customersData";

export default function CustomersTable() {
  const data = { nodes: customersData };
  console.log(data);
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
                <HeaderCell>Update</HeaderCell>
              </HeaderRow>
            </Header>

            <Body>
              {tableList.map((user) => (
                <Row key={user._id} user={user} className={"bg-blue-200"}>
                  <Cell>{user.name.first}</Cell>
                  <Cell>{user.name.last}</Cell>
                  <Cell>{user.company}</Cell>
                  <Cell>{user.address}</Cell>
                  <Cell>{user.isActive.toString()}</Cell>
                  <Cell>{""}</Cell>
                  <Cell>{""}</Cell>
                </Row>
              ))}
            </Body>
          </>
        )}
      </Table>
    </>
  );
}
