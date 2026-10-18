# DAWyM-R3-UVEG
## Reto 3 — Unidad 2: Asegura, conecta y evalúa tu despliegue web

Proyecto académico de la Ingeniería en Desarrollo de Software de la Universidad Virtual del Estado de Guanajuato (UVEG).

El objetivo es configurar y evaluar una aplicación web de gestión de tareas, documentando su base de datos, servidor, pruebas funcionales y medidas de seguridad en un entorno local.

## Tecnologías utilizadas

| Tecnología | Versión |
|---|---|
| Node.js | 24.14.1 |
| npm | 11.11.0 |
| Apache HTTP Server (XAMPP) | 2.4.58 |
| MariaDB | 10.4.32 |
| Express | 5.3.0 |
| mysql2 | 3.24.6 |
| dotenv | 18.0.8 |
| clean-css-cli | 5.6.3 |
| Terser | 5.51.2 |

## Características implementadas

- Aplicación web Gestor de tareas.
- Servidor Node.js con Express.
- API REST para consultar, crear, actualizar y eliminar tareas.
- Base de datos MariaDB con tabla de tareas e índices.
- Conexión a la base de datos mediante `mysql2/promise`.
- Configuración de variables de entorno mediante `dotenv`.
- Optimización de CSS y JavaScript mediante Clean CSS y Terser.
- Pruebas funcionales en Google Chrome y Microsoft Edge.
- Configuración local de HTTPS mediante Apache y certificado TLS.
- Verificación de encabezados de seguridad HTTP.
- Páginas de aviso de privacidad y términos y condiciones.

## Base de datos

El archivo `database.sql` contiene la definición de la base de datos `gestor_tareas_r3` y la tabla `tareas`, con campos para identificador, título, descripción, estado de finalización y fecha de creación.

Se incorporaron índices para apoyar las consultas por estado de finalización y fecha de creación.

## Instalación y ejecución

1. Instalar Node.js, npm y configurar MariaDB/MySQL en el entorno local.
2. Instalar las dependencias desde la raíz del proyecto:

   ```bash
   npm install
   ```

3. Importar `database.sql` en MariaDB/MySQL.
4. Crear un archivo `.env` local con los datos de conexión requeridos por `server/db.js`.
5. Iniciar la aplicación:

   ```bash
   node server/server.js
   ```

6. Abrir `http://localhost:3000` en el navegador.
7. Comprobar la API en `http://localhost:3000/api/tareas`.

Las versiones, los pasos de instalación y la configuración detallada también se documentan en `INSTALL.md`.

**Seguridad:** no publicar el archivo `.env`, contraseñas, claves privadas ni otros secretos en el repositorio.

## Pruebas y resultados

Se realizaron pruebas funcionales en Google Chrome y Microsoft Edge para comprobar la visualización de la interfaz y las operaciones principales de gestión de tareas.

La evaluación de Lighthouse en modo escritorio registró los siguientes resultados:

| Categoría | Puntuación |
|---|---:|
| Rendimiento | 100 |
| Accesibilidad | 95 |
| Buenas prácticas | 100 |
| SEO | 91 |

## HTTPS y encabezados de seguridad

Se configuró el dominio local `gestor-tareas-r3.test`, resuelto a `127.0.0.1`, con un certificado TLS local y redirección de HTTP a HTTPS mediante Apache.

Se verificó la presencia de encabezados como:

- Content Security Policy (CSP).
- HTTP Strict Transport Security (HSTS).
- `X-Content-Type-Options`.
- `Referrer-Policy`.
- `X-Frame-Options`.

Esta configuración corresponde al entorno local de desarrollo. Para un despliegue público sería necesario adaptar el dominio, los certificados, la configuración del servidor y las medidas de seguridad a producción.

## Aviso de privacidad y términos y condiciones

La aplicación incorpora páginas de aviso de privacidad y términos y condiciones para informar sobre el tratamiento de los datos y las condiciones generales de uso. Antes de utilizar el sistema en un entorno real, estos documentos deben revisarse y adecuarse a su finalidad y al tratamiento efectivo de datos.

## Autoría

**Institución:** Universidad Virtual del Estado de Guanajuato (UVEG)  
**Programa:** Ingeniería en Desarrollo de Software  
**Asignatura:** Despliegue de aplicaciones web y móviles  
**Actividad:** Unidad 2 — Reto 3. Asegura, conecta y evalúa tu despliegue web  
**Autor:** Vicente Saúl Jaramillo Domínguez

---

Proyecto académico con fines educativos y de demostración en un entorno local.
