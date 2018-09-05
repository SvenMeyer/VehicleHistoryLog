import React from 'react'
import Web3Container from '../../lib/Web3Container';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import { Router } from '../../routes';


class ERC721VehicleNew extends React.Component {
  state = {
    model: '',
    vin: '',
    ein: '',
    errorMessage: '',
    loading: false
  };

  /* on button submit : create a new ERC721Vehicle from Form Data */

  onSubmit = async event => {
    console.log('create button clicked');
    event.preventDefault();

    this.setState({ loading: true, errorMessage: '' });

    try {
      // const accounts = await this.state.web3.eth.getAccounts();
      // const { accounts, contract } = this.props
      const { accounts, contract } = this.props
      console.log('contract :', contract);
      console.log('accounts :', accounts);
      const {model, vin, ein} = this.state;
      console.log('model, vin, ein =', model, vin, ein);
      const tokenId = await contract.methods.mintNewVehicleToken(model, vin, ein).send({ from: accounts[0] })
      console.log('created tokenId :', tokenId)
      Router.pushRoute('/');
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }

    this.setState({ loading: false });
  };

  /* render page */

  render() {
    return (
      <Layout>
        <h3>Create new ERC721Vehicle Token</h3>

        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>model</label>
            <Input
              label="string"
              labelPosition="right"
              value={this.state.model}
              onChange={event =>
                this.setState({ model: event.target.value })}
            />
          </Form.Field>

          <Form.Field>
            <label>vin (Vehicle Identification Number)</label>
            <Input
              label="string"
              labelPosition="right"
              value={this.state.vin}
              onChange={event =>
                this.setState({ vin: event.target.value })}
            />
          </Form.Field>

          <Form.Field>
            <label>ein (Engine Identification Number)</label>
            <Input
              label="string"
              labelPosition="right"
              value={this.state.ein}
              onChange={event =>
                this.setState({ ein: event.target.value })}
            />
          </Form.Field>

          <Message error header="ERROR" content={this.state.errorMessage} />
          <Button loading={this.state.loading} primary>
            Create!
          </Button>
        </Form>
      </Layout>
    );
  }
}

// export default ERC721VehicleNew;
export default () => (
  <Web3Container
    renderLoading={() => <div>Loading New Vehicles Page...</div>}
    render={({ web3, accounts, contract }) => (
      <ERC721VehicleNew accounts={accounts} contract={contract} web3={web3} />
    )}
  />
)
