// parte 2: usar suspense para que el loading no interfiera en el renderizado.
import fetchData from "./components/fetchData";
import { Suspense } from "react";
//SUSPENSE ---> componente que permite tener varios hijos dentro de el; podemos englobar una parte de codigo para que se ejecute mientras tanto se cargan los datos.

// Llamar a la función fetchData para obtener datos de una API:
const apiData = fetchData("https://jsonplaceholder.typicode.com/users");

function App() {
  const data = apiData.read();
  
  /**
   data se usa para acceder a los datos de la url
   * Cuando se accede a los datos mediante apiData.read(), se produce un efecto de Suspense. 
    Si los datos aún se están cargando, se muestra un componente de fallback (en este caso, 
    "Loading..."). Esto garantiza que la aplicación no se bloquee durante la carga de datos.
   >>>>mientras se está ejecutando data, se muestra el componente dentro de suspense<<<<
    */
  
  return (
    <div className="App">
      <h1>Fetch like a pro </h1>
      {/* Mientras se cargan los datos, se mostrará el componente de fallback */}
      <Suspense fallback={<div>Loading...</div>}></Suspense>
      
      
      
{/* 
mientras no se cargan o no estén listos los componentes, suspense nos va a mostrar un componente por defecto. 
en este caso, no vamos a ver el Loading aunque pongamos la red en slow 3g porque hasta que no tengamos los datos
 no se va a renderizar. EL fallback de suspense nos va a servir por si hay algun error o si no se cargó el componente.
Así evitamos el doble renderizado ---> el useEffect nos renderiza primero la aplicación, hace fetch en los datos y lo vuelve
a renderizar. 

Con React Suspense, el renderizado inicial se retrasa hasta que los datos estén disponibles. 
Esto evita el doble renderizado y proporciona una experiencia más fluida.
*/}
      <ul>

{/* mapeo y representación de datos en forma de una lista en la interfaz de usuario: */}
        {data?.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;


/**
 ****** Usando varios endpoints y reutilizando fetchData ******
 * 
 * 
 * 
 * import fetchData from "./components/fetchData";
import { Suspense } from "react";

const apiData1 = fetchData("https://api.example.com/endpoint1");
const apiData2 = fetchData("https://api.example.com/endpoint2");

function App() {
  const data1 = apiData1.read();
  const data2 = apiData2.read();

  return (
    <div className="App">
      <h1>Fetch like a pro</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <ul>
          {data1?.map((item) => (
            <li key={item.id}>{item.name}</li>
          )}
        </ul>
        <ul>
          {data2?.map((item) => (
            <li key={item.id}>{item.name}</li>
          )}
        </ul>
      </Suspense>
    </div>
  );
}

 */