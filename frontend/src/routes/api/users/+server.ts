import { json } from "@sveltejs/kit";

export async function GET() {
    try {
        const res = await fetch('http://localhost:5000/users');
        return json({
            res: await res.json()
        })
    } catch (Exception) {
        throw Exception;
    }
}


