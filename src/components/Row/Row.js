import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import './Row.css';

const Row = props => {
  const { className, horizontalAlignment, verticalAlignment } = props;
  const cn = 'row';
  const classes = cx(cn, {
    [className]: Boolean(className),
    [`${cn}_left`]: horizontalAlignment === 'left',
    [`${cn}_right`]: horizontalAlignment === 'right',
    [`${cn}_center`]: horizontalAlignment === 'center',
    [`${cn}_justify`]: horizontalAlignment === 'justify',
    [`${cn}_spaced`]: horizontalAlignment === 'spaced',
    [`${cn}_top`]: verticalAlignment === 'top',
    [`${cn}_middle`]: verticalAlignment === 'middle',
    [`${cn}_bottom`]: verticalAlignment === 'bottom',
    [`${cn}_stretch`]: verticalAlignment === 'stretch',
  });

  return (
    <div className={classes} role="toolbar">
      {props.children}
    </div>
  );
};

Row.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.string,
  ]),
  horizontalAlignment: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.oneOf(['left', 'right', 'center', 'justify', 'spaced']),
  ]),
  verticalAlignment: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.oneOf(['top', 'middle', 'bottom', 'stretch']),
  ]),
};

Row.defaultProps = {
  children: null,
  className: null,
  horizontalAlignment: false,
  verticalAlignment: false,
};

export default Row;
