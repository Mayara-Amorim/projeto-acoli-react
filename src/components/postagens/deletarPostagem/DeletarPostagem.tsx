import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@material-ui/core";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
// import { toast } from "react-toastify";

import Postagem from "../../../models/Postagem";
import { buscaId, deleteId } from "../../../services/Service";
import { TokenState } from "../../../store/tokens/tokenReducer";

import "./DeletarPostagem.css";
import useLocalStorage from "react-use-localstorage";

function DeletarPostagem() {
  let history = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [token, setToken] = useLocalStorage("token");
  const [post, setPost] = useState<Postagem>();

  useEffect(() => {
    if (token === "") {
      alert("Você precisa estar logado!");
      history("/login");
    }
  }, [token]);

  useEffect(() => {
    if (id !== undefined) {
      findById(id);
    }
  }, [id]);

  async function findById(id: string) {
    buscaId(`/postagens/${id}`, setPost, {
      headers: {
        Authorization: token,
      },
    });
  }

  async function sim() {
    history("/posts"); //rota do front-end

    try {
      await deleteId(`/postagens/${id}`, {
        //rota do back-end
        headers: {
          Authorization: token,
        },
      });
      alert("Postagem deletada com sucesso!");
    } catch (error) {
      alert("Erro ao deletar!");
    }
  }

  function nao() {
    history("/posts");
  }

  return (
    <>
      <Box m={2}>
        <Card variant="outlined">
          <CardContent>
            <Box justifyContent="center">
              <Typography color="textSecondary" gutterBottom>
                Deseja deletar a Postagem:
              </Typography>
              <Typography color="textSecondary">{post?.titulo}</Typography>
            </Box>
          </CardContent>
          <CardActions>
            <Box display="flex" justifyContent="start" ml={1.0} mb={2}>
              <Box mx={2}>
                <Button
                  onClick={sim}
                  variant="contained"
                  className="marginLeft"
                  size="large"
                  color="primary"
                >
                  Sim
                </Button>
              </Box>
              <Box>
                <Button
                  onClick={nao}
                  variant="contained"
                  size="large"
                  color="secondary"
                >
                  Não
                </Button>
              </Box>
            </Box>
          </CardActions>
        </Card>
      </Box>
    </>
  );
}
export default DeletarPostagem;
