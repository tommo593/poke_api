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
        <div><GetPokemon /></div>
        </div>
    </>
  );
}

export default App;
