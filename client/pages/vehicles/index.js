import React, { Component } from 'react';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import { Link } from '../../routes';
import Layout from '../../components/Layout';
import RequestRow from '../../components/RequestRow';
import ERC721Vehicle from '../../.lib/contracts/ERC721Vehicle';
import { Link, Router } from '../../routes';

import Web3Container from '../../lib/Web3Container';


class ERC721VehicleList extends Component {

  static async getInitialProps(props) {
    const { address } = props.query;
    const vehicle = ERC721Vehicle(address);
    const requestCount = await vehicle.methods.getLastSerial().call();
    console.log('requestCount =', requestCount);

    const requests = await Promise.all(
      Array(parseInt(requestCount))
        .fill()
        .map((element, index) => {
          return vehicle.methods.getVehicleData_Struct(index).call();
        })
    );

    return { address, requests, requestCount };
  }

  renderRows() {
    return this.props.requests.map((request, index) => {
      return (
        <RequestRow
          key={index}
          id={index}
          request={request}
          address={this.props.address}
          approversCount={this.props.approversCount}
        />
      );
    });
  }

  render() {
    const { Header, Row, HeaderCell, Body } = Table;

    return (
      <Layout>
        <h3>Vehicles List</h3>
        <Link route={`/vehicles/${this.props.address}/requests/new`}>
          <a>
            <Button primary floated="right" style={{ marginBottom: 10 }}>
              Add Request
            </Button>
          </a>
        </Link>
        <Table>
          <Header>
            <Row>
              <HeaderCell>ID</HeaderCell>
              <HeaderCell>Description</HeaderCell>
              <HeaderCell>Amount</HeaderCell>
              <HeaderCell>Recipient</HeaderCell>
              <HeaderCell>Approval Count</HeaderCell>
              <HeaderCell>Approve</HeaderCell>
              <HeaderCell>Finalize</HeaderCell>
            </Row>
          </Header>
          <Body>{this.renderRows()}</Body>
        </Table>
        <div>Found {this.props.requestCount} requests.</div>
      </Layout>
    );
  }
}

// export default RequestIndex;

export default () => (
  <Web3Container
    renderLoading={() => <div>Loading Vehicles List Page...</div>}
    render={({ web3, accounts, contract }) => (
      <ERC721VehicleList accounts={accounts} contract={contract} web3={web3} />
    )}
  />
)