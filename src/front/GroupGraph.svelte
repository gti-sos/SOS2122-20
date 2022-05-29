<script>
  import {onMount} from'svelte';
  import {Button} from 'sveltestrap';
  //Belrodsal APi ----------------------------------------------------
  let data = [];
  let country_date = [];
  let q = [];
  let absC = [];
  let relC = [];
  async function getFertilizersStats() {
      console.log("Fetching stats....");
      const res = await fetch("/api/v1/fertilizers-stats");
      if (res.ok) {
          const data = await res.json();
          console.log("Estadísticas recibidas: " + data.length);
          data.forEach((stat) => {
              country_date.push(stat.country + "-" + stat.year);
              q.push(stat["quantity"]);
              absC.push(stat["absolute_change"]);
              relC.push(stat["relative_change"]);             
          });
          //loadGraph();
      } else {
          console.log("Error cargando los datos");
      }
  }
  
  let country_date1= [];
  let prod = [];
  let AbsC = [];
  let RelC = [];
  async function getProductionStats(){
      const loaData = await fetch("/api/v1/agriculturalproduction-stats/loadInitialData");
      if (loaData.ok) {
          const res = await fetch("/api/v1/agriculturalproduction-stats");
          console.log(res);
          if (res.ok) {
              const data = await res.json();
              console.log("Estadísticas recibidas: " + data.length);
              data.forEach((stat) => {
                  country_date1.push(stat.country + " " + stat.year);
                  prod.push(stat["production"]);
                  AbsC.push(stat["absolute_change"]);
                  RelC.push(stat["relative_change"]);             
              });
              loadGraph();
          } else {
              console.log("Error cargando los datos");
          }
      } else {
              console.log("Error cargando los datos iniciales");
          }
  }
  //-----------------------------------------
  let country_date2= [];
  let bui = [];
  let graz = [];
  let crop = [];
  async function getLandusageStats(){
      const loaData = await fetch("/api/v1/landusage-stats/loadInitialData");
      if (loaData.ok) {
          const res = await fetch("/api/v1/landusage-stats");
          console.log(res);
          if (res.ok) {
              const data = await res.json();
              console.log("Estadísticas recibidas: " + data.length);
              data.forEach((stat) => {
                  country_date2.push(stat.country + " " + stat.year);
                  bui.push(stat["built_area"]);
                  graz.push(stat["grazing_area"]);
                  crop.push(stat["cropland_area"]);             
              });
              loadGraph();
          } else {
              console.log("Error cargando los datos");
          }
      } else {
              console.log("Error cargando los datos iniciales");
          }
  }
  async function loadGraph(){
      Highcharts.chart('container', {
          chart:{
              polar:'true'
          },
          title: {
              text: 'Grafico grupal'
          },
          subtitle: {
              text: ''
          },
          yAxis: {
            min: 0
          },
          xAxis: {
              accessibility: {
                  title :{
                      text:'año',
                  },
                  labels: country_date.concat(country_date1 &&country_date2)
                  
                  
              
              }
          },
          legend: {
              layout: 'vertical',
              align: 'right',
              verticalAlign: 'middle'
          },
          plotOptions: {
        series: {
            pointStart: 0,
            pointInterval: 45
        },
        column: {
            pointPadding: 0,
            groupPadding: 0
        }
    },
          series: [{
                  type:'area',
                  name: 'Cantidad',
                  data: q
              },
              {
                  type:'area',
                  name: 'Cambio Absoluto-fertilizers',
                  data: absC
              },
              {
                  type:'area',
                  name: 'Cambio Relativo-fertilizers',
                  data: relC
              },
              {
                  type:'area',
                  name: 'Produccion',
                  data: prod
              },
              {
                  type:'area',
                  name: 'Cambio Absoluto-agricultura',
                  data: AbsC
              },
              {
                  type:'area',
                  name: 'Cambio Relativo-agricultura',
                  data: RelC
              },
              {
                  type:'area',
                  name: 'Built area',
                  data: bui
              },
              {
                  type:'area',
                  name: 'grazing-area',
                  data: graz
              },
              {
                  type:'area',
                  name:'cropland-area',
                  data: crop
              }
          
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
  onMount(getFertilizersStats);
  onMount(getProductionStats);
  onMount(getLandusageStats);
  
 
</script>
<main>

  <figure class="highcharts-figure">
      <div id="container"></div>
      <p class="highcharts-description">
      </p>
  </figure>
  <Button outline color="/#/info" href="/">Volver</Button>

</main>

<svelte:head>

  <script src="https://code.highcharts.com/highcharts.js"></script>
  <script src="https://code.highcharts.com/modules/series-label.js"></script>
  <script src="https://code.highcharts.com/modules/exporting.js"></script>
  <script src="https://code.highcharts.com/modules/export-data.js"></script>
  <script src="https://code.highcharts.com/modules/accessibility.js" on:load="{loadGraph}"></script>

</svelte:head>