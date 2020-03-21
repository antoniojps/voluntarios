import React from 'react';
import PropTypes from 'prop-types';
import "./Avatar.module.scss";

const Avatar = ({
	className,
	src,
	alt, 
	size,
}) => (
	<img 
		src={src} 
		alt={alt} 
		className={`avatar ${className}`} 
		style={{ height: size, width: size}} 
	/>
);

Avatar.propTypes = {
	className: PropTypes.string,
	src: PropTypes.string.isRequired,
	alt: PropTypes.string.isRequired, 
	size: PropTypes.number,
};

Avatar.defaultProps = {
	className: '',
	size: 38,
};

export default Avatar;
