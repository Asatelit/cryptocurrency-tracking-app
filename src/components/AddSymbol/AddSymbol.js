import React, { Component } from 'react';
import PropTypes from 'prop-types';
/* Material UI */
import Button from 'material-ui/Button';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';
import Select from 'material-ui/Select';
import Chip from 'material-ui/Chip';
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog';
/* CSS */
import './AddSymbol.css';

class AddSymbol extends Component {
  state = { symbols: this.props.portfolio.symbols };

  handleClose = () => this.props.onClose();
  handleChange = event => this.setState({ symbols: event.target.value });

  handleSubmit = () => {
    const { portfolio } = this.props;
    this.handleClose();
    this.props.onSubmit({
      name: portfolio.name,
      data: {
        ...portfolio,
        symbols: this.state.symbols,
      },
    });
  };

  renderSymbolsSelector = () => {
    const { symbols } = this.state;
    const dict = this.props.symbols;
    return (
      <Select
        multiple
        value={this.state.symbols}
        classes={{ selectMenu: 'select-menu' }}
        input={<Input id="select-multiple-chip" />}
        onChange={this.handleChange}
        renderValue={selected => (
          <div>
            {selected.map(value => (
              <Chip
                className="chip"
                key={value}
                label={value}
                onDelete={() =>
                  this.setState({
                    symbols: symbols.filter(symbol => symbol !== value),
                  })
                }
              />
            ))}
          </div>
        )}
      >
        {dict.map(element => (
          <MenuItem key={element.symbol} value={element.symbol}>
            {element.symbol}
          </MenuItem>
        ))}
      </Select>
    );
  };

  render() {
    return (
      <Dialog
        open
        fullWidth
        aria-labelledby="AddPortfolio"
        className="add-symbol"
        onClose={this.handleClose}
      >
        <DialogTitle id="AddPortfolio">Add Symbol</DialogTitle>
        <DialogContent>
          <FormControl className="form-control">
            <InputLabel htmlFor="select-multiple-chip">Find a Quote</InputLabel>
            {this.renderSymbolsSelector()}
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose}>Cancel</Button>
          <Button onClick={this.handleSubmit} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

AddSymbol.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  symbols: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      symbol: PropTypes.string,
      rank: PropTypes.string,
    }),
  ).isRequired,
  portfolio: PropTypes.shape({
    name: PropTypes.string,
    symbols: PropTypes.array,
  }).isRequired,
};

export default AddSymbol;
