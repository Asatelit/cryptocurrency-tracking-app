import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
/* Material UI */
import Tabs, { Tab } from 'material-ui/Tabs';
import IconButton from 'material-ui/IconButton';
/* SVG Material Icons */
import SettingsIcon from 'material-ui-icons/Settings';
import MenuIcon from 'material-ui-icons/Menu';
import AddIcon from 'material-ui-icons/Add';
import Typography from 'material-ui/Typography';
/* Custom Components */
import Row from '../../components/Row';
import Column from '../../components/Column';
/* CSS */
import './AppBar.css';

class AppBar extends Component {
  // Event Handlers
  handleOpenAddDialog = () => this.props.onAddPortfolio();
  handleOpenEditDialog = () => this.props.onEditPortfolios();
  handleOpenSettings = () => this.props.onOpenSettings();
  handleChangeTab = (event, value) => this.props.onChangeTab(value);

  renderButton = actions => (
    <Fragment>
      {actions.map(action => (
        <IconButton
          className="IconButton"
          color="inherit"
          key={action.key}
          aria-label={action.label}
          onClick={action.handler}
        >
          {action.icon}
        </IconButton>
      ))}
    </Fragment>
  );

  render() {
    const { selectedPortfolio, portfoliosList, isCollapsed } = this.props;
    // prettier-ignore
    const mainActions = [
      { key: 'add', label: 'Add a portfolio', handler: this.handleOpenAddDialog, icon: <AddIcon /> },
      { key: 'edit', label: 'Edit portfolios', handler: this.handleOpenEditDialog, icon: <MenuIcon /> },
    ];
    // prettier-ignore
    const additionalActions = [
      { key: 'settings', label: 'Settings', handler: this.handleOpenSettings, icon: <SettingsIcon /> },
    ];
    return (
      <div className={`AppBar ${isCollapsed ? 'AppBar--collapsed' : ''}`}>
        <Row>
          <Column shrink>
            <Typography className="Title" variant="title" color="inherit">
              Portfolio & Watchlist
            </Typography>
            {this.renderButton(mainActions)}
          </Column>
          <Column>
            <Tabs
              scrollable
              className="Tabs"
              scrollButtons="auto"
              indicatorColor="primary"
              textColor="inherit"
              classes={{ indicator: 'TabsIndicator' }}
              onChange={this.handleChangeTab}
              value={selectedPortfolio}
            >
              {portfoliosList.map(portfolio => (
                <Tab
                  classes={{ root: 'Tab', label: 'Tab-label' }}
                  key={portfolio.name}
                  label={portfolio.name}
                  value={portfolio.name}
                />
              ))}
            </Tabs>
          </Column>
          <Column shrink horizontalAlignment="right">
            {this.renderButton(additionalActions)}
          </Column>
        </Row>
      </div>
    );
  }
}

AppBar.propTypes = {
  isCollapsed: PropTypes.bool,
  onAddPortfolio: PropTypes.func.isRequired,
  onEditPortfolios: PropTypes.func.isRequired,
  onChangeTab: PropTypes.func.isRequired,
  onOpenSettings: PropTypes.func.isRequired,
  selectedPortfolio: PropTypes.string.isRequired,
  portfoliosList: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      symbols: PropTypes.arrayOf(PropTypes.string),
    }),
  ).isRequired,
};

AppBar.defaultProps = {
  isCollapsed: false,
};

export default AppBar;
