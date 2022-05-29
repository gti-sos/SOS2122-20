<script>
 
    import { onMount } from 'svelte';
       import * as c3 from "c3";
       import {Table,Button} from 'sveltestrap';
       import {pop} from 'svelte-spa-router';
       
       let stats = [];
       let stats1=[];
           let country= [];
           let year = [];
           let quantity = ["quantity"];
           let cas =["cases"];
           async function getData(){
               console.log("Fetching stats....");
               const res = await fetch("/api/v1/fertilizers-stats");
               const res1= await fetch("https://disease.sh/v2/countries")
               if(res.ok&&res1.ok){
                   const data = await res.json();
                   const data1= await res1.json();
                   stats = data;
                   console.log("Estadísticas recibidas: "+stats.length);
                   //inicializamos los arrays para mostrar los datos
                   stats.forEach(stat => {
                       country.push(stat.country+"-"+stat.year);  
                       quantity.push(stat.quantity);
                       cas.push(0);
                   });
                  
                   stats1 = data1;
                   console.log(stats1);
                   console.log("Estadísticas recibidas: "+stats1.length);
                   //inicializamos los arrays para mostrar los datos
                   
                 for(var i=0;i<10;i++){
                   
                       country.push(stats1[i].country);
                       cas.push(stats1[i].cases);
                       quantity.push(0);
       
                   };
               loadGraph();
           } else {
               console.log("Error cargando los datos");
           }
       }
       
       async function loadGraph(){
           var chart= c3.generate({
                   bindto: '#chart',
       data: {
           
           columns: [
               quantity,
               cas,
              
           ],
           type: 'scatter'
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
                  Integración externa en la que se ve el uso del fertilizante y los casos de enfermedades por país y año.
              </figure>
             
           <Button on:click="{pop}">
               Volver
           </Button>
       </main>