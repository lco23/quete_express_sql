const connection = require('./conf');
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({
    extended: true
  }));

app.get('/', (req, res) => {
    connection.query('SELECT * from desserts', (err, results) => {
      if (err) {
        res.status(500).send('Erreur lors de la récupération des données');
      } else {
        res.json(results);
      }
    });
  });

  app.get('/name', (req, res) => {
    connection.query('SELECT name from desserts', (err, results) => {
      if (err) {
        res.status(500).send('Erreur lors de la récupération des données');
      } else {
        res.json(results);
      }
    });
  });

  app.get('/ingredients', (req, res) => {
    connection.query('SELECT nb_ingredients from desserts', (err, results) => {
      if (err) {
        res.status(500).send('Erreur lors de la récupération des données');
      } else {
        res.json(results);
      }
    });
  });

  app.get('/chocolat', (req, res) => {
    connection.query(`SELECT name from desserts where name like '%cho%'` , (err, results) => {
      if (err) {
        res.status(500).send('Erreur lors de la récupération des données');
      } else {
        res.json(results);
      }
    });
  });

  app.get('/date', (req, res) => {
    connection.query(`SELECT date from desserts where date like '2020%'` , (err, results) => {
      if (err) {
        res.status(500).send('Erreur lors de la récupération des données');
      } else {
        res.json(results);
      }
    });
  });

  app.get('/nb_ingredients', (req, res) => {
    connection.query(`SELECT nb_ingredients from desserts order by nb_ingredients desc` , (err, results) => {
      if (err) {
        res.status(500).send('Erreur lors de la récupération des données');
      } else {
        res.json(results);
      }
    });
  });

  app.post('/', (req, res) => {
    const formData = req.body;
    connection.query('INSERT INTO desserts SET ?', formData, (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send("Erreur lors de la MAJ des recettes");
      } else {
        res.sendStatus(200);
      }
    });
  });

  app.put('/:id', (req, res) => {
    const idDesserts = req.params.id;
    const formData = req.body; 
    connection.query('UPDATE desserts SET ? WHERE id = ?', [formData, idDesserts], err => {
      if (err) {
        console.log(err);
        res.status(500).send("Erreur lors de la modification d'une recette");
      } else {
        res.sendStatus(200);
      }
    });
  });
  
  app.put('/deja_realisee/:name', (req, res) => {
    const idDesserts = req.params.name;
    const formData = req.body; 
    connection.query('UPDATE desserts SET ? `deja_realisee`=not `deja_realisee` where name=?', [formData, idDesserts], err => {
      if (err) {
        console.log(err);
        res.status(500).send("Erreur lors de la modification d'une recette");
      } else {
        res.sendStatus(200);
      }
    });
  });

  app.delete('/:id', (req, res) => {
    const idDesserts = req.params.id;
    connection.query('DELETE FROM desserts WHERE id = ?', [idDesserts], err => {
      if (err) {
        console.log(err);
        res.status(500).send("Erreur lors de la suppression de la recette");
      } else {
        res.sendStatus(200);
      }
    });
  });

  app.delete('/delete/false', (req, res) => {
    const idDesserts = req.params.id;
    connection.query('DELETE FROM desserts WHERE `deja_realisee`=false', [idDesserts], err => {
      if (err) {
        console.log(err);
        res.status(500).send("Erreur lors de la suppression de la recette");
      } else {
        res.sendStatus(200);
      }
    });
  });


app.listen(port, (err) => {
  if (err) {
    throw new Error('Something bad happened...');
  }

  console.log(`Server is listening on ${port}`);
});