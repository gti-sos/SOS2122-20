<script>

    import { onMount } from 'svelte';
    import {Table,Button} from 'sveltestrap';
    import {pop} from 'svelte-spa-router';
    let apiData = {};
    
    const delay = ms => new Promise(res => setTimeout(res,ms));
        let stats = [];
        let country= [];
        let year = [];
        let production = [];
        let absolute_change = [];
        let relative_change = []; 
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
                    year.push(stat.year);
                    production.push(stat.production);
                    absolute_change.push(stat.absolute_change);
                    relative_change.push(stat.relative_change);            
                });
            }else{
                console.log("Error cargando los datos");
            }
        console.log("Comprobando");
        Highcharts.chart('container', {
    chart: {
        type: 'spline',
        inverted: true
    },
    title: {
        text: 'Produccion de cereales'
    },
        
    xAxis: {
        title: {
                    text: "País-Año",
                },
                categories: country,
                
    },
    yAxis: {
        title: {
            text: 'kilos'
        },
           
    },
    legend: {
        enabled: false
    },
    tooltip: {
        headerFormat: '<b>{series.name}</b><br/>',
        pointFormat: '{point.y}kilos'
    },
    plotOptions: {
        spline: {
            marker: {
                enable: false
            }
        }
    },
    series: [
        {
        name: 'Produccion',
        data: production
    },
    {   name: 'Cambio absoluto',
        data: absolute_change},
    {   name:'Cambio relativo',
        data: relative_change}
    ]});
    }
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
                Los gráficos de spline son gráficos de líneas suavizadas y este ejemplo
                muestra un gráfico de spline invertido. Invertir el gráfico significa que el eje X se coloca como el eje vertical y el eje Y se coloca como el eje horizontal. 
                Esto puede ser más intuitivo para ciertos conjuntos de datos, como en este gráfico donde el eje X representa la altitud vertical.
            </p>
        </figure>
        <Button on:click="{pop}">
            Volver
        </Button>
    </main>


    