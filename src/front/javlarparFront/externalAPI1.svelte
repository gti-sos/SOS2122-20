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
    let prod=[];
    let AbsC=[];
    let RelC=[];
    let stats=[];
    let stats1=[];
    async function getCovid(){
        console.log("Fetching covid data...");
        const res1 = await fetch("/api/v1/agriculturalproduction-stats");
        const res = await fetch("https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/npm-covid-data/europe", {
            "method" : "GET",
            "headers":{
                "x-rapidapi-host": "vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com",
                "x-rapidapi-key": "32c0b6eb01msh02d19df1210c431p103d4ajsn9d32192863d4",
            }
        });
        if(res.ok&&res1.ok){
            const data = await res.json();
            const data1 = await res1.json();
            stats = data;
            console.log("Estadísticas recibidas: "+stats.length);
            stats.forEach(stat => {
                country.push(stat.Country);

                TC.push(parseInt(stat["TotalCases"]));
                Cases.push(parseInt(stat["ActiveCases"]));
                T.push(parseInt(stat["TotalTests"]));
                prod.push(0);
                AbsC.push(0);
                RelC.push(0);
                
            });
            stats1=data1;
            console.log("Estadísticas recibidas: "+stats1.length);
            stats1.forEach(stat =>{
                country.push(stat.country);

                prod.push(stat["production"]);
                AbsC.push(stat["absolute_change"]);
                RelC.push(stat["relative_change"]);
                TC.push(0);
                Cases.push(0);
                T.push(0);
            })
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
                        backgroundColor: "	#000000",
                        borderColor: "	#000000",
                        data: TC,
                    },
                    {
                        label: "Numero de Tests",
                        backgroundColor: "#0000FF",
                        borderColor: "#0000FF",
                        data: T,
                    },
                    {
                        label: "Produccion",
                        backgroundColor: "#FFFF00",
                        borderColor: "#FFFF00",
                        data: prod,
                    },
                    {
                        label: "Cambio Relativo",
                        backgroundColor: "#804000",
                        borderColor: "#804000",
                        data: RelC,
                    },
                    {
                        label: "Cambio Absoluto",
                        backgroundColor: "(64, 207, 255)",
                        borderColor: "(64, 207, 255)",
                        data: AbsC,
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
    <a href="/#/info" class="btn btn-primary btn-lg active" role="button" aria-pressed="true">Volver</a>

    <canvas id="myChart" />

</main>

<style>
    h2 {
        text-align: center;
    }
</style>