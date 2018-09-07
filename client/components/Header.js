import React from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from '../routes';

export default () => {
  return (
    <Menu style={{ marginTop: '10px' }}>

      <Link route="/">
        <a className="item"><b>VehicleHistoryLog</b></a>
      </Link>

      <Menu.Menu position="left">

        <Link route="/accounts">
          <a className="item">Accounts</a>
        </Link>

        <Link route="/vehicles/new">
          <a className="item">Vehicle New</a>
        </Link>

        <Link route="/vehicles">
          <a className="item">Vehicles List</a>
        </Link>

      </Menu.Menu>

    </Menu>
  );
};