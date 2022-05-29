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
        const res = await fetch("/remoteAPIdanpucjim");
        const res1 = await fetch ("/CancerAPI");

        if(res.ok && res1.ok){
            const data = await res.json();
            stats = data;
            console.log("DATOS->",data);
            const data1 = await res1.json();
            console.log("DATOS->",data1);
            stats.forEach(stat => {
                if(stat.country == "Brazil"){
                    //country.push(stat.country);
                //year.push(stat.year);
                grazing_area.push(stat.grazing_area);
                built_area.push(stat.built_area);
                cropland_area.push(stat.cropland_area);
                }
                
            });
            stats1 = data1;
            stats1.forEach(stat => {
                if(stat.country == "brazil"){
                    //country1.push(stat.country);
                //year1.push(stat.year);
                ages_fifty_seventy.push(stat.ages_fifty_seventy);
                ages_seventy.push(stat.ages_seventy);
                ages_zero_fifty.push(stat.ages_zero_fifty);
                }
                
            })
                
        }
        else{
            console.log("Hubo un error cargando los datos");
        }
        console.log(ages_fifty_seventy);
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
    name: 'Integracion',
    colorByPoint: true,
    data: [{ 
      name: '>70',
      y: ages_seventy[1]
    }, {
      name: '>50<70',
      y: ages_fifty_seventy[1]
    }, {
      name: '<50',
      y: ages_zero_fifty[1]
    }, {
      name: 'Area Construida',
      y: built_area[1]
    }, {
      name: 'Area de pasto',
      y: grazing_area[1]
    }, {
      name: 'Area de cultivo',
      y: cropland_area[1]
    }]
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
