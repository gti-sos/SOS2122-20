<script>
    import{onMount} from 'svelte';
    import {pop} from 'svelte-spa-router';
    import {Table,Button} from 'sveltestrap';
    import{NavLink,NavItem,Nav
        } from 'sveltestrap';
    
    const API = "api/v1/agriculturalproduction-stats";
    export let params = {};
    let fertStat = {};
    let updCountry = "";
    let updYear = 0;
    let updProd = 0.;
    let updAbs = 0.;
    let updRel = 0.;
    
    onMount(getFerts);
    
    async function getFerts(){
        console.log("Fetching data...");
            const res = await fetch(API + "/" + params.country + "/" + params.year);
            if(res.ok){
                console.log("Ok:");
                const json = await res.json();
                fertStat = json;
                updCountry = fertStat.country;
                updYear = fertStat.year;
                updProd = fertStat['production'];
                updAbs = fertStat['absolute_change'];
                updRel = fertStat['relative_change'];
                console.log("Received data.");
            }else if(res.status ==404){
                console.log("ERROR. ");
            }else {   //res.status ===500)
                errorMsg = "No se ha podido acceder a la base de datos";
                console.log("ERROR. ");
            }        
        }
    
    async function updateFert(){
        console.log("Updating..." + params.country + " " + params.year );
        const res = await fetch(API + "/" + params.country + "/"+params.year,
        {
            method: "PUT",
            body : JSON.stringify({
                country:params.country,
                year : parseInt(params.year),
                production : updProd,
                absolute_change : updAbs,
                relative_change:updRel
            }),
            headers:{
                "Content-Type": "application/json"
            }
        }).then(function(res){
            if(res.ok){
                alert(`Modificado correctamente, con los nuevos datos : ${updProd},${updAbs},${updRel}`)
                getFerts();
            }
            else{
                alert("ERROR");
            }
        })
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
                        Anyo
                    </th>
                    <th>
                        Produccion
                    </th>
                    <th>
                        Diferencia absoluta
                    </th>
                    <th>
                        Diferencia relativa
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        {updCountry}
                    </td>
                    <td>
                        {updYear}
                    </td>
                    <td>
                        <input type="number" placeholder="0.00" min="0" bind:value = "{updProd}">
                    </td>
                    <td>
                        <input type="number" placeholder="0.00" min="0" bind:value = "{updAbs}">
                    </td>
                    <td>
                        <input type="number" placeholder="0.00" min="0" bind:value = "{updRel}">
                    </td>
    
                    <td>
                        <Button color="primary" on:click="{()=>updateFert()}">Actualizar</Button>
                    </td>
                </tr>
            </tbody>
            </Table>
            <Button on:click="{pop}">
                Volver
            </Button>
    </main>