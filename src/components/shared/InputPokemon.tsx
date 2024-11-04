import { useState } from 'react';

const InputPokemon: React.FC = () => {
  const [description, setDescription] = useState<string>("");

  const onSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const body = { description };
      const response = await fetch("http://localhost:5000/haveCaught", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      window.location.href = "/";
    } catch (err) {
      console.error(err instanceof Error ? err.message : "Unknown error");
    }
  };

  return (
    <form onSubmit={onSubmitForm}>
      <input
        type="text"
        placeholder="Enter description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="input-field"
      />
      <button type="submit" className="btn-primary">
        Save
      </button>
    </form>
  );
};

export default InputPokemon;