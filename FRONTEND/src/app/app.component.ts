import { Component } from '@angular/core';
import { DataService } from './services/data.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'veterinaria-app';
  //Array de JSON que representa a los botones del front
  botones = [
    {
      descripcion: "Traer un perrito", //Texto del boton
      link: "http://localhost:8080/perrito/traerUno", //Link a donde voy a realizar la peticion. En este ejemplo es localhost, aca iria un link de heroku con rutas validas de la API
      metodo: "get", //Metodo a utilizar para hacer la peticion
      resultado: null //Sirve para mostrar o no una caja de texto con el resultado de la peticion, meramente visual
    },
    {
      descripcion: "Insertar un perrito",
      link:"http://localhost:8080/perrito/insertar",
      metodo: "post",
      resultado: null
    },
    {
      descripcion: "Modificar un perrito",
      link: "http://localhost:8080/perrito/modificar",
      metodo: "put",
      resultado: null
    },
    {
      descripcion: "Eliminar un perrito",
      link: "http://localhost:8080/perrito/eliminar",
      metodo: "delete",
      resultado: null
    }
  ]

  constructor(private servicioDatos: DataService){
  }

  //Esta funcion es la encargada de determinar que peticion se va a hacer de a cuerdo a los valores de un boton
  hacerPeticion(boton: any){
    //Que no se vean las cajas de texto de ningun boton
    this.botones.forEach(boton => {
      boton.resultado = null;
    });

    //Switch para determinar que clase de peticion voy a hacer
    switch(boton.metodo)
    {
      case "get":
        this.servicioDatos.getData(boton.link)
        .subscribe((datos: any)=>{
          boton.resultado = JSON.stringify(datos);
        });
        break;
      case "post":
        this.servicioDatos.postData(boton.link)
        .subscribe((datos: any)=>{
          boton.resultado = JSON.stringify(datos);
        });
        break;
      case "put":
        this.servicioDatos.putData(boton.link)
        .subscribe((datos: any)=>{
          boton.resultado = JSON.stringify(datos);
        });
        break;
      case "delete":
        this.servicioDatos.deleteData(boton.link)
        .subscribe((datos: any)=>{
          boton.resultado = JSON.stringify(datos);
        });
        break;
    }
    
  }
}
