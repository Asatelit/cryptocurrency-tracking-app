import React, { Component } from 'react';
import PropTypes from 'prop-types';
/* Custom Components */
import Chart from '../Chart';
import Row from '../Row';
import Column from '../Column';
/* CSS */
import './DetailPanel.css';

class DetailPanel extends Component {
  render() {
    const { dataItem } = this.props;
    const { axisMin, axisMax } = this.state;
    return (
      <div className="DetailPanel">
        <Row>

        </Row>
      </div>
    );
  }
}

DetailPanel.propTypes = {
  dataItem: PropTypes.shape({
    history: PropTypes.array,
  }).isRequired,
};

export default DetailPanel;
