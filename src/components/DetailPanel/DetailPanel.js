import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
/* Material UI */
import Table, { TableBody, TableCell, TableRow } from 'material-ui/Table';
import Typography from 'material-ui/Typography';
/* SVG Material icons */
import ArrowUpwardIcon from 'material-ui-icons/ArrowUpward';
import ArrowDownwardIcon from 'material-ui-icons/ArrowDownward';
/* Custom Components */
import Chart from '../Chart';
import Column from '../Column';
import Row from '../Row';
/* CSS */
import './DetailPanel.css';

class DetailPanel extends Component {
  renderSummaryRows = data => {
    const { time, volume, open, close, history, performanceYear } = data;
    const priceHistory = data.history.map(el => el.close);
    const rangeMin = Math.min(...priceHistory).toFixed(2);
    const rangeMax = Math.max(...priceHistory).toFixed(2);
    const summary = [
      { name: 'Time', value: time.toTimeString() },
      { name: 'Volume', value: volume.toFixed(2) },
      { name: 'Open', value: open.toFixed(2) },
      { name: 'Close', value: close.toFixed(2) },
      { name: 'Prev. Open', value: history[0].open.toFixed(2) },
      { name: 'Prev. Close', value: history[0].close.toFixed(2) },
      { name: '1-Year Change', value: `${performanceYear.toFixed(2)}%` },
      { name: 'Range', value: `${rangeMin} - ${rangeMax}` },
    ];
    return (
      <Fragment>
        {summary.map(entry => (
          <TableRow key={entry.name}>
            <TableCell>{entry.name}</TableCell>
            <TableCell numeric>{entry.value}</TableCell>
          </TableRow>
        ))}
      </Fragment>
    );
  };

  render() {
    const { dataItem } = this.props;
    const isRising = dataItem.close > dataItem.open;
    const difference = (dataItem.close - dataItem.open).toFixed(2);
    return (
      <div className="DetailPanel">
        <Row>
          <Column className="DetailPanel-col" flexDirection="column" shrink>
            <Typography className="Headline" variant="headline">
              {isRising ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
              {dataItem.close.toFixed(2)}
            </Typography>
            <Typography variant="subheading">
              {isRising ? '+' : '-'}
              {difference}
            </Typography>
          </Column>
          <Column className="DetailPanel-col">
            <Chart dataItem={dataItem} />
          </Column>
          <Column className="DetailPanel-col" shrink>
            <Table className="Table">
              <TableBody>{this.renderSummaryRows(dataItem)}</TableBody>
            </Table>
          </Column>
        </Row>
      </div>
    );
  }
}

DetailPanel.propTypes = {
  dataItem: PropTypes.shape({
    close: PropTypes.number,
    history: PropTypes.array,
    open: PropTypes.number,
    performanceYear: PropTypes.number,
    time: PropTypes.any,
    volume: PropTypes.number,
  }).isRequired,
};

export default DetailPanel;
