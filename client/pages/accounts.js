import React from 'react'
import Link from 'next/link'
import Web3Container from '../lib/Web3Container'
import Layout from '../components/Layout';

const Accounts = ({ accounts }) => (
  <div>
    <pre>{JSON.stringify(accounts, null, 4)}</pre>
    {/*}
    <div><Link href='/dapp'><a>Simple UI</a></Link></div>
    <div><Link href='/'><a>Home</a></Link></div>
    */}
  </div>
)

export default () => (
  <Web3Container
    renderLoading={() => <div>Loading Accounts Page...</div>}
    render={({ accounts }) => 
    <div>
      <Layout>
        <h3>Accounts</h3>
        <Accounts accounts={accounts} />
      </Layout>
    </div>}
  />
)
