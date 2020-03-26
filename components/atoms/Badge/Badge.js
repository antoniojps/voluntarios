import React from 'react';
import PropTypes from 'prop-types';

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
			<style jsx>{`
				.badge {
					color: var(--baseInverse);
					font-size: var(--size-xs);
					padding: var(--spacing-xs4) var(--spacing-xs2);
					border-radius: var(--borderRadius);
					font-weight: bold;
					text-align: center;
				}
			`}</style>
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
