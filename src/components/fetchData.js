/*En getSuspender, se crea un mecanismo de control de estado para la promesa. 
Esto se logra mediante el seguimiento de tres estados posibles: "pendiente" (pending),
"éxito" (success) o "error". Cuando se resuelve la promesa, se actualiza el estado y 
se almacena la respuesta o el error. La función read permite acceder a la respuesta 
si está disponible, o bien lanza la promesa si está pendiente, o lanza el error si ocurrió un error.*/

const getSuspender = (promise) => {
  let status = "pending";
  let response;

  const suspender = promise.then(
    (res) => {
      status = "success";
      response = res;
    },
    (err) => {
      status = "error";
      response = err;
    }
  );
/**Cuando se crea una instancia de getSuspender con una promesa, inicialmente,
 * el estado status se establece en "pending" (pendiente de carga) y response 
 * se mantiene sin definir.Cuando la promesa se resuelve con éxito, se actualiza
 * el estado status a "success" (éxito) y se almacena la respuesta en la variable
 *  response. La función read se utiliza para acceder a los datos. Si el estado 
 * es "pending" (es decir, los datos aún se están cargando), la función read 
 * lanzará la promesa (mediante throw suspender). Esto informará a React que la 
 * renderización debe esperar a que los datos se carguen. Si el estado es "error,
 * " la función read lanzará el error (mediante throw response), lo que permitirá 
 * manejar errores si la promesa se rechaza. Cuando el estado es "success," la 
 * función read simplemente devuelve la respuesta, lo que permite acceder a los 
 * datos cargados con éxito. Entonces, la función read no almacena los datos 
 * directamente, sino que proporciona un mecanismo para acceder a los datos una 
 * vez que estén listos y, al mismo tiempo, permite controlar el estado de carga 
 * y posibles errores.
 */
  const read = () => {
    switch (status) {
      case "pending":
        throw suspender;
      case "error":
        throw response;
      default:
        return response;
    }
  };

  return { read };
};

function fetchData(url) {
  const promise = fetch(url)
    .then((response) => response.json())
    .then((json) => json);
  return getSuspender(promise);
}
export default fetchData;

/* En fetchData.js, la función fetchData toma una URL como argumento y utiliza la función fetch
  para realizar una solicitud a esa URL.
  Luego, convierte la respuesta en un objeto JSON. En lugar de devolver directamente la promesa,
 utiliza la función getSuspender para controlar el estado de carga de la promesa.*/
