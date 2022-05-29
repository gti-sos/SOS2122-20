
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
    let dailycalory = ["ages_fifty_seventy"];
    let dailygram = ["ages_seventy"];
    let caloryperperson = ["ages_zero_fifty"];
    async function getData(){
        //const res = await fetch("https://sos2122-20.herokuapp.com/api/v1/landusage-stats");
        const res = await fetch("/api/v1/landusage-stats");
        const res1 = await fetch ("/CaloryAPI");

        if(res.ok && res1.ok){
            const data = await res.json();
            stats = data;
            console.log("DATOS->",data);
            const data1 = await res1.json();
            console.log("DATOS->",data1);
            stats.forEach(stat => {
                if(stat.country == "Canada"){
                    //country.push(stat.country);
                //year.push(stat.year);
                grazing_area.push(stat.grazing_area);
            cropland_area.push(stat.cropland_area);
            built_area.push(stat.built_area);
        }});
            
            stats1 = data1;
            stats1.forEach(stat => {
                if(stat.country == "United_States"){
                    //country1.push(stat.country);
                //year1.push(stat.year);
                //year1.push(stat.year);
                dailycalory.push(stat.dailycalory);
                dailygram.push(stat.dailygram);
                caloryperperson.push(stat.caloryperperson);
                }
                
            });
            console.log(dailycalory[1]);
        }
        else{
            console.log("Hubo un error cargando los datos");}
        //console.log(datafinal);
        //await loadGraph();
        console.log("Comprobando");
        
        await loadGraph();
    }

    async function loadGraph() {
       Highcharts.chart('container', {
    chart: {
        type: 'packedbubble'
    },
    plotOptions: {
    packedbubble: {
      minSize: '30%',
      maxSize: '120%',
      zMin: 0,
      zMax: 1000,
      layoutAlgorithm: {
        splitSeries: false,
        gravitationalConstant: 0.02
      },
      dataLabels: {
        enabled: true,
        format: '{point.name}'
      }
    }
  },
    title: {
        text: 'Integracion de los datos de la api de uso de tierras con calorias'
    },
    subtitle: {
        text: ''
    },
    series: [{
    name: 'Integracion',
    colorByPoint: true,
    name: 'Calorias',
    data: [{ 
      name: 'Caloria por persona',
      value: caloryperperson[1]
    }, {
      name: 'Caloria diaria',
      value: dailycalory[1]
    }, {
      name: 'Gramos diarios',
      value: dailygram[1]
    }]
  },
{name: 'Uso de Tierras',
    data: [{
      name: 'Area Construida',
      value: built_area[1]
    }, {
      name: 'Area de pasto',
      value: grazing_area[1]
    }, {
      name: 'Area de cultivo',
      value: cropland_area[1]
    }]
  }]
}
);
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