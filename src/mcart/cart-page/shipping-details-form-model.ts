export interface IShippingDetailsFormModel {
    countries: string[];
    states: {
      [key: string]: string[],
    };
    convertArrayToOptions: (arraryOptions: string[]) => string;
}
