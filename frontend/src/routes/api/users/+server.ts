export async function GET() {
	try {
		const res = await fetch('http://localhost:5000/users');
		return res;
	} catch (Exception) {
		throw Exception;
	}
}

export async function POST({request}: {request: any}) {
	return await fetch('http://localhost:5000/users/create', {
        method: "post",
        body: JSON.stringify(await request.json()),
        headers: { "Content-Type": "application/json" }
    })
    .then(res => res.json())
    .catch(err => { throw err });
}