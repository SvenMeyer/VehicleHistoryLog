import React from 'react'
import Web3Container from '../../lib/Web3Container';
import { Form, Button, Input, Message, Table } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import { Router } from '../../routes';
import RequestRow from '../../components/RequestRow';


class ERC721VehicleList extends React.Component {
	state = {
		model: '',
		vin: '',
		ein: '',
		errorMessage: '',
		loading: false,
		lastSerial: 0
	};

	getLastSerial = async () => {
		console.log('getLastSerial -------------------------')
		console.log(this.state.lastSerial)
		const { accounts, contract } = this.props
		const response = await contract.methods.getLastSerial().call({ from: accounts[0] })
		console.log('getLastSerial : response =', response)
		this.setState({ lastSerial: Number(response) })
		console.log({ response })
		console.log('lastSerial =', this.state.lastSerial)
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
		const { Header, HeaderCell, Row, Cell, Body } = Table;

		const { accounts, contract } = this.props;

		return (
			<Layout>
				<h3>ERC721Vehicle List</h3>

				{/* lastSerial : {await getLastSerial()} */}

				<pre>Account: {accounts[0]}</pre>

					<Table>

						<Header>
								<Row>
										<HeaderCell>Id</HeaderCell>
										<HeaderCell>model</HeaderCell>
										<HeaderCell>vin</HeaderCell>
										<HeaderCell>ein</HeaderCell>
										<HeaderCell>owner</HeaderCell>
										<HeaderCell>service</HeaderCell>
										<HeaderCell>doc URI</HeaderCell>
								</Row>
						</Header>

						<Body>
								<Row>
										<Cell>122</Cell>
										<Cell>Test model</Cell>
										<Cell>Test vin</Cell>
										<Cell>Test ein</Cell>
										<Cell>Test owner</Cell>
										<Cell>Test service</Cell>
										<Cell>Test Doc URI</Cell>
								</Row>

								<RequestRow />
							</Body>
					</Table>

			</Layout>
		);
	}
}

// export default ERC721VehicleList;
export default () => (
	<Web3Container
				renderLoading={() => <div>Loading ERC721VehicleList Page...</div>}
		render={({ web3, accounts, contract }) => (
			<ERC721VehicleList accounts={accounts} contract={contract} web3={web3} />
		)}
	/>
)
