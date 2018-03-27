import React, { Component } from 'react';
import PropTypes from 'prop-types';
/* Material UI */
import { FormGroup, FormControlLabel, FormLabel } from 'material-ui/Form';
import { MenuItem } from 'material-ui/Menu';
import Switch from 'material-ui/Switch';
import Select from 'material-ui/Select';
/* CSS */
import './Settings.css';

class Settings extends Component {
  handleUpdateSettings = entry => {
    console.info(entry);
    const { onUpdateSettings, settings } = this.props;
    onUpdateSettings({ ...settings, ...entry });
  };

  render() {
    const { isOpen, settings } = this.props;
    return (
      <div className={`Settings ${isOpen ? 'Settings--open' : ''}`}>
        <div className="Settings-panel">
          <FormGroup className="FormGroup">
            <FormControlLabel
              label="Custom Cells"
              control={
                <Switch
                  checked={settings.isCustomCells}
                  onChange={event =>
                    this.handleUpdateSettings({ isCustomCells: event.target.checked })
                  }
                />
              }
            />
          </FormGroup>

          <FormGroup className="FormGroup">
            <FormControlLabel
              label="Freeze First Row"
              control={
                <Switch
                  checked={settings.isFreezeFirstRow}
                  onChange={event =>
                    this.handleUpdateSettings({ isFreezeFirstRow: event.target.checked })
                  }
                />
              }
            />
          </FormGroup>

          <FormGroup className="FormGroup">
            <FormControlLabel
              label="Freeze First Column"
              control={
                <Switch
                  checked={settings.isFreezeFirstCol}
                  onChange={event =>
                    this.handleUpdateSettings({ isFreezeFirstCol: event.target.checked })
                  }
                />
              }
            />
          </FormGroup>

          <FormGroup className="FormGroup">
            <FormControlLabel
              label="Auto Update"
              control={
                <Switch
                  checked={settings.isAutoUpdate}
                  onChange={event =>
                    this.handleUpdateSettings({ isAutoUpdate: event.target.checked })
                  }
                />
              }
            />
          </FormGroup>

          <FormGroup className="FormGroup">
            <FormLabel>Update Interval (s)</FormLabel>
            <Select
              value={settings.updateInterval}
              onChange={event =>
                this.handleUpdateSettings({ updateInterval: event.target.value })
              }
            >
              <MenuItem value={1000}>1</MenuItem>
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
