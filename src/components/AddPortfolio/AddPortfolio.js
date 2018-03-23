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

  handleClose = () => this.props.onClose();

  handleSubmit = () => {
    this.handleClose();
    this.props.onSubmit(this.state.name);
    this.setState({ name: '' }); // reset state
  };

  render() {
    const { isOpen, usedNames } = this.props;
    const hasError = usedNames.includes(this.state.name); // Check that the name is available

    return (
      <Dialog
        className="AddPortfolio"
        open={isOpen}
        onClose={this.handleClose}
        aria-labelledby="AddPortfolioDialogTitle"
      >
        <DialogTitle id="AddPortfolioDialogTitle">New Portfolio</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Create and track your investment portfolio or stock watchlist, maintain
            transaction history and current holdings.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Enter portfolio name"
            required
            onChange={event => this.setState({ name: event.target.value })}
            error={hasError}
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Cancel
          </Button>
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
