<script>
    import{
        Alert,Button,NavLink,NavItem,Nav
    } from 'sveltestrap';
    import Table from 'sveltestrap/src/Table.svelte';
    import { onMount } from 'svelte';
    var data =[]
    async function getAPI1(){
        
        try {
            
            const res = await fetch("https://ghibliapi.herokuapp.com/films");
            console.log("hola");
            if(res.ok){
                const json = await res.json();
                data = await json;
               console.log(data);
                
            }
            else{
                console.log("ekldnjgkdeg");
            }
        } catch (error) {
            
            console.error(error);
        }
        return data;
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

    <h1 style="margin: mx-auto;">Ghibli
    </h1>
    <img src="https://i.pinimg.com/originals/b2/33/22/b23322f188faade322e3d6a1bab6bb33.jpg" alt="" width="400" height="300" style="border-radius: 2px;">
    
    {#await getAPI1()}
    loading
        {:then data}
        
        
        <Table bordered responsive>
            <thead>
                <tr>
                    <th>Titulo Original</th>
                    <th>Titulo</th>
                    <th>Rt Puntuacion</th>
                    <th>Fecha de Estreno</th>
                    <th>Director</th>
    
                </tr>
            </thead>

                {#each data as contact}
                <tbody>
                <td>{contact.original_title}</td>
    
                <td>{contact.title}</td>
    
                <td>{contact.rt_score}</td>
    
                <td>{contact.release_date}</td>
                <td>{contact.director}</td>      
            </tbody>
            {/each}
        </Table>
                
        <br>
        <br>
    {/await}
    </main>
    
