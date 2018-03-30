import React, { Component } from 'react';
import PropTypes from 'prop-types';
/* Wijmo */
import * as wjChart from 'wijmo/wijmo.chart';
import { FlexChart } from 'wijmo/wijmo.react.chart';
import { FlexChartRangeSelector } from 'wijmo/wijmo.react.chart.interaction';
/* CSS */
import './Chart.css';

class Chart extends Component {
  state = { axisMin: null, axisMax: null };

  shouldComponentUpdate(nextProps, nextState) {
    const { axisMin, axisMax } = this.state;
    const nextAxisMin = nextState.axisMin;
    const nextAxisMax = nextState.axisMax;
    console.info(axisMin !== nextAxisMin || axisMax !== nextAxisMax);
    console.info(nextState);
    return axisMin !== nextAxisMin || axisMax !== nextAxisMax;
  }

  /**
   * Gets or sets the item formatter function that allows you to customize the appearance of the chart elements.
   * @arg {Object] engine - The chart's IRenderEngine responsible for rendering elements on the chart.
   * @arg {Object] hitTestInfo - Parameter that describes the element being rendered.
   * @arg {function] hitTestInfo - Function that provides the default rendering for the item.
   */
  handleItemFormatter = (engine, hitTestInfo, defaultFormat) => {
    const formatterEngine = engine;
    const ht = hitTestInfo;
    const tradeBinding = 'high,low,open,close';
    const volumeBinding = 'volume';

    if (ht.pointIndex >= 0 && ht.chartElement === wjChart.ChartElement.SeriesSymbol) {
      if (ht.series.binding === tradeBinding || ht.series.binding === volumeBinding) {
        // get current and previous values
        const { chart } = ht.series;
        const { items } = chart.collectionView;
        const valNow = items[ht.pointIndex].close;
        const valPrev = items[ht.pointIndex - 1]
          ? items[ht.pointIndex - 1].close
          : valNow;

        formatterEngine.strokeWidth = '1px';

        if (valNow > valPrev) {
          formatterEngine.fill = '#CB2C77';
          formatterEngine.stroke = '#CB2C77';
        } else {
          formatterEngine.stroke = '#73CA21';
          formatterEngine.fill =
            ht.series.binding === volumeBinding ? '#73CA21' : 'white';
        }
      }
    }
    defaultFormat(); // render element as usual
  };

  /**
   * Raises the rangeChanged event.
   * @arg {Object] event
   */
  handleRangeChanged = event => {
    this.setState({ axisMin: event.min || null, axisMax: event.max || null });
  };

  render() {
    const { dataItem } = this.props;
    const { axisMin, axisMax } = this.state;
    return (
      <div className="Chart">
        <FlexChart
          className="FlexChart"
          bindingX="time"
          chartType={wjChart.ChartType.Candlestick}
          selectionMode={wjChart.SelectionMode.Point}
          itemsSource={dataItem.history}
          series={[{ binding: 'high,low,open,close' }]}
          axisX={{ position: wjChart.Position.None, min: axisMin, max: axisMax }}
          legend={{ position: wjChart.Position.None }}
          itemFormatter={this.handleItemFormatter}
        />
        <FlexChart
          className="DataRange"
          bindingX="time"
          plotMargin="6 0 6 80"
          itemsSource={dataItem.history}
          series={[{ binding: 'volume' }]}
          axisX={{ position: wjChart.Position.None }}
          axisY={{ position: wjChart.Position.None }}
          legend={{ position: wjChart.Position.None }}
          itemFormatter={this.handleItemFormatter}
        >
          <FlexChartRangeSelector
            rangeChanged={this.handleRangeChanged}
            initialized={this.handleRangeChanged}
          />
        </FlexChart>
      </div>
    );
  }
}

Chart.propTypes = {
  dataItem: PropTypes.shape({
    history: PropTypes.array,
  }).isRequired,
};

export default Chart;
