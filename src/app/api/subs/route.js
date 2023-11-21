import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request) {
    const data = await request.json();

    const headers = {
        Accept: 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN_ID_BEEHIIV}`,
        'Content-Type': 'application/json',
    };

    const response = await axios.post(`https://api.beehiiv.com/v2/publications/${process.env.NEXT_PUBLIC_PUB_ID_BEEHIIV}/subscriptions`, data, { headers })
        .catch(error => {
            console.error('Error:', error.message);
        });

    return NextResponse.json(response.data)
}