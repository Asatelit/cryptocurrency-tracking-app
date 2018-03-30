import React, { Component } from 'react';
import PropTypes from 'prop-types';
/* Material UI */
import { FormGroup, FormControlLabel, FormLabel } from 'material-ui/Form';
import { MenuItem } from 'material-ui/Menu';
import Divider from 'material-ui/Divider';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import Switch from 'material-ui/Switch';
import Select from 'material-ui/Select';
/* SVG Material icons */
import CloseIcon from 'material-ui-icons/Close';
/* Custom Components */
import Row from '../Row';
import Column from '../Column';
/* CSS */
import './Settings.css';

class Settings extends Component {
  handleClose = () => this.props.onClose();
  handleUpdateSettings = entry => this.props.onUpdateSettings(entry);

  renderSwitch = params => {
    const { label, isChecked, key } = params;
    return (
      <FormGroup className="FormGroup">
        <FormControlLabel
          label={label}
          control={
            <Switch
              checked={isChecked}
              onChange={event =>
                this.handleUpdateSettings({ [key]: event.target.checked })
              }
            />
          }
        />
      </FormGroup>
    );
  };

  render() {
    const { isOpen, settings } = this.props;
    const {
      isCustomCells,
      isAutoUpdate,
      updateInterval,
      isFreezeFirstRow,
      isFreezeFirstCol,
    } = settings;
    return (
      <div className={`Settings ${isOpen ? 'Settings--open' : ''}`}>
        <div className="Panel">
          <Row className="Panel-head">
            <Column>
              <Typography variant="title">Settings</Typography>
            </Column>
            <Column shrink horizontalAlignment="right">
              <IconButton onClick={this.handleClose}>
                <CloseIcon />
              </IconButton>
            </Column>
          </Row>
          <Divider />
          {this.renderSwitch({
            key: 'isCustomCells',
            label: 'Custom Cells',
            isChecked: isCustomCells,
          })};
          {this.renderSwitch({
            key: 'isFreezeFirstRow',
            label: 'Freeze First Row',
            isChecked: isFreezeFirstRow,
          })};
          {this.renderSwitch({
            key: 'isFreezeFirstCol',
            label: 'Freeze First Column',
            isChecked: isFreezeFirstCol,
          })};
          {this.renderSwitch({
            key: 'isAutoUpdate',
            label: 'Auto Update',
            isChecked: isAutoUpdate,
          })};
          <FormGroup className="FormGroup">
            <FormLabel>Update Interval (s)</FormLabel>
            <Select
              value={updateInterval}
              onChange={event =>
                this.handleUpdateSettings({ updateInterval: event.target.value })
              }
            >
              <MenuItem value={3000}>3</MenuItem>
              <MenuItem value={5000}>5</MenuItem>
              <MenuItem value={10000}>10</MenuItem>
              <MenuItem value={20000}>20</MenuItem>
              <MenuItem value={30000}>30</MenuItem>
              <MenuItem value={60000}>60</MenuItem>
            </Select>
          </FormGroup>
        </div>
      </div>
    );
  }
}

Settings.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  onUpdateSettings: PropTypes.func.isRequired,
  settings: PropTypes.shape({
    isCustomCells: PropTypes.bool,
    isAutoUpdate: PropTypes.bool,
    updateInterval: PropTypes.number,
    isFreezeFirstRow: PropTypes.bool,
    isFreezeFirstCol: PropTypes.bool,
  }).isRequired,
};

Settings.defaultProps = {
  isOpen: false,
};

export default Settings;
