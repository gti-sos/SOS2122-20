<script>

    import { onMount } from 'svelte';
    import * as c3 from "c3";
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
        async function getData(){
            console.log("Fetching stats....");
            const res = await fetch("/api/v1/fertilizers-stats");
         
            if(res.ok){
                const data = await res.json();
                stats = data;
                console.log("Estadísticas recibidas: "+stats.length);
                //inicializamos los arrays para mostrar los datos
                stats.forEach(stat => {
                    country.push(stat.country+"-"+stat.year);
                    
                    quantity.push(stat.quantity);
                    absolute_change.push(stat.absolute_change);
                    relative_change.push(stat.relative_change);
                    
                              
                });
                
            }else{
                console.log("Error cargando los datos");
            }
            loadGraph();
            console.log("Comprobando");
        }
             

    async function loadGraph(){
    
    
            var chart= c3.generate({
                bindto: '#chart',
    data: {
        
        columns: [
           quantity,
           absolute_change,
           relative_change,
          
           
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
           

       
    onMount(getData);
    </script>
    <svelte:head>
        <link rel="stylesheet" href="./c3/c3.css"  >

    </svelte:head>
    
    <main>
    
            <div id="chart"></div>
           <figure>
               Integración API fertilizers con API air-pollution-stats de Alicia grupo 24.
           </figure>
          
        <Button on:click="{pop}">
            Volver
        </Button>
    </main>