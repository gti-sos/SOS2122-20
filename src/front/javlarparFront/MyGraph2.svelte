<script>

    import { onMount } from 'svelte';
    import {Table,Button} from 'sveltestrap';
    import {pop} from 'svelte-spa-router';
    let apiData = {};
    
    const delay = ms => new Promise(res => setTimeout(res,ms));
        let stats = [];
        let country= [];
        let year = [];
        let prod = [];
        let AbsC = [];
        let RelC = []; 
        async function loadGraph(){
            console.log("Fetching stats....");
            const res = await fetch("/api/v1/agriculturalproduction-stats");
            if(res.ok){
                const data = await res.json();
                stats = data;
                console.log("Estadísticas recibidas: "+stats.length);
                //inicializamos los arrays para mostrar los datos
                stats.forEach(stat => {
                    country.push(stat.country+"-"+stat.year);
                    prod.push(stat["production"]);
                    AbsC.push(stat["absolute_change"]);
                    RelC.push(stat["relative_change"]);            
                });
            }else{
                console.log("Error cargando los datos");
            }
            console.log("Comprobando");
            Highcharts.chart('container', {
                chart: {
        type: 'bar'
    },
    title: {
        text: 'Stacked bar chart'
    },
    xAxis: {
        categories: country
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Total fruit consumption'
        }
    },
    legend: {
        reversed: true
    },
    plotOptions: {
        series: {
            stacking: 'normal'
        }
    },
        series: [
            {
            name: 'Produccion',
            data: prod
        },
        {   name: 'Cambio absoluto',
            data: AbsC},
        {   name:'Cambio relativo',
            data: RelC}
        ]
    });
    }
       
    //onMount(getPEStats);
    </script>
    <svelte:head>
    
    
        <script src="https://code.highcharts.com/highcharts.js"></script>
        <script src="https://code.highcharts.com/modules/exporting.js"></script>
        <script src="https://code.highcharts.com/modules/export-data.js"></script>
        <script src="https://code.highcharts.com/modules/accessibility.js" on:load="{loadGraph}"></script>
    
    
    </svelte:head>
    
    <main>
        <figure class="highcharts-figure">
            <div id="container"></div>
            <p class="highcharts-description">
               Gráfico column.
            </p>
        </figure>
        <Button on:click="{pop}">
            Volver
        </Button>
    </main>