/*
  Popover component
  example:
  <Popover content={<h1>Popupcontent</h1>}>Handler</Popover>
*/

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Popover from 'react-tiny-popover';

const PopoverBase = ({
  position,
  children,
  content,
  align,
  onChangeOpen,
  triggerClose,
  ...rest
}) => {
  const [isOpen, setOpen] = useState(false);
  const handleClick = (e) => {
    e.preventDefault()
    e.stopPropagation();
    setOpen(!isOpen)
  };

  useEffect(() => {
    onChangeOpen(isOpen)
  }, [isOpen])

  useEffect(() => {
    if (isOpen) setOpen(false)
  }, [triggerClose])

  const handleClickOutside = () => {
    setOpen(false)
  }

  return (
    <>
      <Popover
        transitionDuration="0"
        isOpen={isOpen}
        position={position}
        align={align}
        content={content}
        onClickOutside={handleClickOutside}
        containerStyle={{
          overflow: 'visible',
          backgroundColor: 'white',
          boxShadow: '0 2px 16px rgba(0,0,0,0.1)',
          borderRadius: '5px',
          zIndex: 50,
        }}
        {...rest}
      >
        <div onClick={handleClick}>
          {children}
        </div>
      </Popover>
    </>
  );
};

PopoverBase.propTypes = {
  position: PropTypes.oneOf(['top', 'bottom', 'right', 'left']),
  align: PropTypes.oneOf(['start', 'center', 'end']),
  children: PropTypes.node.isRequired,
  content: PropTypes.node.isRequired,
  onChangeOpen: PropTypes.func,
  triggerClose: PropTypes.bool,
};

PopoverBase.defaultProps = {
  position: 'top',
  align: 'end',
  onChangeOpen: () => { },
  triggerClose: false,
};

export default PopoverBase