<script>
	import Table from "sveltestrap/src/Table.svelte";
    import {onMount} from 'svelte';
	import{
        Button,NavLink,NavItem,Nav,Pagination,PaginationItem,PaginationLink
    } from 'sveltestrap';

	let pais,anyo;
	let contacts = [];
	let newContact ={
		country:"",
		year: "",
		quantity:"",
		absolute_change:"",
		relative_change:""
	};

	let current_page = 1; // pagina actual
	let last_page = 1;
	let limit = 10; // limite de visualizacion
	let offset = 0; // offset actual
	let numDataPag = 0; // 
	let maxpag = false; // pagina maxima alcanzada

	let loading = true; // esta carganado
	let search = false; // se ha buscado
	let busqueda = {}; // objeto tras la busqueda
	
	onMount(getContacts);

	// Paginación

	async function antPag(){
		if(offset>=10){
			offset = offset-limit;
		}
		getContacts();
	}

	async function sigPag(){
		if(offset+limit > contacts.length){

		}
		else{
			offset = offset+limit;
			getContacts();
		}
		
	}

	// Funciones
	async function getContacts(){
		console.log("Fetching Contacts ... ");
		const res =  await fetch("/api/v1/fertilizers-stats"+ "?limit="+limit+"&offset="+offset);
		if(res.ok){
		const data =await res.json();
		contacts = data;
		console.log("Received Contacts" + JSON.stringify(contacts,null,2));
		}
		else{
			alert("Hubo un error al mostrar los contactos");
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
			if(res.ok){
				alert("Dato insertado con exito");
			}
			else{
				alert("No se pudo insertar el dato, comprueba que los datos son correctos o que no se repita");
			}
			getContacts();
		});
		console.log("done");
	}

	async function deleteContacts(){
		search=false;
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
		search=false;
		console.log("Deleting single contact... ");
		const res = await fetch("/api/v1/fertilizers-stats/" + countryDelete + "/"+ yearDelete,{
			method:"DELETE"
		}).then(function(res){
			if(res.ok){
			alert("Eliminado con exito");
		}
		else{
			alert("No se pudo eliminar");
		}
			getContacts();
		}
		);
		
	}

	async function iniData(){
		console.log("Cargando Datos iniciales... "+ JSON.stringify(newContact));
		const res = await fetch("api/v1/fertilizers-stats/loadInitialData").then(function(res){
			getContacts();
		});

	}

	async function searchContact(country,year){
		offset = 0;
		const res = await fetch("api/v1/fertilizers-stats"+"/" + country + "/" + year);

		if(res.ok){
			console.log("Buscando data... ");
			search = true;
			const json =  await res.json();
			busqueda = json;
			console.log(busqueda);
			console.log(search);
			alert("Mostrando la búsqueda");
		}

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
		<NavItem>
            <NavLink id="nav-info" href="#" style="text-decoration:none" on:click={deleteContacts}>Eliminar Todo</NavLink>
        </NavItem>
		<NavItem>
            <NavLink id="nav-info" href="#" style="text-decoration:none" class="text-succcess" on:click={iniData}>Iniciar Datos</NavLink>
        </NavItem>
    </Nav>
    {#await contacts}
	loading	
	{:then contacts} 
	<h1 class="text-center">Uso de Fertilizantes Listado</h1>

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
						<input bind:value="{pais}">
					</td>
					<td>
						<input bind:value="{anyo}">
					</td>
					<td>
						<Button outline color="primary" on:click="{searchContact(pais,anyo)}">Buscar</Button>
					</td>
				</tr>
			</thead>
		</Table>
		{#if search}
				<Table bordered class = "w-50 mx-auto">
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
					<tr>
						<td>
							{busqueda.country}
						</td>
						<td>
							{busqueda.year}
						</td>
						<td>
							{busqueda.quantity}
						</td>
						<td>
							{busqueda.absolute_change}
						</td>
						<td>
							{busqueda.relative_change}
						</td>

					</tr>
				</Table>
					
					{/if}
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
	<Button on:click={antPag}>
		Anterior
	</Button>
	<Button on:click={sigPag}>
		Siguiente
	</Button>
	{/await}
</main>

<style>
</style>