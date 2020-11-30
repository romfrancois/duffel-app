import React, { useContext, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';

import { Info } from '../types/Info';
import { Contact } from '../types/Contact';

import { DuffelContext } from '../App';
import { GenderType } from '../types/GenderType';

const infoCardIS: Info = {
    name: '',
    surname: '',
    dob: '',
    title: '',
    gender: {} as GenderType,
    contact: {} as Contact,
};

const InfoCard = (): JSX.Element => {
    const { dispatch } = useContext(DuffelContext);

    const {
        state: { info },
    } = useContext(DuffelContext);

    const [infoCard, setInfoCard] = useState(info || infoCardIS);

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>): void => {
        const { name, value } = e.target;
        switch (name) {
            case 'name':
                setInfoCard({ ...infoCard, name: value });
                break;
            case 'surname':
                setInfoCard({ ...infoCard, surname: value });
                break;
            case 'dob':
                setInfoCard({ ...infoCard, dob: value });
                break;
            case 'title':
                setInfoCard({ ...infoCard, title: value });
                break;
            case 'gender':
                setInfoCard({ ...infoCard, gender: value as GenderType });
                break;
            case 'email':
                setInfoCard({ ...infoCard, contact: { ...infoCard.contact, email: value } });
                break;
            case 'tel':
                setInfoCard({ ...infoCard, contact: { ...infoCard.contact, phone: value } });
                break;
            default:
                break;
        }
    };

    const handleOnBlur = (): void => {
        dispatch({ type: 'setInfo', value: infoCard });
    };

    return (
        <>
            <div className="infoCard">
                <header>
                    <FontAwesomeIcon className="faStyle fa-3x" icon={faUsers} />
                    <span>Booking</span>
                </header>
                <div className="info">
                    <div className="renter">
                        <select
                            id="title"
                            name="title"
                            placeholder="Title"
                            className="input-sm"
                            onChange={handleOnChange}
                            onBlur={handleOnBlur}
                        >
                            <option value="NONE">Title</option>
                            <option value="mrs">MRS</option>
                            <option value="mr">MR</option>
                        </select>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Name"
                            onChange={handleOnChange}
                            onBlur={handleOnBlur}
                        />
                        <input
                            type="text"
                            name="surname"
                            id="surname"
                            placeholder="Surname"
                            onChange={handleOnChange}
                            onBlur={handleOnBlur}
                        />
                    </div>
                </div>
                <div className="contact">
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Email"
                        onChange={handleOnChange}
                        onBlur={handleOnBlur}
                    />
                    <input
                        type="tel"
                        name="tel"
                        id="tel"
                        placeholder="Phone number"
                        onChange={handleOnChange}
                        onBlur={handleOnBlur}
                    />
                </div>

                <span>Date of birth</span>
                <input type="date" name="dob" id="dob" onChange={handleOnChange} onBlur={handleOnBlur} />
            </div>
        </>
    );
};

export default InfoCard;
