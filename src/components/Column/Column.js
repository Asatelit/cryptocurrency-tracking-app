import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import './Column.css';

const Column = props => {
  const { shrink, horizontalAlignment, verticalAlignment } = props;
  const cn = 'Column';
  const classes = cx(cn, {
    [`${cn}--shrink`]: shrink,
    [`${cn}--left`]: horizontalAlignment === 'left',
    [`${cn}--right`]: horizontalAlignment === 'right',
    [`${cn}--center`]: horizontalAlignment === 'center',
    [`${cn}--justify`]: horizontalAlignment === 'justify',
    [`${cn}--spaced`]: horizontalAlignment === 'spaced',
    [`${cn}--top`]: verticalAlignment === 'top',
    [`${cn}--middle`]: verticalAlignment === 'middle',
    [`${cn}--bottom`]: verticalAlignment === 'bottom',
    [`${cn}--stretch`]: verticalAlignment === 'stretch',
  });

  return <div className={classes}>{props.children}</div>;
};

Column.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.string,
  ]),
  shrink: PropTypes.bool,
  horizontalAlignment: PropTypes.oneOf(['left', 'right', 'center', 'justify', 'spaced']),
  verticalAlignment: PropTypes.oneOf(['top', 'middle', 'bottom', 'stretch']),
};

Column.defaultProps = {
  shrink: false,
  children: null,
  horizontalAlignment: 'left',
  verticalAlignment: 'middle',
};

export default Column;
