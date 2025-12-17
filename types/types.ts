
// Step Component Props Interfaces
export interface Step1Props {
    values: any;
    setFieldValue: (field: string, value: any) => void;
  }
  
  export interface Step2Props {
    values: any;
    setFieldValue: (field: string, value: any) => void;
  }
  
  export interface Step3Props {
    values: any;
    setFieldValue: (field: string, value: any) => void;
  }
  
  // Nominatim API Response Interface
  export interface NominatimResponse {
    display_name: string;
    lat: string;
    lon: string;
    [key: string]: any;
  }
  