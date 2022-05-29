<script>
    import { onMount } from 'svelte';
  
       
       import {Table,Button} from 'sveltestrap';
       import {pop} from 'svelte-spa-router';
       
       let stats=[];
       let stats1=[];
       let quantity=[];
       let c=[];
       let hsc =[];
       let mp=[];
    async function getData(){
        console.log("Fetching covid data...");
       const res= await fetch("/api/v1/fertilizers-stats");
        const res1 = await fetch("https://soccer-games1.p.rapidapi.com/games/livegames", {
            "method" : "GET",
            "headers":{
                'X-RapidAPI-Host': 'soccer-games1.p.rapidapi.com',
                'X-RapidAPI-Key': '50d3d41c7dmsha1d98e11141b0d9p1baaf7jsnfe2b03a5f21d',
            }
        });
        if(res.ok && res1.ok){
            const data = await res.json();
                   
                   stats = data;
                   console.log("Estadísticas recibidas: "+stats.length);
                   //inicializamos los arrays para mostrar los datos
                   stats.forEach(stat => {
                       quantity.push(stat.quantity);
                       
                   });
                   
                   const data1= await res1.json();
                   stats1 = data1;
                   console.log(stats1);
                   console.log("Estadísticas recibidas: "+stats1.length);
                   //inicializamos los arrays para mostrar los datos
                   stats1.forEach(stat=>{
                    c.push(stat.country);
                    hsc.push(parseInt(stat["homeScore"]));
                    mp.push(parseInt(stat["minutesPlayed"]));

                   });
               loadGraph();
           } else {
               console.log("Error cargando los datos");
           }
       }
       async function loadGraph(){
        Highcharts.chart('container', {
            chart: {
                type: 'spline'
            },
            title: {
                text: 'Datos sobre el carbón'
            },
            subtitle: {
                text: 'Biblioteca: Highcharts'
            },
            yAxis: {
                title: {
                    text: 'Valor'
                }
            },
            xAxis: {
                title: {
                    text: "País",
                },
                categories: c,
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle'
            },
            
            series: [
                {
                name: 'minutesPlayed',
                data: mp
                },
                {
                name: 'homeScore',
                data: hsc
                },
                {
                name: 'quantity',
                data: quantity
                },
            ],
            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 500
                    },
                    chartOptions: {
                        legend: {
                            layout: 'horizontal',
                            align: 'center',
                            verticalAlign: 'bottom'
                        }
                    }
                }]
            }
        });
       
       
    }
    onMount(getData);
</script>

<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/series-label.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js"  on:load="{loadGraph}"></script>
    
   
</svelte:head>

<main>        
    <br>
    <br>
    <Button id='back' outline color="secondary" onclick="window.location.href='#/coalStatsTable'">Volver</Button>
        <div style="margin:auto;"> 
        <figure class="highcharts-figure">
            <div id="container"></div>
            <p class="highcharts-description">
              Grafico acerca de los datos del Carbón
            </p>
        </figure>  
    </main>
    
    
    <style>
        .highcharts-figure {
          min-width: 100%;
          max-width:100%;
          margin: 1em auto;
        }
        #container {
          height: 600px;
        }
        
    </style>