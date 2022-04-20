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
		production:"",
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

	//Funciones 
	async function getContacts(){
		console.log("Fetching Contacts ... ");
		const res =  await fetch("/api/v1/agriculturalproduction-stats" + "?limit="+limit+"&offset="+offset);
		if(res.ok){
		const data =await res.json();
		contacts = data;
		console.log("Received Contacts" + JSON.stringify(contacts,null,2));
		}
		
	}

	async function insertContact(){
		console.log("Inserting contact: " + JSON.stringify(newContact));
		const res = await fetch("/api/v1/agriculturalproduction-stats",
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
		const res = await fetch("/api/v1/agriculturalproduction-stats",
		{
			method:"DELETE"
		}).then(function(res){
			console.log("CAGADA");
			getContacts();
		})
	}

	async function deleteContact(countryDelete,yearDelete){
		console.log("Deleting single contact... ");
		const res = await fetch("/api/v1/agriculturalproduction-stats/" + countryDelete + "/"+ yearDelete,{
			method:"DELETE"
		}).then(function(res){
			getContacts();
		})
	}

	async function iniData(){
		console.log("Cargando Datos iniciales... "+ JSON.stringify(newContact));
		const res = await fetch("api/v1/agriculturalproduction-stats/loadInitialData").then(function(res){
			getContacts();
		});

	}

	async function searchContact(country,year){
		offset = 0;
		const res = await fetch("api/v1/agriculturalproduction-stats"+"/" + country + "/" + year);

		if(res.ok){
			console.log("Buscando data... ");
			search = true;
			const json =  await res.json();
			busqueda = json;
			console.log(busqueda);
			console.log(search);
		}

	}

	function changePage(page,offset){
		console.log("Change page");
		console.log("Page" + page + "offset" + offset);
		last_page = Math.ceil(total/10);
		if(page !== current_page){
			current_offset = offset;
			current_page = page;
		}
		getContacts();
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
            <NavLink id="nav-info" href="/#/info" style="text-decoration:none">Eliminar Todo</NavLink>
        </NavItem>
		<NavItem>
            <NavLink id="nav-info" href="/#/info" style="text-decoration:none" class="text-succcess">Iniciar Datos</NavLink>
        </NavItem>
    </Nav>
    {#await contacts}
	loading	
	{:then contacts} 
	<h1 class="text-center">Produccion de cultivos listado</h1>

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
							Produccion
						</th>
						<th>
							Diferencia Absoluta
						</th>
						<th>
							Diferencia Relativa
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
							{busqueda.production}
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
					Produccion
				</th>
				<th>
					Diferencia Absoluta
				</th>
				<th>
					Diferencia Relativa
				</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><input bind:value="{newContact.country}"></td>
				<td><input bind:value="{newContact.year}"></td>
				<td><input bind:value="{newContact.production}"></td>
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
					{contact.production}
				</td>
				<td>
					{contact.absolute_change}
				</td>
				<td>
					{contact.relative_change}
				</td>
				<td><Button color="danger" on:click="{deleteContact(contact.country,contact.year)}">Borrar</Button></td>
				<td><Button color="warning" on:click={function(){
					window.location.href = `/#/agriculturalproduction-stats/${contact.country}/${contact.year}`;
				}}>Editar</Button></td>
			</tr>
			{/each}
		</tbody>
	</Table>
	<Pagination>
		<PaginationItem class = {current_page ===1 ? "disabled" : ""}>
			<PaginationLink
			previous
			id = "pagination-back"
			href="#/agriculturalproduction-stats"
			on:click={()=> changePage(current_page-1,offset-10)}/>
		</PaginationItem>
	</Pagination>
	<Button color="danger" on:click="{deleteContacts}">Eliminar Todo</Button>
	<Button color ="success" on:click="{iniData}">InitialData</Button>
	{/await}

	


</main>

<style>
</style>