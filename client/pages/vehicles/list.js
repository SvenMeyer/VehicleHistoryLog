import React from 'react'
import { Router }    from '../../routes';
import Web3Container from '../../lib/Web3Container';
import Layout        from '../../components/Layout';

// http://react.semantic-ui.com/collections/table
import { Table } from 'semantic-ui-react';

class ERC721VehicleList extends React.Component {
	
	constructor(props) {
		super(props);

		this.state = {
			model: '',
			vin: '',
			ein: '',
			errorMessage: '',
			loading: false,
			lastSerialInt: 0,
			vehicles: [],
			dataLoaded: false
		};

		this.props.contract.methods.getLastSerial().call({ from: this.props.accounts[0] })
			.then(response => {
				console.log('ERC721VehicleList.constructor : getLastSerial.response =', Number(response));
				this.setState({lastSerialInt: Number(response)})
			});

	}

	async componentDidUpdate() {
		if (this.state.lastSerialInt > 0 && this.state.vehicles.length == 0) {
			var i = this.state.lastSerialInt;
			// var v = [];
			while (i > 0) {
				this.state.vehicles[i] = await this.props.contract.methods.getVehicleData(i).call({ from: this.props.accounts[0] });
				console.log('this.state.vehicles[', i, ']=', this.state.vehicles[i]);
				i--;
			}
		}
		if (this.state.vehicles.length > this.state.lastSerialInt && this.state.dataLoaded == false) {
			// this.setState({ vehicles: v }); // Warning: Can't call setState (or forceUpdate) on an unmounted component
			this.setState({dataLoaded: true});
		}
	}

	renderRows() {
		var rows = [];
		var i = this.state.vehicles.length - 1;
		console.log('renderRows : i=', i);
		while (i > 0) {
			rows.push(this.renderRow(i));
			i--
		}
		return(rows);
	}

	renderRows_map() {
		return this.props.vehicles.map((vehicle, index) => {
			if (index != 0) return (
				renderRow(index)
			);
		});
	}

	renderRow(i) {
		const { Row, Cell } = Table;
		// const v = this.state.vehicles[i];
		console.log('renderRow: i =', i);
		console.log(this.state.vehicles[i].model);
		console.log(this.state.vehicles[i].vin);
		console.log(this.state.vehicles[i].ein);
		// console.log('v =', v);
		return (
			<Row key={i}>
				<Cell>{i}</Cell>
				<Cell>{this.state.vehicles[i].model}</Cell>
				<Cell>{this.state.vehicles[i].vin}</Cell>
				<Cell>{this.state.vehicles[i].ein}</Cell>
				<Cell>(owner)</Cell>
				<Cell>(service)</Cell>
				<Cell>(DocURI)</Cell>
			</Row>
		);
	}

	/* render page ****************************************************** */

	render() {
		const { Header, HeaderCell, Row, Cell, Body } = Table;

		const { web3, accounts, contract } = this.props;
		// const _lastSerial = await contract.methods.getLastSerial().call({ from: accounts[0] })
		// console.log('ERC721VehicleList.constructor : _lastSerial =', _lastSerial);
		/*
		this.props.contract.methods.getLastSerial().call({ from: this.props.accounts[0] })
			.then( response => this.setState( {lastSerial: Number(response)} ) );
		*/
		// const lastVehicle = await contract.methods.getVehicleData(1).call();
		/*
		console.log('lastVehicle =', lastVehicle);

		console.log('this.props.requests   =', this.props.requests);
		console.log('this.props.lastSerial =', this.props.lastSerial);
		console.log('this.props =', this.props);
		*/

		return (
			<Layout>
				<h3>ERC721Vehicle List</h3>
				<p />
				<pre>Account    : {accounts[0]}</pre>
				<pre>lastSerial : {this.state.lastSerialInt}</pre>
				<pre>dataLoaded : {this.state.dataLoaded ? 'true' : 'false'}</pre>
				
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
						{this.renderRows()}
					</Body>
				</Table>

			</Layout>
		);
	}
}

// export default ERC721VehicleList;
export default () => (
	<Web3Container
		renderLoading={() => <div>Loading ERC721Vehicle List Page...</div>}
		render={({ web3, accounts, contract }) => (
			<ERC721VehicleList accounts={accounts} contract={contract} web3={web3} />
		)}
	/>
)
