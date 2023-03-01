import React from "react";
import "./formulario.css";
import { useState } from "react";

import "bootstrap-icons/font/bootstrap-icons.css";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export default function Formulario() {
  const [name, setName] = useState("");
  const [hour, setHour] = useState("");
  const [activarGuardar, setActivarGuardar] = useState(false);
  const [tareaSeleccionada, setTareaSeleccionada] = useState({});
  const [listado, setListado] = useState([]);

  const inputChangeName = (event) => {
    setName(event.target.value);
  };

  const inputChangeHour = (event) => {
    setHour(event.target.value);
  };

  const botonAdd = () => {
    if (name.trim() === "" || hour.trim() === "") {
      window.alert("Debe ingresar: Actividad y Horas completo");
    } else {
      setListado([...listado, { name: name.trim(), hour: hour }]);

      setName("");
      setHour("");
    }
  };

  const botonDelete = (index) => {
    const newArreglo = [...listado];
    newArreglo.splice(index, 1);
    setListado(newArreglo);
  };

  const botonEdit = (index) => {
    setName(listado[index].name);
    setHour(listado[index].hour);
    setTareaSeleccionada({
      name: listado[index].name,
      hour: listado[index].hour,
    });

    setActivarGuardar(true);
  };

  const botonSave = () => {
    const indexTareaSeleccionada = listado.findIndex(
      (tarea) =>
        tarea.name === tareaSeleccionada.name &&
        tarea.hour === tareaSeleccionada.hour
    );
    console.log(indexTareaSeleccionada);

    if (name.trim() === "" || hour.trim() === "") {
      window.alert("Debe ingresar: Actividad y Horas completo");
      setActivarGuardar(true);
    } else {
      const newArreglo = [...listado];
      newArreglo.splice(indexTareaSeleccionada, 1, {
        name: name.trim(),
        hour: hour,
      });

      setListado(newArreglo);

      setName("");
      setHour("");
      setActivarGuardar(false);
    }
  };

  return (
    <Box
      width={"50%"}
      style={{
        padding: "20px",
        margin: "auto",
        borderRadius: "10px",
        backgroundColor: "ghostwhite",
      }}
    >
      <TextField
        label="Activity"
        color="primary"
        focused
        fullWidth
        required
        autoComplete="off"
        value={name}
        onChange={inputChangeName}
        margin="normal"
      />

      <TextField
        type="number"
        label="Hours"
        color="primary"
        focused
        fullWidth
        required
        autoComplete="off"
        value={hour}
        onChange={inputChangeHour}
        margin="normal"
      />

      {activarGuardar ? (
        <Button
          variant="contained"
          color="success"
          onClick={() => botonSave()}
          style={{
            margin: "7px",
          }}
        >
          SAVE
        </Button>
      ) : (
        <Button
          variant="contained"
          onClick={botonAdd}
          sx={{
            margin: "7px",
          }}
        >
          ADD
        </Button>
      )}

      {listado.map((tarea, index) => (
        <Box
          key={index}
          sx={{
            display: "flex",
            padding: "17px",
            margin: "7px",
            alignItems: "center",
            border: "1px solid darkgreenn",
            borderRadius: "5px",
            backgroundColor: "mediumseagreen",
          }}
        >
          {tarea.name} ( {tarea.hour} {tarea.hour <= 1 ? "hour" : "hours"} )
          <Box
            style={{
              display: "flex",
              flexDirection: "row-reverse",
              flex: "auto",
            }}
          >
            <Button
              variant="contained"
              color="error"
              startIcon={<DeleteIcon></DeleteIcon>}
              onClick={() => botonDelete(index)}
              style={{ margin: 3, alignItems: "center", justifyContent: "end" }}
            ></Button>

            <Button
              variant="contained"
              color="primary"
              startIcon={<EditIcon></EditIcon>}
              onClick={() => botonEdit(index)}
              style={{
                margin: 3,
                alignItems: "center",
                justifyContent: "end",
              }}
            ></Button>
          </Box>
        </Box>
      ))}
    </Box>
  );
}
