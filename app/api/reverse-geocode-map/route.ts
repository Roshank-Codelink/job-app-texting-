import axios from "axios";

import { NextResponse, NextRequest } from "next/server";




export async function GET(req:NextRequest) {
    
    const { searchParams } = new URL(req.url);
    const lat = searchParams.get("lat");
    const lon = searchParams.get("lon");

    try {

        if (!lat || !lon) {
            return NextResponse.json({ error: "Missing lat or lon" }, { status: 400 });
         }
        const response = await fetch(`${process.env.NEXT_PUBLIC_NOMINATIM_API_URL}/reverse?lat=${lat}&lon=${lon}&format=json`);
        const data = await response.json();
        if (!response.ok) {
            return NextResponse.json({ error: "Failed to fetch location" }, { status: 500 });
        }
        return NextResponse.json({ success: true, data: data }, { status: 200 });
        
    } catch (error) {
        return NextResponse.json({ error: "Internal server error", details: error }, { status: 500 });
     
    }
}
