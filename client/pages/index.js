import React from 'react'
import Link from 'next/link'
import Layout from '../components/Layout';

export default () =>
  <div>
    <Layout>
      <h1>Home</h1>
      <p>Note that Web3 is not loaded for this page.</p>
      <div><Link href='/dapp'><a>Simple UI</a></Link></div>
      <div><Link href='/accounts'><a>Accounts</a></Link></div>
      <div><Link href='/vehicles/new'><a>Vehicle New</a></Link></div>
      <div><Link href='/vehicles/list'><a>Vehicles List</a></Link></div>
    </Layout>
  </div>
