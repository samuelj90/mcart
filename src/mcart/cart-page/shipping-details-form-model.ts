export interface ShippingDetailsFormModel {
    countries: string[];
    states: {
      [key: string]: string[]
    };
    convertArrayToOptions: (arraryOptions: string[]) => string;
}