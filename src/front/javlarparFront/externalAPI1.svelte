<script>
    import {onMount} from 'svelte';
    import{Nav, NavItem, NavLink } from "sveltestrap";
    const delay = ms => new Promise(res => setTimeout(res,ms));
    let covid = [];
    let country = [];
    let myChart;
    let TC = [];
    let Cases = [];
    let T= [];
    let stats=[];
    async function getCovid(){
        console.log("Fetching covid data...");
        const res = await fetch("https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/npm-covid-data/europe", {
            "method" : "GET",
            "headers":{
                "x-rapidapi-host": "vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com",
                "x-rapidapi-key": "32c0b6eb01msh02d19df1210c431p103d4ajsn9d32192863d4",
            }
        });
        if(res.ok){
            const data = await res.json();
            stats = data;
            console.log("Estadísticas recibidas: "+stats.length);
            stats.forEach(stat => {
                country.push(stat.Country);

                TC.push(parseInt(stat["TotalCases"]));
                Cases.push(parseInt(stat["ActiveCases"]));
                T.push(parseInt(stat["TotalTests"]));
                
            });
        }
        else{
            console.log("Error");
        }
        loadGraph();
        console.log("Comprobando");
    }
    async function loadGraph() {
        var ctx = document.getElementById("myChart").getContext("2d");
        let myChart;
        if(myChart){
            myChart.destroy();
        }
        myChart = new Chart(ctx, {
            type: "horizontalBar",
            data: {
                labels: country,
                datasets: [
                    {
                        label: "Casos Activos",
                        backgroundColor: "rgb(0, 128, 128)",
                        borderColor: "rgb(255, 255, 255)",
                        data: Cases,
                    },
                    {
                        label: "Casos Totales",
                        backgroundColor: "B695C0",
                        borderColor: "B695C0",
                        data: TC,
                    },
                    {
                        label: "Numero de Tests",
                        backgroundColor: "#FF0000",
                        borderColor: "#FF0000",
                        data: T,
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
        
    onMount(getCovid);
</script>

<svelte:head>
    <script
        src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.4.0/Chart.min.js"
        on:load={loadGraph}></script>
</svelte:head>

<main>
    <h2>API Externa (CovidStats)</h2>
    <a href="/#/agriculturalproduction-stats" class="btn btn-primary btn-lg active" role="button" aria-pressed="true">Volver</a>

    <canvas id="myChart" />

</main>

<style>
    h2 {
        text-align: center;
    }
</style>