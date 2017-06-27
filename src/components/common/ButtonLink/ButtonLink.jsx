import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from '../Button/Button.css';


class ButtonLink extends React.Component {

  static propTypes = {
    to: PropTypes.string.isRequired,
    color: PropTypes.oneOf(['primary', 'success', 'info', 'danger', 'warning']),
    outline: PropTypes.bool,
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
  };

  static defaultProps = {
    outline: false,
    color: 'primary',
    className: null,
  }

  render() {
    const {
      to,
      color,
      outline,
      children,
      className,
      ...otherProps
    } = this.props;

    const external = to.match(/^(https?:)?\/\//);

    const finalClassName = cx(
      'button',
      {
        [s.outline]: outline,
        [s.primary]: color === 'primary',
        [s.success]: color === 'success',
        [s.danger]: color === 'danger',
        [s.warning]: color === 'warning',
        [s.info]: color === 'info',
        [className]: className,
      },
    );
    if (external) {
      return (
        <a href={to} className={finalClassName} {...otherProps}>
          { children }
        </a>
      );
    }
    return (
      <Link to={to} className={finalClassName} {...otherProps}>
        { children }
      </Link>
    );
  }
}

export default withStyles(s)(ButtonLink);
