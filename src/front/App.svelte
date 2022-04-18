<script>
	import Router from 'svelte-spa-router';
	import Home from './Home.svelte';

	//import ContactsTable from './front/danpucjimFront/landusageTables.svelte';
	import FertilizersTables from './alejorpoyFront/fertilizersTable.svelte';
	import LandusageTables from './danpucjimFront/landusageTables.svelte';
	import ProductionTables from './javlarparFront/productionTable.svelte';
	import EditLandusageStats from './danpucjimFront/EditLandusageStats.svelte';


	/*console.log("HOLA");
	export let name; */
	const routes = {
	'/':Home,
	'/landusage-stats': LandusageTables,
	'/fertilizers-stats': FertilizersTables,
	'/agriculturalproduction-stats': ProductionTables
};

</script>


<!--
<main>
	<h1>Hello {name}!</h1>
	<p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>
	<ContactsTable />
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
-->

<main>
	<Router {routes}/>
</main>
