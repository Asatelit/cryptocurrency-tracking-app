import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
/* Action Creators */
import * as appActionCreators from '../../actions/appActions';
import * as gridActionCreators from '../../actions/gridActions';
import * as portfoliosActionCreators from '../../actions/portfoliosActions';
/* Components */
import AddPortfolio from '../../components/AddPortfolio';
import AddSymbol from '../../components/AddSymbol';
import AppBar from '../../components/AppBar';
import EditPortfolio from '../../components/EditPortfolio';
import Grid from '../../components/Grid';
import Settings from '../../components/Settings';
import ToolBar from '../../components/ToolBar';
import TopBar from '../../components/TopBar';
/* CSS */
import './App.css';
import './Wijmo.css';

class App extends Component {
  /* THE COMPONENT LIFECYCLE */

  // Invoked immediately after a component is mounted
  componentDidMount() {
    const { app, appActions } = this.props;
    const { settings } = app;
    // request trading data
    appActions.requestTradingData();
    // auto-update the trading data (if configured)
    if (settings.isAutoUpdate) {
      this.autoUpdate(settings.updateInterval);
    }
  }

  // Invoked before a mounted component receives new props.
  componentWillReceiveProps(nextProps) {
    const { settings } = this.props.app;
    const nextSettings = nextProps.app.settings;
    const hasNewInterval = settings.updateInterval !== nextSettings.updateInterval;
    const hasNewAutoUpdate = settings.isAutoUpdate !== nextSettings.isAutoUpdate;

    if (hasNewAutoUpdate || hasNewInterval) {
      clearInterval(this.autoUpdateInterval);
      if (nextSettings.isAutoUpdate) {
        this.autoUpdate(nextSettings.updateInterval);
      } else {
        clearInterval(this.autoUpdateInterval);
      }
    }
  }

  // Called when a component is being removed from the DOM
  componentWillUnmount() {
    clearInterval(this.autoUpdateInterval);
  }

  autoUpdateInterval = null;

  autoUpdate = interval => {
    this.autoUpdateInterval = setInterval(() => {
      this.props.appActions.requestTradingData();
    }, interval);
  };

  /* RENDER ASSETS */

  // Render Navigation
  renderNavigation = () => {
    const { app, data, portfolios } = this.props; // reducers
    const { appActions } = this.props; // action creators
    return (
      <React.Fragment>
        <AppBar
          portfoliosList={portfolios.list}
          selectedPortfolio={portfolios.selected}
          isCollapsed={app.isSettingsPanelOpen}
          onAddPortfolio={appActions.openAddDialog}
          onEditPortfolios={appActions.openEditDialog}
          onChangeTab={appActions.changeCurrentPortfolio}
          onOpenSettings={appActions.toggleSettingsPanel}
        />
        <TopBar
          onChangeFilterText={appActions.changeFilterText}
          onChangeTab={appActions.changeGridSection}
          selectedTab={app.gridSection}
          tabsList={[]}
          filter={data.filter}
        />
        <Settings
          isOpen={app.isSettingsPanelOpen}
          settings={app.settings}
          onUpdateSettings={appActions.updateSettings}
          onClose={appActions.toggleSettingsPanel}
        />
      </React.Fragment>
    );
  };

  // Render Dialogs
  renderDialogs = () => {
    const { app, data, portfolios } = this.props; // reducers
    const { appActions, portfoliosActions } = this.props; // action creators
    return (
      <React.Fragment>
        {app.isSymbolsDialogOpen && (
          <AddSymbol
            symbols={data.tickers}
            portfolio={portfolios.list.find(
              portfolio => portfolio.name === portfolios.selected,
            )}
            onClose={appActions.closeSymbolsDialog}
            onSubmit={appActions.updateTradingData}
          />
        )}
        <AddPortfolio
          isOpen={app.isAddDialogOpen}
          onClose={appActions.closeAddDialog}
          onSubmit={portfoliosActions.addPortfolio}
          usedNames={portfolios.list.map(el => el.name)}
        />
        <EditPortfolio
          isOpen={app.isEditDialogOpen}
          portfoliosList={portfolios.list}
          selectedPortfolio={portfolios.selected}
          onClose={appActions.closeEditDialog}
          onSelect={appActions.changeCurrentPortfolio}
          onDelete={portfoliosActions.deletePortfolio}
        />
      </React.Fragment>
    );
  };

  // Render FlexGrid
  renderGrid = () => {
    const { app, data, appActions, gridActions } = this.props;
    const filteredItemSource = data.filter
      ? data.trading.filter(entry =>
          `${entry.name} ${entry.symbol}`.toLowerCase().includes(data.filter),
        )
      : data.trading;
    return (
      <React.Fragment>
        <ToolBar
          columns={data.columns}
          section={app.gridSection}
          onAddSymbols={appActions.openSymbolsDialog}
          onDownload={gridActions.download}
          onHideField={appActions.changeColumnsVisibility}
          onPrint={gridActions.print}
        />
        <Grid
          filter={data.filter}
          columns={data.columns}
          section={app.gridSection}
          settings={app.settings}
          itemsSource={filteredItemSource}
        />
      </React.Fragment>
    );
  };

  render() {
    return (
      <div className="App">
        {this.renderNavigation()}
        <div className="App-content">
          <div className="App-grid">{this.renderGrid()}</div>
        </div>
        {this.renderDialogs()}
      </div>
    );
  }
}

App.propTypes = {
  // App Reducer
  app: PropTypes.shape({
    isAddDialogOpen: PropTypes.bool,
    isEditDialogOpen: PropTypes.bool,
    isSettingsPanelOpen: PropTypes.bool,
    isSymbolsDialogOpen: PropTypes.bool,
    settings: PropTypes.shape({
      isCustomCells: PropTypes.bool,
      isAutoUpdate: PropTypes.bool,
      updateInterval: PropTypes.number,
      isFreezeFirstRow: PropTypes.bool,
      isFreezeFirstCol: PropTypes.bool,
    }).isRequired,
  }).isRequired,

  // Data Reducer
  data: PropTypes.shape({
    filter: PropTypes.string,
    tickers: PropTypes.array,
    trading: PropTypes.array,
    columns: PropTypes.shape(),
  }).isRequired,

  // Portfolios Reducer
  portfolios: PropTypes.shape({
    list: PropTypes.array,
    selected: PropTypes.string,
  }).isRequired,

  // Portfolios Actions
  portfoliosActions: PropTypes.shape({
    getPortfoliosList: PropTypes.func,
    addPortfolio: PropTypes.func,
    getPortfolio: PropTypes.func,
    editPortfolio: PropTypes.func,
    deletePortfolio: PropTypes.func,
  }).isRequired,

  // Grid Actions
  gridActions: PropTypes.shape({
    download: PropTypes.func,
    print: PropTypes.func,
  }).isRequired,

  // App Actions
  appActions: PropTypes.shape({
    updateTradingData: PropTypes.func,
    updateSettings: PropTypes.func,
    toggleSettingsPanel: PropTypes.func,
    openSymbolsDialog: PropTypes.func,
    openEditDialog: PropTypes.func,
    openAddDialog: PropTypes.func,
    requestTradingData: PropTypes.func,
    closeSymbolsDialog: PropTypes.func,
    closeEditDialog: PropTypes.func,
    closeAddDialog: PropTypes.func,
    changeGridSection: PropTypes.func,
    changeFilterText: PropTypes.func,
    changeCurrentPortfolio: PropTypes.func,
    changeColumnsVisibility: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = state => ({
  data: state.data,
  portfolios: state.portfolios,
  app: state.app,
});

const mapDispatchToProps = dispatch => ({
  portfoliosActions: bindActionCreators(portfoliosActionCreators, dispatch),
  appActions: bindActionCreators(appActionCreators, dispatch),
  gridActions: bindActionCreators(gridActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
