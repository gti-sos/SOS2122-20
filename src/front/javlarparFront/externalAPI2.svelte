<script>
    import {onMount} from 'svelte';
    import Button from 'sveltestrap/src/Button.svelte';
    const delay = ms => new Promise(res => setTimeout(res,ms));
    let n = [];
    let myChart;
    let Ri = [];
    let iD = [];
    let y=[];
    let stats=[];
    async function getStats(){
        console.log("Fetching covid data...");
        const res = await fetch("https://nfl-team-stats.p.rapidapi.com/v1/nfl-stats/teams/receiving-stats/offense/2019", {
            "method" : "GET",
            "headers":{
                'X-RapidAPI-Host': 'nfl-team-stats.p.rapidapi.com',
                'X-RapidAPI-Key': 'f2641d030amshc856ac658371061p1b3bdejsnd83db8cb00d8',
            }
        });
        if(res.ok){
            const data = await res.json();
            stats = data;
            console.log("Estadísticas recibidas: "+stats.length);
            stats.forEach(stat => {
                n.push(stat.name);

                Ri.push(parseInt(stat["receives"]));
                iD.push(parseInt(stat["touchdowns"]));
                
            });
        }
        else{
            console.log("Error");
        }
        await delay(500);
        loadGraph();
        console.log("Comprobando");
    }
    async function loadGraph() {
        Highcharts.chart('container', {
            chart: {
                type: 'area'
            },
            title: {
                text: 'Datos sobre NFL'
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
                    text: "Nombres",
                },
                categories: n,
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle'
            },
            
            series: [
                {
                name: 'Receives',
                data: Ri
                },
                {
                name: 'Touchdowns',
                data: iD
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
    onMount(getStats);
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
    <Button id='back' outline color="secondary" onclick="window.location.href='#/info'">Volver</Button>
        <div style="margin:auto;"> 
        <figure class="highcharts-figure">
            <div id="container"></div>
            <p class="highcharts-description">
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