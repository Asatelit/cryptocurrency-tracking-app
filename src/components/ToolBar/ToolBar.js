import React, { Component } from 'react';
import PropTypes from 'prop-types';
/* Material UI */
import { FormGroup, FormControlLabel } from 'material-ui/Form';
import Typography from 'material-ui/Typography';
import Menu from 'material-ui/Menu';
import Button from 'material-ui/Button';
import Checkbox from 'material-ui/Checkbox';
/* SVG Material icons */
import PlaylistAdd from 'material-ui-icons/PlaylistAdd';
import PrintIcon from 'material-ui-icons/Print';
import DownloadIcon from 'material-ui-icons/FileDownload';
import HideIcon from 'material-ui-icons/VisibilityOff';
/* Custom Components */
import AssetsTypes from '../../constants/AssetsTypes';
import Row from '../../components/Row';
import Column from '../../components/Column';
/* CSS */
import './ToolBar.css';

class ToolBar extends Component {
  state = { columnsVisibilityMenu: null };

  handleOnAddSymbol = () => this.props.onAddSymbols();
  handlePrint = () => this.props.onPrint();
  handleDownload = () => this.props.onDownload();
  handleChangeColumn = (event, binding) =>
    this.props.onHideField(binding, event.target.checked);

  render() {
    const { columnsVisibilityMenu } = this.state;
    const { columns, section } = this.props;
    const column = columns[section];
    return (
      <div className="ToolBar">
        <Row>
          <Column>
            <Typography className="Caption" variant="caption">
              Symbols
            </Typography>
            <Button color="inherit" onClick={this.handleOnAddSymbol}>
              <PlaylistAdd />
              <span className="Button-label">Symbols</span>
            </Button>
            <div>
              <Button
                color="inherit"
                onClick={event =>
                  this.setState({ columnsVisibilityMenu: event.currentTarget })
                }
              >
                <HideIcon />
                <span className="Button-label">Columns</span>
              </Button>
              <Menu
                anchorEl={columnsVisibilityMenu}
                open={Boolean(columnsVisibilityMenu)}
                onClose={() => this.setState({ columnsVisibilityMenu: null })}
              >
                <FormGroup className="ColumnsMenuForm">
                  {column.map(
                    option =>
                      Boolean(option.binding) && (
                        <FormControlLabel
                          key={option.binding}
                          control={
                            <Checkbox
                              checked={option.visible}
                              value={option.binding}
                              onChange={event =>
                                this.handleChangeColumn(event, option.binding)
                              }
                            />
                          }
                          label={option.header}
                        />
                      ),
                  )}
                </FormGroup>
              </Menu>
            </div>
          </Column>
          <Column shrink horizontalAlignment="right">
            <Button color="inherit" onClick={this.handlePrint}>
              <PrintIcon />
              <span className="Button-label">Print</span>
            </Button>
            <Button color="inherit" onClick={this.handleDownload}>
              <DownloadIcon />
              <span className="Button-label">Download</span>
            </Button>
          </Column>
        </Row>
      </div>
    );
  }
}

ToolBar.propTypes = {
  onAddSymbols: PropTypes.func.isRequired,
  onHideField: PropTypes.func.isRequired,
  onPrint: PropTypes.func.isRequired,
  onDownload: PropTypes.func.isRequired,
  columns: PropTypes.shape({
    binding: PropTypes.string,
    header: PropTypes.string,
    visible: PropTypes.bool,
  }).isRequired,
  section: PropTypes.oneOf([
    AssetsTypes.OVERVIEW,
    AssetsTypes.PERFORMANCE,
    AssetsTypes.TECHNICAL,
  ]).isRequired,
};

export default ToolBar;
