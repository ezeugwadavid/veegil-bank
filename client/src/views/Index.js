/*!

=========================================================
* Argon Dashboard React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useState } from "react";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
} from "reactstrap";

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2,
} from "variables/charts.js";

import Header from "components/Headers/Header.js";

const Index = (props) => {
  const [activeNav, setActiveNav] = useState(1);
  const [chartExample1Data, setChartExample1Data] = useState("data1");

  const transactions = useSelector((state) => state.transactions.transactions);
  const deposits = useSelector((state) => state.transactions.deposits);
  const withdrawals = useSelector((state) => state.transactions.withdrawals);

  let transactionLength = transactions.length;
  let depositsLength = deposits.length;
  let withdrawalsLength = withdrawals.length;

  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

  const toggleNavs = (e, index) => {
    e.preventDefault();
    setActiveNav(index);
    setChartExample1Data("data" + index);
  };

  //my chart config
  var colors = {
    gray: {
      100: "#f6f9fc",
      200: "#e9ecef",
      300: "#dee2e6",
      400: "#ced4da",
      500: "#adb5bd",
      600: "#8898aa",
      700: "#525f7f",
      800: "#32325d",
      900: "#212529",
    },
  };

  let chartData = {
    options: {
      scales: {
        yAxes: [
          {
            gridLines: {
              color: colors.gray[900],
              zeroLineColor: colors.gray[900],
            },
            ticks: {
              callback: function (value) {
                if (!(value % 10)) {
                  return value;
                }
              },
            },
          },
        ],
      },
      tooltips: {
        callbacks: {
          label: function (item, data) {
            var label = data.datasets[item.datasetIndex].label || "";
            var yLabel = item.yLabel;
            var content = "";

            if (data.datasets.length > 1) {
              content += label;
            }

            content += yLabel;
            return content;
          },
        },
      },
    },
    data1: (canvas) => {
      return {
        labels: ["Transactions", "Deposits", "Withdrawals"],
        datasets: [
          {
            label: "Performance",
            data: [transactionLength, depositsLength, withdrawalsLength],
          },
        ],
      };
    },
    data2: (canvas) => {
      return {
        labels: ["May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [
          {
            label: "Performance",
            data: [0, 20, 5, 25, 10, 30, 15, 40, 40],
          },
        ],
      };
    },
  };

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="mb-5 mb-xl-0" xl="8">
            <Card className="bg-gradient-default shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-light ls-1 mb-1">
                      Overview
                    </h6>
                    <h2 className="text-white mb-0">Transactions value</h2>
                  </div>
                  <div className="col">
                    <Nav className="justify-content-end" pills>
                      <NavItem>
                        <NavLink
                          className={classnames("py-2 px-3", {
                            active: activeNav === 1,
                          })}
                          href="#pablo"
                          onClick={(e) => toggleNavs(e, 1)}
                        >
                          <span className="d-none d-md-block">
                            Transactions
                          </span>
                          <span className="d-md-none">T</span>
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames("py-2 px-3", {
                            active: activeNav === 2,
                          })}
                          data-toggle="tab"
                          href="#pablo"
                          onClick={(e) => toggleNavs(e, 2)}
                        >
                          <span className="d-none d-md-block">Month</span>
                          <span className="d-md-none">M</span>
                        </NavLink>
                      </NavItem>
                    </Nav>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                {/* Chart */}
                <div className="chart">
                  <Line
                    data={chartData[chartExample1Data]}
                    options={chartExample1.options}
                    getDatasetAtEvent={(e) => console.log(e)}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col xl="4">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Traffic</h3>
                  </div>
                  <div className="col text-right">
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      size="sm"
                    >
                      See all
                    </Button>
                  </div>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Type</th>
                    <th scope="col">Value</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">Deposits</th>
                    <td>{depositsLength}</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">{depositsLength}%</span>
                        <div>
                          <Progress
                            max="100"
                            value={depositsLength}
                            barClassName="bg-gradient-success"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Withdrawals</th>
                    <td>{withdrawalsLength}</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">{withdrawalsLength}%</span>
                        <div>
                          <Progress max="100" value={withdrawalsLength} />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Transactions</th>
                    <td>{transactionLength}</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">{transactionLength}%</span>
                        <div>
                          <Progress
                            max="100"
                            value={transactionLength}
                            barClassName="bg-gradient-info"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Index;
