import React, { Component } from 'react';
import PropTypes from 'prop-types';
/* Material UI */
import Tabs, { Tab } from 'material-ui/Tabs';
/* SVG Material icons */
import SearchIcon from 'material-ui-icons/Search';
/* Custom Components */
import Row from '../../components/Row';
import Column from '../../components/Column';
/* CSS */
import './Settings.css';

class Settings extends Component {
  render() {
    const { isOpen } = this.props;
    return (
      <div className={`Settings ${isOpen ? 'Settings--open' : ''}`}>

      </div>
    );
  }
}

Settings.propTypes = {
  isOpen: PropTypes.bool,
};

Settings.defaultProps = {
  isOpen: false,
};

export default Settings;
