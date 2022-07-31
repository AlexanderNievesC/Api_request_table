import { useState, useEffect } from "react";
import DataTable, { createTheme } from "react-data-table-component";
import { CSVLink } from "react-csv";
import styled from "@emotion/styled";

// Obteniendo datos de la api
const UsingFetch = () => {
  const [users, setUsers] = useState([]);

  const fetchData = () => {
    const API_URL = "https://randomuser.me/api/?results=15";
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        let people = data.results;
        let data_required = [];

        people.map((element) => {
          let new_hash = {
            name: element.name.first,
            last_name: element.name.last,
            age: element.dob.age,
            genre: element.gender.charAt(0).toUpperCase(),
            email: element.email,
            nationality: element.nat,
            picture: element.picture.thumbnail,
          };

          data_required.push(new_hash);
        });
        console.log(data_required);
        setUsers(data_required);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Dando propiedades a la tabla
  createTheme("solarized", {
    text: {
      primary: "white",
      secondary: "#2aa198",
    },
    background: {
      default: "#002b36",
    },
    context: {
      background: "#cb4b16",
      text: "#FFFFFF",
    },
    divider: {
      default: "#073642",
    },
    action: {
      button: "rgba(0,0,0,.54)",
      hover: "rgba(0,0,0,.08)",
      disabled: "rgba(0,0,0,.12)",
    },
  });
  // Introduciendo datos a la tabla
  const columns = [
    { id: "Nombre", name: "Nombre", selector: (row) => row.name },
    {
      id: "Apellido",
      name: "Apellido",
      selector: (row) => row.last_name,
    },
    { id: "Edad", name: "Edad", selector: (row) => row.age },
    {
      id: "Genero",
      name: "Genero",
      selector: (row) => row.genre,
    },
    { id: "Email", name: "Email", selector: (row) => row.email },
    {
      id: "Nacionalidad",
      name: "Nacionalidad",
      selector: (row) => row.nationality,
    },
    {
      id: "Foto",
      name: "Foto",
      selector: (row) => <img width={50} height={50} src={row.picture}></img>,
    },
  ];
  //Dando estilo al componenten button con emotion
  const Button = styled.button`
    margin: 20px auto;
    font-size: 13px;
    color: black;
    width: 98%;
    text-align: center;
    padding: 15px 32px;
    margin: 10px;
  `;
  // Desplegando valores a mostrar en pantalla
  return (
    <div>
      <CSVLink data={users} filename={"Data_user.csv"}>
        <Button>Descargar data</Button>
      </CSVLink>

      <DataTable
        columns={columns}
        data={users}
        defaultSortFieldId="Edad"
        theme="solarized"
      />
    </div>
  );
};

function App() {
  return (
    <div>
      <UsingFetch />
    </div>
  );
}

export default App;
