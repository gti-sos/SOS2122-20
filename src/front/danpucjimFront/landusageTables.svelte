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
	let loading = true;
	onMount(getContacts);
	async function getContacts(){
		console.log("Fetching Contacts ... ");
		const res =  await fetch("/api/v1/landusage-stats");
		if(res.ok){
		const data =await res.json();
		contacts = data;
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

	async function deleteContacts(){
		console.log("Deleting contacts... ");
		const res = await fetch("/api/v1/landusage-stats",
		{
			method:"DELETE"
		}).then(function(res){
			console.log("CAGADA");
			getContacts();
		})
	}

	async function deleteContact(countryDelete,yearDelete){
		console.log("Deleting single contact... ");
		const res = await fetch("/api/v1/landusage-stats/" + countryDelete + "/"+ yearDelete,{
			method:"DELETE"
		}).then(function(res){
			getContacts();
		})
	}

	async function iniData(){
		console.log("Cargando Datos iniciales... "+ JSON.stringify(newContact));
		const res = await fetch("api/v1/landusage-stats/loadInitialData").then(function(res){
			getContacts();
		});

	}
</script>
<main>
    {#await contacts}
	loading	
	{:then contacts} 
	<h1>Uso de Tierras Listado</h1>
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
				<td><Button color="danger" on:click="{deleteContact(contact.country,contact.year)}">Borrar</Button></td>
				<td><Button color="warning" on:click={function(){
					window.location.href = `/#/landusage-stats/${contact.country}/${contact.year}`;
				}}>Editar</Button></td>
			</tr>
			{/each}
		</tbody>
	</Table>
	{/await}
	<Button color="danger" on:click="{deleteContacts}">Eliminar Todo</Button>
	<Button color ="success" on:click="{iniData}">InitialData</Button>

</main>

<style>
</style>
