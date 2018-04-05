import React, { Component } from 'react';
import PropTypes from 'prop-types';
/* Material UI */
import Tabs, { Tab } from 'material-ui/Tabs';
import IconButton from 'material-ui/IconButton';
/* SVG Material icons */
import SearchIcon from 'material-ui-icons/Search';
import CloseIcon from 'material-ui-icons/Close';
/* Custom Components */
import Row from '../../components/Row';
import Column from '../../components/Column';
import AssetsTypes from '../../constants/AssetsTypes';
/* CSS */
import './TopBar.css';

class TopBar extends Component {
  handleChangeFilterText = str => this.props.onChangeFilterText(str);
  handleChangeTab = (event, value) => this.props.onChangeTab(value);

  renderTabs = () => {
    const tabs = [
      { label: 'Overview', value: AssetsTypes.OVERVIEW },
      { label: 'Technical', value: AssetsTypes.TECHNICAL },
      { label: 'Performance', value: AssetsTypes.PERFORMANCE },
    ];
    return (
      <Tabs
        className="tabs"
        textColor="inherit"
        classes={{ indicator: 'tabs-indicator' }}
        value={this.props.selectedTab}
        onChange={this.handleChangeTab}
      >
        {tabs.map(tab => (
          <Tab
            classes={{ root: 'tab' }}
            key={tab.value}
            label={tab.label}
            value={tab.value}
          />
        ))}
      </Tabs>
    );
  };

  renderFilterBox = () => {
    const { filter } = this.props;
    return (
      <div className="filter">
        <div className="filter__search-icon">
          <SearchIcon />
        </div>
        <input
          className="filter__input"
          placeholder="Type a symbol name to filter"
          value={filter}
          onChange={event =>
            this.handleChangeFilterText(event.target.value.toLowerCase())
          }
        />
        {Boolean(filter) && (
          <IconButton
            className="filter__clear-icon"
            onClick={() => this.handleChangeFilterText('')}
          >
            <CloseIcon />
          </IconButton>
        )}
      </div>
    );
  };

  render() {
    return (
      <div className="topbar">
        <Row verticalAlignment="stretch">
          <Column verticalAlignment="stretch">{this.renderTabs()}</Column>
          <Column shrink>{this.renderFilterBox()}</Column>
        </Row>
      </div>
    );
  }
}

TopBar.propTypes = {
  filter: PropTypes.string.isRequired,
  onChangeFilterText: PropTypes.func.isRequired,
  onChangeTab: PropTypes.func.isRequired,
  selectedTab: PropTypes.oneOf([
    AssetsTypes.OVERVIEW,
    AssetsTypes.PERFORMANCE,
    AssetsTypes.TECHNICAL,
  ]).isRequired,
};

export default TopBar;
