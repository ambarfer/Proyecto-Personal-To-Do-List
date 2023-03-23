import React from "react";

import { useState } from "react";

import Formulario from "./Formulario/Formulario";
import ModalAlert from "./Modal/ModalAlert";

export default function ToDoListComponent() {
  const [open, setOpen] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const handleClose = () => setOpen(false);

  const openYMessage = (mensaje) => {
    setOpen(true);
    setMensaje(mensaje);
  };

  return (
    <div>
      <h1>TO DO List</h1>
      <Formulario openYMessage={openYMessage}></Formulario>
      <ModalAlert
        open={open}
        handleClose={handleClose}
        mensaje={mensaje}
      ></ModalAlert>
    </div>
  );
}
