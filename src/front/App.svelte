<script>
	import Router from 'svelte-spa-router';
	import Home from './home.svelte';
	
	import MyGraph from './alejorpoyFront/MyGraph.svelte';
	import GroupGraph from './GroupGraph.svelte';
	import MyGraph_javlarpar from './javlarparFront/MyGraph_javlarpar.svelte';

	//import ContactsTable from './front/danpucjimFront/landusageTables.svelte';
	import landusage_charts from './danpucjimFront/landusage_charts.svelte';
	import FertilizersTables from './alejorpoyFront/fertilizersTable.svelte';
	import LandusageTables from './danpucjimFront/landusageTables.svelte';
	import ProductionTables from './javlarparFront/productionTable.svelte';
	import EditLandusageStats from './danpucjimFront/EditLandusageStats.svelte';
	import EditFertilizersStats from './alejorpoyFront/EditFertilizersStats.svelte';
	import EditAgriculturalStats from './javlarparFront/EditAgriculturalStats.svelte';
	import Info from './Info.svelte';



	/*console.log("HOLA");
	export let name; */
	const routes = {
	'/':Home,
	'/landusage-stats': LandusageTables,
	'/landusage-stats/chart':landusage_charts,
	'/fertilizers-stats': FertilizersTables,
	'/agriculturalproduction-stats': ProductionTables,
	'/info':Info,
	'/fertilizers-stats/chart':MyGraph,
	'/GroupGraph':GroupGraph,
	'/MyGraph_javlarpar':MyGraph_javlarpar,

	//DANPUCJIM ROUTES
	'/landusage-stats/:country/:year':EditLandusageStats,
	//ALJORPOY ROUTES
	'/fertilizers-stats/:country/:year': EditFertilizersStats,
	//JAVLARPAR ROUTES
	'/agriculturalproduction-stats/:country/:year':EditAgriculturalStats,
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
