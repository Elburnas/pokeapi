import { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const [pokemons, setPokemons] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const limit = 10;
  const offset = (page - 1) * limit;

  useEffect(() => {
    const controller = new AbortController();

    async function loadPokemons() {
      setLoading(true);
      try {
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`,
          { signal: controller.signal }
        );
        const data = await res.json();

        const detailedPokemons = await Promise.all(
          data.results.map(async (pokemon) => {
            const res = await fetch(pokemon.url, { signal: controller.signal });
            const resDetail = await res.json();

            return {
              id: resDetail.id,
              name: resDetail.name,
              types: resDetail.types.map((t) => t.type.name),
            };
          })
        );

        setPokemons(detailedPokemons);
      } catch (e) {
        if (e.name !== "AbortError") console.error(e);
      } finally {
        setLoading(false);
      }
    }

    async function loadSearchedPokemon(term) {
      setLoading(true);
      try {
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${term.toLowerCase()}`,
          { signal: controller.signal }
        );

        if (!res.ok) {
          setPokemons([]);
          return;
        }

        const resDetail = await res.json();
        setPokemons([
          {
            id: resDetail.id,
            name: resDetail.name,
            types: resDetail.types.map((t) => t.type.name),
          },
        ]);
      } catch (e) {
        if (e.name !== "AbortError") console.error(e);
      } finally {
        setLoading(false);
      }
    }

    const term = searchTerm.trim();

    if (term) {
      loadSearchedPokemon(term);
    } else {
      loadPokemons();
    }

    return () => controller.abort();
  }, [page, searchTerm]); 

  const searching = searchTerm.trim().length > 0;

  return (
    <div className="app-container">
      <h1 className="autor">Jaider David Pérez Zapata</h1>

      <div style={{ margin: "12px 0" }}>
        <input
          type="text"
          placeholder="Buscar Pokémon por nombre o # de Pokedex (ej: pikachu o 25)"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setPage(1);
          }}
          style={{ padding: 8, width: "100%", maxWidth: 420 }}
        />
      </div>

      {loading && <p>Cargando...</p>}

      <div className="table-wrapper">
        <table className="pokemon-table">
          <thead>
            <tr>
              <th>Pokedex #</th>
              <th>Nombre</th>
              <th>Tipos</th>
            </tr>
          </thead>
          <tbody>
            {pokemons.length === 0 && !loading ? (
              <tr>
                <td colSpan="3">Sin resultados</td>
              </tr>
            ) : (
              pokemons.map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.name}</td>
                  <td>{p.types.join(", ")}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {}
      {!searching && (
        <div className="pagination">
          <button onClick={() => setPage((p) => Math.max(p - 1, 1))}>
            ◀ Anterior
          </button>

          <span className="paginado">Página {page}</span>

          <button onClick={() => setPage((p) => p + 1)}>
            Siguiente ▶
          </button>
        </div>
      )}
    </div>
  );
}
