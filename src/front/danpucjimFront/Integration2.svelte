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
    let caloryperperson = ["ages_fifty_seventy"];
    let dailygram = ["ages_seventy"];
    let dailycalory = ["ages_zero_fifty"];

        
        
    async function getData(){
        const res = await fetch("https://sos2122-20.herokuapp.com/api/v1/landusage-stats");
        const res1 = await fetch ("/CaloryAPI");

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
                dailycalory.push(stat.dailycalory);
                dailygram.push(stat.dailygram);
                caloryperperson.push(stat.caloryperperson);
                }
                
            })
            console.log(dailycalory);
                
        }
        else{
            console.log("Hubo un error cargando los datos");
        }
        //datafinal = [year,year1];
        //console.log(datafinal);
        //await loadGraph();
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
