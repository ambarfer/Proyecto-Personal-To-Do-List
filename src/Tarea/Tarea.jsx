import React from "react";

import { Box } from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";

export default function Tarea(props) {
  return (
    <>
      <Box
        key={props.index}
        sx={{
          display: "flex",
          padding: "10px",
          margin: "12px 0px 18px 0px",
          alignItems: "center",
          border: "1px solid darkgreenn",
          borderRadius: "5px",
          backgroundColor: "mediumseagreen",
          justifyContent: "space-between",
        }}
      >
        <div>
          {props.name} ( {props.hour} {props.hour <= 1 ? "hour" : "hours"} )
        </div>
        <Box>
          <Button
            variant="contained"
            color="primary"
            startIcon={<EditIcon></EditIcon>}
            onClick={() => props.botonEdit(props.index)}
            sx={{
              justifyContent: "end",
            }}
          ></Button>

          <Button
            variant="contained"
            color="error"
            startIcon={<DeleteIcon></DeleteIcon>}
            onClick={() => props.botonDelete(props.index)}
            disabled={props.deshabilitarBotonDetele}
            sx={{
              alignItems: "center",
              justifyContent: "end",
              marginLeft: "5px",
            }}
          ></Button>
        </Box>
      </Box>
    </>
  );
}
