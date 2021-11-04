import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CrudService } from 'src/app/servicio/crud.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editar-empleado',
  templateUrl: './editar-empleado.component.html',
  styleUrls: ['./editar-empleado.component.css']
})
export class EditarEmpleadoComponent implements OnInit {
  formularioEmpleados:FormGroup;
  elId:any;

  constructor(
    public formulario:FormBuilder,
    private activeRoute:ActivatedRoute,
    private crudService:CrudService,
    private ruteador:Router
  ) {
    this.elId = this.activeRoute.snapshot.paramMap.get('id');
    console.log(this.elId);
    this.crudService.obtenerEmpleado(this.elId).subscribe(respuesta=>{
      console.log(respuesta);
      this.formularioEmpleados.setValue({
        nombre:respuesta[0]['nombre'],
        correo:respuesta[0]['correo']
      })
    });
    this.formularioEmpleados = this.formulario.group({
      nombre:[''],
      correo:['']
    });
   }

  ngOnInit(): void {
  }

  enviarDatos():any{
    console.log(this.elId);
    console.log(this.formularioEmpleados.value);
    this.crudService.editarEmpleado(this.elId, this.formularioEmpleados.value).subscribe(()=>{
      this.ruteador.navigateByUrl('/listar-empleado');
    });
  }

}
