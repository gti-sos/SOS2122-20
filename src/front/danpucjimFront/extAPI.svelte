<script>
    import{
        Alert,Button,NavLink,NavItem,Nav
    } from 'sveltestrap';
    import Table from 'sveltestrap/src/Table.svelte';
    import { onMount } from 'svelte';
    var data =[]
    async function getAPI1(){
        try {
            const res = await fetch("https://api.coinstats.app/public/v1/coins?skip=0&limit=5&currency=EUR");
            if(res.ok){
                const json = await res.json();
                data = await json;
                data = data.coins;
                //console.log("data -> "+JSON.stringify(json));
               console.log(data);
                
            }
        } catch (error) {
            console.error(error);
        }
        return data;
    }

//Funcion de la api 2 externa(no SOS)
    async function getAPI2(){

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

    <h1 style="margin: mx-auto;">Datos de Criptomonedas
    </h1>
    
    {#await getAPI1()}
    loading
        {:then data}
        
        
        <Table bordered responsive>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Rank</th>
                    <th>Volumen</th>
                    <th>Precio</th>
                    <th>Simbolo</th>
    
                </tr>
            </thead>

                {#each data as contact}
                <tbody>
                <td>{contact.name}</td>
    
                <td>{contact.rank}</td>
    
                <td>{contact.volume}</td>
    
                <td>{contact.price}</td>
                <td>{contact.symbol}</td>      
            </tbody>
            {/each}
        </Table>
                
        <br>
        <br>
    {/await}
    </main>
    
