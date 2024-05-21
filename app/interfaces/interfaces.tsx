import { Float } from "react-native/Libraries/Types/CodegenTypes";

export interface Tank {
    id: string;
    name: string;
    size: number;
    measurmentUnit: 'G' | 'L';
    numberOfShrimps: number;
    additionalInfo: string;
}

export interface NeoGreen extends Neocaridina{
    id: string;
    color: "Green";
    type: "Green" | "Green Jade" | "Green Shoko" 
}
export interface NeoYellow extends Neocaridina{
    id: string;
    color: "Yellow";
    type: "Yellow"|"Yellow Neon" | "Yellow Sakura"| "White Snowball"  
}
export interface NeoRed extends Neocaridina{
    id: string;
    color: "Red";
    type: "Red Cherry" | "Fire Red" | "Red Rili" | "Painted Fire Red" | "Bloody Marry" ,
}
export interface NeoOrange extends Neocaridina{
    id: string;
    color: "Orange";
    type: "Orange" | "Orange Rili" | "Orange Neon",
}
export interface NeoBlue extends Neocaridina{
    id: string;
    color: "Blue";
    type: "Blue Dream"|"Blue Rili" | "Blue Jelly" | "Blue Diamond" | "Blue Velvet" | "Blue Carbon Rili" |
    "Black Rose" | "Carbon Rili" | "Chocolate" | "Shoko",
}

export interface NeoWaterParameters {
    id: string;
    PH: number;
    GH: number;
    KH: number;
    TDS: number;
    Temp: number;
}

export interface Neocaridina {
    id: string;
    grade?: "SSS"|"SS"|"S"|"A"|"B"| undefined;
}

export interface Caridina {
    id: string;
    size: string;
    type: '';
    grade: "SSS"|"SS"|"S"|"A"|"B"| undefined;
    waterparameters:{
        PH: number;
        GH: number;
        KH: number;
        TDS: number;
        Temp: number;
    }
}

