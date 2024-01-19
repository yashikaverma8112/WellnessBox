const express = require('express')
const app = express()
const port = 5000
const mongodb = require('./db');
const cors = require('cors')
app.use(cors());
mongodb((err)=>{
  console.log(err);

}
)

app.use(express.json());
app.use('/api',require('./routes/CreateUser'))
app.use('/api',require('./routes/DisplayData'))
app.use('/api',require('./routes/OrderData'))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})