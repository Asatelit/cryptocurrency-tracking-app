import React, { Component } from 'react';
import PropTypes from 'prop-types';
/* Material UI */
import Typography from 'material-ui/Typography';
import Table, { TableBody, TableCell, TableRow } from 'material-ui/Table';
/* SVG Material icons */
import ArrowUpwardIcon from 'material-ui-icons/ArrowUpward';
import ArrowDownwardIcon from 'material-ui-icons/ArrowDownward';
/* Custom Components */
import Chart from '../Chart';
import Row from '../Row';
import Column from '../Column';
/* CSS */
import './DetailPanel.css';

class DetailPanel extends Component {
  renderSummaryRows = data => {
    const priceHistory = data.history.map(el => el.close);
    const rangeMin = Math.min(...priceHistory).toFixed(2);
    const rangeMax = Math.max(...priceHistory).toFixed(2);
    const summary = [
      { name: 'Time', value: data.time.toTimeString() },
      { name: 'Volume', value: data.volume.toFixed(2) },
      { name: 'Open', value: data.open.toFixed(2) },
      { name: 'Close', value: data.close.toFixed(2) },
      { name: 'Prev. Open', value: data.history[0].open.toFixed(2) },
      { name: 'Prev. Close', value: data.history[0].close.toFixed(2) },
      { name: '1-Year Change', value: `${data.performanceYear.toFixed(2)}%` },
      { name: 'Range', value: `${rangeMin} - ${rangeMax}` },
    ];
    return (
      <React.Fragment>
        {summary.map(entry => (
          <TableRow key={entry.name}>
            <TableCell>{entry.name}</TableCell>
            <TableCell numeric>{entry.value}</TableCell>
          </TableRow>
        ))}
      </React.Fragment>
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
    history: PropTypes.array,
  }).isRequired,
};

export default DetailPanel;
