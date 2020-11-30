import { GenderType } from './GenderType';
import { Contact } from './Contact';

export type Info = {
    name: string;
    surname: string;
    dob: string;
    title: string;
    gender: GenderType;
    contact: Contact;
};
