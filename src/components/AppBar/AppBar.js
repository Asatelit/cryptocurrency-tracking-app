import React, { Component } from 'react';
import PropTypes from 'prop-types';

/* Material UI */
import Tabs, { Tab } from 'material-ui/Tabs';
import IconButton from 'material-ui/IconButton';

/* SVG Material icons */
import SettingsIcon from 'material-ui-icons/Settings';
import MenuIcon from 'material-ui-icons/Menu';
import AddIcon from 'material-ui-icons/Add';
import Typography from 'material-ui/Typography';

import Row from '../../components/Row';
import Column from '../../components/Column';
import './AppBar.css';

class AppBar extends Component {
  // Event Handlers
  handleOpenAddDialog = () => this.props.onAddPortfolio();
  handleOpenEditDialog = () => this.props.onEditPortfolios();
  handleOpenSettings = () => this.props.onOpenSettings();
  handleChangeTab = (event, value) => this.props.onChangeTab(value);

  render() {
    const { selectedPortfolio, portfoliosList, isCollapsed } = this.props;
    return (
      <div className={`AppBar ${isCollapsed ? 'AppBar--collapsed' : ''}`}>
        <Row>
          <Column shrink>
            <Typography className="Title" variant="title" color="inherit">
              Portfolio & Watchlist
            </Typography>
            <IconButton
              className="IconButton"
              color="inherit"
              aria-label="Add Portfolio"
              onClick={this.handleOpenAddDialog}
            >
              <AddIcon />
            </IconButton>
            <IconButton
              className="IconButton"
              color="inherit"
              aria-label="Edit Portfolios"
              onClick={this.handleOpenEditDialog}
            >
              <MenuIcon />
            </IconButton>
          </Column>
          <Column>
            <Tabs
              className="Tabs"
              classes={{ indicator: 'TabsIndicator' }}
              onChange={this.handleChangeTab}
              value={selectedPortfolio}
              scrollable
              scrollButtons="auto"
              indicatorColor="primary"
              textColor="inherit"
            >
              {portfoliosList.map(portfolio => (
                <Tab
                  className="Tab"
                  key={portfolio.name}
                  label={portfolio.name}
                  value={portfolio.name}
                />
              ))}
            </Tabs>
          </Column>
          <Column shrink horizontalAlignment="right">
            <IconButton
              className="IconButton"
              color="inherit"
              aria-label="Settings"
              onClick={this.handleOpenSettings}
            >
              <SettingsIcon />
            </IconButton>
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
