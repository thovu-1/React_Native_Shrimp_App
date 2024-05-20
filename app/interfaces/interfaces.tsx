export interface Tank {
    id: string;
    name: string;
    size: number;
    measurmentUnit: 'G' | 'L';
    shrimps: number;
    additionalInfo: string;
}