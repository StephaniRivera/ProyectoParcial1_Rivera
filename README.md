# ProyectoParcial1_Rivera
Proyecto de la primera unidad de Programación Integrativa de Componentes WEB
Mi proyecto consiste en una aplicación web de un sistema de restaurante.

Lo que primero se realizo es la api-rest para eso use Node.js y MySQL, en la terminal abrí la carpeta donde quería crear la API y ingrese los comandos de:
```bash
     npm init
     npm i express
```

Una vez se haya concretado correctamente, es donde creo mi index.js el cúal se realizó las siguientes operaciones:

### **Gestión de Platos:**
- **GET /platos/**: Obtiene la lista de todos los platos registrados en la base de datos.
- **POST /platos/**: Crea un nuevo plato en la base de datos.
- **DELETE /platos/:id**: Elimina un plato de la base de datos según su ID.
- **PUT /platos/:id**: Actualiza un plato por su ID, permitiendo modificar su nombre y precio.

### **Gestión de Ingredientes**
- **GET /ingredientes**: Obtiene la lista de todos los ingredientes registrados en la base de datos.
- **POST /ingredientes/**: Crea un nuevo ingrediente con nombre y cantidad disponible.
- **DELETE /ingredientes/:id**: Elimina un ingrediente por su ID.
- **PUT /ingredientes/:id**: Actualiza un ingrediente por su ID, permitiendo modificar su nombre y cantidad disponible.

### **Gestión de Relación Ingredientes-Platos:**
- **GET /ingredientesplatos/**: Obtiene la lista de ingredientes utilizados en los platos, mostrando el nombre del plato y la cantidad de cada ingrediente usado.

Ya con todo esto creado es cuando comienzo a realizar mi proyecto.

CRUD de la tabla ingredientes y platos con Funciones de Actualización, Eliminación y Registro:

- **Crear**: Agregar nuevos registros.
- **Leer**: Visualizar los registros existentes.
- **Actualizar**: Modificar los registros mediante un formulario modal.
- **Eliminar**: Eliminar registros de la base de datos.

Aquí podremos visualizar una tabla con los ingredientes y platos registrados, permitiendo realizar operaciones de actualización, creación y eliminación.
Los usuarios pueden actualizar los campos de las tablas mediante un modal, o eliminar un registro de la base de datos, así como también agregar un registro nuevo. El formulario envía los datos a una API RESTful que almacena la información en una base de datos que elegí en este caso MySQL.

Se utiliza MySQL para gestionar las tablas Ingredientes, Platos, y IngredientesPlatos, permitiendo la integración entre los ingredientes y los platos, con su respectiva tabla la cual se va a encargar de romper la relación de muchos a muchos entre PLatos y Ingredientes esta se llama "ingredientesplatos".

Cabe recalacar que todo est se realizó utilizando Templates, Slots, Shadow DOM para encapsular el contenido y estilo y la API-REST mencionada anteriormente
