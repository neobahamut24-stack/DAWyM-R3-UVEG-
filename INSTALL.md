# INSTALL.md

## Gestor de tareas — Reto 3, UVEG

### 1. Descripción

Aplicación web académica para administrar tareas. El frontend se comunica con un backend desarrollado con Node.js y Express, que utiliza MariaDB para almacenar los registros.

### 2. Entorno y dependencias

| Componente | Versión comprobada |
|---|---|
| Sistema operativo | Windows |
| Node.js | 24.14.1 |
| npm | 11.11.0 |
| Apache | 2.4.58 (XAMPP) |
| MariaDB | 10.4.32 |
| Express | 5.3.0 |
| mysql2 | 3.24.6 |
| dotenv | 18.0.8 |
| clean-css-cli | 5.6.3 |
| Terser | 5.51.2 |

Las versiones de las dependencias corresponden a las comprobadas durante el desarrollo. `package.json` declara rangos de versiones mediante el prefijo `^`, mientras que `package-lock.json` registra las versiones resueltas de la instalación.

### 3. Preparación del proyecto

Instalar Node.js y npm. Instalar XAMPP para disponer de MariaDB y Apache en el entorno local.

Abrir PowerShell o la terminal de VS Code en la carpeta raíz del proyecto y ejecutar:

```powershell
npm install
```

El comando instala las dependencias declaradas en `package.json`. Se debe conservar `package-lock.json` para mantener el registro de las versiones resueltas.

### 4. Inicialización de la base de datos

1. Iniciar el servicio MySQL/MariaDB desde el panel de control de XAMPP.
2. Abrir phpMyAdmin en `http://localhost/phpmyadmin/`.
3. Importar el archivo `database.sql`.
4. Verificar la creación de la base `gestor_tareas_r3` y la tabla `tareas`.

El script define los campos `id`, `titulo`, `descripcion`, `completada` y `fecha_creacion`, además de la clave primaria autoincremental y los índices `idx_tareas_completada` e `idx_tareas_fecha_creacion`.

### 5. Configuración de variables de entorno

Crear un archivo `.env` en la raíz del proyecto con las variables que utiliza `server/db.js`:

```dotenv
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=gestor_tareas_r3
```

Los valores corresponden a los valores predeterminados definidos en el código de conexión. Si la instalación local utiliza otro usuario, contraseña, host, puerto o nombre de base de datos, se deben ajustar las variables.

El archivo `.env` contiene configuración local y debe mantenerse fuera del control de versiones. El proyecto incluye `.gitignore` para excluirlo. No publicar contraseñas ni credenciales reales.

### 6. Inicio del backend

Con las dependencias instaladas, MariaDB en ejecución, la base de datos creada y las variables configuradas, ejecutar desde la raíz del proyecto:

```powershell
node server/server.js
```

El servidor utiliza el puerto `3000` de forma predeterminada y permite cambiarlo mediante la variable de entorno `PORT`. Mantener abierta la terminal mientras se utiliza la aplicación.

### 7. Verificación de la conexión y la API

Para comprobar que la API responde, abrir otra terminal y ejecutar:

```powershell
curl.exe http://localhost:3000/api/tareas
```

La ruta `GET /api/tareas` devuelve los registros de tareas en formato JSON. Durante las pruebas del proyecto, esta solicitud devolvió los registros almacenados.

La conexión con MariaDB también se comprobó mediante una consulta SQL que devolvió el nombre de la base de datos y la versión del servidor.

Las operaciones disponibles en la API son:

- `GET /api/tareas`: consultar las tareas.
- `POST /api/tareas`: crear una tarea.
- `PATCH /api/tareas/:id`: actualizar el estado de una tarea.
- `DELETE /api/tareas/completadas`: eliminar las tareas completadas.
- `DELETE /api/tareas/:id`: eliminar una tarea específica.

### 8. Dominio local y HTTPS

El entorno desarrollado utiliza el dominio local:

`https://gestor-tareas-r3.test/`

Su funcionamiento depende de la configuración local de Apache, la resolución del dominio mediante el archivo `hosts`, el certificado TLS local y el sitio virtual correspondiente. En el equipo de desarrollo, el dominio se resolvió hacia `127.0.0.1`.

Apache se configuró para redirigir las solicitudes HTTP a HTTPS. Las respuestas del servidor se verificaron mediante solicitudes de cabeceras y se observaron `Content-Security-Policy`, `Strict-Transport-Security`, `X-Content-Type-Options` y `Referrer-Policy`. También se comprobó el acceso a la aplicación mediante HTTPS.

Para reproducir este acceso en otro equipo, se deben adaptar las rutas de XAMPP, el archivo `hosts`, el certificado y la configuración de los sitios virtuales a ese entorno. El dominio `.test` y el certificado autofirmado se utilizan para desarrollo local y no sustituyen un certificado ni una configuración apropiados para un servicio público de producción.

### 9. Archivos principales

- `index.html`: interfaz principal.
- `css/`: hojas de estilo.
- `js/app.js`: lógica del frontend.
- `js/app.min.js`: versión optimizada del JavaScript.
- `server/server.js`: backend y rutas de la API.
- `server/db.js`: configuración de la conexión a MariaDB.
- `database.sql`: script de inicialización de la base de datos.
- `aviso-privacidad.html`: aviso de privacidad.
- `terminos-condiciones.html`: términos y condiciones.
- `package.json`: dependencias del proyecto.
- `package-lock.json`: registro de las versiones resueltas de las dependencias.
- `.gitignore`: exclusiones del control de versiones, incluido `.env`.

### 10. Consideraciones de seguridad

El proyecto se desarrolló con fines académicos y para uso local. Antes de desplegarlo en producción, se deben revisar las credenciales, los permisos de acceso, la protección de la clave privada y el certificado TLS, así como las demás medidas de seguridad necesarias para el entorno de destino.