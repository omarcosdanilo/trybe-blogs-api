require('dotenv').config();
const app = require('./api');
const loginRouter = require('./routes/loginRouter');
const userRouter = require('./routes/userRouter');
const errorMiddleware = require('./middlewares/errorMiddleware');

// não remova a variável `API_PORT` ou o `listen`
const port = process.env.API_PORT || 3000;

// não remova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.use('/login', loginRouter);
app.use('/user', userRouter);
app.use(errorMiddleware);

app.listen(port, () => console.log('ouvindo porta', port));
