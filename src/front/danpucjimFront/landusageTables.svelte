<script>
	import Table from "sveltestrap/src/Table.svelte";
	import Button from "sveltestrap/src/Button.svelte";
    import {onMount} from 'svelte';
	let contacts = [];
	let newContact ={
		country:"",
		code: "",
		year: "",
		built_area:"",
		cropland_area:"",
		grazing_area:""
	};
	let p1;
	let loading = true;
	onMount(getContacts);
	async function getContacts(){
		console.log("Fetching Contacts ... ");
		const res =  await fetch("/api/v1/landusage-stats");
		if(res.ok){
		const data =await res.json();
		contacts = data;
		p1 = contacts[0];
		console.log("Received Contacts" + JSON.stringify(contacts,null,2));
		}
		
	}

	async function insertContact(){
		console.log("Inserting contact: " + JSON.stringify(newContact));
		const res = await fetch("/api/v1/landusage-stats",
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
					Codigo
				</th>
				<th>
					Anyo
				</th>
				<th>
					Area Construida
				</th>
				<th>
					Area de Pasto
				</th>
				<th>
					Area de cultivo
				</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><input bind:value="{newContact.country}"></td>
				<td><input bind:value="{newContact.code}"></td>
				<td><input bind:value="{newContact.year}"></td>
				<td><input bind:value="{newContact.built_area}"></td>
				<td><input bind:value="{newContact.cropland_area}"></td>
				<td><input bind:value="{newContact.grazing_area}"></td>
				<td><Button outline color="primary" on:click="{insertContact}">Insertar</Button></td>
			</tr>
			{#each contacts as contact}
			<tr>
				<td>
					{contact.country}
				</td>
				<td>
					{contact.code}
				</td>
				<td>
					{contact.year}
				</td>
				<td>
					{contact.built_area}
				</td>
				<td>
					{contact.grazing_area}
				</td>
				<td>
					{contact.cropland_area}
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
