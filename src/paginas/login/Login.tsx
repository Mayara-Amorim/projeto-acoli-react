import React, { ChangeEvent, useEffect, useState } from 'react';
import { Button, Grid, Paper, TextField, Typography} from '@material-ui/core';
import{Box} from "@mui/material"
import "./Home.css"
import { Toolbar } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import useLocalStorage from 'react-use-localstorage';
import { useDispatch, useSelector } from 'react-redux';
import { TokenState } from '../../store/tokens/tokensReducer';
import UserLogin from '../../models/UserLogin';
import { login } from '../../services/Service';

function Login() {
  let history = useNavigate();

  const dispatch = useDispatch();
    const [token, setToken] =useState('');

  const [userLogin, setUserLogin] = useState<UserLogin>({
    id: 0,
    nome: "",
    usuario: "",
    senha: "",
    foto: "",
    token: "",
  });

  function updatedModel(e: ChangeEvent<HTMLInputElement>) {
    setUserLogin({
      ...userLogin,
      [e.target.name]: e.target.value,
    });
  }

  useEffect(() => {
    if (token != "") {
      history("/home");
    }
  }, [token]);

  async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      await login(`/usuarios/logar`, userLogin, setToken);

      alert("Usuário logado com sucesso!");
    } catch (error) {
      alert("Dados inálidos. Erro ao logar!");
    }
  }

  return (
    <Grid
      className="container"
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
    >
      <Grid className="container-form-login" alignItems="center" xs={6}>
        <Box className="container-inputs" paddingX={20}>
          <form onSubmit={onSubmit}>
            <Typography
              className="titulo-login"
              variant="h3"
              gutterBottom
              component="h3"
              align="center"
            >
              Login
            </Typography>
            <TextField
              value={userLogin.usuario}
              onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
              id="usuario"
              label="usuário"
              variant="outlined"
              name="usuario"
              margin="normal"
              fullWidth
            />
            <TextField
              value={userLogin.senha}
              onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
              id="senha"
              label="senha"
              variant="outlined"
              name="senha"
              margin="normal"
              type="password"
              fullWidth
            />
            <Box marginTop={2} textAlign="center">
              <Button className="btn-enviar" type="submit" variant="contained">
                Logar
              </Button>
            </Box>
          </form>
          <Box display="flex" justifyContent="center" marginTop={3}>
            <Box marginRight={1}>
              <Typography
                variant="subtitle1"
                gutterBottom
                align="center"
                className="legenda-login"
              >
                Não tem uma conta?
              </Typography>
            </Box>
            <Link to="/cadastrousuario">
              <Typography
                variant="subtitle1"
                gutterBottom
                align="center"
                className="legenda-cadastrar"
              >
                Cadastre-se
              </Typography>
            </Link>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
export default Login;
