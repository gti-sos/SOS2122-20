<script>
import {onMount} from'svelte';
  
  let apiData = [];
  const delay = ms => new Promise(res => setTimeout(res, ms));
  async function getData(){
      const res = await fetch("api/v1/agriculturalproduction-stats");
      if (res.ok){
          const json = await res.json();
          console.log("datos cargados..."+JSON.stringify(json));
          apiData = json;
          guardaD1(json);
          const res1 = await fetch("https://sos2122-21.herokuapp.com/api/v1/in-use-vehicles");
          if (res1.ok){    
              const json2 = await res1.json();
              apiData = json2;
              guardaD(json2);
              console.log("cargando el grafo con los datos nuevos"+apiData);
              await delay(1000);
              loadGraph();
          
          }else{
              console.log("Error en la peticion de los datos iniciales para el grafico");
              
          }
  
  }else{
      console.log("Error en la peticion de los datos iniciales para el grafico");
          
  }
}


    let prod = [];
    let AbsC = [];
    let RelC = [];
    async function guardaD1(json){
        for(let i = 0; i<json.length; i++){
                let aux = [];
                aux.push(json[i].year);
                aux.push(json[i].production);
                prod.push(aux);
                aux = [];
                aux.push(json[i].year);
                aux.push(json[i].absolute_change);
                AbsC.push(aux);
                
                aux = [];
                aux.push(json[i].year);
                aux.push(json[i].relative_change);
                RelC.push(aux);
            }
    }

    let use_com = [];
    let use_pass = [];
    let use_per_1000 = [];
    async function guardaD(json){
        for(let i = 0; i<json.length; i++){
                let aux = [];
                aux.push(json[i].year);
                aux.push(json[i].veh_use_com);
                use_com.push(aux);
                aux = [];
                aux.push(json[i].year);
                aux.push(json[i].veh_use_pass);
                use_pass.push(aux);
                
                aux = [];
                aux.push(json[i].year);
                aux.push(json[i].veh_use_per_1000);
                use_per_1000.push(aux);
            }
    }

    async function loadGraph(){
        Highcharts.chart('container', {
            chart: {
                type: 'areaspline'
            },
            title: {
                text: 'Integracion de los datos de registros de vehiculos y produccion de cereales'
            },
            legend: {
                layout: 'vertical',
                align: 'left',
                verticalAlign: 'top',
                x: 150,
                y: 100,
                floating: true,
                borderWidth: 1,
                backgroundColor:
                Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF'
            },
            xAxis: {
                accessibility: {
                    title :{
                        text:'año'
                    }
                
                }
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle'
            },
            plotOptions: {
                series: {
                    label: {
                        connectorAllowed: false
                    },
                    pointStart: 2017
                }
            },
            yAxis: {
                title: {
                    text: 'Values'
                }
            },
            tooltip: {
                shared: true,
                valueSuffix: ' units'
            },
            credits: {
                enabled: false
            },
            plotOptions: {
                areaspline: {
                    fillOpacity: 0.5
                }
            },
            series: [{
                name: 'Venta anual',
                data: use_com
            },
            {
                name: 'Ventas semanales',
                data: use_pass
            },
            {
                 name: 'Ventas por cada 1000 habitantes',
                data: use_per_1000
            },
            {
                name:"Produccion de cereal",
                data: prod
            },{
                name:"Cambio absoluto",
                data: AbsC
            },{
                name:"Cambio relativo",
                data: RelC
            }]
        });
        
    }
    onMount(getData);
   
   
</script>
<main>
    <figure class="highcharts-figure">
        <div id="container"></div>
        <p class="highcharts-description">
            Using an area-splitline graph.
            Intregracion de la API de CO2 propia y de la API registration de Antonio del grupo 21. 
            
        </p>
    </figure>

</main>

<svelte:head>

    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/series-label.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js"></script>

   

</svelte:head>