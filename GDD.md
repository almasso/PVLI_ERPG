
# ERPG: GAME DESING DOCUMENT

## ÍNDICE

1. Ficha Técnica
2. Descripción
3. Jugabilidad
    1. Movimiento
    2. Cámara
    3. Mecánicas de Jugador
    4. Mecánicas de Escenario
    5. Enemigos
4. Diseño de Nivel
    1. Tipos de Zonas
    2. Descripción de Partida Típica
5. HUD
    1. Mockup
    2. Explicación
6. Estética
7. Menús y Flujo de Juego
8. Contenido
    1. Historia
    2. Niveles
    3. Bocetos
    4. Objetos
        1. Consumibles
9. Referencias


### Ficha Técnica

**Título:** España: Rondando por Galicia
**Género:** J-RPG
**Target:** Adolescente o Joven Adulto. _blankspace_
**Rating:** +16 años
**Plataforma:** Web
**Modo de Juego:** Un jugador, historia cuasilineal


### Descripción

ERPG es un JRPG ubicado en Galicia, donde en una de las grandes plazas de Vigo se encuentra el *Dinoseto* vandalizado, podado y destrozado. Nuestro protagonista, ***Manín***, que es el jardinero encargado del seto, se verá envuelto en una aventura por toda Galicia para recuperar los diferentes trozos del *Dinoseto*. Durante esta aventura atravesará diversas zonas como: _La Plaza, El Cementerio, La Catedral de Santiago, El Parque, El Puerto y Las Catacumbas_, haciendo amigos (icónicos personajes de España) para reclutar en su _Party_, luchando contra diversos enemigos y Jefes.

### Jugabilidad

Conservamos una jugabilidad muy parecido a los clásicos JRPGs (Primeras entregas de Final Fantasy y Dragon Quest), en la que llevamos a un protagonista que se aventurará al mundo tratando de cumplir una misión, generalmente a gran escala, mientras completa otras misiones secundarias. Todo esto lo hace acompañado de una ***Party***: una serie de aliados que el _héroe_ acaba por encontrarse en su camino y decide incorporar a su equipo. Generalmente consigue más aliados de la capacidad de su grupo de combate (4 contando al protagonista) y puede escoger quienes se enfrentan a la batalla junto a él. 

#### Movimiento

A la hora de viajar por el mundo nuestro personaje va a moverse en 4 direcciones (arriba, abajo, izquierda, derecha) y en la combinación de las mismas, permitiendo movimiento diagonal. Cada vez que Manín avance un paso, se moverá 1 casilla en la dirección deseada, pues el _mapa_ por el que controlamos al personaje está dividido en _Tiles_ de 32x16 píxeles. El movimiento se para cuando el juego pase a fase de combate.

#### Cámara

**Exploración:** Nos muestra una vista _top-down_ de la escena, con el protagonista en el centro. La cámara estará fijada en él todo el rato.
**Combate:** La escena se muestra con una vista horizontal estática de la escena (ver HUD).

#### Exploración



#### Combate

Manín pasará a la fase de combate cuando esté explorando algún suelo hostil (definir cuáles son hostiles y cuáles no) de forma aleatoria. Cada paso que dé en una de estas zonas aumentará la probabilidad de combate hasta que este se produzca.

Ver HUD de combate



### Diseño de Nivel


#### Tipos de Zonas

Vas a poder ir a todas las zonas desde el principio (excepto a las Catacumbas), pero las zonas tienen distintas dificultades. Al final de los caminos entre zonas estará Guillermo, un NPC que te avisa de que esa zona a lo mejor no es adecuada a tu dificultad, aunque puedes pasar sin problema.

##### Plaza

Es la zona principal del mapa. Conecta con todos los caminos hacia las demás zonas y es donde comenzará la trama. En el centro de la plaza se encuentra el Dinoseto, la estatua principal del juego. En la parte superior derecha una **Zona Residencial** donde se encuentra la casa de Manin, las oficinas de Manín Interactive y alguna otra casa en la que se puede entrar y charlar con algunos NPCs. En el lado contrario encontramos una **Zona Comercial**, donde hay un **bar** en el que el jugador podrá recuperar vida y revivir a sus integrantes de _party_, una **farmacia** donde puedes comprar medicamentos (ver 8.4.1) y un **bazar** que vende el resto de objetos consumibles que también tiene una puerta secreta que da a una armería, que está bloqueada hasta que se una un personaje a tu party con habilidades de disparo, pues ellos conocerían la ubicación de esta armería.

##### Parque

El Parque es la zona más accesible. Accedemos al Parque desde la parte norte de la Plaza, que conduce a un camino de tierra donde, al final, nos esperará Guillermo para avisarnos del nivel de dificultad de la zona. Se ve un camino de tierra que lleva a un parque vallado (como el parque Retiro de Madrid). Al entrar se ve un camino que lleva a una pequeña plaza en el que se encuentra el primer personaje aliado: ***Jarfaiter***. A la izquierda de la plaza se encuentra pequeño bosque junto a un bar. Al norte de la plaza hay un parque infantil y al este un gran lago.

###### Bosque

**Tipos de enemigos:** 
**Misión:**

###### Gran Lago

**Tipos de enemigos:**
**Misión:**


###### Puerto


###### Muelle

**Tipos de enemigos:**
**Misión:**

###### Barco

**Tipos de enemigos:**
**Misión:**

###### Catedral

###### Cementerio

###### Catacumbas


#### Contenido



##### Historia

Después de haber sido limpiador de piscinas en verano y haberse adentrado en una _Dungeon_ para recuperar su Patito perdido en la primera entrega de su historia: ***Chill Out***, Manín se muda a Vigo para comenzar su carrera como jardinero. Pasadas unas cuantas semanas se descubre que varias estatuas han sido robadas, todas con un mismo patrón, hasta que el *Dinoseto*, una de las obras más preciadas de la ciudad, ha sido podada y vandalizada de la misma forma que las demás obras de arte. Manín, tan valiente como es, trata de resolver el misterio a causa de la inutilidad de las autoridades locales. 

#### Menús y Flujo de Juego

##### HUD

**Exploración:** En la esquina inferior izquierda se muestran las caras de los combatientes de la party con su barra de Vida y Maná
**Combate:** Los enemigos aparacen en la parte central de la pantalla con una barra de vida cada uno, alternando su posición entre encima y debajo del enemigo para que no se superponga con los enemigos adyacentes. En la zona contraria a la barra de vida se mostrarán los iconos de estados alterados (si sufre alguno). Se muestra una vista completa del sprite del enemigo. 
Arriba en el centro se muestra el estado de la _party_: X recuadros (siendo X el número de combatientes aliados) donde se ve el sprite de nuestro aliado y (si tuviera alguno) los iconos de estados alterados que sufra al lado de la cabeza. En la parte inferior se muestra su **barra de vida** y de **maná** con números dentro de las mismas indicando el valor actual y el máximo. Si alguno de los aliados llega a 0 PV su sprite se enrojece y una 'x' lo tapa parcialmente. 
Cuando toque escoger la acción de un aliado, su sprite se anima y gana un borde blanquecino. A la hora de escoger un ataque de uno de los aliados, se despliega una ventana desde la parte de abajo de su recuadro. Este desplegable muestra los ataques y sus estadísticas: Tipo de daño, Usos restantes, Usos totales y Daño. 
Cuando un aliado ataque, se hará una pequeña animación sobre el personaje objetivo.



##### Objetos


###### Consumibles
- Cigarro: +maná -vida
- Kebab: +vida -maná
- Fría: ++vida -maná +borracho
- Porro: ++maná -vida +confuso
- Tarta de Santiago: ++vida ++maná (toda la party) - Solo existe uno en la partida.
- Dalsy Naranja: +vida
- Dalsy Fresa: +maná
- Ibuprofeno:
    · 200mg: revive 1/4 vida
    · 600mg: revive 1/2 vida
    · 1g: revive toda la vida
- Grageas:
    · 49% +vida
    · 49.5% -vida
    · 1.5% mata
- Objetos de boss: Trozo de Dinoseto y algo que reviva a todo el grupo (depende de cada boss)