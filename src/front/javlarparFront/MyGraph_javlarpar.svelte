<script>
    import { onMount } from "svelte";
    import Button from 'sveltestrap/src/Button.svelte';
    const delay = ms => new Promise(res => setTimeout(res,ms));
        let data = [];
        let country_year= [];
        let production = [];
        let absolute_change = [];
        let relative_change = []; 
        async function getStats(){
            console.log("Fetching stats....");
            const res = await fetch("/api/v1/agriculturalproduction-stats");
            if(res.ok){
                const data = await res.json();
                console.log("Estadísticas recibidas: "+data.length);
                //inicializamos los arrays para mostrar los datos
                data.forEach((stat) => {
                    country_year.push(stat.country+"-"+stat.year);
                    production.push(stat["production"]);
                    absolute_change.push(stat["absolute_change"]);
                    relative_change.push(stat["relative_change"]);            
                });
                loadGraph();
            }else{
                console.log("Error cargando los datos");
            }
        }
        async function loadGraph(){
            var a = document.getElementById("myGraph").getContext("2d");
            var agri_prod = new Chart(a, {
                type: "line",
                data: {
                    labels: country_year,
                    datasets: [
                    {
                        label: 'Produccion',
                        data: production,
                        borderColor: "#0000FF",
                        backgroundColor: "#0000FF",
                    },
                    {
                        label: 'Diferencia Absoluta',
                        data: absolute_change,
                        borderColor: "#008000",
                        backgroundColor: "#008000",
                    },
                    {
                        label: 'Diferencia Relativa',
                        data: relative_change,
                        borderColor: "#ff8000",
                        backgroundColor: "#ff8000",
                    },
                ],
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                }
            },
        });
       
       
    }
    onMount(getStats);
            
</script>
    <svelte:head>
    
        <script
            src="https://cdn.jsdelivr.net/npm/chart.js"
            on:load={loadGraph}></script>
    
    
    </svelte:head>
    
    <main>
            <h4>Estadísticas sobre la producción de cereal</h4>
            <div></div>
           <canvas id="myGraph" />
           <h8>Biblioteca:Chart.js</h8>
           <Button color="outline-dark" on:click={function (){
            window.location.href = `/#/agriculturalproduction-stats`
               }}>Volver
       </Button>
    </main>

    <style>
        h2 {
            text-align: center;
        }
        h4 {
            text-align: center;
        }
    </style>