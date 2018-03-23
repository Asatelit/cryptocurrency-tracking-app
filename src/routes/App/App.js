import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as dataActionCreators from '../../actions/dataActions';
import * as portfoliosActionCreators from '../../actions/portfoliosActions';
import * as appActionCreators from '../../actions/appActions';
import * as gridActionCreators from '../../actions/gridActions';

import Grid from '../../components/Grid';
import AppBar from '../../components/AppBar';
import TopBar from '../../components/TopBar';
import ToolBar from '../../components/ToolBar';
import Settings from '../../components/Settings';
import AddSymbol from '../../components/AddSymbol';
import AddPortfolio from '../../components/AddPortfolio';
import EditPortfolio from '../../components/EditPortfolio';

import './App.css';
import './Wijmo.css';

class App extends Component {
  componentDidMount() {
    const { appActions } = this.props;
    appActions.getInitialState();

    setInterval(() => {
      appActions.getInitialState();
    }, 100000);
  }

  render() {
    const { app, data, portfolios } = this.props;
    const { appActions, portfoliosActions, gridActions } = this.props;
    return (
      <div className="App">
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
        <Settings isOpen={app.isSettingsPanelOpen} />
        <div className="App-content">
          <div className="App-grid">
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
              itemsSource={
                data.filter
                  ? data.trading.filter(
                      entry =>
                        entry.name.toLowerCase().includes(data.filter) ||
                        entry.symbol.toLowerCase().includes(data.filter),
                    )
                  : data.trading
              }
            />
          </div>
        </div>
        <div>
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
        </div>
      </div>
    );
  }
}

App.propTypes = {
  app: PropTypes.shape({
    isAddDialogOpen: PropTypes.bool,
    isEditDialogOpen: PropTypes.bool,
    isSettingsPanelOpen: PropTypes.bool,
    isSymbolsDialogOpen: PropTypes.bool,
  }).isRequired,

  // Data Reducer
  data: PropTypes.shape({
    filter: PropTypes.string,
    tickers: PropTypes.array,
    trading: PropTypes.array,
    columns: PropTypes.array,
  }).isRequired,

  // Portfolios Reducer
  portfolios: PropTypes.shape({
    list: PropTypes.array,
    selected: PropTypes.string,
  }).isRequired,

  // Actions Creators
  dataActions: PropTypes.shape({
    getTradingData: PropTypes.func,
  }).isRequired,

  // Actions Creators
  portfoliosActions: PropTypes.shape({
    getPortfoliosList: PropTypes.func,
    addPortfolio: PropTypes.func,
    getPortfolio: PropTypes.func,
    editPortfolio: PropTypes.func,
    deletePortfolio: PropTypes.func,
  }).isRequired,

  gridActions: PropTypes.shape({
    autosize: PropTypes.func,
    download: PropTypes.func,
    export: PropTypes.func,
    group: PropTypes.func,
    hideFields: PropTypes.func,
    print: PropTypes.func,
  }).isRequired,

  appActions: PropTypes.shape({
    changeFilterText: PropTypes.func,
    changeGridSection: PropTypes.func,
    changeCurrentPortfolio: PropTypes.func,
    closeAddDialog: PropTypes.func,
    closeEditDialog: PropTypes.func,
    closeSymbolsDialog: PropTypes.func,
    getInitialState: PropTypes.func,
    openAddDialog: PropTypes.func,
    openEditDialog: PropTypes.func,
    openSymbolsDialog: PropTypes.func,
    toggleSettingsPanel: PropTypes.func,
    updateTradingData: PropTypes.func,
    changeColumnsVisibility: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = state => ({
  data: state.data,
  portfolios: state.portfolios,
  app: state.app,
});

const mapDispatchToProps = dispatch => ({
  dataActions: bindActionCreators(dataActionCreators, dispatch),
  portfoliosActions: bindActionCreators(portfoliosActionCreators, dispatch),
  appActions: bindActionCreators(appActionCreators, dispatch),
  gridActions: bindActionCreators(gridActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
