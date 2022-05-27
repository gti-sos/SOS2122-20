<script>
    import { onMount } from 'svelte';
    let apiData = {};
    const delay = ms => new Promise(res => setTimeout(res,ms));
    let stats = [];
    let stats1 = [];
    let country= [];
    let year = [];
    let grazing_area = ["grazing_area"];
    let built_area = ["built_area"];
    let cropland_area = ["cropland_area"];

    let country1 = [];
    let year1 = [];
    let ages_fifty_seventy = ["ages_fifty_seventy"];
    let ages_seventy = ["ages_seventy"];
    let ages_zero_fifty = ["ages_zero_fifty"];

        
        
    async function getData(){
        const res = await fetch("https://sos2122-20.herokuapp.com/api/v1/landusage-stats");
        const res1 = await fetch ("https://sos2122-24.herokuapp.com/remoteAPI2");

        if(res.ok && res1.ok){
            const data = await res.json();
            stats = data;
            console.log("DATOS->",data);
            const data1 = await res1.json();
            console.log("DATOS->",data1);
            stats.forEach(stat => {
                country.push(stat.country);
                year.push(year);
                grazing_area.push(grazing_area);
                built_area.push(built_area);
                cropland_area.push(cropland_area);
            });
            stats1 = data1;
            stats1.forEach(stat => {
                country1.push(stat.country);
                year1.push(year);
                ages_fifty_seventy.push(ages_fifty_seventy);
                ages_seventy.push(ages_seventy);
                ages_zero_fifty.push(ages_zero_fifty);
            })
                
        }
        else{
            console.log("Hubo un error cargando los datos");
        }
        loadGraph();
        console.log("Comprobando");
    }

    async function loadGraph(){
        
    }


    onMount(getData);
</script>

<svelte:head>
    
</svelte:head>

<main>
    <h2>Integracion de API propia y API de Laura grupo 24</h2>
    <h4>Biblioteca: Chart.js</h4>
    <!--<button class="btn btn-primary hBack" type="button">Volver</button>
    <a href="/#/tennis" class="btn btn-primary hBack" role="button" >Volver</a> -->
    <a href="/#/agriculturalproduction-stats" class="btn btn-primary btn-lg active" role="button" aria-pressed="true">Volver</a>

    <canvas id="myChart" />

</main>

<style>
    h2 {
        text-align: center;
    }
    h4 {
        text-align: center;
    }
</style>