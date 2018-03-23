import React, { Component } from 'react';
import PropTypes from 'prop-types';
/* Material UI */
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog';
import List, {
  ListSubheader,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from 'material-ui/List';
/* SVG Material icons */
import DeleteForever from 'material-ui-icons/DeleteForever';
/* CSS */
import './EditPortfolio.css';

class EditPortfolio extends Component {
  state = { selected: null, filter: null };

  handleDelete = name => this.props.onDelete(name);
  handleSelect = () => this.props.onSelect(this.state.selected);

  handleClose = () => {
    this.props.onClose();
    this.setState({ selected: null, filter: null }); // reset state
  };

  handleSubmit = () => {
    this.handleSelect();
    this.handleClose();
  };

  render() {
    const { portfoliosList, isOpen } = this.props;
    const { selected, filter } = this.state;
    const list = filter
      ? portfoliosList.filter(portfolio => portfolio.name.toLowerCase().includes(filter))
      : portfoliosList;

    return (
      <Dialog
        fullWidth
        className="EditPortfolio"
        open={isOpen}
        onClose={this.handleClose}
        aria-labelledby="EditPortfolioDialogTitle"
      >
        <DialogTitle id="EditPortfolioDialogTitle">Portfolios</DialogTitle>
        <DialogContent>
          <TextField
            required
            fullWidth
            type="text"
            margin="dense"
            placeholder="Search portfolio"
            onChange={event =>
              this.setState({ filter: event.target.value.toLowerCase() })
            }
          />
          <List className="List" subheader={<ListSubheader>Name</ListSubheader>}>
            {!list.length ? (
              <Typography>No entries found containing: {filter}</Typography>
            ) : (
              list.map(portfolio => (
                <ListItem
                  button
                  className="ListItem"
                  key={portfolio.name}
                  onClick={() => this.setState({ selected: portfolio.name })}
                >
                  <ListItemText primary={portfolio.name} />
                  <ListItemSecondaryAction>
                    <IconButton
                      aria-label="Delete"
                      disabled={list.length === 1}
                      onClick={() => this.handleDelete(portfolio.name)}
                    >
                      <DeleteForever />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))
            )}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Close
          </Button>
          <Button onClick={this.handleSubmit} color="primary" disabled={!selected}>
            Open
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

EditPortfolio.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  selectedPortfolio: PropTypes.string.isRequired,
  portfoliosList: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default EditPortfolio;
