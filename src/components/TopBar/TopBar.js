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
        className="Tabs"
        textColor="inherit"
        classes={{ indicator: 'TabsIndicator' }}
        value={this.props.selectedTab}
        onChange={this.handleChangeTab}
      >
        {tabs.map(tab => (
          <Tab
            classes={{ root: 'Tab' }}
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
      <div className="Filter">
        <div className="Filter-searchIcon">
          <SearchIcon />
        </div>
        <input
          className="Filter-input"
          placeholder="Type a symbol name to filter"
          value={filter}
          onChange={event =>
            this.handleChangeFilterText(event.target.value.toLowerCase())
          }
        />
        {Boolean(filter) && (
          <IconButton
            className="Filter-clearIcon"
            onClick={() => this.handleChangeFilterText('')}
          >
            <CloseIcon />
          </IconButton>
        )}
      </div>
    );
  };

  // prettier-ignore
  render() {
    return (
      <div className="TopBar">
        <Row verticalAlignment="stretch">
          <Column verticalAlignment="stretch">
            {this.renderTabs()}
          </Column>
          <Column shrink>
            {this.renderFilterBox()}
          </Column>
        </Row>
      </div>
    );
  }
}

TopBar.propTypes = {
  filter: PropTypes.string,
  onChangeFilterText: PropTypes.func.isRequired,
  onChangeTab: PropTypes.func.isRequired,
  selectedTab: PropTypes.oneOf([
    AssetsTypes.OVERVIEW,
    AssetsTypes.PERFORMANCE,
    AssetsTypes.TECHNICAL,
  ]).isRequired,
};

TopBar.defaultProps = {
  filter: '',
};

export default TopBar;
