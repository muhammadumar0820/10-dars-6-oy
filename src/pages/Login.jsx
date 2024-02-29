import '../../src/App.css';
import { Box, Container, Typography, TextField, Button } from "@mui/material";
import { useRef, useState } from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate, Link } from "react-router-dom";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function validate() {
  return true;
}

function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

 
  const handleClose = () => {
    setOpen(false);
    setError('');
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const username = useRef();
  const password = useRef();

  function handleClick(e) {
    e.preventDefault();
    setIsLoading(true);
    const isValid = validate();

    if (isValid) {
      const user = {
        username: username.current.value,
        password: password.current.value,
      };

      fetch(`${import.meta.env.VITE_API}/api/auth/signin`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset-utf-8',
        },
        body: JSON.stringify(user)
      })
            .then(res => res.json())
            .then(data => {
                setIsLoading(false);
                if(data.message == "Invalid Password!") {
                    handleClickOpen();
                    setError(data.message)
                }

                if(data.message == "User Not found.") {
                    handleClickOpen();
                    setError(data.message)
                }

                if(data.id){
                    localStorage.setItem("token", data.accessToken);
                    navigate('/');
                }
            })
            .catch(err => {
                console.log(err);
                setIsLoading(false);
            })
    
    }
  }
  return (
    <Container className='container'>
      <Box sx={{ mx: "auto", width: 600 }}>
        <Typography variant="h3" textAlign={"center"} gutterBottom>
          Login Page
        </Typography>

        <Box sx={{ mx: "auto", width: 600 }}>
          <TextField
            id="outlined-basic"
            label="Username"
            variant="outlined"
            fullWidth
            inputRef={username}
          />
          <TextField
            id="outlined-basic"
            type="password"
            label="Password"
            variant="outlined"
            fullWidth
            sx={{ mt: "1rem" }}
            inputRef={password}
          />
          <Button
            disabled={isLoading ? true : false}
            onClick={handleClick}
            variant="contained"
            fullWidth
            sx={{ mt: "1rem" }}
          >
            {isLoading ? "Loading..." : "Log in"}
          </Button>
          <Link to = '/register'>Register page</Link>
        </Box>
      </Box>

      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Error
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Typography gutterBottom>{error}</Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </Container>
  );
}

export default Login;
