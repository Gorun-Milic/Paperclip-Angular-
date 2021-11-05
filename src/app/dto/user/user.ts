import { City } from "../city/city";
import { Country } from "../country/country";
import { Role } from "./role.enum";

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
    role: Role;

    constructor(){}
}