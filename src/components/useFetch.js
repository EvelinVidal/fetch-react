import { useState,useEffect } from "react";

function useFetch(url) {
const [data, setData] = useState(null);
const [loading, setLoading] =useState(true)
const [error, setError]=useState(null)
const [controller, setController] = useState(null)
useEffect(()=>{
    const abortController =  new AbortController(); 
    setController(abortController)
    setLoading(true)

    fetch(url, { signal: abortController.signal })
    .then((response) => response.json())
    .then((data) => setData(data))
    .catch((error) => {
      if (error.name === "AbortError") {
        console.log("Cancelled request");
      } else {
        setError(error);
      }
    })

    .finally(()=> setLoading(false)); // finally se ejecuta cuando se resuelven todas promesas, es mejor que usar solo setLoading(false)
return ()=> abortController.abort() // la funcion se ejecuta cuando el componente se ha desmontado, cuando se cierra la pestaña o se a cambiado de página. Es una función de limpieza para evitar fugas de memoria. 
},[]);


const handleCancelRequest =()=>{
    if (controller){
        controller.abort()
    }
}
  return {data,loading, error,handleCancelRequest}// devolvemos el valor de data y loading
}

export default useFetch;

