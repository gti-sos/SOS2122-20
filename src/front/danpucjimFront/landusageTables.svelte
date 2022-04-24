<script>
	import Table from "sveltestrap/src/Table.svelte";
    import {onMount} from 'svelte';
	import{
        Button,NavLink,NavItem,Nav
    } from 'sveltestrap';

	let pais,anyo; // pais y anyo de la busqueda
	let contacts = []; // lista de todos los contactos
	let newContact ={
		country:"",
		code: "",
		year: "",
		built_area:"",
		cropland_area:"",
		grazing_area:""
	}; // contacto a insertar 

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

	//Funciones paginacion

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

	//Funciones 
	async function getContacts(){
		search = false;
		console.log("Fetching Contacts ... ");
		const res =  await fetch("/api/v1/landusage-stats" + "?limit="+limit+"&offset="+offset);
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
		search = false;
		newContact.year = parseInt(newContact.year);
		newContact.built_area = parseFloat(newContact.built_area);
		newContact.cropland_area = parseFloat(newContact.cropland_area);
		newContact.grazing_area = parseFloat(newContact.grazing_area);
		console.log(typeof newContact.grazing_area);
		console.log("Inserting contact: " + JSON.stringify(newContact));
		const res = await fetch("/api/v1/landusage-stats",
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
		search = false;
		console.log("Deleting contacts... ");
		const res = await fetch("/api/v1/landusage-stats",
		{
			method:"DELETE"
		}).then(function(res){
			if(res.ok){
				alert("Borrada con exito");
			}
			else if(res.status == 500){
				alert("No se pudo acceder a la base de datos");
			}
			else if(res.status == 404){
				alert("Base de datos esta vacia");
			}
			getContacts();
		})
	}

	async function deleteContact(countryDelete,yearDelete){
		search = false;
		console.log("Deleting single contact... ");
		const res = await fetch("/api/v1/landusage-stats/" + countryDelete + "/"+ yearDelete,{
			method:"DELETE"
		}).then(function(res){
			if(res.ok){
			alert("Eliminado con exito");
		}
		else{
			alert("No se encontro el pais");
		}
			getContacts();
		}
		);
		
	}

	async function iniData(){
		search = false;
		console.log("Cargando Datos iniciales... "+ JSON.stringify(newContact));
		const res = await fetch("api/v1/landusage-stats/loadInitialData").then(function(res){
			if(res.ok){
				alert("Datos iniciados correctamente")
			}
			else{
				alert("No se pudo iniciar los datos");
			}
			getContacts();

		});

	}

	async function searchContact(country,year){
		offset = 0;
		const res = await fetch("api/v1/landusage-stats"+"/" + country + "/" + year);

		if(res.ok){
			console.log("Buscando data... ");
			search = true;
			const json =  await res.json();
			busqueda = json;
			console.log(busqueda);
			console.log(search);
			alert("Mostrando la busqueda");
		}
		else {
			alert("No se encontro el pais de la busqueda");
		}

	}
</script>
<svelte:head>
	<title>Landusage</title>
</svelte:head>
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
					<tr>
						<td>
							{busqueda.country}
						</td>
						<td>
							{busqueda.code}
						</td>
						<td>
							{busqueda.year}
						</td>
						<td>
							{busqueda.built_area}
						</td>
						<td>
							{busqueda.grazing_area}
						</td>
						<td>
							{busqueda.cropland_area}
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
				<td><input bind:value={newContact.year}></td>
				<td><input bind:value={newContact.built_area}></td>
				<td><input bind:value={newContact.cropland_area}></td>
				<td><input bind:value={newContact.grazing_area}></td>
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
