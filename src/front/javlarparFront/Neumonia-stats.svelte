<script>
    import { onMount } from 'svelte';
    let apiData = {};
    const delay = ms => new Promise(res => setTimeout(res,ms));
        let stats = [];
        let stats1=[];
        let country= [];
        let prod = ["production"];
        let AbsC = ["absolute_change"];
        let RelC = ["relative_change"]; 
        let seventy =["ages_seventy"];
        let fifty_seventy =["ages_fifty_seventy"];
        let zero_fifty =["ages_zero_fifty"];
        async function getData(){
            console.log("Fetching stats....");
            const res = await fetch("/api/v1/agriculturalproduction-stats");
            const res1= await fetch("/remoteAPI2");
            if(res.ok&&res1.ok){
                const data = await res.json();
                const data1= await res1.json();
                stats = data;
                console.log("Estadísticas recibidas: "+stats.length);
                //inicializamos los arrays para mostrar los datos
                stats.forEach(stat => {
                    country.push(stat.country+"-"+stat.year);
                    
                    prod.push(stat.production);
                    AbsC.push(stat.absolute_change);
                    RelC.push(stat.relative_change);
                    seventy.push(0);
                    fifty_seventy.push(0);
                    zero_fifty.push(0);
                              
                });
                stats1 = data1;
                console.log("Estadísticas recibidas: "+stats1.length);
                //inicializamos los arrays para mostrar los datos
                stats1.forEach(stat => {
                    country.push(stat.country+"-"+stat.year);
              
                    seventy.push(stat.ages_seventy);
                    fifty_seventy.push(stat.ages_fifty_seventy);
                    zero_fifty.push(stat.ages_zero_fifty); 
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
            type: "bar",
            data: {
                labels: country,
                datasets: [
                    {
                        label: "Muertes 0-50 años",
                        backgroundColor: "rgb(0, 128, 128)",
                        borderColor: "rgb(255, 255, 255)",
                        data: zero_fifty,
                    },
                    {
                        label: "Muertes 50-70 años",
                        backgroundColor: "rgb(255, 0 ,0)",
                        borderColor: "rgb(255, 255, 255)",
                        data: fifty_seventy,
                    },
                    {
                        label: "Muertes 70 años",
                        backgroundColor: "rgb(255, 255, 0)",
                        borderColor: "rgb(255, 255, 255)",
                        data: seventy,
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
            options: {},
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
    <h2>Integracion de API propia y API de Laura grupo 24</h2>
    <h4>Biblioteca: Chart.js</h4>
    <!--<button class="btn btn-primary hBack" type="button">Volver</button>
    <a href="/#/tennis" class="btn btn-primary hBack" role="button" >Volver</a> -->
    <a href="/#/agriculturalproduction-stats" class="btn btn-primary btn-lg active" role="button" aria-pressed="true">Volver</a>

    <canvas id="myChart" />

</main>

<style>
    h2 {
        text-align: center;
    }
    h4 {
        text-align: center;
    }
</style>