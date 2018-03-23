import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import './Row.css';

const Row = props => {
  const { horizontalAlignment, verticalAlignment } = props;
  const cn = 'Row';
  const classes = cx(cn, {
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
  children: PropTypes.element.isRequired,
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
  horizontalAlignment: false,
  verticalAlignment: false,
};

export default Row;
