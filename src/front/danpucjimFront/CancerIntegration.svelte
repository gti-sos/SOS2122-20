<script>
    import { onMount } from 'svelte';
    let apiData = {};
    const delay = ms => new Promise(res => setTimeout(res,ms));
    let stats = [];
    let stats1 = [];
    let datafinal =[];
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
        const res = await fetch("/remoteAPI1");
        const res1 = await fetch ("https://sos2122-24.herokuapp.com/remoteAPI2");

        if(res.ok && res1.ok){
            const data = await res.json();
            stats = data;
            console.log("DATOS->",data);
            const data1 = await res1.json();
            console.log("DATOS->",data1);
            stats.forEach(stat => {
                country.push(stat.country);
                year.push(stat.year);
                grazing_area.push(stat.grazing_area);
                built_area.push(stat.built_area);
                cropland_area.push(stat.cropland_area);
            });
            stats1 = data1;
            stats1.forEach(stat => {
                country1.push(stat.country);
                year1.push(stat.year);
                ages_fifty_seventy.push(stat.ages_fifty_seventy);
                ages_seventy.push(stat.ages_seventy);
                ages_zero_fifty.push(stat.ages_zero_fifty);
            })
                
        }
        else{
            console.log("Hubo un error cargando los datos");
        }
        datafinal = [year,year1];
        console.log(datafinal);
        await loadGraph();
        console.log("Comprobando");
    }

    async function loadGraph() {
       Highcharts.chart('container', {
    chart: {
        type: 'pie'
    },
    title: {
        text: 'Integracion de los datos de la api de uso de tierras con muerte por cancer'
    },
    subtitle: {
        text: ''
    },
    xAxis: {
        categories:datafinal 
        ,
        crosshair: true
    },
    yAxis: {
        min: 0,
        title: {
            text: ''
        }
    },
    series: [{
        name: 'Tierrras de Pasto',
        data: grazing_area
    }, {
        name: 'Tierras de cultivo',
        data: cropland_area
    }
    , {
        name: 'Muerte cancer 50-70',
        data: ages_fifty_seventy
    }
    , {
        name: 'Muerte cancer >70',
        data: ages_seventy
    }]
});
    }
</script>

<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
<script src="https://code.highcharts.com/highcharts-more.js"></script>
<script src="https://code.highcharts.com/modules/exporting.js"></script>
<script src="https://code.highcharts.com/modules/export-data.js"></script>
<script src="https://code.highcharts.com/modules/accessibility.js" on:load="{getData}"></script>
</svelte:head>

<main>
    <figure class="highcharts-figure">
        <div id="container"></div>
        <p class="highcharts-description">
            
        </p>
    </figure>
</main>
