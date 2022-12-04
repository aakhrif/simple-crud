import { json } from "@sveltejs/kit";

export async function DELETE({params}: {params: any}) {
	return await fetch(`http://localhost:5000/users/${params.slug}`, {
		method: "delete"
	})
	.then(res => { return json(res) })
    .catch(err => { throw err });
}

export async function PUT({params, request}: {params: any, request: any}) {
	console.log('fooool', params)
	console.log('fooool', await request.json())
	return await fetch(`http://localhost:5000/users/${params.slug}`, {
		method: "put"
	})
	.then(res => { return json(res) })
    .catch(err => { throw err });
}