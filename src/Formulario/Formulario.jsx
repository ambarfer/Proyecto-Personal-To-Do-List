import React from "react";

import { useState } from "react";

import "bootstrap-icons/font/bootstrap-icons.css";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import { useFormik } from "formik";
import * as yup from "yup";

import Tarea from "../Tarea/Tarea";

const validationSchema = yup.object({
  name: yup
    .string("Ingrese la actividad")
    .trim()
    .required("La actividad es requerida"),
  hour: yup.number("Ingrese las horas").required("Las horas son requeridas"),
});

export default function Formulario(props) {
  const [activarGuardar, setActivarGuardar] = useState(false);
  const [tareaSeleccionada, setTareaSeleccionada] = useState({});
  const [listado, setListado] = useState([]);

  const [isEdit, setIsEdit] = useState(false);

  const [deshabilitarBotonDetele, setDeshabilitarBotonDetele] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      hour: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      handleSubmit();
      resetForm();
    },
  });

  const handleSubmit = () => {
    if (isEdit) {
      save();
    } else if (!isEdit) {
      adds();
    }
  };

  const botonDelete = (index) => {
    const newArreglo = [...listado];
    newArreglo.splice(index, 1);
    setListado(newArreglo);
  };

  const botonEdit = (index) => {
    formik.setValues({
      name: listado[index].name,
      hour: listado[index].hour,
    });

    setTareaSeleccionada({
      name: listado[index].name,
      hour: listado[index].hour,
    });

    setDeshabilitarBotonDetele(true);
    setActivarGuardar(true);
  };

  const onAdd = () => {
    setIsEdit(false);
    formik.handleSubmit();
  };

  const onEdit = () => {
    setIsEdit(true);
    formik.handleSubmit();
  };

  const save = () => {
    const indexTareaSeleccionada = listado.findIndex(
      (tarea) =>
        tarea.name === tareaSeleccionada.name &&
        tarea.hour === tareaSeleccionada.hour
    );

    if (formik.values.name === "" || formik.values.hour === "") {
      setActivarGuardar(true);
    } else {
      const newArreglo = [...listado];
      newArreglo.splice(indexTareaSeleccionada, 1, {
        name: formik.values.name,
        hour: formik.values.hour,
      });

      setListado(newArreglo);

      setActivarGuardar(false);
      setDeshabilitarBotonDetele(false);
    }
  };

  const adds = () => {
    if (
      listado.find(
        (tarea) =>
          tarea.name === formik.values.name && tarea.hour === formik.values.hour
      )
    ) {
      props.openYMessage("Exite otra actividad y hora idéntica");
    } else {
      setListado([
        ...listado,
        { name: formik.values.name, hour: formik.values.hour },
      ]);
    }
  };

  return (
    <>
      <form
        style={{
          display: "inline-block",
          padding: "20px",
          margin: "25px",
          borderRadius: "10px",
          backgroundColor: "ghostwhite",
          //width: "710px",
          //height: "210px",
        }}
      >
        <TextField
          id="name"
          name="name"
          label="Activity"
          color="primary"
          focused
          fullWidth
          autoComplete="off"
          value={formik.values.name}
          onChange={formik.handleChange}
          margin="normal"
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />

        <TextField
          id="hour"
          name="hour"
          label="Hours"
          color="primary"
          type="number"
          focused
          fullWidth
          autoComplete="off"
          value={formik.values.hour}
          onChange={formik.handleChange}
          margin="normal"
          error={formik.touched.hour && Boolean(formik.errors.hour)}
          helperText={formik.touched.hour && formik.errors.hour}
        />

        {activarGuardar ? (
          <Button
            variant="contained"
            color="success"
            sx={{
              margin: "7px",
            }}
            onClick={() => onEdit()}
          >
            SAVE
          </Button>
        ) : (
          <Button
            variant="contained"
            onClick={() => onAdd()}
            sx={{
              margin: "7px",
            }}
          >
            ADD
          </Button>
        )}
      </form>

      {listado.map(({ name, hour }, index) => (
        <Tarea
          key={index}
          name={name}
          hour={hour}
          botonDelete={() => botonDelete(index)}
          botonEdit={() => botonEdit(index)}
          deshabilitarBotonDetele={
            tareaSeleccionada.name === name && tareaSeleccionada.hour === hour
              ? deshabilitarBotonDetele
              : false
          }
        ></Tarea>
      ))}
    </>
  );
}
