import * as React from "react";
import { useState, useEffect } from "react";

import Button from "@mui/material/Button";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import Stack from "@mui/material/Stack";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function About() {
  const [imagenUrl, setImagenUrl] = useState(`https://cataas.com/cat/gif`);
  const [btnCambioImagen, setBtnCambioImagen] = useState(
    `https://cataas.com/cat/gif`
  );
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    setCargando(true);
    fetch(btnCambioImagen)
      .then((response) => {
        if (response.ok) {
          setImagenUrl(response.url);
          setCargando(false);
        } else {
          throw new Error("Error al contactar a la API, intentelo nuevamente");
        }
      })
      .catch((error) =>
        setImagenUrl(
          `https://s.mxmcdn.net/images-storage/albums5/0/4/5/8/8/4/39488540_350_350.jpg`
        )
      );
  }, [btnCambioImagen]);

  const handleClick = () => {
    setBtnCambioImagen(imagenUrl + `?v=${new Date().getTime()}`);
  };

  return (
    <div>
      {cargando ? (
        <Box
          sx={{ display: "flex", height: "480px", alignItems: "center" }}
          justifyContent={"center"}
        >
          <CircularProgress />
        </Box>
      ) : null}
      {cargando ? null : (
        <img
          style={{ width: "480px", height: "480px" }}
          src={imagenUrl}
          alt="Imagen"
        />
      )}
      <Stack sx={{ display: "block", marginBlock: "25px" }}>
        <Button
          variant="contained"
          endIcon=<CameraAltIcon />
          onClick={() => handleClick()}
          size="large"
        >
          Cambiar Imagen
        </Button>
      </Stack>

      <Box
        display={"inline-block"}
        sx={{
          marginTop: "70px",
          width: "480px",
          padding: "15px",
          backgroundColor: "#aac7df",
          "&:hover": {
            backgroundColor: "#b6c6d3",
            opacity: [0.9, 0.8, 0.7],
          },
        }}
      >
        <b>To Do List:</b> Es un formulario que permite tener una lista de
        tareas pendientes a realizar, donde se tiene la opción de editar la
        tarea ingresada o eliminarla. Adicionalmente, el formulario no acepta
        ingresar tareas duplicadas o ingresar tareas en blanco.
      </Box>
    </div>
  );

  // const botonImagen = () => {
  //   try {
  //     setImagenUrl(imagenUrl + `?v=${new Date().getTime()}`);
  //   } catch (error) {
  //     setImagenUrl(
  //       `https://s.mxmcdn.net/images-storage/albums5/0/4/5/8/8/4/39488540_350_350.jpg`
  //     );
  //   }
  // };

  // return (
  //   <div>
  //     <img
  //       style={{ width: "480px", height: "480px" }}
  //       src={imagenUrl}
  //       alt="Imagen"
  //     />

  //     <Stack sx={{ display: "block", marginBlock: "25px" }}>
  //       <Button
  //         variant="contained"
  //         endIcon={<CameraAltIcon />}
  //         onClick={() => botonImagen()}
  //         size="large"
  //       >
  //         Cambiar Imagen
  //       </Button>
  //     </Stack>
  //   </div>
  // );
}
