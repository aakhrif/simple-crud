<script lang="ts">
	import DataTable, { Head, Body, Row, Cell } from '@smui/data-table';
	import Checkbox from '@smui/checkbox';
	import Uploader from '../components/uploader.svelte';
	import Button, { Label } from '@smui/button';
	import { onMount } from 'svelte';

	type User = {
		id: number;
		firstName: string;
		lastName: string;
		isActive: boolean;
	};

	export let users: Array<User> = [];
	$: editUser = { firstName: '', lastName: '', isActive: false };
	let selected = ''; //users[0];
	let showingRow = false;

	onMount(async () => {
		users = await (await fetch('http://localhost:5173/api/users')).json();
	});

	function handleMultipleUpload(event: { detail: any }) {
		console.log('handleMultipleUpload returned urls ==> ', event.detail);
	}

	const createRecord = async () => {
		console.log('editUser', editUser);
		const res = await fetch('http://localhost:5173/api/users', {
			method: 'POST',
			body: JSON.stringify(editUser)
		});

		const json = await res.json();
		return JSON.stringify(json);
	};

	const deleteRecord = async (user: User) => {
		console.log('delete', user);
		return await fetch(`http://localhost:5173/api/users/${user.id}`, {
			method: 'DELETE',
		})
		.then((res) => res.json())
		.catch((error) => console.log(error))
	};

	const updateRecord = () => {
		console.log('update');
	};

	const addRow = () => {
		showingRow = true;
	};
</script>

<DataTable style="width: 100%;">
	<Head>
		<Row>
			<Cell checkbox>
				<Checkbox />
			</Cell>
			<Cell>Firstname</Cell>
			<Cell>Lastname</Cell>
			<Cell>isActive</Cell>
			<Cell>Actions</Cell>
		</Row>
	</Head>
	<Body>
		{#if showingRow}
			<Row>
				<Cell />
				<Cell><input bind:value={editUser.firstName} /></Cell>
				<Cell><input bind:value={editUser.lastName} /></Cell>
				<Cell><input bind:value={editUser.isActive} /></Cell>
				<Cell>
					<Button on:click={createRecord} variant="raised">
						<Label>Create</Label>
					</Button>
				</Cell>
			</Row>
		{/if}
		{#each users as user (user.id)}
			<Row>
				<Cell checkbox>
					<Checkbox bind:group={selected} value={user} valueKey={user.firstName} />
				</Cell>
				<Cell>{user.firstName}</Cell>
				<Cell>{user.lastName}</Cell>
				<Cell>{user.isActive}</Cell>
				<Cell>
					<Uploader multiple={true} on:upload={handleMultipleUpload} />
					<Button on:click={updateRecord} variant="raised">
						<Label>Update</Label>
					</Button>
					<Button on:click={() => deleteRecord(user)} variant="raised">
						<Label>Delete</Label>
					</Button>
				</Cell>
			</Row>
		{/each}
		<Row>
			<Cell span={9}></Cell>
			<Cell span={3}>
				<Button color="secondary" on:click={addRow} variant="raised">
					<Label>Add Row</Label>
				</Button>
			</Cell>
		</Row>
	</Body>
</DataTable>

<!-- <pre class="status">Selected: {selected.map((option) => option.name).join(', ')}</pre>
<pre class="status">Total: {selectedPrice}</pre> -->
