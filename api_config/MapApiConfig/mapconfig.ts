import { customFetch } from "../apiconfig";




export const MAP_API_CONFIG = async (lat: number, lon: number)=>{
    const response = await customFetch({
        url: `/reverse-geocode-map?lat=${lat}&lon=${lon}`,
        method: "GET"
    });

    return response;
}
