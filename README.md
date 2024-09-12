# TIENDA

Una simulación del backend de una web de una tienda.
## Usa 
- nestjs para cada microservicio
- postgres como db (docker)
- jwt
- bcrypt 
- HttpModule para la comunicación entre microservicios
Hecha con microservicios divididos en:

## - gateway
El APIGateway para poder acceder a los diferentes microservicios, tiene todas las rutas y están documentadas con swagger en el endpoint /api

En este microservicio se maneja también la autenticación y la autorización para poder acceder a los endpoints de los otros microservicios. Se usa una JWTstrategy para la validación.

Tiene dos roles, "admin" y "user" al momento solo editables desde la db del microservicio "auth_service", para poder agregar,actualizar o eliminar productos se necesita tener el rol "admin".

El update y el delete de los usuarios solo lo puede hacer el usuario sobre sí mismo, ningún rol tiene habilitado esto para otros usuarios.

## - products
Microservicio en el que se realiza el CRUD en la db para los products que se mostrarán. (Solo admins pueden agregar, editar o eliminar productos)

## - principal-page
Microservicio para manejar la página principal, por el momento tiene los métodos GetAll y GetOne para obtener todos los productos y el producto según su ID enviado en la url.

## - auth_service
Microservicio para manejar la db de los usuarios, en este se crea el usuario en el endpoint /register.

También se hashea la password con bcrypt.

Al registrarse, o al loguerase devuelve un token hecho con jwt 

# To do
Dockerizar cada microservicio y crear una red interna para que el único punto de entrada sea el apigateway
Añadir lógica de compra de productos (reducir en la db la cantidad del producto comprado )
