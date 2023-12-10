const axios = require("axios");
const { createWriteStream } = require("fs");

async function fetchPokemon() {
  try {
    const res = await axios.get(
      "https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json",
      { responseType: "arraybuffer" }
    );

    const buffer = Buffer.from(res.data);

    const writeStream = createWriteStream("./pokemon.json");
    writeStream.write(buffer);
    console.log("Data fetched successfully.");
  } catch (err) {
    console.error("Error fetching data.", error.message);
  }
}
fetchPokemon();
