import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import './Button.css';

/**
 * A Button indicates a possible user action.
 */
class Button extends Component {
  render() {
    const { children } = this.props;
    return (
      <div className="" role="button">
        {children}
      </div>
    );
  }
}

Button.propTypes = {
  children: PropTypes.element.isRequired,
};

Button.defaultProps = {};

export default Button;
