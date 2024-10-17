import GetPokemon from "./components/GetPokemon";
import Typewriter from "typewriter-effect";
import logo from "../src/assets/pkmn_logo.png";
import pika from "../src/assets/pika.png"

function App() {
  return (
    <>
      <div>
        <img src={logo} alt="Pokémon Logo" className="m-auto pt-8 pb-2" />
        <div className="flex justify-center mb-8"><img src={pika} alt="Pikachu" width={100} /></div>
        <div className="p-4">
          <h1>
            <Typewriter
              onInit={(typewriter) => {
                typewriter
                  .typeString("Search Pokémon here...")
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
