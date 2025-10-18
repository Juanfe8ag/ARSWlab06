# ARSW Lab 6 (lab 5 segunda parte)
## Autor: Juan Felipe Ochoa

## Implementación Canvas
Lo primero que se pide para el laboratorio es un manejador de eventos para que el 
Canvas pueda guardar las posiciones y, posterior a ello, guardar el blueprint en el autor seleccionado del momento.
Se manejará con PointerEvents donde se guarde la información en x y en y para crear los 'Points' asociados.
![Blueprints PointerHandler.png](util/Blueprints%20PointerHandler.png)

## Conexión apiclient y app.js (botones save/update, new blueprint y delete)
Ahora, con los endpoints creados en laboratorios pasados, se implementa un botón que pueda añadir puntos al blueprint y que se actualice en puntos totales,
puntos del plano y como tal del dibujo.

Para el boton de new blueprint se crea un metodo donde se inicie un plano desde cero, se pinte y asi mismo como con el anterior botón, se actualice en planos totales, puntos totales
y puntos del plano.

Para el último botón, delete, se implementó un nuevo endpoint para eliminar un blueprint de la "base de datos" y con ello se actualizarán los puntos totales, los planos del autor asi como en los
botones pasados.

![Blueprint Botones.png](util/Blueprint%20Botones.png)

![Blueprints delete.png](util/Blueprints%20delete.png)

Y luego de borrar el plano se muestra asi:

![Blueprints vista.png](util/Blueprints%20vista.png)