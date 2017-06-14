/* eslint-disable react/prop-types */

import React from 'react';
import Helmet from 'react-helmet';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './UsersIndex.css';
import InlineLoader from '../../common/InlineLoader';

class UsersIndex extends React.Component {

  componentWillMount() {
    if (!this.props.users.all) {
      this.props.getUsers();
    }
  }

  renderContent() {
    const { all, loading } = this.props.users;
    if (loading) {
      return <InlineLoader />;
    }
    const users = all || [];
    if (users.length > 0) {
      return (
        <table className={s.table}>
          <thead>
            <tr>
              <th>
                Nombre
              </th>
              <th>
                Correo
              </th>
            </tr>
          </thead>
          <tbody>
            {
              users.map(user => (
                <tr key={user.id}>
                  <td>{user.first_name}</td>
                  <td>{user.email}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      );
    }
    return (
      <div>
        No hay información que mostrar
      </div>
    );
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>Usuarios</title>
        </Helmet>
        {this.renderContent()}
      </div>
    );
  }

}

export default withStyles(s)(UsersIndex);
