<script>
  import { Nav, NavItem, NavLink } from "sveltestrap";
  const BASE_CONTACT_API_PATH_v2 = "/api/v1";
  let quantityData = [];
  let quantityChartData = [];
  let builtAData = [];
  let builtAChartData = [];
  let productionData = [];
  let productionChartData = [];
  var dates = [];
  let msg = "";
  /**
   * Obtenemos una propiedad JSON sin repetidos
   * @param MYJSON
   * @param prop
   */
  function distinctRecords(MYJSON, prop) {
    return MYJSON.filter((obj, pos, arr) => {
      return arr.map((mapObj) => mapObj[prop]).indexOf(obj[prop]) === pos;
    });
  }
  async function loadChart() {
    console.log("Fetching data...");
    //Cargamos los datos de las APIs
    await fetch(BASE_CONTACT_API_PATH_v2 + "/fertilizers-stats/loadInitialData");
    await fetch(BASE_CONTACT_API_PATH_v2 + "/landusage-stats/loadInitialData");
    await fetch(BASE_CONTACT_API_PATH_v2 + "/agriculturalproduction-stats/loadInitialData");
    //Obtenemos los datos de las APIs
    const res = await fetch(BASE_CONTACT_API_PATH_v2 + "/fertilizers-stats");
    const res1 = await fetch(BASE_CONTACT_API_PATH_v2 + "/landusage-stats");
    const res2 = await fetch(BASE_CONTACT_API_PATH_v2 + "/agriculturalproduction-stats");
    if (res.ok && res1.ok && res2.ok) {
      
      console.log("procesing landusage data....");
      if (res1.ok) {
        builtAData = await res1.json();
        console.log("RES OK");
        //Quitamos fechas repetidas 
        var distinctDates1 = distinctRecords(builtAData, "year");
        //y las ordenamos
        distinctDates1.sort(function (a, b) {
          return a.year - b.year;
        });
        //guardamos las fechas para la grafica
        distinctDates1.forEach((element) => {
          dates.push(element.year);
        });
        
        //Sumamos los valores para las fechas iguales
        dates.forEach((e) => {
          var yAxis = builtAData
            .filter((d) => d.year === e)
            .map((dr) => dr["built-area"])
            .reduce((acc, dr) => dr + acc);
          
          builtAChartData.push(Math.round(yAxis));
        });
        msg = "";
      }
      console.log("procesing fertilizers data....");
      if (res.ok) {
        quantityData = await res.json();
        console.log("RES OK");
        
        //Quitamos fechas repetidas 
        var distinctDates = distinctRecords(quantityData, "year");
        //y las ordenamos
        distinctDates.sort(function (a, b) {
          return a.year - b.year;
        });
        //Añadimos las fechas que no existen
        distinctDates.forEach((element) => {
          if (!dates.includes(element.year)) {
            dates.push(element.year);
          }
        });
        
        //Sumamos los valores para las fechas iguales
        dates.forEach((e) => {
          var yAxis = quantityData
            .filter((d) => d.year === e)
            .map((nr) => nr["quantity"])
            .reduce((acc, nr) => nr + acc, 0);
          quantityChartData.push(Math.round(yAxis));
        });
        msg = "";
      }
      console.log("procesing Agricultural Production data....");
      if (res2.ok) {
        productionData = await res2.json();
        console.log("RES2 OK");
        //Quitamos fechas repetidas 
        var distinctDates = distinctRecords(productionData, "year");
         //y las ordenamos
        distinctDates.sort(function (a, b) {
          return a.year - b.year;
        });
         //Añadimos las fechas que no existen
        distinctDates.forEach((element) => {
          if (!dates.includes(element.year)) {
            dates.push(element.year);
          }
        });
        //Sumamos los valores para las fechas iguales
        dates.forEach((e) => {
          var yAxis = productionData
            .filter((d) => d.year === e)
            .map((qli) => qli["production"])
            .reduce((acc, qli) => qli + acc, 0);
          productionChartData.push(Math.round(yAxis));
        });
        msg = "";
      }
    } else {
      console.log("ERROR "+msg);
      msg = "Por favor primero cargue los datos en todas las APIs";
    }
    //Creamos la grafica
    Highcharts.chart("container", {
      chart: {
        type: "bar",
      },
      title: {
        text: "Integración de grupo",
      },
      yAxis: {
        title: {
          text: "Cantidad",
        },
      },
      xAxis: {
        title: {
          text: "Años",
        },
        categories: dates,
      },
      legend: {
        layout: "vertical",
        align: "right",
        verticalAlign: "middle",
      },
      annotations: [
        {
          labels: [
            {
              point: "year",
              text: "",
            },
            {
              point: "min",
              text: "Min",
              backgroundColor: "white",
            },
          ],
        },
      ],
      series: [
        {
          name: "Area Construida",
          data: builtAChartData,
        },
        {
          name: "Cantidad de fertilizante",
          data: quantityChartData,
        },
        {
          name: "Produccion de cereal",
          data: productionChartData,
        },
      ],
      responsive: {
        rules: [
          {
            condition: {
              maxWidth: 500,
            },
            chartOptions: {
              legend: {
                layout: "horizontal",
                align: "center",
                verticalAlign: "bottom",
              },
            },
          },
        ],
      },
    });
  }
</script>

<svelte:head>
  <script src="https://code.highcharts.com/highcharts.js"></script>
  <script src="https://code.highcharts.com/modules/series-label.js"></script>
  <script src="https://code.highcharts.com/modules/exporting.js"></script>
  <script src="https://code.highcharts.com/modules/export-data.js"></script>
  <script
    src="https://code.highcharts.com/modules/accessibility.js"
    on:load={loadChart}></script>
</svelte:head>

<main>
  <Nav>
    <NavItem>
      <NavLink id="nav_home" href="/">Home</NavLink>
    </NavItem>
    <NavItem>
      <NavLink id="nav_info" href="/#/info">Info</NavLink>
    </NavItem>
  </Nav>

  <div>
    <h1>Gráfico</h1>
  </div>

  {#if msg}
    <p>{msg}</p>
  {:else}
    <figure class="highcharts-figure">
      <div id="container" />
      <p class="highcharts-description">
      </p>
    </figure>
  {/if}
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    margin: 0 auto;
  }
  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }
  .highcharts-figure,
.highcharts-data-table table {
  min-width: 360px;
  max-width: 800px;
  margin: 1em auto;
}
.highcharts-data-table table {
  font-family: Verdana, sans-serif;
  border-collapse: collapse;
  border: 1px solid #ebebeb;
  margin: 10px auto;
  text-align: center;
  width: 100%;
  max-width: 500px;
}
.highcharts-data-table caption {
  padding: 1em 0;
  font-size: 1.2em;
  color: #555;
}
.highcharts-data-table th {
  font-weight: 600;
  padding: 0.5em;
}
.highcharts-data-table td,
.highcharts-data-table th,
.highcharts-data-table caption {
  padding: 0.5em;
}
.highcharts-data-table thead tr,
.highcharts-data-table tr:nth-child(even) {
  background: #f8f8f8;
}
.highcharts-data-table tr:hover {
  background: #f1f7ff;
}
</style>