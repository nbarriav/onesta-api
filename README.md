# API para prueba técnica Onesta

## Instalación

Para instalar las dependencias del proyecto, ejecutar el siguiente comando:

`yarn install`

## Ejecución

Para ejecutar el proyecto, ejecutar el siguiente comando:

`yarn dev`

Esto hará que la base de datos se cree y se sincronice con los modelos definidos en el proyecto.

## Endpoints

Se compartió una collection de Postman, la cual se encuentra en la carpeta `/docs` del proyecto. Igualmente, se darán a conocer los endpoints a continuación:

### Crear una fruta (POST) (/fruits)

Para crear una fruta, se debe enviar un objeto JSON con la siguiente estructura:

```json
{
  "name": "apple",
  "variety": "small"
}
```

### Crear un agricultor (POST) (/farmers)

```json
{
  "name": "Farmer name",
  "lastName": "Farmer last name",
  "email": "farmer@email.com"
}
```

### Crear un campo (POST) (/fields)

Para este endpoint es necesario enviar el email del agricultor al que se le asignará el campo.

```json
{
  "name": "Field name",
  "location": "Field location",
  "farmerEmail": "farmer@email.com"
}
```

### Crear cliente (POST) (/clients)

Para crear un cliente es necesario que exista un agricultor con el email que se envía en el objeto JSON.

```json
{
  "name": "Client name",
  "lastName": "Client last name",
  "email": "client@email.com",
  "farmerEmail": "farmer@email.com"
}
```

### Crear una cosecha (POST) (/harvests)

Para este endpoint es necesario enviar un archivo csv como el que se envío en la tarea. El archivo debe tener de nombre en la request de `csvFile`

# Aspectos a mejorar

- Mejora en mensajes de error para un mejor feedback para el usuario.

- Mejora en el orden del código. Hay algunos archivos que tienen código que se repite en otros archivos, por lo que se podría crear un archivo de utilidades para evitar la repetición de código.

- Mejora en acceso concurrente a la base de datos. Se podría implementar un sistema de colas para evitar que se hagan muchas peticiones a la base de datos al mismo tiempo.

- Agregar pruebas unitarias y de integración.

- Agregar archivos de migración para la base de datos.
