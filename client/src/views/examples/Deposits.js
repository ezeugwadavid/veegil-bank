import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

// reactstrap components
import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Row,
  UncontrolledTooltip,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";

const Deposits = () => {


  const deposits = useSelector((state) => state.transactions.deposits);  
  const datas = deposits.map((data, key) => {
    const date = moment(data.time).format('YYYY-MM-DD');
    console.log(date)
    return (
        <tr key={data.id}>
  <th scope="row">
    <Media className="align-items-center">
      <a
        className="avatar rounded-circle mr-3"
        href="#pablo"
        onClick={(e) => e.preventDefault()}
      >
        <img
          alt="..."
          src={
            require("../../assets/img/theme/appLogo.jpg")
              .default
          }
        />
      </a>
      <Media>
        <span className="mb-0 text-sm">
          {!data.customername ? "User" : data.customername }
        </span>
      </Media>
    </Media>
  </th>
  <td>{!data.amount ? "0" : data.amount}</td>
  <td>
    {!data.receiver ? "User" : data.receiver}
  </td>
  <td>
    {!data.type ? "no-transaction" : data.type}
    
  </td>
  <td>
    {!date ? null : date}
  </td>
  <td className="text-right">
    <UncontrolledDropdown>
      <DropdownToggle
        className="btn-icon-only text-light"
        href="#pablo"
        role="button"
        size="sm"
        color=""
        onClick={(e) => e.preventDefault()}
      >
        <i className="fas fa-ellipsis-v" />
      </DropdownToggle>
      <DropdownMenu className="dropdown-menu-arrow" right>
        <DropdownItem
          href="#pablo"
          onClick={(e) => e.preventDefault()}
        >
          Delete
        </DropdownItem>
        <DropdownItem
          href="#pablo"
          onClick={(e) => e.preventDefault()}
        >
          Copy
        </DropdownItem>
        <DropdownItem
          href="#pablo"
          onClick={(e) => e.preventDefault()}
        >
          Forward
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  </td>
</tr>
    );
  });









  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">Deposits</h3>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Beneficiary</th>
                    <th scope="col">Type</th>
                    <th scope="col">Time</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>

                 {datas}
                 
                </tbody>
              </Table>
              <CardFooter className="py-4">
                <nav aria-label="...">
                  <Pagination
                    className="pagination justify-content-end mb-0"
                    listClassName="justify-content-end mb-0"
                  >
                    <PaginationItem className="disabled">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        tabIndex="-1"
                      >
                        <i className="fas fa-angle-left" />
                        <span className="sr-only">Previous</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem className="active">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        2 <span className="sr-only">(current)</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        3
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className="fas fa-angle-right" />
                        <span className="sr-only">Next</span>
                      </PaginationLink>
                    </PaginationItem>
                  </Pagination>
                </nav>
              </CardFooter>
            </Card>
          </div>
        </Row> 
      </Container>
    </>
  );
};

export default Deposits;
