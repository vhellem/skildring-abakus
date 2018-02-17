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


class App extends Component {


    constructor(props){
        super(props);
        this.state = {
            message: "",
        }

    }

    onSubmit = (formData)=>  {
        $.ajax({
            type: "POST",
            contentType: "application/json",
            crossDomain: true,
            url: "http://localhost:8080/register",
            data: JSON.stringify(formData.formData),
            //dataType: 'json',
            cache: false,
            timeout: 600000,
            success: (data) =>  {



                this.setState({
                    message: "Kvitteringskildringen ble sendt"});


            },
            error: (e) => {
                console.log(e);

                this.setState({
                    message: "Noe gikk galt, kommer sannsynligvis ikke til å funke hvis du prøver igjen heller"});


            },
        });
    }
  render() {
    return (
        <div>
        <Form schema={schema}
              uiSchema={uiSchema}
      onSubmit={(formData) => this.onSubmit(formData)}
      onError={() => this.setState({message: "Noe er galt i skjemaet"})} />

      <p>{this.state.message}</p>
        </div>
  )
  }
}

export default App;
