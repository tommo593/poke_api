import GetPokemon from "./components/GetPokemon";
import Typewriter from "typewriter-effect";
import logo from "../src/assets/pkmn_logo.png";

function App() {
  return (
    <>
      <div>
        <img src={logo} alt="Pokémon Logo" className="m-auto" />
        <div className="p-4 border border-double border-gray-600">
          <h1>
            <Typewriter
              onInit={(typewriter) => {
                typewriter
                  .typeString("Pokémon API Stuff")
                  .callFunction(() => {
                    console.log("String typed out!");
                  })
                  .pauseFor(2500)
                  .start();
              }}
            />
          </h1>
        </div>
        <div>
          {" "}
          <GetPokemon />
        </div>
      </div>
    </>
  );
}

export default App;
