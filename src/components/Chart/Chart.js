import React, { Component } from 'react';
import PropTypes from 'prop-types';
/* Wijmo */
import { ChartElement, ChartType, Position, SelectionMode } from 'wijmo/wijmo.chart';
import { FlexChart } from 'wijmo/wijmo.react.chart';
import { FlexChartRangeSelector } from 'wijmo/wijmo.react.chart.interaction';
/* CSS */
import './Chart.css';

/**
 * ## React components that encapsulate Wijmo FlexChart
 * http://demos.wijmo.com/5/Angular/WijmoHelp/WijmoHelp/topic/wijmo.react.Module.html
 */
class Chart extends Component {
  state = { axisMin: null, axisMax: null };

  /**
   * Gets or sets the item formatter function that allows you to customize the appearance of the chart elements.
   * @arg {Object] engine - The chart's IRenderEngine responsible for rendering elements on the chart.
   * @arg {Object] hitTestInfo - Parameter that describes the element being rendered.
   * @arg {function] hitTestInfo - Function that provides the default rendering for the item.
   */
  handleItemFormatter = (engine, hitTestInfo, defaultFormat) => {
    const { chartElement, series, pointIndex } = hitTestInfo;
    const formatterEngine = engine;
    const tradeBinding = 'high,low,open,close';
    const binding = 'volume';

    if (pointIndex >= 0 && chartElement === ChartElement.SeriesSymbol) {
      if (series.binding === tradeBinding || series.binding === binding) {
        // get current and previous values
        const { chart } = series;
        const { items } = chart.collectionView;
        const valClose = items[pointIndex].close;
        const valOpen = items[pointIndex].open;

        // Set default width of the stroke
        formatterEngine.strokeWidth = '1px';

        if (valOpen > valClose) {
          formatterEngine.fill = '#CB2C77';
          formatterEngine.stroke = '#CB2C77';
        } else {
          formatterEngine.stroke = '#73CA21';
          formatterEngine.fill = series.binding === binding ? '#73CA21' : 'white';
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
      <div className="chart">
        <FlexChart
          className="flex-chart"
          chartType={ChartType.Candlestick}
          selectionMode={SelectionMode.Point}
          itemsSource={dataItem.history}
          series={[{ binding: 'high,low,open,close' }]}
          axisX={{ position: Position.None, min: axisMin, max: axisMax, reversed: true }}
          legend={{ position: Position.None }}
          itemFormatter={this.handleItemFormatter}
        />
        <FlexChart
          className="data-range"
          plotMargin="6 0 6 80"
          itemsSource={dataItem.history}
          series={[{ binding: 'volume' }]}
          axisX={{ position: Position.None }}
          axisY={{ position: Position.None }}
          legend={{ position: Position.None }}
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
