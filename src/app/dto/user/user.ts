import { City } from "../city/city";
import { Country } from "../country/country";

export class User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string; 
    // country: Country;
    city: City;
    zipcode: string;
    photo: string;

    constructor(){}
}