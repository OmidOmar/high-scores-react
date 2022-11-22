import "./App.css";
import { useState } from "react";

import allCountryScores from "./scores.js";

allCountryScores
  .sort((x, y) => (x.name > y.name ? 1 : -1))
  .map((x) =>
    x.scores.sort((a, b) => {
      return b.s > a.s ? 1 : -1;
    })
  );
let emoji = [
  ["clock", ""],
  ["mailbox", ""],
  ["camera", "flash"],
  ["earth", "rotating"],
  ["moon", "phases"],
  ["inbox", "tray"],
  ["hand", "wave"],
  ["hearts", ""],
  ["hourglass", ""],
];

let allCountryScoresCopy = JSON.parse(JSON.stringify(allCountryScores));

function App() {
  const [data, setData] = useState(allCountryScoresCopy);
  const [sort, setSort] = useState("ASC");

  function sorting() {
    if (sort === "DSC") {
      const sorted = data.filter((x) => {
        return x.scores.sort((a, b) => {
          return b.s > a.s ? 1 : -1;
        });
      });
      setData(sorted);
      setSort("ASC");
    } else {
      const sorted = data.filter((x) => {
        return x.scores.sort((a, b) => {
          return b.s < a.s ? 1 : -1;
        });
      });
      setData(sorted);
      setSort("DSC");
    }
  }

  return (
    <div id="container">
      <div className="table-responsive">
        <h2>
          The worldwide scoreboard shows the high scores regardless of the
          country.
        </h2>
        <table className="table">
          <thead>
            <tr>
              <th>Country</th>
              <th>Name </th>
              <th>Scores</th>
            </tr>
          </thead>
          <tbody>
            {allCountryScores.map((x, i) => {
              let num = Math.floor(Math.random() * 9);
              return (
                <tr key={i}>
                  <td>
                    {x.name}
                    <span
                      className={"emoji " + emoji[num][0]}
                      role="img"
                      aria-label={`${emoji[num][0]} ${emoji[num][1]}`}
                    ></span>
                  </td>
                  <td>{x.scores[0].n}</td>
                  <td>{x.scores[0].s}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p>
        Sort scores by
        <button onClick={sorting} className="btn btn-info m-2">
          {sort}
        </button>
      </p>
      <div className="border rounded p-5">
        {data.map((x, i) => {
          return (
            <div className="border p-4" key={i}>
              <h3>Country: {x.name}</h3>
              <table className="table">
                <tbody>
                  {x.scores.sort().map((x, i) => {
                    return (
                      <tr key={i}>
                        <td>{x.n}</td>
                        <td>{x.s}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
