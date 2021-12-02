
// =======================================
//              DEPENDENCIES
// =======================================
const express = require('express');
const pokemon = require('./models/pokemon.js');
const methodOverride = require("method-override");
const app = express();
const PORT = process.env.PORT || 4000;

// =======================================
//              DATABASE
// =======================================
const Pokemon = require('./models/pokemon.js');

// =======================================
//              MIDDLEWARE
// =======================================
app.use(express.static("public"));
app.use(express.urlencoded());
app.use(methodOverride("_method"));


// =======================================
//              ROUTES
// =======================================


// render pokemon list
app.get('/pokemon', (req, res) => {

    res.render('pages/index.ejs', { data: Pokemon });

});

// create new pokemon page
app.get('/pokemon/new', (req, res) => {

    res.render('pages/new.ejs');

});

//render individual pokemon
app.get('/pokemon/:id', (req, res) => {
    const { id } = req.params;
    res.render('pages/show.ejs', { pokemon: Pokemon[id], id: id });

});

// edit exisitng pokemon page
app.get('/pokemon/:id/edit', (req, res) => {
    const { id } = req.params;
    res.render('pages/edit.ejs', { index: id, Pokemon: Pokemon[id] });
});

app.post('/pokemon', (req, res) => {
    const { name } = req.body;

    //get the id of the last pokemon
    let lastPokemon = Pokemon[Pokemon.length - 1];

    //get a random pokemon to use their stats and info

    let randPokemon = Pokemon[Math.floor(Math.random() * Pokemon.length)];

    //create our new pokemon
    let newPokemon = {
        ...randPokemon,
        id: (parseInt(lastPokemon.id) + 1).toString(),
        name: name
    }

    //add new pokemon to the list
    Pokemon.push(newPokemon);
    res.redirect('/pokemon');
});

app.put('/pokemon/:id', (req, res) => {
    const { name } = req.body;
    const { id } = req.params
    Pokemon[id].name = name;
    res.redirect('/pokemon');
});

app.delete('/pokemon/:id', (req, res) => {
    const { id } = req.params;
    Pokemon.splice(id, 1);
    res.redirect('/pokemon');
});

app.get('/', (req, res) => {
    res.redirect('/pokemon');
})

// =======================================
//              LISTENER
// =======================================
app.listen(PORT, () => {
    console.log(`PokeDex listening on port: ${PORT}`);
});