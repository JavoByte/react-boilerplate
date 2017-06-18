import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './UsersIndex.css';
import InlineLoader from '../../common/InlineLoader';

const TIME_TO_RELOAD = 1000 * 60 * 10; // reload after 10 minutes

class UsersIndex extends React.Component {

  static propTypes = {
    users: PropTypes.shape({
      all: PropTypes.array,
      loading: PropTypes.bool.isRequired,
      loaded_at: PropTypes.number.isRequired,
    }).isRequired,
    getUsers: PropTypes.func.isRequired,
  };

  componentWillMount() {
    if (!this.props.users.loaded_at || this.props.users.loaded_at < TIME_TO_RELOAD) {
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
