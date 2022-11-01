import { useQuery } from "react-query";
import Planet from "./Planet";

const fetchPlanets = async () => {
  const res = await fetch("https://swapi.dev/api/planets/");
  return res.json();
};

const Planets = () => {
  const { data, status } = useQuery("planets", fetchPlanets, {
    staleTime: 0, // default is 0
    // cacheTime: 10,
    onSuccess: () => console.log("data fetched with no problems"),
  });

  return (
    <div>
      <h2>Planets</h2>
      {/* <p>{status}</p> */}
      {status === "loading" && <div>Loading data...</div>}
      {status === "error" && <div>Error fetching data</div>}
      {status === "success" &&
        data.results.map((planet: any) => (
          <Planet key={planet.name} planet={planet} />
        ))}
    </div>
  );
};

export default Planets;
