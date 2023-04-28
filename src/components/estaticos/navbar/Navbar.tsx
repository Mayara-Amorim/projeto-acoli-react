import { AppBar, Toolbar, Box, Typography } from "@material-ui/core";
import { useNavigate, Link } from "react-router-dom";
import useLocalStorage from "react-use-localstorage";

function Navbar() {
    const [token, setToken] = useLocalStorage("token");
    let navigate = useNavigate();
  
    function goLogout() {
      setToken("");
      alert("UsuÃ¡rio deslogado");
      navigate("/login");
    }
  
    return (
      <>
      <div className="navbar">
        <AppBar className="bg-menu">
          <Toolbar variant="dense" className="container-menu">
            <Box style={{ cursor: "pointer" }}>
              {/* <Typography variant="h5" color="inherit">
                Acoli
              </Typography> */}
              <a href="/home">
               <img className="menu-logo" src="./src/assets/logo-acoli.png" alt="Logo" />
              </a>
            </Box>
  
            <div>
              <Box className="menu-links" display="flex">
                <Link to="/home" className="link-home">
                  <Box className="menu-item" mx={2}>
                    <Typography variant="h6" color="inherit">
                      home
                    </Typography>
                  </Box>
                </Link>
  
                {/* link do posts */}
                <Box className="menu-item" mx={2}>
                  <Typography variant="h6" color="inherit">
                    postagens
                  </Typography>
                </Box>
  
                <Link to="/temas">
                  <Box className="menu-item" mx={2}>
                    <Typography variant="h6" color="inherit">
                      temas
                    </Typography>
                  </Box>
                </Link>
  
                <Link to="/formularioTema">
                  <Box className="menu-item" mx={2}>
                    <Typography variant="h6" color="inherit">
                      cadastrar tema
                    </Typography>
                  </Box>
                </Link>
  
                <Link to="/login" className="link-logout">
                  <Box className="menu-item" mx={2}>
                    <Typography variant="h6" color="inherit" onClick={goLogout}>
                      logout
                    </Typography>
                  </Box>
                </Link>
              </Box>
            </div>
          </Toolbar>
        </AppBar>
        </div>
      </>
    );
  }
  export default Navbar