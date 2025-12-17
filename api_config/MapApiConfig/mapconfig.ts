import { customFetch } from "../apiconfig";




export const MAP_API_CONFIG = async (lat: number, lon: number)=>{
    const response = await customFetch({
        url: `http://localhost:3000/api/reverse-geocode-map?lat=${lat}&lon=${lon}`,
        method: "GET"
    });

    return response;
}
