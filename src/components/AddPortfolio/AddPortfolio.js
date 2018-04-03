import React, { Component } from 'react';
import PropTypes from 'prop-types';
/* Material UI */
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
/* CSS */
import './AddPortfolio.css';

class AddPortfolio extends Component {
  state = { name: '' };

  handleSubmit = () => {
    this.handleClose();
    this.props.onSubmit(this.state.name);
    this.setState({ name: '' }); // reset state
  };

  handleClose = () => this.props.onClose();

  render() {
    const { isOpen, usedNames } = this.props;
    const hasError = usedNames.includes(this.state.name); // Check that the name is available

    return (
      <Dialog open={isOpen} aria-labelledby="AddPortfolio" onClose={this.handleClose}>
        <DialogTitle id="AddPortfolio">New Portfolio</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Create and track your portfolio or watchlist and maintain transaction history information.
          </DialogContentText>
          <TextField
            autoFocus
            required
            fullWidth
            margin="dense"
            label="Enter portfolio name"
            error={hasError}
            onChange={event => this.setState({ name: event.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose}>Cancel</Button>
          <Button onClick={this.handleSubmit} color="primary" disabled={hasError}>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

AddPortfolio.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  usedNames: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default AddPortfolio;
