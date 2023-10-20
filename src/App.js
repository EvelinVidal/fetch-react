import useFetch from "./components/useFetch";

function App() {

  const {data,loading, error, handleCancelRequest} = useFetch(
    "https://jsonplaceholder.typicode.com/users"
  )
  return (
    <div className="App">
<h1>Fetch like a pro </h1>
<button onClick={handleCancelRequest}>cancel request</button>
<ul>
  {error&&<li>Error:{error}</li>}
   {loading&&<li>loading...</li>} {/*si loading es false, la siguiente parte no se ejecuta */}
  {data?.map((user)=>(
<li key={user.id}>{user.name}{user.id}</li>
    
  ))}
</ul>
    </div>
  );
}

export default App;
