import React from 'react';
import PropTypes from 'prop-types';
import "./Badge.module.scss";


const Badge = ({
	Component, 
	className,
	color,
	children,
	capitalized,
}) => (
	<Component 
		className={`badge ${className}`} 
		style={{ 
			backgroundColor: color,
		}} 
	>
		{capitalized ? children.toUpperCase() : children}
	</Component>
);


Badge.propTypes = {
	Component: PropTypes.elementType,
	capitalized: PropTypes.bool,
	color: PropTypes.string,
	className: PropTypes.string,
};

Badge.defaultProps = {
	Component: 'span',
	capitalized: true,
	color: '#000', 
	className: '',
};

export default Badge;
