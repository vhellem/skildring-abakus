import React, { Component } from 'react';
import $ from 'jquery';
import './App.css';

import Form from "react-jsonschema-form";

const schema = {
    title: "Kvitteringskildring Abakus",
    description: "En enkel side for å fylle ut kvitteringskildring til linjeforeningen Abakus",
    type: "object",
    required: ["name", "belop", "kontonummer", "anledning"],
    properties: {
        name: {type: "string", title: "Navn"},
        comittee: {type: "string", title: "Komite"},
        anledning: {type: "string", title: "Anledning"},
        kontonummer: {type: "string", title: "Kontonummer"},
        belop: {type: "string", title: "Beløp"},
        comment: {type: "string", title: "Andre kommentarer"},
        kvittering: {type: "string", title: "Last opp kvittering(er) i en .pdf-fil"},
        signatur: {type: "string", title: "Last opp et bilde av signaturen din"},


    }
};

function processFile(files) {
    const f = files[0];
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => resolve(event.target.result);
        reader.readAsDataURL(f);
    });
}

const FileWidget = (props) => {
    return (
        <input type="file"
               required={props.required}
               onChange={(event) => processFile(event.target.files).then(props.onChange)} />
    )
};

const uiSchema = {
    kvittering: {
        'ui:widget': FileWidget
    },
    signatur: {
        'ui:widget': FileWidget
    }
}

const log = (type) => console.log.bind(console, type);

const onSubmit = ({formData}) => {
    $.ajax({
        type: "POST",
        contentType: "application/json",
        crossDomain: true,
        url: "http://localhost:8080/register",
        data: JSON.stringify(formData),
        //dataType: 'json',
        cache: false,
        timeout: 600000,
        success: [function (data) {



            console.log("SUCCESS : ", data);


        },],
        error: function (e) {


            console.log("ERROR : ", e);


        }
    });
}





class App extends Component {
  render() {
    return (
        <Form schema={schema}
      onChange={log("changed")}
              uiSchema={uiSchema}
      onSubmit={onSubmit}
      onError={log("errors")} />
  )
  }
}

export default App;
