app.get('/api/annonsers', (req, res) => {
    Ad.find()
      .then(ads => res.status(200).json(ads))
      .catch(err => res.status(500).send(err));
  });
  