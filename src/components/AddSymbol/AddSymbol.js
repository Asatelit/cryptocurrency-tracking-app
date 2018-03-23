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

  handleChange = event => {
    this.setState({ symbols: event.target.value });
  };

  handleClose = () => {
    this.props.onClose();
  };

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

  render() {
    const { symbols } = this.props;

    return (
      <Dialog
        open
        fullWidth
        className="AddSymbol"
        onClose={this.handleClose}
        aria-labelledby="AddPortfolioDialogTitle"
      >
        <DialogTitle id="AddPortfolioDialogTitle">Add Symbol</DialogTitle>
        <DialogContent>
          <FormControl className="FormControl">
            <InputLabel htmlFor="select-multiple-chip">Find a Quote</InputLabel>
            <Select
              multiple
              value={this.state.symbols}
              onChange={this.handleChange}
              input={<Input id="select-multiple-chip" />}
              classes={{ selectMenu: 'SelectMenu' }}
              renderValue={selected => (
                <div className="Chips">
                  {selected.map(value => (
                    <Chip
                      className="Chip"
                      key={value}
                      label={value}
                      onDelete={() =>
                        this.setState({
                          symbols: this.state.symbols.filter(symbol => symbol !== value),
                        })
                      }
                    />
                  ))}
                </div>
              )}
            >
              {symbols.map(element => (
                <MenuItem
                  key={element.symbol}
                  value={element.symbol}
                  className={
                    this.state.symbols.indexOf(element) === -1 ? 'MenuItem--selected' : ''
                  }
                >
                  {element.symbol}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Cancel
          </Button>
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
