## Consigna

Se requiere hacer una app en react native que permita asociar un código de barras a un producto, siendo los productos obtenidos desde una API y los códigos de barras ingresados a traves de la cámara (leyendo un codigo de barras) y/o el teclado. La aplicación deberá respetar el diseño definido en este [link](https://www.figma.com/file/aBznwhUYtJb9F2Yrp1KrqY/Challenge-App-Picking?type=design&t=H6eTiBE0Fe1yV7I6-6).

### Funcionamiento vista por vista

#### Vista Listado de productos

Se accede al ingresar a la app. En esta screen se deberán listar los productos que se obtengan al hacer la request a la api. En caso de que algún producto ya tenga un código de barras asociado, el mismo se deberá mostrar en cada card de producto.
Al hacer tap en una card deberá seleccionar la card y habilitar los botones para ingresar el código de barras por **teclado o cámara que se deberá asociar a ese producto**. Al presionar el boton de la cámara se deberá dirigir al usuario a la **vista de scanner con cámara**. Al presionar el boton de teclado se deberá mostrar el pop up con el input para ingresar el código de barras con el teclado.
Tambien esta disponible el botón para finalizar (boton con el check) que deberá mostrarse deshabilitado si no hay ningún producto con un código de barras asociado. Si al menos 1 producto tiene un ID asociado se debe habilitar y al presionarlo se debe dirigir al usuario a la vista de **resumen**.

#### Vista de scanner con camara


Se accede al haber hecho tap en el botón de la cámara. Luego de escaneado el código de barras, se deberá dirigir al usuario a la vista de **Listado de productos**.

#### Vista de resumen

Se accede a esta vista desde el botón finalizar (boton con check) de la vista de **Listado de productos**. Debe mostrar el resumen de la operación realizada hasta el momento. Se muestra un botón para volver al **Listado de productos** y un botón para reiniciar los datos ingresados que deberá eliminar todos los códigos de barra ingresados en los productos y luego redirigir al usuario a la vista de **Listado de productos**.

### APIs

La app deberá funcionar correctamente consumiendo los productos desde esta API:

- [Api de productos](https://my-json-server.typicode.com/FizzmodChallenges/dummy-server-rn/products) 