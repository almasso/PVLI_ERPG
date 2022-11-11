
# ERPG: GAME DESING DOCUMENT

## ÍNDICE

1. Ficha Técnica
2. Descripción
3. Jugabilidad
    1. Movimiento
    2. Cámara
    3. Exploración
    4. Combate
        1. Puntos de vida
        2. Flujo de combate
        3. Ataques
        4. Aliados
        5. Puntos de experiencia y qué significa subir de nivel
4. Diseño de Nivel
    1. Tipos de Zonas
        1. Plaza
        2. Parque
        3. Puerto
        4. Catedral
        5. Cementerio
        6. Catacumbas
5. HUD
    1. Exploración
    2. Combate
6. Contenido
    1. Historia
    2. Objetos
        1. Consumibles
7. Menús y Flujo de Juego
9. Referencias


### Ficha Técnica

**Título:** España: Rondando por Galicia
**Género:** J-RPG
**Target:** Adolescente o Joven Adulto con gusto por la estrategia en el combate, pequeños gags y por una historia simple.
**Rating:** +16 años
**Plataforma:** Web
**Modo de Juego:** Un jugador, historia cuasilineal // cambiar esto xd

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

Gran parte de la aventura se basa en la exploración de un entorno. Esta consiste en andar por las diferentes zonas del mapa hablando con NPCs, abastecerse el inventario para próximas batallas en las diferentes tiendas y completar la misión de esa zona concreta. 

En las zonas consideradas "_hostiles_", Manín tendrá posibilidades de empezar un combate junto a sus aliados (si el jugador ha decidido incorporar alguno a su equipo) en el estado en el que estos se encuentren. 

Durante este modo también se podrán usar objetos sobre los aliados, como, por ejemplo, las curaciones o reabastecimientos de maná.

#### Combate

Manín pasará a la fase de combate cuando esté explorando algún suelo hostil (definir cuáles son hostiles y cuáles no) de forma aleatoria. Cada paso que dé en una de estas zonas aumentará la probabilidad de combate hasta que este se produzca.

Ver HUD de combate (meter aquí referencia)

##### Puntos de Vida (PV):

Son la estadística que mantendrá a un personaje en pie. Cuando este reciba un ataque, perderá X PVs dependiendo de la fuerza y tipo del ataque. Si un personaje llega a 0 PVs, muere: no podrá ser utilizado de ninguna manera hasta que sea curado de las siguientes formas: en un **Bar**, con un objeto que permita a un aliado volver a la vida o con algún '_ataque_' aliado que permita revivir a un objetivo.

En caso de que toda la _party_ muera, se cargará un anterior punto de guardado, manteniendo el estado del inventario y de los aliados iguales a los del momento del guardado.

Al igual que los aliados, los enemigos también '_mueren_', y una vez lo hacen no pueden volver al campo de batalla.

##### Flujo de Combate:

Al empezar un combate se calcula un orden de turnos en función de la velocidad de cada participante. Esto entra en juego una vez se hayan decidido las acciones de los personajes. Todas las acciones de los aliados se definen antes de que estas se empiecen a ejecutar: Primero se muestra el menú de combate de cada personaje y una vez se haya escogido su acción, se hace lo mismo para el siguiente. Cuando todos los personajes tengan una acción asignada, se resuelven siguiendo el orden comentado anteriormente. 

##### Ataques:
1. Tipos de Ataque
2. Daño
3. Estado Alterado (Precisión)
4. Puntos de Maná
5. Objetivo(s)

Los ataques tienen 3 estadísticas. Daño, Efectos de Estado y Puntos de Maná. Los ataques también se diferencian en 3 tipos: Normal, Especial y Ulti.
**Tipos de Ataque:** Cada personaje tiene 1 ataque Normal: no gasta Puntos de Maná; 2 Especiales: gastan Puntos de Maná; y 1 Ulti: Tarda X turnos en poder usarse, solo puede usarse una vez y gasta al menos la mitad de los PM de cada personaje. Los del primer tipo son los ataques más débiles, pues no consumen nada al personaje que los usa, los del segundo tipo son más fuertes y pueden tener daño elemental y efectos de estado, mientras que la Ulti es el más fuerte de todos y también puede provocar estados alterados con mayor probabilidad.

**Daño:** El daño es la cantidad de Puntos de Vida que un ataque quitaría a un objetivo si tuviera 0 Resistencia al Tipo de Daño que el ataque haga. Los Tipos de Daño son los siguientes: Meleé, Rango, Fuego, Eléctrico, Tóxico y Apoyo. Los ataques de tipo 'Apoyo' no hacen daño, sino al contrario: pueden curar al objetivo, subir su precisión, ataque, resistencias, etc.

**Estados Alterados:** Son efectos que puede sufrir un personaje de forma pasiva por haber consumido un objeto o haber recibido un ataque. Duran X turnos en función de cada estado. Se conservan entre combates: se mantienen los turnos que se han pasado sufriendo el estado concreto. También se pueden acumular varios estados a la vez. un ataque que pueda causar un Estado Alterado tiene una probabilidad de que este entre en efecto.

Listado:
1. **Borracho:** La precisión del personaje baja y su velocidad de turno es menor (implementación de movimiento de HUD?).
2. **Quemado:** Los PVs bajan gradualmente y las resistencias a daño Físico, Rango y a Fuego, siendo esta última la más afectada.
3. **Paralizado:** El personaje pierde su turno mientras esté paralizado. También baja la resistencia a daño Eléctrico.
4. **Envenenado:** Bajan los PVs gradualmente. Baja resistencia al Tóxico.
5. **Confuso:** Hay un 60% de probabildades de que el personaje confuso sea objetivo de sus propios ataques. Los objetos están desordenados y aparecen con interrogaciones.

**Puntos de maná:** Los ataques Especiales y de Ulti consumen X PM dependiendo de cada ataque. Si no se tiene suficiente PM para realizarlos, no se pueden hacer.
**Objetivo(s):** Un ataque puede hacer objetivo a una o varios personajes dependiendo del ataque.

##### Aliados

Tipos de PJs:
    Manin: DPS (mixed)
    Melendi: DPS-Support (ranged)
    Jarfaiter: DPS (Physic)
    Pedro Sánchez & cmpy: Tank (Ranged)
    Abel Caballero: Tank (Physic)
    Niño Fumón: Full-Support

##### Puntos de Experiencia y qué significa subir de nivel

El sistema de niveles es el típico que podemos encontrar el cualquier RPG: al acabar un combate toda la party consigue X puntos de experiencia dependiendo del tipo de enemigo que haya derrotado; cuando se consiga acumular suficiente experiencia, el nivel de la party sube automáticamente haciendo que se aumenten las estadísticas de: Daño, HP, MP y Velocidad. La cantidad que se mejora en cada uno de estos depende completamente del personaje. A pesar de seguir este esquema clásico, en ERPG el nivel se comparte entre toda la party, de tal fomrma que no existe nivel de personaje, o si queremos considerar que existe, este sería el mismo para todos. De esta forma, al unirse un personaje a la party, este entra con el nivel de la party.

### Diseño de Nivel

#### Tipos de Zonas

Vas a poder ir a todas las zonas desde el principio (excepto a las Catacumbas), pero las zonas tienen distintas dificultades. Al final de los caminos entre zonas estará Guillermo, un NPC que te avisa de que esa zona a lo mejor no es adecuada a tu dificultad, aunque puedes pasar sin problema.

##### Plaza

Es la zona principal del mapa. Conecta con todos los caminos hacia las demás zonas y es donde comenzará la trama. En el centro de la plaza se encuentra el Dinoseto, la estatua principal del juego. En la parte superior derecha una **Zona Residencial** donde se encuentra la casa de Manin, las oficinas de Manín Interactive y alguna otra casa en la que se puede entrar y charlar con algunos NPCs. En el lado contrario encontramos una **Zona Comercial**, donde hay un **bar** en el que el jugador podrá recuperar vida y revivir a sus integrantes de _party_, una **farmacia** donde puedes comprar medicamentos (ver 8.4.1) y un **bazar** que vende el resto de objetos consumibles que también tiene una puerta secreta que da a una armería, que está bloqueada hasta que se una un personaje a tu party con habilidades de disparo, pues ellos conocerían la ubicación de esta armería.

##### Parque

Es la zona más accesible. Accedemos al Parque desde la parte norte de la Plaza, que conduce a un camino de tierra donde, al final, nos esperará Guillermo para avisarnos del nivel de dificultad de la zona. Se ve un camino de tierra que lleva a un parque vallado (como el parque del Buen Retiro de Madrid). Al entrar se ve un camino que lleva a una pequeña plaza en el que se encuentra el primer personaje aliado: ***Jarfaiter***, que se unirá a ti si le das un porro. A la izquierda de la plaza se encuentra un pequeño bosque junto a un bar. Al norte de la plaza hay un parque infantil y al este un gran lago, donde se encontrará ***Melendi***, que se podrá unir a tu aprty si encuentras su guitarra, que estará escondida por el parque.

**Estatua:** Cuchillero de Albacete

![image](https://user-images.githubusercontent.com/91317502/198385135-37e8c28b-f58f-4d6c-80aa-90b1d3d8b802.png)

**Tipos de enemigos:** Artistas y Culturistas.
**Misión:** Nuestra misión en este parque es ayudar a un pescador del gran lago a recuperar su caña, pues los culturistas se la han robado porque consideran que el parque es "suyo". El pobre hombre da direcciones hacia el bosque, donde cree que se han llevado su preciado objeto. (ALGÚN NPC O ALGO???). Al conseguir recuperar la caña volvemos al gran lago para entregársela al pescador. Él lo agradece y comparte unas _frías_ con nosotros (ver Contenido - Objetos). Poco después se pone a pescar, pero se ve que ha picado algo muy grande y pide ayuda a Manín. Él le ayuda de buen grado y consiguen sacar del agua la estatua del cuchillero de Albacete, que alberga en su interior una pieza del Dinoseto. Comienza la batalla tras un pequeño diálogo.

##### Puerto

El puerto es la segunda zona del juego. Es una zona más larga que ancha. En toda la parte izquierda hay almacenes y fábricas donde los pescadores llevan sus capturas, y en la zona derecha se encuentra un puerto con barcos atracados, los cuales algunos estarán abiertos. En la zona central del nivel hay un suelo asfaltado con basura, y en el centro ***Abel Caballero***, que te pedirá que recojas la basura que han dejado los fiesteros a cambio de que se pueda unir a tu party. En todo el puerto te puedes encontrar a narcotraficantes que se enfrentarán a ti.

**Estatua:** Bicha de Balazote.

![image](https://user-images.githubusercontent.com/91317502/198385020-6b7672d1-0920-49a6-b671-245be2b18a45.png)

**Tipos de enemigos:** Narcos, británicos.
**Misión:** Te encontarás nada más entrar a una anciana que te dirá que ha visto a unos hombres meter una caja pesada de, casualmente, el tamaño de una pequeña estatua en el barco del fondo. Cuando llegas a ese barco se verá que es un barco británico, propiedad del **British Museum**, en el que habrá un guardia que no te dejará entrar. Para poder pasar habrá _dos opciones_: Enfrentarte al guardia y entrar a la fuerza o buscar a un trabajador del barco por el puerto y robarle la llave. Si te enfrentas al guardia saltarán las alarmas del barco y saltarán combates aleatorios mientras estás dentro de él buscando la estatua. Si por el contrario le has robado la tarjeta al trabajador, tendrás que pasar sin que te detecten por el barco para recuperar la estatua. De cualquiera de las formas que entres la estatua estará al final del todo, y cuando llegues los ingleses revivirán a la Bicha de Balazote para que se enfrente a ti.

##### Catedral

La catedral es la tercera zona del juego. Es un edificio más largo que ancho que consta de dos plantas. En la primera planta es parecida a una catedral común: dos retablos religiosos a cada lado, filas de bancos y una tarima donde hay un cura dando misa. Detrás de la tarima hay dos habitaciones que están cerradas inicialmente. En la entrada hay un banco de alimentos que sirve para curar a la _party_. La zona de arriba solo tiene los palcos, donde puedes moverte por los lados debido a que el centro está hueco. En esta zona se encontrará ***Pedro Sánchez***, a quien puedes reclutar para la party.

**Estatua:** El Lazo - en Benavente (replanteada como un ángel bíblicamente correcto).

![image](https://user-images.githubusercontent.com/91317502/198385190-4fdf290d-475b-47a7-b540-6a1d57a80d1b.png)

**Tipos de enemigos:** Abuelas ultrarreligiosas, curas.
**Misión:** Al entrar te encontrarás a una mujer que te pedirá ayuda para buscar a su hijo que no había vuelto de catequesis. El niño estará en la sala que está detrás de la tarima donde el cura está dando misa, pero no podrás entrar debido a la homilía. Para poder entrar tendrás que sabotear la misa de distintos modos: romper algún retablo, tirar la lámpara colgante, etc. Cuando se acabe la misa podrás entrar en la primera sala, donde estará el cura que estaba dando misa y te enfrentarás a él. Cuando le derrotes podrás entrar a la siguiente sala donde estará el niño que buscas y la estatua del Ángel Bíblico, la cual el cura revivirá para que te enfrentes a ella. En esta misma sala estará también la entrada a las catacumbas (ver 4.1.6), pero no se podrá acceder todavía.

##### Cementerio

El cementerio será la cuarta y penúltima zona del juego. Es una zona más ancha que alta. En cuanto entras hay un camino de tierra que lleva al norte, donde hay una especie de plaza con la estatua del Ángel Caído; y a los lados lleva a una fila de tumbas. Encima de la fila de tumbas se encuentra un panteón a cada lado, los cuales estarán vallados y en sus entradas hay un jardín antes de poder entrar a la propia estructura. En el fondo norte del cementerio hay un restaurante donde puedes curar a tu party. En los caminos te encontrarás a la Santa Compaña

**Estatua:** Ángel caído.
**Tipos de enemigos:** Satánicos y Santa Compaña.
**Misión:** En cuanto llegas a la plaza central del cementerio habrá un grupo de satánicos que querrán hacer un sacrificio contigo para revivir al Ángel Caído. En cuanto los derrotas te dirán que hay tres grupos más haciendo sacrificios: uno en cada panteón y otro en algún sitio de las tumbas. Uno de los que intentan sacrificar será el ***Niño fumón***, que cuando lo rescatas te ofrecerá su ayuda para la party. En cuanto frustras sus sacrificios te dirán que ya es demasiado tarde, y la estatua habrá revivido, por lo que te tendrás que enfrentar al Ángel Caído.

##### Catacumbas

Es la zona final. Nada más entrar en ella por la Catedral habrá un pasillo que desemboque en un laberinto, donde te encontrarás con todos los enemigos principales que estaban en cada zona. Al final de este laberinto habrá una sala donde estará el Dinoseto, al cual te tendrás que enfrentar, y cuando le ganes se acabará el juego

**Estatua:** Dinoseto.

![image](https://user-images.githubusercontent.com/91317502/198385399-70b2aaf2-7134-4bba-870e-40f0f94f993d.png)

**Tipos de enemigos:** Todos los anteriormente mencionados.

### HUD

#### Exploración

En la esquina inferior izquierda se muestran las caras de los combatientes de la party con su barra de Vida y Maná

#### Combate

Los enemigos aparacen en la parte central de la pantalla con una barra de vida cada uno, alternando su posición entre encima y debajo del enemigo para que no se superponga con los enemigos adyacentes. En la zona contraria a la barra de vida se mostrarán los iconos de estados alterados (si sufre alguno). Se muestra una vista completa del sprite del enemigo. 
Arriba en el centro se muestra el estado de la _party_: X recuadros (siendo X el número de combatientes aliados) donde se ve el sprite de nuestro aliado y (si tuviera alguno) los iconos de estados alterados que sufra al lado de la cabeza. En la parte inferior se muestra su **barra de vida** y de **maná** con números dentro de las mismas indicando el valor actual y el máximo. Si alguno de los aliados llega a 0 PV su sprite se enrojece y una 'x' lo tapa parcialmente. 
Cuando toque escoger la acción de un aliado, su sprite se anima y gana un borde blanquecino. A la hora de escoger un ataque de uno de los aliados, se despliega una ventana desde la parte de abajo de su recuadro. Este desplegable muestra los ataques y sus estadísticas: Tipo de daño, Usos restantes, Usos totales y Daño. 
Cuando un aliado ataque, se hará una pequeña animación sobre el personaje objetivo. 
En la esquina inferior izquierda se muestran 3 botones: 'Ataque', para que el desplegable mencionado anteriormente aparezca en pantalla y se pueda escoger un ataque; 'Objeto', para acceder al menú de objetos usables en combate a través de un menú desplegado desde la esquina inferior derecha (también accesible desde un icono de una mochila en la misma esquina); y 'Huir', que despliega un mensaje que dice: "Manín nunca huye.".

### Contenido

##### Historia

Después de haber sido limpiador de piscinas en verano y haberse adentrado en una _Dungeon_ para recuperar su Patito perdido en la primera entrega de su historia: ***Chill Out***, Manín se muda a Vigo para comenzar su carrera como jardinero. Pasadas unas cuantas semanas se descubre que varias estatuas han sido robadas, todas con un mismo patrón, hasta que el *Dinoseto*, una de las obras más preciadas de la ciudad, ha sido podada y vandalizada de la misma forma que las demás obras de arte. Manín, tan valiente como es, trata de resolver el misterio a causa de la inutilidad de las autoridades locales. 

##### Objetos

###### LEYENDA:

    - (+) "algo" -> se recupera un poco de "algo". En caso de ser un estado alterado, el objetivo gana el estado alterado "algo".
    - (-) "algo" -> se pierde un poco de "algo". En caso de ser un estado alterado, el objetivo pierde el estado alterado "algo".
    - (++) "algo" -> igual que (+), pero aumenta "algo" en mayor cantidad.
    - (--) "algo" -> igual que (-), pero disminuye "algo" en mayor cantidad.
    - En caso de no especificar objetivos, el objeto solo puede usarse sobre uno a la vez.

###### Consumibles

- **Cigarro**: +maná -vida
- **Kebab**: +vida -maná
- **Fría**: ++vida -maná +borracho
- **Porro**: ++maná -vida +confuso
- **Tarta de Santiago**: ++vida ++maná (toda la party) - Solo existe uno en la partida.
- **Dalsy Naranja**: +vida
- **Dalsy Fresa**: +maná
- **Ibuprofeno**:
    · 200mg: revive 1/4 vida
    · 600mg: revive 1/2 vida
    · 1g: revive toda la vida
- **Grageas**:
    · 49%: +vida
    · 49.5%: -vida
    · 1.5%: el objetivo muere

###### Objetos de boss 

- **Trozo de Dinoseto**: Se necesitan tener todos para desbloquear las catacumbas. Solo se pueden usar una vez se tengan todos. 
- **Objeto Único**: Cada _boss_ tendrá un objeto único que podrá revivir a toda la _party_ dentro y fuera de combate.

### Menús y Flujo de Juego

Desde una pantalla de Inicio podremos cargar nuestro último estado de la partida (se guarda un estado en Puntos de Guardado encontrados por el mapa) y acceder así a una escena de _exploración_. Caminando por las _zonas hostiles_ eventualmente el jugador se enzarzará en un combate. Si el jugador gana el combate se muestran menús de victoria, subida de experiencia y reparto de objetos si los enemigos han _droppeado_ alguno. En el caso contrario, se muestra una escena de _Game Over_ que lleva a la pantalla de título o al último estado guardado (ambas opciones representadas con botones).

###### PANTALLA DE TÍTULO:

![Inicio](https://user-images.githubusercontent.com/91317502/198381932-ed76295a-35ad-435f-8de9-a371e14ac0ac.png)

###### GAME OVER:

![Gameover](https://user-images.githubusercontent.com/91317502/198381775-05067790-be16-423a-a53b-3401b4a3e67b.png)

Como se ha mencionado antes, hay dos partes del juego claramente distinguidas: la exploración y el combate. Durante la primera parte nos podemos encontrar con un menú que aparecerá al pulsar ESC donde podremos entrar a ver el estado de nuestra Party, otra opción para entrar a nuestro inventario de objetos (que mostrarán sus características y una opción para usarlos sobre la party revelando un menú parecido al del estado de la misma) y finalmente una opción para volver a la pantalla d título. 
El caso de combate ya ha sido descrito en ***HUD***. 

### Referencias
Nos hemos basado en RPGs clásicos como el Dragon Quest, Final Fantasy o Lisa: the Painful. También gran parte del combate está basado en Pokémon, al igual que las ideas que se tienen sobre los menús.
