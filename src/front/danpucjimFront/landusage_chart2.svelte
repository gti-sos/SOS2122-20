<script>

    import { onMount } from 'svelte';
    import "billboard.js/dist/theme/insight.css";
    import {Table,Button} from 'sveltestrap';
    import {pop} from 'svelte-spa-router';
    let apiData = {};
    const delay = ms => new Promise(res => setTimeout(res,ms));
        let stats = [];
        let country= [];
        let year = ["x"];
        let grazing_area = ["grazing_area"];
        let built_area = ["built_area"];
        let cropland_area = ["cropland_area"]; 

        async function loadGraph(){
            console.log("Fetching stats....");
            const res = await fetch("/api/v1/landusage-stats");
            if(res.ok){
                const data = await res.json();
                stats = data;
                console.log("Estadísticas recibidas: "+stats.length);
                //inicializamos los arrays para mostrar los datos
                stats.forEach(stat => {
                    country.push(stat.country+"-"+stat.year);
                    year.push(stat.year);
                    grazing_area.push(stat.grazing_area);
                    built_area.push(stat.built_area);
                    cropland_area.push(stat.cropland_area);           
                });
            }else{
                console.log("Error cargando los datos");
            }
            console.log("Comprobando");
            await delay(500);
      
            var chart = bb.generate({
  data: {
    x:"x"
  ,
    columns: [
      year,
      grazing_area,
      cropland_area,
      built_area
	
    ],
   
    types: {
      grazing_area: "area", // for ESM specify as: area()
      cropland_area: "area-spline",
      built_area: "area-spline" // for ESM specify as: areaSpline()
    }
  },
  bindto: "#chart"
});
    
setTimeout(function() {
	chart.load({
		columns: [
			grazing_area
		]
	});
}, 500);

console.log(grazing_area)
}
       
   onMount(loadGraph);
    </script>
    <svelte:head>
        <script src="https://d3js.org/d3.v6.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/billboard.js/3.4.1/billboard.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/billboard.js/3.4.1/billboard.min.css"></script>
        
    
    </svelte:head>
    
    <main>
    
            <div id="chart"></div>
           
          
        <Button on:click="{pop}">
            Volver
        </Button>
    </main>