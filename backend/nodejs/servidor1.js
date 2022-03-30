const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());

let accounts = [];

function lastId(){
  if(accounts.length > 0) {
    return accounts[accounts.length - 1].id + 1;
  }else{
    return 1;
  }
}

app.get("/accounts", (req, res) => {
  res.send(accounts);
});

app.get("/accounts/:id", (req, res) => {
  const id = req.params.id;
  account = accounts.find(a=>a.id==id)
  
  res.send(account);
});

app.post("/accounts", (req, res) => {
  const params = req.body.account;
  const account = { id: lastId(), ...params, password: 'abc123' };
  accounts.push(account);

  res.status(201).send(account);
});

app.put("/accounts/:id", (req, res) => {
  const id = req.params.id;
  const accountToUpdate = accounts.find(a=>a.id==id);

  if(accountToUpdate){
    const account = req.body.account;
    accounts[id] = { id: accountToUpdate.id, ...account };
  }
  
  res.send("ok");
});

app.delete("/accounts/:id", (req, res) => {
  const id = req.params.id;
  accounts = accounts.filter(a=>a.id!=id)
  
  res.status(204);
});

app.listen(3000, () => {
  console.log(`🚀 Example app listening on port ${3000}`);
});
