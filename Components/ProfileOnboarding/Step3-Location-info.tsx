"use client";
import { useState } from "react";
import { Input } from "@/Components/ui/input";
import { MapPin, Navigation } from "lucide-react";
import {  useJsApiLoader, Autocomplete } from '@react-google-maps/api'

import axios from "axios";
import { Step3Props} from "@/types/types";

// Static libraries array - component ke bahar
const libraries: ("places")[] = ["places"];

export default function Step3LocationInfo({ values, setFieldValue }: Step3Props) {
    const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
    const [isDetecting, setIsDetecting] = useState(false);
    const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);

    // MANUAL INPUT HANDLER
    const handleLocationInput = (value: string) => {
        setFieldValue("location", value);
    };

    // AUTO DETECT
    const detectLocation = () => {
        if (!navigator.geolocation) {
            alert("Geolocation is not supported by your browser");
            return;
        }

        setIsDetecting(true);

        navigator.geolocation.getCurrentPosition(
            async (pos) => {
                const lat = pos.coords.latitude;
                const lng = pos.coords.longitude;

                // Set coordinates for map
                setCoords({ lat, lng });

                try {
                    // Reverse geocoding
                    const response = await axios.get(`http://localhost:3000/api/reverse-geocode-map?lat=${lat}&lon=${lng}`);
                    console.log("🗺️ API Response:", response);
                    if (response.status !== 200 || !response.data.success) {
                        throw new Error("API Error");
                    }

                    const data = response.data.data;
                    const address = data.address || {};

                    // Extract city and state
                    const city = address.city || address.town || address.village || address.county || "";
                    const state = address.state || "";

                    // Format as "City, State"
                    const locationName = city && state ? `${city}, ${state}` : data.display_name || `${lat}, ${lng}`;

                    setFieldValue("location", locationName);
                    setIsDetecting(false);
                } catch (error) {
                    setIsDetecting(false);
                    console.error("Error fetching location:", error);
                    alert("Failed to get location address");
                }
            },
            (error) => {
                setIsDetecting(false);
                console.error("Geolocation error:", error);
                alert("Location permission denied");
            }
        );
    };

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY || '',
        libraries: libraries,
    })


    return (isLoaded && (
        <Autocomplete
            onLoad={(autocompleteInstance) => {
                setAutocomplete(autocompleteInstance);
            }}
            onPlaceChanged={() => {
                const place = autocomplete?.getPlace();
                if (!place) return;

                const city =
                    place.address_components?.find(c =>
                        c.types.includes("locality")
                    )?.long_name || "";

                const state =
                    place.address_components?.find(c =>
                        c.types.includes("administrative_area_level_1")
                    )?.long_name || "";

                const locationName =
                    city && state ? `${city}, ${state}` : place.formatted_address || place.name || "";

                setFieldValue("location", locationName);
            }}
            options={{
                types: ["(cities)"],
            }}
        >
            <div className="w-full max-w-full mx-auto px-0 sm:px-2 md:px-4">
                <div className="space-y-4 sm:space-y-5 md:space-y-6">
                    {/* Location Input */}
                    <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                            Job Location <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <MapPin className="absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5 z-10" />
                            <Input
                                type="text"
                                name="location"
                                value={values.location || ""}
                                onChange={(e) => handleLocationInput(e.target.value)}
                                placeholder="Enter city or area (e.g. Bengaluru, Mumbai)"
                                className="w-full pl-9 sm:pl-10 pr-9 sm:pr-10 text-sm sm:text-base h-10 sm:h-11 focus-visible:border-[#0ea5e9] focus-visible:ring-[#0ea5e9]"
                                disabled={isDetecting}
                            />
                            {isDetecting && (
                                <div className="absolute right-2.5 sm:right-3 top-1/2 -translate-y-1/2">
                                    <div className="w-4 h-4 border-2 border-[#0ea5e9] border-t-transparent rounded-full animate-spin" />
                                </div>
                            )}
                        </div>
                        <p className="text-gray-500 text-xs sm:text-sm mt-1">
                            Type your preferred work location or use auto-detect
                        </p>

                    </div>

                    {/* Auto Detect Button */}
                    <div className="flex items-center justify-center pt-2">
                        <button
                            type="button"
                            onClick={detectLocation}
                            disabled={isDetecting}
                            className="flex items-center justify-center cursor-pointer gap-2 px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-medium text-[#0ea5e9] border-2 border-[#0ea5e9] rounded-lg hover:bg-[#0ea5e9] hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
                        >
                            {isDetecting ? (
                                <div className="w-4 h-4 border-2 border-[#0ea5e9] border-t-transparent rounded-full animate-spin shrink-0" />
                            ) : (
                                <Navigation className="w-4 h-4 shrink-0" />
                            )}
                            <span className="whitespace-nowrap">
                                {isDetecting ? "Detecting Location..." : "Use My Current Location"}
                            </span>
                        </button>
                    </div>



                </div>
            </div>
        </Autocomplete>
    ))
}