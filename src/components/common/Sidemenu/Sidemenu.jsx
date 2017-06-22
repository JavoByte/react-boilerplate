import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransitionGroup } from 'react-transition-group';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Sidemenu.css';

class Sidemenu extends React.Component {

  static propTypes = {
    children: PropTypes.node.isRequired,
    isOpen: PropTypes.bool.isRequired,
    toggleSidemenu: PropTypes.func.isRequired,
  };

  render() {
    const { children } = this.props;
    const childrenToRender = Array.isArray(children) ? children : [children];
    // eslint-disable-next-line
    return (
      <div>
        <CSSTransitionGroup
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}
          transitionName={{
            enter: s.overlayEnter,
            enterActive: s.overlayEnterActive,
            leave: s.overlayLeave,
            leaveActive: s.overlayLeaveActive,
          }}
        >
          {
            this.props.isOpen ?
              <div className={s.overlay} onClick={this.props.toggleSidemenu} key="overlay" role="presentation" />
            : null
          }
        </CSSTransitionGroup>
        <div className={cx(s.sidemenu, { [s.closed]: !this.props.isOpen })}>
          <ul className={s.links}>
            {
              childrenToRender.map((child, i) => (
                // eslint-disable-next-line react/no-array-index-key
                <li key={i}>
                  { child }
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Sidemenu);
