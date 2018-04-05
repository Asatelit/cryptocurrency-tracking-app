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
      <FormGroup key={key} className="form-group">
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
    const { isCustomCells, isAutoUpdate, isFreezeFirstRow, isFreezeFirstCol } = settings;
    const { updateInterval, rowHeight } = settings;
    // prettier-ignore
    const switches = [
      { key: 'isCustomCells', label: 'Custom Cells', isChecked: isCustomCells },
      { key: 'isFreezeFirstCol', label: 'Freeze First Column', isChecked: isFreezeFirstCol },
      { key: 'isFreezeFirstRow', label: 'Freeze First Row', isChecked: isFreezeFirstRow },
      { key: 'isAutoUpdate', label: 'Auto Update', isChecked: isAutoUpdate },
    ];
    return (
      <div className={`settings ${isOpen ? 'settings_open' : ''}`}>
        <div className="panel">
          <Row className="panel-head">
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
          {switches.map(element => this.renderSwitch(element))}
          <FormGroup className="form-group">
            <FormLabel>Update Interval (s):</FormLabel>
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
          <FormGroup className="form-group">
            <FormLabel>Display density:</FormLabel>
            <Select
              value={rowHeight}
              onChange={event =>
                this.handleUpdateSettings({ rowHeight: event.target.value })
              }
            >
              <MenuItem value={40}>Tiny</MenuItem>
              <MenuItem value={60}>Normal</MenuItem>
              <MenuItem value={80}>Wide</MenuItem>
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
    isAutoUpdate: PropTypes.bool,
    isCustomCells: PropTypes.bool,
    isFreezeFirstCol: PropTypes.bool,
    isFreezeFirstRow: PropTypes.bool,
    rowHeight: PropTypes.number,
    updateInterval: PropTypes.number,
  }).isRequired,
};

Settings.defaultProps = {
  isOpen: false,
};

export default Settings;
