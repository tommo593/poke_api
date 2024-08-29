import GetPokemon from "./components/GetPokemon";
import Typewriter from "typewriter-effect";
import logo from "../src/assets/pkmn_logo.png";

function App() {
  return (
    <>
      <div>
        <img src={logo} alt="Pokémon Logo" className="m-auto pt-6 pb-6" />
        <div className="p-4">
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
          <div className="flex flex-row justify-center gap-4">
            <button className="border border-gray-500 bg-blue-300 hover:bg-blue-400 active:bg-blue-800 gap-4 px-4">
              Search
            </button>
            <input
              type="text"
              className="bg-blue-300 shadow-md w-60 outline-none"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
