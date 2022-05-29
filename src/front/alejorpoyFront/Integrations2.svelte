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
        let currency =["currency"];
        let percapita =["percapita"];
        let currentprices =["currentprices"];
        async function getData(){
            console.log("Fetching stats....");
            const res = await fetch("/api/v1/fertilizers-stats");
            const res1= await fetch("https://sos2122-25.herokuapp.com/api/v2/economies")
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
                    currency.push(0);
                    percapita.push(0);
                    currentprices.push(0);
                              
                });
                stats1 = data1;
                console.log("Estadísticas recibidas: "+stats1.length);
                //inicializamos los arrays para mostrar los datos
                stats1.forEach(stat => {
                    country.push(stat.country+"-"+stat.year);
              
                    currency.push(stat.currency);
                    percapita.push(stat.percapita);
                    currentprices.push(stat.currentprices); 
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
           currency,
           percapita,
           currentprices,
           
        ],
        type: 'area'
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
           
          
        <Button on:click="{pop}">
            Volver
        </Button>
    </main>