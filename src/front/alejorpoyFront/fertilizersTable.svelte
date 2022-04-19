<script>
	import Table from "sveltestrap/src/Table.svelte";
	import Button from "sveltestrap/src/Button.svelte";
    import {onMount} from 'svelte';
	let contacts = [];
	let newContact ={
		country:"",
		year: "",
		quantity:"",
		absolute_change:"",
		relative_change:""
	};
	let p1;
	let loading = true;
	onMount(getContacts);
	async function getContacts(){
		console.log("Fetching Contacts ... ");
		const res =  await fetch("/api/v1/fertilizers-stats");
		if(res.ok){
		const data =await res.json();
		contacts = data;
		p1 = contacts[0];
		console.log("Received Contacts" + JSON.stringify(contacts,null,2));
		}
		
	}

	async function insertContact(){
		console.log("Inserting contact: " + JSON.stringify(newContact));
		const res = await fetch("/api/v1/fertilizers-stats",
		{
			method: "POST",
			body: JSON.stringify(newContact),
			headers:{"Content-Type":"application/json"
		}
		}).then(function(res){
			getContacts();
		});
		console.log("done");
	}
</script>
<main>
    {#await contacts}
	loading	
	{:then contacts} 
	<Table bordered>
		<thead>
			<tr>
				<th>
					Pais
				</th>

				<th>
					Anyo
				</th>
				<th>
					Cantidad
				</th>
				<th>
					Diferencia absoluta
				</th>
				<th>
					Diferencia relativa
				</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><input bind:value="{newContact.country}"></td>
				<td><input bind:value="{newContact.year}"></td>
				<td><input bind:value="{newContact.quantity}"></td>
				<td><input bind:value="{newContact.absolute_change}"></td>
				<td><input bind:value="{newContact.relative_change}"></td>
				<td><Button outline color="primary" on:click="{insertContact}">Insertar</Button></td>
			</tr>
			{#each contacts as contact}
			<tr>
				<td>
					{contact.country}
				</td>
				<td>
					{contact.year}
				</td>
				<td>
					{contact.quantity}
				</td>
				<td>
					{contact.absolute_change}
				</td>
				<td>
					{contact.relative_change}
				</td>
			</tr>
			{/each}
		</tbody>
	</Table>
	{/await}
</main>


<main>

</main>

<style>
</style>
