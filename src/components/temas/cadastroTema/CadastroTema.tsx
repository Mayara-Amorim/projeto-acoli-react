import React, { ChangeEvent, useEffect, useState } from "react";
import { Container, Typography, TextField, Button } from "@material-ui/core";
import "./CadastroTema.css";
import { useNavigate, useParams } from "react-router-dom";
import useLocalStorage from "react-use-localstorage";
import Tema from "../../../models/Tema";
import { buscaId, post, put } from "../../../services/Service";

function CadastroTema() {
  let navigate = useNavigate();

  const { id } = useParams<{ id: string }>();

  const [token, setToken] = useLocalStorage("token");

  const [tema, setTema] = useState<Tema>({
    id: 0,
    nome: "",
    descricao: "",
  });

  useEffect(() => {
    if (token == "") {
      alert("Você precisa estar logado");
      navigate("/login");
    }
  }, [token]);

  useEffect(() => {
    if (id !== undefined) {
      findById(id);
    }
  }, [id]);

  async function findById(id: string) {
    buscaId(`/temas/${id}`, setTema, {
      headers: {
        Authorization: token,
      },
    });
  }

  async function updatedTema(e: ChangeEvent<HTMLInputElement>) {
    setTema({
      ...tema,
      [e.target.name]: e.target.value,
    });
  }

  async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("tema " + JSON.stringify(tema));

    if (id != undefined) {
      console.log(tema);
      put(`/temas`, tema, setTema, {
        headers: {
          Authorization: token,
        },
      });
      alert("Tema atualizado com sucesso");
    } else {
      post(`/temas`, tema, setTema, {
        headers: {
          Authorization: token,
        },
      });
      alert("Tema cadastrado com sucesso");
    }
    back();
  }

  function back() {
    navigate("/temas");
  }

  return (
    <Container maxWidth="sm" className="container-tema">
      <form onSubmit={onSubmit} className="formulario-cadastrar-tema">
        <Typography
          variant="h3"
          color="textSecondary"
          component="h1"
          align="center"
          className="titulo-cadastrar-tema"
        >
          Cadastrar Tema
        </Typography>
        <TextField
          value={tema.nome}
          onChange={(e: ChangeEvent<HTMLInputElement>) => updatedTema(e)}
          id="nome"
          label="nome"
          variant="outlined"
          name="nome"
          margin="normal"
          fullWidth
        />
        <TextField
          value={tema.descricao}
          onChange={(e: ChangeEvent<HTMLInputElement>) => updatedTema(e)}
          id="descricao"
          label="descricao"
          variant="outlined"
          name="descricao"
          margin="normal"
          fullWidth
        />
        <Button type="submit" variant="contained" color="primary" className="btn-finalizar">
          Finalizar
        </Button>
      </form>
    </Container>
  );
}

export default CadastroTema;
