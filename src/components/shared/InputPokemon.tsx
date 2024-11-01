import { useState } from 'react'

const InputPokemon = () => {
    const [description, setDescription] = useState("");
    const onSubmitForm = async (e) => {
      e.preventDefault();
      try {
        const body = { description };
        const response = await fetch("http://localhost:5000/haveCaught", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
  
        window.location = "/";
      } catch (err) {
        console.error(err.message);
      }
    };
  
    return (
      <>
          <button className="btn-primary"
          onSubmit={onSubmitForm}
          onChange={(e) => setDescription(e.target.value)} >
            save
          </button>
      </>
  )
}

export default InputPokemon