<script>
  import {onMount} from'svelte';
  import {Button} from 'sveltestrap';
  let data = [];
  let country_date = [];
  let q = [];
  let absC = [];
  let relC = [];
  let prod = [];
  let AbsC = [];
  let RelC = [];
  let bui = [];
  let graz = [];
  let crop = [];
  async function loadGraph() {
      console.log("Fetching stats....");
      const res = await fetch("/api/v1/fertilizers-stats");
      const res1 = await fetch("/api/v1/agriculturalproduction-stats");
      const res2 = await fetch("/api/v1/landusage-stats");
      if (res.ok) {
        const data = await res.json();
        const data1= await res1.json();
        const data2 = await res2.json();
          console.log("Estadísticas recibidas: " + data.length);
          data.forEach(stat => {
              country_date.push(stat.country + "-" + stat.year);
              q.push(stat["quantity"]);
              absC.push(stat["absolute_change"]);
              relC.push(stat["relative_change"]);
              prod.push(0);
              AbsC.push(0);
              RelC.push(0);
              bui.push(0);
              graz.push(0);
              crop.push(0);            
          });
          console.log("Estadísticas recibidas: "+data1.length);
          data1.forEach(stat1=>{
            country_date.push(stat1.country + "-" + stat1.year);
            prod.push(stat1["production"]);
            AbsC.push(stat1["absolute_change"]);
            RelC.push(stat1["relative_change"]); 
            bui.push(0);
            graz.push(0);
            crop.push(0); 
            q.push(0);
            absC.push(0);
            relC.push(0);
          });
          console.log("Estadísticas recibidas: "+data2.length);
          data2.forEach(stat2=>{
            country_date.push(stat2.country + "-" + stat2.year);
            bui.push(stat2["built_area"]);
            graz.push(stat2["grazing_area"]);
            crop.push(stat2["cropland_area"]);
            prod.push(0);
            AbsC.push(0);
            RelC.push(0);
            q.push(0);
            absC.push(0);
            relC.push(0);

          });
      } else {
          console.log("Error cargando los datos");
      }


  Highcharts.chart('container', {
    chart: {
        type: 'scatter'
    },
    title: {
        text: 'Grafico Grupal'
    },
    xAxis: {
        categories: country_date,
        title: {
            text: 'Pais y Año'
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Valores',
            align: 'high'
        },
        labels: {
            overflow: 'justify'
        }
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
        x: -70,
        y: 90,
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
                  name: 'Cantidad',
                  data: q
              },
              {
                  name: 'Cambio Absoluto-fertilizers',
                  data: absC
              },
              {
                  name: 'Cambio Relativo-fertilizers',
                  data: relC
              },
              {
                  name: 'Produccion',
                  data: prod
              },
              {
                  name: 'Cambio Absoluto-agricultura',
                  data: AbsC
              },
              {
                  name: 'Cambio Relativo-agricultura',
                  data: RelC
              },
              {
                  name: 'Built area',
                  data: bui
              },
              {
                  name: 'grazing-area',
                  data: graz
              },
              {
                  name:'cropland-area',
                  data: crop
              },
            ],
    });

}
  
  
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