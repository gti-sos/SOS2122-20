<script>
    import{
        Button,NavLink,NavItem,Nav
    } from 'sveltestrap';
</script>
<svelte:head>
	<title>SOS2122-20</title>
	<meta name="robots" content="noindex nofollow" />
	<html lang="en" />
</svelte:head>
<main>

    <Nav class = "bg-light">
        <NavItem>
            <NavLink disabled id="nav-home" href="/">Home</NavLink>
        </NavItem>
        <NavItem>
            <NavLink id="nav-info" href="/#/info" style="text-decoration:none">Info</NavLink>
        </NavItem>
    </Nav>
    <h1>SOS2122-20</h1>
    <ul>
      <li><h5>Team</h5></li>  
      <ul>
          <li><a href="https://github.com/danpucjim">Daniel Puche Jiménez</a></li>
          <li><a href="https://github.com/alexjorge-04">Alejandro Jorge Poyuelo</a></li>
          <li><a href="https://github.com/javlarpar">Javier Lara Parrilla</a></li>
      </ul>
    </ul>

    <ul>
        <li><h5>Project description:</h5> Análisis de la variación del uso de tierras(edificadas,cultivo,pasto),abono, y producción del cereal a escala global.</li>
    </ul>

    <ul>
        <li>
            <h5>Repository: </h5>
            <a href="https://github.com/gti-sos/SOS2122-20">gti-sos/SOS2122-20</a>
        </li>
    </ul>

    <ul>
        <li>
            <h5>URL: </h5>
            <a href="http://sos2122-20.herokuapp.com"> http://sos2122-20.herokuapp.com
            </a>
        </li>
    </ul>


    <ul>
        <li>
            <h5>APIs: </h5>
            <ul>
                <li><a href="https://sos2122-20.herokuapp.com/api/v1/landusage-stats/docs">https://sos2122-20.herokuapp.com/api/v1/landusage-stats/docs (developed by Daniel Puche Jiménez)</a></li>
                <li><a href="https://sos2122-20.herokuapp.com/api/v1/fertilizers-stats/docs ">https://sos2122-20.herokuapp.com/api/v1/fertilizers-stats/docs  (developed by Alejandro Jorge Poyuelo)</a></li>
                <li><a href="https://sos2122-20.herokuapp.com/api/v1/agriculturalproduction-stats/docs">https://sos2122-20.herokuapp.com/api/v1/agriculturalproduction-stats/docs (developed by Javier Lara Parrilla)</a></li>
            </ul>
        </li>
    </ul>

    <ul>
        <li>
            <h5>Frontends: </h5>
            <ul>
                <li><a href="/#/landusage-stats">landusage-stats(developed by Daniel Puche Jiménez)</a></li>
                <li><a href="/#/fertilizers-stats">fertilizers-stats(developed by Alejandro Jorge Poyuelo)</a></li>
                <li><a href="/#/agriculturalproduction-stats">agriculturalprodductions-stats(developed by Javier Lara Parrilla)</a></li>
                
                
                
            </ul>
        </li>
    </ul>

</main>
