<script>
    import{Card,CardBody,CardFooter,CardText,CardTitle,CardHeader,Button} from 'sveltestrap';
    import{NavLink,NavItem,Nav
    } from 'sveltestrap';
</script>
<svelte:head>
	<title>Info</title>
	<meta name="robots" content="noindex nofollow" />
	<html lang="en" />
</svelte:head>
    <main>
        <Nav class = "bg-light">
            <NavItem>
                <NavLink id="nav-home" href="/" sytle="text-decoration:none">Home</NavLink>
            </NavItem>
            <NavItem>
                <NavLink disabled id="nav-info" href="/#/info" style="text-decoration:none">Info</NavLink>
            </NavItem>
        </Nav>
        <div class="text-center">
            <h1 class="text-info">
                SOS2122-20
            </h1>
            <h2 class="mb-2">
                Miembros
            </h2>
            <h4>
                <a href="https://www.github.com/danpucjim">Daniel Puche Jimenez</a>
                - (danpucjim)
            </h4>
            <h4>
                <a href="https://www.github.com/alexjorge-04"> Alejandro Jorge Poyuelo</a>
                - (alexjorge-04)
            </h4>
            <h4>
                <a href="https://www.github.com/javlarpar">Javier Lara Parrilla</a>
                -(javlarpar)
            </h4>
    
            <h4 class="mt-4 mb-4">
                Repositorio: <a href="http://github.com/gti-sos/SOS2122-20">gti-sos/2122-20</a>
            </h4>
        </div>
        <Card class="w-50 mx-auto" id="carta">
            <CardHeader>
                <CardTitle class="text-center">
                    landusage-stats - (danpucjim)
                </CardTitle>
            </CardHeader>
                <CardBody class="text-center">
                    Analisis de la evolucion de area construida,area de cultivo y de pasto en distintos paises.
                    
                </CardBody>
                <CardFooter class="text-center">
                    <Button color="primary" on:click="{function(){
                        window.location.href = "/#/landusage-stats";
                    }}">Tabla</Button>
                    <Button color="primary" on:click="{function(){
                        window.location.href = "https://documenter.getpostman.com/view/19481666/Uyr7HyFn";
                    }}">Documentacion</Button>
                    <Button color="primary" on:click="{function(){
                        window.location.href = "/api/v1/landusage-stats";
                    }}">APIV1</Button>
                </CardFooter>
            
        </Card>
        <Card class="w-50 mx-auto mt-3" id="carta" >
            <CardHeader>
                <CardTitle class="text-center">
                    fertilizers-stats - (alexjorge-04)
                </CardTitle>
            </CardHeader>
                <CardBody class="text-center">
                    Analisis de la evolucion del uso de nitrógeno como fertilizante.
                    
                </CardBody>
                <CardFooter class="text-center">
                    <Button color="primary" on:click="{function(){
                        window.location.href = "/#/fertilizers-stats";
                    }}">Tabla</Button>
                    <Button color="primary" on:click="{function(){
                        window.location.href = "/#/fertilizers-stats";
                    }}">Documentacion</Button>
                    <Button color="primary" on:click="{function(){
                        window.location.href = "/#/fertilizers-stats";
                    }}">APIV1</Button>
                    <Button color="primary" on:click="{function(){
                        window.location.href = "/#/fertilizers-stats";
                    }}">APIV2</Button>
                </CardFooter>
            
        </Card>
        <Card class="w-50 mx-auto mt-3" id="carta">
            <CardHeader>
                <CardTitle class="text-center">
                    agriculturalproduction-stats - (javlarpar)
                </CardTitle>
            </CardHeader>
                <CardBody class="text-center">
                    Analisis de la evolucion de la produccion de cultivos en todo el mundo.
                    
                </CardBody>
                <CardFooter class="text-center">
                    <Button color="primary" on:click="{function(){
                        window.location.href = "/#/agriculturalproduction-stats";
                    }}">Tabla</Button>
                    <Button color="primary" on:click="{function(){
                        window.location.href = "/#/agriculturalproduction-stats";
                    }}">Documentacion</Button>
                    <Button color="primary" on:click="{function(){
                        window.location.href = "/#/agriculturalproduction-stats";
                    }}">APIV1</Button>
                    <Button color="primary" on:click="{function(){
                        window.location.href = "/#/agriculturalproduction-stats";
                    }}">APIV2</Button>
                </CardFooter>
            
        </Card>
    </main>


<style>
    h2{
        margin:auto;
    }
    a{
        text-decoration: none;
        color: rgb(57, 57, 57);
    }
</style>