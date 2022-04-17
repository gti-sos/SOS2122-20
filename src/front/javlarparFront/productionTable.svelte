<script>
    import {onMount} from 'svelte';
	let contacts = [];
	let p1;
	let loading = true;
	onMount(getContacts);
	async function getContacts(){
		console.log("Fetching Contacts ... ");
		const res =  await fetch("/api/v1/agriculturalproduction-stats");
		if(res.ok){
		const data =await res.json();
		contacts = data;
		p1 = contacts[0];
		console.log("Received Contacts" + JSON.stringify(contacts,null,2));
		}
		
	}
</script>
<main>
    {#await contacts}
	loading	
	{:then contacts} 
	<table>
		<thead>
			<tr>
				<th>
					Country
				</th>

				<th>
					year
				</th>
				<th>
					production
				</th>
				<th>
					absolute_change
				</th>
				<th>
					relative_change
				</th>
			</tr>
		</thead>
		<tbody>
			{#each contacts as contact}
			<tr>
				<td>
					{contact.country}
				</td>
				<td>
					{contact.year}
				</td>
				<td>
					{contact.production}
				</td>
				<td>
					{contact.absolute_change}
				</td>
				<td>
					{contact.relative_change}
				</td>
			</tr>
			{/each}
		</tbody>
	</table>
	{/await}
</main>

<style>
    table{
		margin-left: auto;
		margin-right: auto;
	}
	td{
		padding: 1em;
	}
</style>