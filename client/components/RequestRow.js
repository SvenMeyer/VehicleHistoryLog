import React, { Component } from 'react';
import { Table, Button } from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import ERC721Vehicle from '../ethereum/vehicle';

class RequestRow extends Component {
  onApprove = async () => {
    const vehicle = ERC721Vehicle(this.props.address);

    const accounts = await web3.eth.getAccounts();
    await vehicle.methods.approveRequest(this.props.id).send({
      from: accounts[0]
    });
  };

  render() {
    const { Row, Cell } = Table;
    const { id, request, approversCount } = this.props;
    const readyToFinalize = request.approvalCount > approversCount / 2;

    return (
      <Row
        disabled={request.complete}
        positive={readyToFinalize && !request.complete}
      >
        <Cell>{id}</Cell>
        <Cell>{request.description}</Cell>
        <Cell>{request.recipient}</Cell>
        <Cell>
          { <Button color="green" basic onClick={this.onApprove}>Select</Button> }
        </Cell>
      </Row>
    );
  }
}

export default RequestRow;
