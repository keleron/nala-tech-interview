# Prueba Tecnica Nala

## Estrucutura del proyecto

Con respeto al proceso de entrevista, quisiera indicar que esta prueba tecnica es considerablemente extensa y que se deja un prototipo que cumple con todo lo solicitado, sin embargo no lo hace extensivamente, solo lo suficiente para demostrar que se como hacerlo y en donde hacerlo. Este trabajo aproximadamente costo 2-3 dias laborales, cualquier duda, contactar y preguntar.

- backend: Ruby on rails `rails db:reset && rails s` (admin:pass)
- client: Vite + React `pnpm install && pnpm dev`, `pnpm` puede activarse facil con `corepack enable pnpm`
- Ambos deberian correr en el puerto 3000 y 5173 respectivamente para que las reglas de CORS funcionen correctamente

## Backend

1. A fin de facilitar el desarrollo se la authenticacion con la API mediante el uso de cookies de session. Sigue siendo stateless y es mas practico para evitar el manejo de JWT del lado del cliente.
2. `kaminari` buena gema de paginacion
3. `jbuilder` buena gema para respuestas de API
4. `ransack` muy buena gema para filtrar datos
5. `rubocop` y extensiones para mantener el codigo limpio y las buenas practicas. Existen otras gemas similares como `bullet` y `rubocop-performance` que podrian ayudar
6. Testing con `rspec`, `factory-bot-rails` y `faker` para hacer las pruebas lo mas reales posibles
7. Versionamiento de api, las rutas viven en `api/v1` y se pueden crear nuevos controladores al respecto
8. A pesar de que esta testeado para demostrar que se hacer testing, queda mucho por completar

9. La paginacion se lograr en los endpoints con `?page=1`
10. Los filtros y busquedas se pueden utilizar siguiendo la guia de `ransack` [ransack-doc](https://activerecord-hackery.github.io/ransack/getting-started/search-matches/)
11. El proyecto se puede mejorar agregando `sidekiq` o cualquier otra gema de manejo de colas, por ejemplo la subida en bulk de usuarios DEBERIA hacerse en background, es muy mala practica dejar que algo asi deje en espera al usuario
12. Quedan muchas validaciones pendientes, validacion de modelos pendientes, etc.

## Client

1. Porque no materialUI?, simplemente necesita mas tiempo para echar a andar y dejar las cosas con un significado semantico.
2. `react-query` una de las mejores librerias para tomar datos, el prototipo demuestra que se hacer mutaciones/fetchs
3. `eslint`, `stylelint`, `prettier`, se encargan de todo lo que es manejar buenas practicas y estilo del codigo
4. Utiliza `vitest` como entorno de ejecucion de test, realmente si me pusiera a hacer test en el frontend no terminaria nunca con esta prueba tecnica, con todo respeto. `vitest` es una alternativa (al menos en mi experiencia) mas estable que `jest`.
5. La interfaz creo que es bastante sencilla e intuitiva, si no la explico y se entiende fue que el proyecto de parte de front fue un exito, pero principalmente un usuario admin tiene acceso para editar y crear empleados y modificar sus ausencias.

## Deployment

Podria deployearse facilmente en Heroku.com o en Render.com, probablemente lo unico que habria que setear en el `run script` sea correr las migraciones. Probablemente github action puede encargarse del pipeline de correr los test antes de cada merge, etc. Hay mucho que hacer, pero valoro el tiempo de todos.
