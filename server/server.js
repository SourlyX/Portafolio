const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const cors = require('cors');
require('dotenv').config();

const app = express();
const uri = process.env.MONGODB_URI;

app.use(cors());
app.use(bodyParser.json());

// Configuración de nodemailer con SendGrid
app.post('/send-email', async (req, res) => {
  const { name, email, message } = req.body;

  let transporter = nodemailer.createTransport({
    host: 'smtp.sendgrid.net',
    port: 465,
    secure: true,
    auth: {
      user: 'apikey',
      pass: process.env.SENDGRID_API_KEY,
    },
  });

  let mailOptions = {
    from: email,
    to: 'luisferuatrabajos@gmail.com',
    subject: `Nuevo mensaje en portfolio de ${name}`,
    text: message,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send('Correo enviado con éxito');
  } catch (error) {
    console.error('Error sending the email:', error);
    res.status(500).send('Error enviando el correo: ' + error.message);
  }
});

const client = new MongoClient(uri);

// Conexión a MongoDB
async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Conectado a MongoDB');
  } catch (err) {
    console.error('Error conectando a MongoDB:', err);
  }
}

connectToDatabase();

// Rutas de la API
app.get('/api/platos', async (req, res) => {
  try {
    const database = client.db(process.env.DATABASE);
    const menuCollection = database.collection('menu_rest');

    const platos = await menuCollection.aggregate([
      {
        $lookup: {
          from: 'tipo_menu_rest',
          localField: 'tipo_menu',
          foreignField: 'id_tipo_menu',
          as: 'tipo_plato',
        },
      },
      { $unwind: '$tipo_plato' },
      {
        $project: {
          id_plato: '$_id',
          name: '$descripcion',
          no_guarniciones: 1,
          estado: 1,
          tipo_menu: 1,
          tipo_plato: '$tipo_plato.descripcion',
        },
      },
    ]).toArray();

    res.send(platos);
  } catch (err) {
    console.error('error obtaining platos:', err);
    res.status(500).send('error obtaining platos');
  }
});

app.get('/api/referenciasMenu', async (req, res) => {
  try {
    const database = client.db(process.env.DATABASE);
    const refMenuCollection = database.collection('referencias_x_menu_rest');

    const referenciasMenu = await refMenuCollection.aggregate([
      {
        $lookup: {
          from: 'referencias_rest',
          localField: 'id_referencia',
          foreignField: 'id_referencia',
          as: 'referencia',
        },
      },
      { $unwind: '$referencia' },
      {
        $project: {
          id_plato: '$id_plato',
          id_referencia: '$id_referencia',
          id_ref_desc: '$referencia.id_ref_desc',
          valor: '$referencia.valor',
        },
      },
      { $sort: { id_plato: 1, 'referencia.id_ref_desc': 1 } },
    ]).toArray();

    res.send(referenciasMenu);
  } catch (err) {
    console.error('error obtaining referencias del menú:', err);
    res.status(500).send('error obtaining referencias del menú');
  }
});

app.get('/api/referencias', async (req, res) => {
  try {
    const database = client.db(process.env.DATABASE);
    const referenciasCollection = database.collection('referencias_rest');

    const referencias = await referenciasCollection
      .find({}, { projection: { _id: 1, valor: 1 } })
      .toArray();

    res.send(referencias);
  } catch (err) {
    console.error('error obtaining referencias:', err);
    res.status(500).send('error obtaining referencias');
  }
});

app.get('/api/tiposMenu', async (req, res) => {
  try {
    const database = client.db(process.env.DATABASE);
    const tipoMenuCollection = database.collection('tipo_menu_rest');

    const tiposMenu = await tipoMenuCollection.find({}).toArray();

    res.send(tiposMenu);
  } catch (err) {
    console.error('error obtaining tipos de menú:', err);
    res.status(500).send('error obtaining tipos de menú');
  }
});

// Servidor escuchando en puerto 5000
app.listen(5000, () => {
  console.log('Servidor corriendo en el puerto 5000');
});