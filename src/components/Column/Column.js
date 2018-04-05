import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import './Column.css';

const Column = props => {
  const {
    className,
    shrink,
    horizontalAlignment,
    verticalAlignment,
    flexDirection,
  } = props;
  const cn = 'column';
  const classes = cx(cn, {
    [className]: Boolean(className),
    [`${cn}_shrink`]: shrink,
    [`${cn}_${horizontalAlignment}`]: horizontalAlignment,
    [`${cn}_${verticalAlignment}`]: verticalAlignment,
    [`${cn}_dir_${flexDirection}`]: flexDirection,
  });

  return <div className={classes}>{props.children}</div>;
};

Column.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.string,
  ]),
  shrink: PropTypes.bool,
  flexDirection: PropTypes.oneOf([
    'row',
    'row-reverse',
    'column',
    'column-reverse',
    'inherit',
    'initial',
    'unset',
  ]),
  horizontalAlignment: PropTypes.oneOf(['left', 'right', 'center', 'justify', 'spaced']),
  verticalAlignment: PropTypes.oneOf(['top', 'middle', 'bottom', 'stretch']),
};

Column.defaultProps = {
  className: null,
  shrink: false,
  children: null,
  flexDirection: 'row',
  horizontalAlignment: 'left',
  verticalAlignment: 'middle',
};

export default Column;
