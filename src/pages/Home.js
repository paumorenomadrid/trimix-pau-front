import React, { Component } from 'react';
import { PersonaService } from '../service/PersonaService';
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column';
import { Panel } from 'primereact/panel';
import {Menubar} from 'primereact/menubar'
import {Dialog} from 'primereact/dialog';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import {Toast} from 'primereact/toast';

import 'primereact/resources/themes/lara-light-purple/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      visible : false,
      persona: {
          perId: null,
          perApellido: null,
          perNombre: null,
          perFechaNacimiento: null,
          perNumeroDocumento: null,
          perTipoDocumento: null
      },
      selectedPersona : {
      }
    };
    this.items = [
      {
        label : 'Nuevo',
        icon  : 'pi pi-fw pi-plus',
        command : () => {this.showSaveDialog()}
      },
      {
        label : 'Editar',
        icon  : 'pi pi-fw pi-pencil',
        command : () => {this.showEditDialog()}
      },
      {
        label : 'Eliminar',
        icon  : 'pi pi-fw pi-trash',
        command : () => {this.delete()}
      }
    ];
    this.personaService = new PersonaService();
    this.save = this.save.bind(this);
    this.delete = this.delete.bind(this);
    this.footer = (
      <div>
        <Button label="Guardar" icon="pi pi-check" onClick={this.save} />
      </div>
    );
  }

  componentDidMount() {
    this.personaService.getAll().then(data =>
      this.setState({ personas: data }))
  }

  save() {
    this.personaService.save(this.state.persona).then(data => {
      this.setState({
        visible : false,
        persona: {
          perId: null,
          perApellido: null,
          perNombre: null,
          perFechaNacimiento: null,
          perNumeroDocumento: null,
          perTipoDocumento: null
        }
      });
      this.toast.show({severity: 'success', summary: 'Alerta', detail: 'Se guardó esta persona.'});
      this.personaService.getAll().then(data => this.setState({personas: data}))
    })
  }

  delete() {
    if(window.confirm("¿Realmente desea eliminar esta persona?")) {
      this.personaService.delete(this.state.selectedPersona.perId).then(data => {
        this.toast.show({severity: 'success', summary: 'Alerta', detail: 'Se eliminó esta persona.'});
        this.personaService.getAll().then(data => this.setState({personas: data}));
      });
    }
  }

  showEditDialog() {
    this.setState({
      visible : true,
      persona : {
        perId: this.state.selectedPersona.perId,
        perApellido: this.state.selectedPersona.perApellido,
        perNombre: this.state.selectedPersona.perNombre,
        perFechaNacimiento:this.state.selectedPersona.perFechaNacimiento,
        perNumeroDocumento: this.state.selectedPersona.perNumeroDocumento,
        perTipoDocumento: this.state.selectedPersona.perTipoDocumento
      }
    }) ; 
  }

  showSaveDialog(){
    this.setState({
      showSave: true,
      visible : true,
      persona : {
        perId: null,
        perApellido: null,
        perNombre: null,
        perFechaNacimiento: null,
        perNumeroDocumento: null,
        perTipoDocumento: null
      }
    });
  }

  render() {
    return (
      <div style = {{ width : '80%', margin: '0 auto', marginTop: '20px'}}>
      <Menubar model={this.items}/>
      <br/>
      <Panel header='Trimix Test Code Pau' >

        <DataTable value={this.state.personas} paginator={true} rows= {5} rowsPerPageOptions={[5, 10, 25, 50]} selectionMode="single" 
        selection={this.state.selectedPersona} onSelectionChange={e => this.setState({ selectedPersona: e.value })}
filterDisplay="row">
        <Column selectionMode="single" headerStyle={{width: '3em'}}></Column>
          <Column field='perId' header='Id'sortable filter filterPlaceholder="Buscar por Id"></Column>
          <Column field='perApellido' header='Apellido' sortable filter filterPlaceholder="Buscar por Apellido"></Column>
          <Column field='perNombre' header='Nombre' sortable filter filterPlaceholder="Buscar por Nombre"></Column>
          <Column field='perFechaNacimiento' header='Fecha de Nacimiento' sortable ></Column>
          <Column field='perNumeroDocumento' header='Numero de Documento'sortable filter filterPlaceholder="Buscar por Nro de Documento"></Column>
          <Column field='perTipoDocumento' header='Tipo de Documento'sortable></Column>
        </DataTable>

      </Panel>
      <Dialog header="Crear/Editar persona" visible={this.state.visible} style={{width: '400px'}} footer={this.footer} modal={true} onHide={() => this.setState({visible: false})}>
            <form id="persona-form">
              <span className="p-float-label">
                <InputText value={this.state.persona.perApellido} style={{width : '100%'}} id="perApellido" onChange={(e) => {
                    let val = e.target.value;
                    this.setState(prevState => {
                        let persona = Object.assign({}, prevState.persona);
                        persona.perApellido = val;
                        return { persona };
                    })}
                  } />
                <label htmlFor="perApellido">Apellido</label>
              </span>
              <br/>
              <span className="p-float-label">
                <InputText value={this.state.persona.perNombre} style={{width : '100%'}} id="perNombre" onChange={(e) => {
                    let val = e.target.value;
                    this.setState(prevState => {
                        let persona = Object.assign({}, prevState.persona);
                        persona.perNombre = val
                        return { persona };
                    })}
                  } />
                <label htmlFor="perNombre">Nombre</label>
              </span>
              <br/>
              <span className="p-float-label">
                <InputText value={this.state.persona.perFechaNacimiento} style={{width : '100%'}} id="perFechaNacimiento" onChange={(e) => {
                    let val = e.target.value;
                    this.setState(prevState => {
                        let persona = Object.assign({}, prevState.persona);
                        persona.perFechaNacimiento = val
                        return { persona };
                    })}
                  } />
                  <label htmlFor="perFechaNacimiento">Fecha de Nacimiento</label>
              </span>
              <br/>
              <span className="p-float-label">
                <InputText value={this.state.persona.perNumeroDocumento} style={{width : '100%'}} id="perNumeroDocumento" onChange={(e) => {
                    let val = e.target.value;
                    this.setState(prevState => {
                        let persona = Object.assign({}, prevState.persona);
                        persona.perNumeroDocumento = val
                        return { persona };
                    })}
                  } />
                <label htmlFor="perNumeroDocumento">Numero de Documento</label>
              </span>
              <br/>
              <span className="p-float-label">
                <InputText value={this.state.persona.perTipoDocumento} style={{width : '100%'}} id="perTipoDocumento" onChange={(e) => {
                    let val = e.target.value;
                    this.setState(prevState => {
                        let persona = Object.assign({}, prevState.persona);
                        persona.perTipoDocumento = val
                        return { persona };
                    })}
                  } />
                <label htmlFor="perTipoDocumento">Tipo de Documento</label>
              </span>
            </form>
        </Dialog>
        <Toast ref={(el) => this.toast = el} />
      </div>
    );
  }

}