<script>
    import { onMount } from 'svelte';
    import Button from 'sveltestrap/src/Button.svelte';
    let apiData = {};
    const delay = ms => new Promise(res => setTimeout(res,ms));
        let stats = [];
        let stats1=[];
        let country= [];
        let prod = [];
        let AbsC = [];
        let RelC = []; 
        let use_com = [];
        let use_pass = [];
        let use_per_1000 = [];
        async function getData(){
            console.log("Fetching stats....");
            const res = await fetch("/api/v1/agriculturalproduction-stats");
            const res1= await fetch("https://sos2122-21.herokuapp.com/api/v1/in-use-vehicles")
            if(res.ok&&res1.ok){
                const data = await res.json();
                const data1= await res1.json();
                stats = data;
                console.log("Estadísticas recibidas: "+stats.length);
                //inicializamos los arrays para mostrar los datos
                stats.forEach(stat => {
                    country.push(stat.country+"-"+stat.year);
                    
                    prod.push(stat["production"]);
                    AbsC.push(stat["absolute_change"]);
                    RelC.push(stat["relative_change"]);
                    use_com.push(0);
                    use_pass.push(0);
                    use_per_1000.push(0);
                              
                });
                stats1 = data1;
                console.log("Estadísticas recibidas: "+stats1.length);
                //inicializamos los arrays para mostrar los datos
                stats1.forEach(stat => {
                    country.push(stat.country+"-"+stat.year);
              
                    use_com.push(stat["veh_use_comm"]);
                    use_pass.push(stat["veh_use_pass"]);
                    use_per_1000.push(stat["veh_use_per_1000"]); 
                    prod.push(0);
                    AbsC.push(0);
                    RelC.push(0);
                });
            }else{
                console.log("Error cargando los datos");
            }
            loadGraph();
            console.log("Comprobando");
        }


    async function loadGraph() {
        var ctx = document.getElementById("myChart").getContext("2d");
        var trace_olympic_gold_medals = new Chart(ctx, {
            type: "radar",
            data: {
                labels: country,
                datasets: [
                    {
                        label: "Vehículos comerciales en uso",
                        backgroundColor: "rgb(0, 128, 128)",
                        borderColor: "rgb(255, 255, 255)",
                        data: use_com,
                    },
                    {
                        label: "Vehículos de pasajeros en uso",
                        backgroundColor: "B695C0",
                        borderColor: "B695C0",
                        data: use_pass,
                    },
                    {
                        label: "Vehículos en uso por 1000 habitantes",
                        backgroundColor: "#FF0000",
                        borderColor: "#FF0000",
                        data: use_per_1000,
                    },
                    {
                        label: "Produccion",
                        backgroundColor: "#0000FF",
                        borderColor: "#0000FF",
                        data: prod,
                    },
                    {
                        label: "Cambio Absoluto",
                        backgroundColor: "#008000",
                        borderColor: "#008000",
                        data: AbsC,
                    },
                    {
                        label: "Cambio Relativo",
                        backgroundColor: "#ff8000",
                        borderColor: "#ff8000",
                        data: RelC,
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
    onMount(getData);
</script>

<svelte:head>
    <script
        src="https://cdn.jsdelivr.net/npm/chart.js"
        on:load={loadGraph}></script>
</svelte:head>

<main>
    <h2>Integracion de API propia y API de Antonio(grupo 21)</h2>
    <a href="/#/agriculturalproduction-stats" class="btn btn-primary btn-lg active" role="button" aria-pressed="true">Volver</a>

    <canvas id="myChart" />

</main>

<style>
    h2 {
        text-align: center;
    }
</style>