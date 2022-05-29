<script>
	import Router from 'svelte-spa-router';
	import Home from './home.svelte';
	
	import MyGraph from './alejorpoyFront/MyGraph.svelte';
	import MyGraph2 from './alejorpoyFront/MyGraph2.svelte';
	import Integrations from './alejorpoyFront/Integrations.svelte';
	import Integrations2 from './alejorpoyFront/Integrations2.svelte';
	
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
	import UseVehiclesStats from './javlarparFront/UseVehiclesStats.svelte';
	import NeumoniaStats from './javlarparFront/Neumonia-stats.svelte';
	import Info from './Info.svelte';
	import ExternalApi2 from './javlarparFront/externalAPI2.svelte';
	import LandusageChart2 from './danpucjimFront/landusage_chart2.svelte';
import ExtApi from './danpucjimFront/extAPI.svelte';
import ExtApi1 from './danpucjimFront/extAPI1.svelte';
import CancerIntegration from './danpucjimFront/CancerIntegration.svelte';
import ExternalApi1 from './javlarparFront/externalAPI1.svelte';
import CaloryIntegration from './danpucjimFront/Integration2.svelte';




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
	'/fertilizers-stats/chart2':MyGraph2,
	'/fertilizers-stats/integration':Integrations,
	'/fertilizers-stats/integration2':Integrations2,
	'/GroupGraph':GroupGraph,
	'/agriculturalproduction-stats/chart':MyGraph_javlarpar,

	//DANPUCJIM ROUTES
	'/landusage-stats/:country/:year':EditLandusageStats,
	'/landusage-stats/chart2':LandusageChart2,
	'/landusage-stats/extAPI':ExtApi,
	'/landusage-stats/extAPI1':ExtApi1,
	'/landusage-stats/Integration1':CancerIntegration,
	'/landusage-stats/Integration2':CaloryIntegration,
	//ALJORPOY ROUTES
	'/fertilizers-stats/:country/:year': EditFertilizersStats,
	//JAVLARPAR ROUTES
	'/agriculturalproduction-stats/:country/:year':EditAgriculturalStats,

	//JAVLARPAR INTEGRACION
	'/integracion1':UseVehiclesStats,
	'/integracion2':NeumoniaStats,
	'/externalAPI1':ExternalApi1,
	'/externalAPI2':ExternalApi2
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
