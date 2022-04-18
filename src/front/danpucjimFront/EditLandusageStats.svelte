<script>
    export let params = {};
    import {pop} from "svelte-spa-router";
    import {onMount} from 'svelte';
    import Button from 'sveltestrap/src/Button.svelte';
    import Table from 'sveltestrap/src/Table.svelte';

    let entry = {};

    let updatedCountry;
    let updatedYear;
    let updatedBuilt;
    let updatedCropland;
    let updatedGrazing;

    onMount(getContacts);

</script>

<main>
    <h1>Editar entrada "{params.country}"/"{params.year}"</h1>
    {#await entry}
    loading
        {:then entry}
        
    
        <Table bordered>
            <thead>
                <tr>
                    <th>Pais</th>
                    <th>Codigo</th>
                    <th>Anyo</th>
                    <th>Area Construida</th>
                    <th>Area de Pasto</th>
                    <th>Area de Cultivo</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{updatedCountry}</td>
                    <td>{params}</td>
                    <td>{updatedYear}</td>
                    <td><input bind:value="{params}"></td>
                    <td><input bind:value="{params}"></td>
                    <td><input bind:value="{params}"></td>
                    <td><Button outline color="primary">
                        Editar
                        </Button>
                    </td>
                </tr>
            </tbody>
        </Table>
    {/await}
    
    <Button outline color="secondary" on:click="{pop}">Volver</Button>

    </main>


