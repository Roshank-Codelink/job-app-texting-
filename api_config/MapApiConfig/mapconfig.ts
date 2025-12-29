import { customFetch } from "../apiconfig";




export const MAP_API_CONFIG = async (lat: number, lon: number)=>{
    const response = await customFetch({
        url: `${process.env.NEXT_PUBLIC_SERVER_API_ENDPOINT}/reverse-geocode-map?lat=${lat}&lon=${lon}`,
        method: "GET"
    });

    return response;
}
