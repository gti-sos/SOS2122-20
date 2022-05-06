
<script>

import { onMount } from 'svelte';

let apiData = {};

const delay = ms => new Promise(res => setTimeout(res,ms));
    let stats = [];
    let country= [];
    let year = [];
    let quantity = [];
    let absolute_change = [];
    let relative_change = []; 
    async function loadGraph(){
        console.log("Fetching stats....");
        const res = await fetch("/api/v1/fertilizers-stats");
        if(res.ok){
            const data = await res.json();
            stats = data;
            console.log("Estadísticas recibidas: "+stats.length);
            //inicializamos los arrays para mostrar los datos
            stats.forEach(stat => {
                country.push(stat.country+"-"+stat.year);
                year.push(stat.year);
                quantity.push(stat.quantity);
                absolute_change.push(stat.absolute_change);
                relative_change.push(stat.relative_change);            
            });
        }else{
            console.log("Error cargando los datos");
		}
        console.log("Comprobando");
        Highcharts.chart('container', {
    chart: {
        type: 'column',
        inverted: true
    },
    title: {
        text: 'Fertilizantes por paises'
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
        name: 'Cantidad de fertilizante',
        data: quantity
    },
    {   name: 'Cambio absoluto',
        data: absolute_change},
    {   name:'Cambio relativo',
        data: relative_change}
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
            Los gráficos de tipo column son gráficos que muestarn barras rectangulares de forma horizontal. Este gráfico se encuentra invertido,
            invertir el gráfico significa que el eje X se coloca como el eje vertical y el eje Y se coloca como el eje horizontal. 
            Esto puede ser más intuitivo para ciertos conjuntos de datos, como en este gráfico donde el eje X representa la cantidad total.
        </p>
    </figure>
    
</main>
