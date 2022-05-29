<script>

    import { onMount } from 'svelte';
    import * as c3 from "c3";
    import {Table,Button} from 'sveltestrap';
    import {pop} from 'svelte-spa-router';
    let apiData = {};
    const delay = ms => new Promise(res => setTimeout(res,ms));
        let stats = [];
        let stats1=[];
        let country= [];
        let year = [];
        let quantity = ["quantity"];
        let absolute_change = ["absolute_change"];
        let relative_change = ["relative_change"]; 
        let ages_seventy =["ages_seventy"];
        let ages_fifty_seventy =["ages_fifty_seventy"];
        let ages_zero_fifty =["ages_zero_fifty"];
        async function getData(){
            console.log("Fetching stats....");
            const res = await fetch("/api/v1/fertilizers-stats");
            const res1= await fetch("/remoteAPI");
            if(res.ok&&res1.ok){
                const data = await res.json();
                const data1= await res1.json();
                stats = data;
                console.log("Estadísticas recibidas: "+stats.length);
                //inicializamos los arrays para mostrar los datos
                stats.forEach(stat => {
                    country.push(stat.country+"-"+stat.year);
                    
                    quantity.push(stat.quantity);
                    absolute_change.push(stat.absolute_change);
                    relative_change.push(stat.relative_change);
                    ages_seventy.push(0);
                    ages_fifty_seventy.push(0);
                    ages_zero_fifty.push(0);
                              
                });
                stats1 = data1;
                console.log("Estadísticas recibidas: "+stats1.length);
                //inicializamos los arrays para mostrar los datos
                stats1.forEach(stat => {
                    country.push(stat.country+"-"+stat.year);
              
                    ages_seventy.push(stat.ages_seventy);
                    ages_fifty_seventy.push(stat.ages_fifty_seventy);
                    ages_zero_fifty.push(stat.ages_zero_fifty); 
                    quantity.push(0);
                    absolute_change.push(0);
                    relative_change.push(0);
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
           ages_seventy,
           ages_fifty_seventy,
           ages_zero_fifty,
           
        ],
        type: 'step'
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