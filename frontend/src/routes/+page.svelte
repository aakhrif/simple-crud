<script lang="ts">
	import DataTable, { Head, Body, Row, Cell } from '@smui/data-table';
	import Checkbox from '@smui/checkbox';
	import Uploader from '../components/uploader.svelte';
	import Button, { Label } from '@smui/button';
	import { onMount } from 'svelte';

	type User = {
		id: number,
		firstName: string,
		lastName: string,
		isActive: boolean
	}

	export let users: Array<User> = [];
	$: editUser = {firstName: '', lastName: '', isActive: false};
	onMount( async () => {
		
		users = await (await fetch('http://localhost:5173/api/users')).json();
	});

	function handleMultipleUpload(event: { detail: any }) {
		console.log('handleMultipleUpload returned urls ==> ', event.detail);
	}
	
	const createRecord = async () => {
		console.log('editUser', editUser)
		const res = await fetch('http://localhost:5173/api/users', {
			method: 'POST',
			body: JSON.stringify({
				firstName: editUser.firstName,
				lastName: editUser.lastName,
				isActive: editUser.isActive
			})
		})
		
		const json = await res.json()
		return JSON.stringify(json)
	}

	const deleteAttachment = () => {
		console.log('delete')
	}

	let showingRow = false;

	const addRow = () => {
		showingRow = true
	}

	

	let selected = ''//users[0];
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
			<Cell></Cell>
			<Cell> <input bind:value={editUser.firstName}/></Cell>
			<Cell> <input bind:value={editUser.lastName}/></Cell>
			<Cell> <input bind:value={editUser.isActive}/></Cell>
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
				<Cell >{user.isActive}</Cell>
				<Cell>
					<Uploader multiple={true} on:upload={handleMultipleUpload} />
					<Button on:click={() => console.log("todo")} variant="raised">
						<Label>Create</Label>
					</Button>
					<Button on:click={deleteAttachment} variant="raised">
						<Label>Delete</Label>
					</Button>
					<Button on:click={() => console.log("todo")} variant="raised">
						<Label>Show users</Label>
					</Button>
				</Cell>
			</Row>
		{/each}
	</Body>
	<Button on:click={addRow} variant="raised">
		<Label>Add Row</Label>
	</Button>
</DataTable>

<!-- <pre class="status">Selected: {selected.map((option) => option.name).join(', ')}</pre>
<pre class="status">Total: {selectedPrice}</pre> -->
