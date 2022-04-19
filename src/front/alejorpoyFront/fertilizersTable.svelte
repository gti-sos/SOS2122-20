<script>
	import Table from "sveltestrap/src/Table.svelte";
    import {onMount} from 'svelte';
	import{
        Button,NavLink,NavItem,Nav
    } from 'sveltestrap';
	let contacts = [];
	let newContact ={
		country:"",
		year: "",
		quantity:"",
		absolute_change:"",
		relative_change:""
	};
	let loading = true;
	onMount(getContacts);
	async function getContacts(){
		console.log("Fetching Contacts ... ");
		const res =  await fetch("/api/v1/fertilizers-stats");
		if(res.ok){
		const data =await res.json();
		contacts = data;
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

	async function deleteContacts(){
		console.log("Deleting contacts... ");
		const res = await fetch("/api/v1/fertilizers-stats",
		{
			method:"DELETE"
		}).then(function(res){
			console.log("CAGADA");
			getContacts();
		})
	}

	async function deleteContact(countryDelete,yearDelete){
		console.log("Deleting single contact... ");
		const res = await fetch("/api/v1/fertilizers-stats/" + countryDelete + "/"+ yearDelete,{
			method:"DELETE"
		}).then(function(res){
			getContacts();
		})
	}

	async function iniData(){
		console.log("Cargando Datos iniciales... "+ JSON.stringify(newContact));
		const res = await fetch("api/v1/fertilizers-stats/loadInitialData").then(function(res){
			getContacts();
		});

	}
</script>
<main>
	<Nav class = "bg-light">
        <NavItem>
            <NavLink id="nav-home" href="/" style="text-decoration:none">Home</NavLink>
        </NavItem>
        <NavItem>
            <NavLink id="nav-info" href="/#/info" style="text-decoration:none">Info</NavLink>
        </NavItem>
    </Nav>
    {#await contacts}
	loading	
	{:then contacts} 
	<h1 class="text-center">Uso de Tierras Listado</h1>

	<div>
		<h2 class="text-center mt-5">
			Busqueda
		</h2>
		<Table bordered class="w-50 text-center mx-auto">
			<thead>
				<tr class="bg-light">
					<th>
						Pais
					</th>
					<th>
						Anyo
					</th>
				</tr>
				<tr>
					<td>
						<input bind:value="{newContact.country}">
					</td>
					<td>
						<input bind:value="{newContact.country}">
					</td>
					<td>
						<Button outline color="primary" on:click="{insertContact}">Buscar</Button>
					</td>
				</tr>
			</thead>
		</Table>
	</div>
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
				<td><Button color="danger" on:click="{deleteContact(contact.country,contact.year)}">Borrar</Button></td>
				<td><Button color="warning" on:click={function(){
					window.location.href = `/#/fertilizers-stats/${contact.country}/${contact.year}`;
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
