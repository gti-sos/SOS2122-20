<script>
import{onMount} from 'svelte';
import {pop} from 'svelte-spa-router';
import {Table,Button} from 'sveltestrap';
import{NavLink,NavItem,Nav
    } from 'sveltestrap';

const API = "api/v1/landusage-stats";
export let params = {};
let landStat = {};
let updCountry = "";
let updCode = "";
let updYear = 0;
let updCrop = 0.;
let updGrazing = 0.;
let updBuilt = 0.;

onMount(getLands);

async function getLands(){
    console.log("Fetching data...");
        const res = await fetch(API + "/" + params.country + "/" + params.date);
        if(res.ok){
            console.log("Ok:");
            const json = await res.json();
            lifeStat = json;
            updatedCountry = lifeStat.country;
            updatedDate = lifeStat.date;
            updatedQuality = lifeStat['quality_life_index'];
            updatedPurchasing = lifeStat['purchasing_power_index'];
            updatedSafety = lifeStat['safety_index'];
            console.log("Received data.");
        }else if(res.status ==404){
            errorMsg = "No se encuentra el dato a editar.";
            console.log("ERROR. " + errorMsg);
        }else {   //res.status ===500)
            errorMsg = "No se ha podido acceder a la base de datos";
            console.log("ERROR. " + errorMsg);
        }        
    }
</script>

<main>
    <Nav class = "bg-light">
        <NavItem>
            <NavLink id="nav-home" href="/" style="text-decoration:none">Home</NavLink>
        </NavItem>
        <NavItem>
            <NavLink id="nav-info" href="/#/info" style="text-decoration:none">Info</NavLink>
        </NavItem>
    </Nav>
    <h1 class="text-center">Editar</h1>
    <Table bordered class="text-center">
        <thead>
            <tr>
                <th>
                    Pais
                </th>
                <th>
                    Code
                </th>
                <th>
                    Anyo
                </th>
                <th>
                    Area Construida
                </th>
                <th>
                    Area de Cultivo
                </th>
                <th>
                    Area de pasto
                </th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>
                    {updCountry}
                </td>
                <td>
                    {updCode}
                </td>
                <td>
                    {updYear}
                </td>
                <td>
                    <input type="number" placeholder="0.00" min="0" bind:value = "{updBuilt}">
                </td>
                <td>
                    <input type="number" placeholder="0.00" min="0" bind:value = "{updCrop}">
                </td>
                <td>
                    <input type="number" placeholder="0.00" min="0" bind:value = "{updGrazing}">
                </td>
            </tr>
        </tbody>
    </Table>
    <Button on:click="{pop}">Volver</Button>
</main>


