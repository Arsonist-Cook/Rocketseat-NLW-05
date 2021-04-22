import express from 'express';

const PORT = 3000;
const app = express();

app.get('/', (request, response) =>{
  return response.json({
    message: 'Olá NLW-05'
  });
});

app.post('/', (request, response)=>{
  return response.json({
    message: 'Usuário salvo com sucesso!'
  })
});

app.get('*', (request, response)=>{
  return response.status(404).send('File Not Found!')
})

app.listen(PORT, () => {
  console.log(`Server running on port #${PORT}`);
});
