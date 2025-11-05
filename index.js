const express = require('express');
const app = express();
const PORT = 3001;
const db = require('./models');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(PORT, () => {
    console.log('Server started on port 3000');
})


// sync database
db.sequelize.sync()
   .then((result) => {
        app.listen(3000, () => {
            console.log('Server started');
        });
    })
    .catch((err) => {
        console.log(err);
    });

// create hotel
app.post('/hotel', async (req, res) => {
    const data = req.body;
    try {
        const hotel = await db.Hotel.create(data);
        res.send(hotel);
    } catch (error) {
        res.send({message: error.message});
    }
});

// read hotel
app.get('/hotel', async (req, res) => {
  try {
    const hotels = await db.Hotel.findAll();
    res.json(hotels);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});


// update hotel
app.put('/hotel/:id', async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    try {
        const hotel = await db.Hotel.findByPk(id);
        if (!hotel) {
            return res.status(404).send({message: 'Hotel not found'});
        }
        await hotel.update(data);
        res.send({message: "Hotel berhasil diupdate"}, hotel);
    } catch (error) {
        res.send({message: error.message});
    }
});

// delete hotel
    app.delete('/hotel/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const hotel = await db.Hotel.findByPk(id);
        if (!hotel) {
            return res.status(404).send({message: 'Hotel not found'});
        }
        await hotel.destroy();
        res.send({message: "Hotel berhasil dihapus"});
    } catch (error) {
        res.status(500).send(err)
    }
});
