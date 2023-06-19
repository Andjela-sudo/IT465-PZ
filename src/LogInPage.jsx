import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import * as yup from "yup";
import { useFormik } from "formik";

import {
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";

import { Visibility, VisibilityOff } from "@mui/icons-material";

import axios from "axios";

const LoginPage = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const [isAuth, setIsAuth] = useState("");

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const initialValues = {
    email: "",
    password: "",
  };

  const onSignIn = async (values) => {
    try {
      setError("");
      const loginRequest = {
        email: values.email,
        password: values.password,
        username: values.email,
      };

     // let res = await authService.login(user);
    //  axios.post('http://localhost:8080/login',loginRequest,{withCredentials:true}).then(res => {
    //     const sessionCookie = res.headers['set-cookie']
    //     console.log(sessionCookie)
    //     console.log(res)
    //     if(res.status==200){
    //       localStorage.setItem("auth", true);
    //       //navigate("/home");
    //     }
   
    //  })
     navigate("/home")
      // if (res.status === 200) {
      //   // const tok = JSON.stringify(res.data);
      //   // const parsedData = JSON.parse(tok);

      //   // localStorage.setItem("token", parsedData.access);
      //   // localStorage.setItem("refreshToken", parsedData.refresh);

      //   navigate("/home");
      //   navigate(0);
      // }
    } catch (error) {
      setError(error);
    }
  };

  const loginSchema = yup.object({
    email: yup
      .string()
      .email("email not valid")
      .required("email required"),
    password: yup.string().required("password required"),
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: loginSchema,
    onSubmit: onSignIn,
  });

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{ display: "flex", alignItems: "center", height: "100vh" }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main', width: '80px', height: '80px' }}>
        </Avatar>
        <Typography variant="h4" textAlign={"center"}>
          {"Login"}
        </Typography>
        <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            fullWidth
            variant="outlined"
            autoFocus
            id="email"
            name="email"
            label={"email"}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            margin="normal"
            fullWidth
            id="password"
            label={"password"}
            name="password"
            variant="outlined"
            type={showPassword ? "text" : "password"}
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {error !== "" && (
            <Typography variant="body" color={(t) => t.palette.error.main}>
              {error}
            </Typography>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {"LOGIN"}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
