import React from "react";
import "./formulario.css";
import { useState } from "react";

import "bootstrap-icons/font/bootstrap-icons.css";

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
    <div className="contenedor">
      <form className="contenedor_form">
        <input
          type={"text"}
          className="form__name"
          placeholder="Activity"
          required
          autoComplete="off"
          value={name}
          onChange={inputChangeName}
        />
        <input
          type={"number"}
          className="form__hours"
          placeholder="Hours"
          required
          autoComplete="off"
          value={hour}
          onChange={inputChangeHour}
        />

        {activarGuardar ? (
          <button
            type={"button"}
            className="boton_guardar"
            onClick={() => botonSave()}
          >
            SAVE
          </button>
        ) : (
          <button type={"button"} className="boton_add" onClick={botonAdd}>
            ADD
          </button>
        )}
      </form>

      {listado.map((tarea, index) => (
        <div className="respuesta" key={index}>
          {tarea.name} ( {tarea.hour} {tarea.hour <= 1 ? "hour" : "hours"} )
          <div className="botones_respuesta">
            <button
              type="button"
              className="boton_eliminar"
              onClick={() => botonDelete(index)}
            >
              <i className="bi bi-trash"></i>
            </button>
            <button
              type="button"
              className="boton_editar"
              onClick={() => botonEdit(index)}
            >
              <i className="bi bi-pencil"></i>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
