import { json } from "@sveltejs/kit";

export async function DELETE({params}: {params: any}) {
	return await fetch(`http://localhost:5000/users/${params.slug}`, {
		method: "delete"
	})
	.then(res => { return json(res) })
    .catch(err => { throw err });
}