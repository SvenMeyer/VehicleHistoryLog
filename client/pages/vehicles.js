import React from 'react'
import Link from 'next/link'
import Web3Container from '../lib/Web3Container'

const Vehicles = ({ vehicles }) => (
  <div>
    <h1>My Vehicles</h1>
    <pre>{JSON.stringify(vehicles, null, 4)}</pre>
    <div><Link href='/dapp'><a>My Dapp</a></Link></div>
    <div><Link href='/'><a>Home</a></Link></div>
  </div>
)

export default () => (
  <Web3Container
    renderLoading={() => <div>Loading Vehicles Page...</div>}
    render={({ vehicles }) => <Vehicles vehicles={vehicles} />}
  />
)
