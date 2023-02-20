const express = require("express");
const pgp = require("pg-promise")();
const dotenv = require("dotenv").config();
const { v4: uuidv4 } = require("uuid");

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

async function main() {
  //PostgreSQL
  console.log("Connecting to database...");
  const db = await pgp(process.env.DB_CONNECTION_STRING);
  const dbTable = "characters";
  console.log("Database conected!");

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
    db.any(`SELECT * FROM ${dbTable}`)
      .then(function (data) {
        console.log("deu bom o Read ALL");
        res.send(data);
      })
      .catch(function (error) {
        console.log("deu ruim o Read ALL");
        res.send(error);
      });
  });
  // Read Single
  app.get("/characters/:id", (req, res) => {
    const id = req.params.id;
    db.any(`SELECT * FROM public.${dbTable} WHERE id = '${id}'`)
      .then(function (data) {
        console.log("deu bom o Read Single");
        res.send(data);
      })
      .catch(function (error) {
        console.log("deu ruim o Read Single");
        res.send(error);
      });
  });

  // Create
  app.post("/characters", (req, res) => {
    const { characterName, color, imgURL } = req.body;
    const id = uuidv4();
    db.none(
      `INSERT INTO public.${dbTable} (id, "characterName", color, "imgURL" ) VALUES('${id}', '${characterName}', '${color}', '${imgURL}')`
    )
      .then((result) => {
        console.log("Deu bom o create");
        res.send(result);
      })
      .catch((error) => {
        console.log("Deu ruim o create");
        res.send("Deu ruim");
      });
  });

  // Update
  app.put("/characters/:id", (req, res) => {
    const id = req.params.id;
    const { characterName, color, imgURL } = req.body;

    db.none(
      `UPDATE public.${dbTable}
	SET id='${id}', "characterName"='${characterName}', color='${color}', "imgURL"='${imgURL}'
	WHERE id = '${id}';`
    )
      .then(function (data) {
        console.log("deu bom o Update");
        res.send(data);
      })
      .catch(function (error) {
        console.log("deu ruim o Update");
        res.send(error);
      });
  });

  // Remove
  app.delete("/characters/:id", (req, res) => {
    const id = req.params.id;
    db.none(`DELETE FROM public.${dbTable} WHERE id = '${id}'`)
      .then(function (data) {
        console.log("deu bom o Remove");
        res.send(data);
      })
      .catch(function (error) {
        console.log("deu ruim o Remove");
        res.send(error);
      });
  });

  //API-PORT
  app.listen(port, () => {
    console.log(`Application running at http://localhost:${port}/`);
  });
}

main();
