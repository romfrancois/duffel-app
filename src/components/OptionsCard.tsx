/* eslint-disable camelcase */
import React, { ChangeEvent, useContext, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTasks } from '@fortawesome/free-solid-svg-icons';
import { DuffelContext } from '../App';

import { CabinClass, Options } from '../types/Options';

const optionsCardIS: Options = {
    cabinClass: '',
    start: new Date(),
};

type subComponentProp = {
    onChange: (event: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) => void;
    onBlur: () => void;
};

const CabinClassComponent = ({ onChange, onBlur }: subComponentProp) => {
    return (
        <div className="cabinClass">
            <span>Choose a cabin class</span>
            <select
                id="cabinClass"
                name="cabinClass"
                placeholder="Cabin Class"
                className="input-sm"
                onChange={onChange}
                onBlur={onBlur}
            >
                <option value="NONE">Cabin Class</option>
                {Object.keys(CabinClass).map((cabinClass) => (
                    <option key={cabinClass} value={CabinClass[cabinClass as keyof typeof CabinClass]}>
                        {cabinClass}
                    </option>
                ))}
            </select>
        </div>
    );
};

const DateComponent = ({ onChange, onBlur }: subComponentProp) => {
    return (
        <div className="start">
            <span>Date of trip</span>
            <input type="datetime-local" name="start" id="start" onChange={onChange} onBlur={onBlur} />
        </div>
    );
};

const OptionsCard = (): JSX.Element => {
    const { dispatch } = useContext(DuffelContext);

    const [optionsCard, setOptionsCard] = useState(optionsCardIS);

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>): void => {
        const { name, value } = e.target;

        switch (name) {
            case 'cabinClass':
                setOptionsCard({ ...optionsCard, cabinClass: value });
                break;
            case 'start':
                setOptionsCard({ ...optionsCard, start: new Date(value) });
                break;
            default:
                break;
        }
    };

    const handleOnBlur = (): void => {
        dispatch({ type: 'setOptions', value: optionsCard });
    };

    return (
        <>
            <div className="optionsCard">
                <header>
                    <FontAwesomeIcon className="faStyle fa-3x" icon={faTasks} />
                    <span>Options</span>
                </header>
                <div className="options">
                    <CabinClassComponent onChange={handleOnChange} onBlur={handleOnBlur} />
                    <DateComponent onChange={handleOnChange} onBlur={handleOnBlur} />
                </div>
            </div>
        </>
    );
};

export default OptionsCard;
