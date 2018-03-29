import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import './Row.css';

const Row = props => {
  const { className, horizontalAlignment, verticalAlignment } = props;
  const cn = 'Row';
  const classes = cx(cn, {
    [className]: Boolean(className),
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
