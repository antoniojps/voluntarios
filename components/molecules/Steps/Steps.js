import React from 'react';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { Icon } from 'components/atoms';
import ProgressBar from '../../atoms/ProgressBar/ProgressBar';
import './Steps.module.scss';

const Steps = ({ steps = 10, currentStep = 0, title, handleChange }) => {
    const progress = 100 * currentStep / steps;
    const leftEnabled = currentStep > 0;
    const rightEnabled = currentStep < steps;

    return (
        <div className='steps'>
            <div
                className={`steps__handler ${leftEnabled ? '' : 'steps__handler--disabled'} `}
                onClick={() => leftEnabled ? handleChange(currentStep - 1) : undefined}
            >
                <Icon icon={faChevronLeft} size='xs' />
            </div>


            <div className='steps__progress'>
                <div className='steps__progress__label'>{title}</div>
                <ProgressBar progress={progress}  />
            </div>


            <div
                className={`steps__handler ${rightEnabled ? '' : 'steps__handler--disabled'} `}
                onClick={() => rightEnabled ? handleChange(currentStep + 1) : undefined}
            >
                <Icon icon={faChevronRight} size='xs'/>
            </div>

        </div>
    )
}

export default Steps;