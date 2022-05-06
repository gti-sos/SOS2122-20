
<script>

    import { onMount } from 'svelte';
    
    let apiData = {};
    
    const delay = ms => new Promise(res => setTimeout(res,ms));
        let stats = [];
        let country= [];
        let year = [];
        let grazing_area = [];
        let built_area = [];
        let cropland_area = []; 
        async function getStats(){
            console.log("Fetching stats....");
            const res = await fetch("/api/v1/landusage-stats");
            if(res.ok){
                const data = await res.json();
                stats = data;
                console.log("Estadísticas recibidas: "+stats.length);
                //inicializamos los arrays para mostrar los datos
                stats.forEach(stat => {
                    country.push(stat.country+"-"+stat.year);
                    year.push(stat.year);
                    grazing_area.push(stat.grazing_area);
                    built_area.push(stat.built_area);
                    cropland_area.push(stat.cropland_area);            
                });
            }else{
                console.log("Error cargando los datos");
            }
        }
    
    async function loadGraph(){
        Highcharts.chart('container', {
    chart: {
        type: 'bar'
    },
    title: {
        text: 'LandUsage Stats'
    },
    subtitle: {
        text: 'Source: <a href="https://en.wikipedia.org/wiki/World_population">Wikipedia.org</a>'
    },
    xAxis: {
        categories: country,
        title: {
            text: 'Paises'
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Population (millions)',
            align: 'high'
        },
        labels: {
            overflow: 'justify'
        }
    },
    tooltip: {
        valueSuffix: ' millions'
    },
    plotOptions: {
        bar: {
            dataLabels: {
                enabled: true
            }
        }
    },
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'top',
        x: -40,
        y: 80,
        floating: true,
        borderWidth: 1,
        backgroundColor:
            Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
        shadow: true
    },
    credits: {
        enabled: false
    },
    series: [{
        name: 'Area construida',
        data: built_area 
    }, {
        name: 'Area de cultivo',
        data: grazing_area
    }, {
        name: 'Area de pasto',
        data: cropland_area
    }]});
    }
    onMount(getStats);
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
                Los gráficos de tipo column son gráficos que muestarn barras rectangulares de forma horizontal. Este gráfico se encuentra invertido,
                invertir el gráfico significa que el eje X se coloca como el eje vertical y el eje Y se coloca como el eje horizontal. 
                Esto puede ser más intuitivo para ciertos conjuntos de datos, como en este gráfico donde el eje X representa la cantidad total.
            </p>
        </figure>
        
    </main>
    