import { Key, useState } from "react";
import { usePaginatedQuery } from "react-query";
import Planet from "./Planet";

const fetchPlanets = async (key: Key, page: number) => {
  const res = await fetch(`https://swapi.dev/api/planets/?page=${page}`);
  return res.json();
};

const Planets = () => {
  const [page, setPage] = useState(1);
  const { resolvedData, latestData, status } = usePaginatedQuery(
    ["planets", page],
    fetchPlanets,
    {
      staleTime: 0, // default is 0
      // cacheTime: 10,
      onSuccess: () => console.log("data fetched with no problems"),
    }
  );

  return (
    <div>
      <h2>Planets</h2>
      {status === "loading" && <div>Loading data...</div>}
      {status === "error" && <div>Error fetching data</div>}
      {status === "success" && (
        <>
          <button
            disabled={page === 1}
            onClick={() => setPage((old) => Math.max(old - 1, 1))}
          >
            Previous page
          </button>
          <span>{page}</span>
          <button
            disabled={!latestData || !latestData.next}
            onClick={() =>
              setPage((old) =>
                !latestData || !latestData.next ? old : old + 1
              )
            }
          >
            Next page
          </button>
          {resolvedData.results.map((planet: any) => (
            <Planet key={planet.name} planet={planet} />
          ))}
        </>
      )}
    </div>
  );
};

export default Planets;
