<script lang="ts">
	import DataTable, { Head, Body, Row, Cell } from '@smui/data-table';
	import Checkbox from '@smui/checkbox';
	import Uploader from '../components/uploader.svelte';
	import Button, { Label } from '@smui/button';

	function handleMultipleUpload(event: { detail: any }) {
		console.log('handleMultipleUpload returned urls ==> ', event.detail);
	}

	const createRecord = () => {
		console.log('create')
	}

	const deleteAttachment = () => {
		console.log('delete')
	}

	$: selectedPrice = selected.reduce((total, option) => option.price + total, 0);

	let options = [
		{
			name: 'Broom',
			description: 'A wooden handled broom.',
			price: 15
		},
		{
			name: 'Dust Pan',
			description: 'A plastic dust pan.',
			price: 8
		},
		{
			name: 'Mop',
			description: 'A strong, durable mop.',
			price: 18
		},
		{
			name: 'Horse',
			description: "She's got some miles on her.",
			price: 83
		},
		{
			name: 'Bucket',
			description: 'A metal bucket.',
			price: 13
		}
	];
	let selected = [options[2]];
</script>

<DataTable style="width: 100%;">
	<Head>
		<Row>
			<Cell checkbox>
				<Checkbox />
			</Cell>
			<Cell>Name</Cell>
			<Cell>Description</Cell>
			<Cell numeric>Price</Cell>
			<Cell>Actions</Cell>
		</Row>
	</Head>
	<Body>
		{#each options as option (option.name)}
			<Row>
				<Cell checkbox>
					<Checkbox bind:group={selected} value={option} valueKey={option.name} />
				</Cell>
				<Cell>{option.name}</Cell>
				<Cell>{option.description}</Cell>
				<Cell numeric>{option.price}</Cell>
				<Cell>
					<Uploader multiple={true} on:upload={handleMultipleUpload} />
					<Button on:click={createRecord} variant="raised">
						<Label>Create</Label>
					</Button>
					<Button on:click={deleteAttachment} variant="raised">
						<Label>Delete</Label>
					</Button>
				</Cell>
			</Row>
		{/each}
	</Body>
</DataTable>

<pre class="status">Selected: {selected.map((option) => option.name).join(', ')}</pre>
<pre class="status">Total: {selectedPrice}</pre>
