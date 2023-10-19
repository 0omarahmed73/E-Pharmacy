const express = require('express');
const axios = require('axios');
require('dotenv').config();
const cors = require('cors');
const app = express();
const port = process.env.PORT;
app.use(express.json())
app.use(cors());
app.post('/users/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const data = await axios.post('http://localhost:5000/users/login' , {
    username : username,
    password : password  
  });
  if (data.status === 200) {
    res.status(200).json(data.data);
    console.log(data.data);
  } else {
    res.status(404).json({message : "الرجاء التأكد من البريد الالكتروني وكلمة المرور"});
    console.log(data.data);
  }
  } catch (err)  {
    res.status(500).json({message : "الرجاء التأكد من البريد الالكتروني وكلمة المرور"});
    console.log(err);
  }

})
app.listen(port, () => console.log(`Example app listening on port ${port}!`));