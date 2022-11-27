import { json } from '@sveltejs/kit';

export async function GET() {
	try {
		const res = await fetch('http://localhost:5000/users');
		return res;
	} catch (Exception) {
		throw Exception;
	}
}

export async function POST() {
	const body = {
		firstName: 'foo',
		lastName: 'bar',
		isActive: false
	};
	return await fetch('http://localhost:5000/users/create', {
        method: "post",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" }
    })
    .then(res => res.json())
    .catch(err => { throw err });
}
