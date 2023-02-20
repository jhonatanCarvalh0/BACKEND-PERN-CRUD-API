const express = require("express");

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

//API-DATA
const stevenUniverseCharacters = [
  {
    characterName: "Steven Universe",
    color: "Pink",
    imgURL:
      "https://static.wikia.nocookie.net/steven-universe/images/1/12/StevenUniverse16_-2-_By_TheOffColors.png/revision/latest/scale-to-width-down/350?cb=20201130004033",
  },
  {
    characterName: "Lion",
    color: "Pink",
    imgURL:
      "https://static.wikia.nocookie.net/steven-universe/images/4/4d/Lion_New_Pose_Normal_Eyes.png/revision/latest/scale-to-width-down/350?cb=20201001151653",
  },
  {
    characterName: "Garnet",
    color: "Red & Blue",
    imgURL:
      "https://static.wikia.nocookie.net/steven-universe/images/2/27/Garnet_With_Rings.png/revision/latest/scale-to-width-down/287?cb=20201009220822",
  },
  {
    characterName: "Pearl",
    color: "Light peach",
    imgURL:
      "https://static.wikia.nocookie.net/steven-universe/images/3/38/CYM_Pearl_Request_by_RylerGamerDBS.png/revision/latest/scale-to-width-down/305?cb=20210426225857",
  },
  {
    characterName: "Amethyst",
    color: "Purple",
    imgURL:
      "https://static.wikia.nocookie.net/steven-universe/images/4/4b/Amethyst_CYM_Outfit.png/revision/latest/scale-to-width-down/350?cb=20201009220754",
  },
];

// API-CRUD

// Read All
app.get("/characters", (req, res) => {
  res.send(stevenUniverseCharacters);
});
// Read Single
app.get("/characters/:id", (req, res) => {
  const id = req.params.id;
  const position = id - 1;
  const characterData = stevenUniverseCharacters[position];

  res.send(characterData);
});

// Create
app.post("/characters", (req, res) => {
  const newCharacter = req.body;
  stevenUniverseCharacters.push(newCharacter);

  res.send(`Character created sucessfully!`);
});

// Update
app.put("/characters/:id", (req, res) => {
  const id = req.params.id;
  const newData = req.body;

  const position = id - 1;
  stevenUniverseCharacters[position] = newData;

  res.send(`Character Updated sucessfully!`);
});

// Remove
app.delete("/characters/:id", (req, res) => {
  const id = req.params.id;
  const newData = req.body;

  const position = id - 1;
  stevenUniverseCharacters.splice(position, 1);
  res.send(`Character Removed sucessfully!`);
});

//API-PORT
app.listen(port, () => {
  console.log(`Application running at http://localhost:${port}/`);
});
