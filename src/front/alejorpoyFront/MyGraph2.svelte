<script>

    import { onMount } from 'svelte';
    import c3 from "c3";
    import {Table,Button} from 'sveltestrap';
    import {pop} from 'svelte-spa-router';
    let apiData = {};
    const delay = ms => new Promise(res => setTimeout(res,ms));
        let stats = [];
        let country= [];
        let year = [];
        let quantity = ["quantity"];
        let absolute_change = ["absolute_change"];
        let relative_change = ["relative_change"]; 
        async function loadGraph(){
            console.log("Fetching stats....");
            const res = await fetch("/api/v1/fertilizers-stats");
            if(res.ok){
                const data = await res.json();
                stats = data;
                console.log("Estadísticas recibidas: "+stats.length);
                //inicializamos los arrays para mostrar los datos
                stats.forEach(stat => {
                    country.push(stat.country+"-"+stat.year);
                    year.push(stat.year);
                    quantity.push(stat.quantity);
                    absolute_change.push(stat.absolute_change);
                    relative_change.push(stat.relative_change);            
                });
            }else{
                console.log("Error cargando los datos");
            }
            console.log("Comprobando");
      
            var chart= c3.generate({
                bindto: '#chart',
    data: {
        
        columns: [
           quantity,
           absolute_change,
           relative_change
        ],
        type: 'spline'
    },
    axis:{
        x:{
            type:'category',
            categories:country
    
        }
        }
});
           
}
       
    //onMount(getPEStats);
    </script>
    <svelte:head>
    
        <!-- Load c3.css -->
        <link rel="stylesheet" href="./c3/c3.css"  >
        <script type="text/javascript" src="./d3/dist/d3.js"  ></script>
        <script type="text/javascript" src="./c3/c3.js" on:load="{loadGraph}"></script>
        
    
    </svelte:head>
    
    <main>
    
            <div id="chart"></div>
           <figure>
               Gráfico spline.
           </figure>
          
        <Button on:click="{pop}">
            Volver
        </Button>
    </main>