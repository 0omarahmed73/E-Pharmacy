const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;
app.use(express.json())

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
    res.status(404).json({message : "اسم المستخدم او كلمة المرور غير صحيحة"});
    console.log(data.data);
  }
  } catch (err)  {
    res.status(500).json({message : "اسم المستخدم او كلمة المرور غير صحيحة"});
    console.log(err);
  }

})
app.listen(port, () => console.log(`Example app listening on port ${port}!`));