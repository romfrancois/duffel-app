import { Airports } from './Airports';
import { Info } from './Info';
import { Options } from './Options';

export type DuffelApp = {
    info: Info;
    airports: Airports;
    options: Options;
};
