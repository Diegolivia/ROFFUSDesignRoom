import React from 'react';
import {connect} from "react-redux";
import {fetchListaProyectos,deleteProyectoXid,fetchPlantillaXid} from '../../actions/designerActions';
import { LISTAR_PROYECTOS, LISTAR_PLANTILLA_POR_ID } from '../../actions/actionTypes';
class DesignerProject extends React.Component{
    constructor(props){
        super(props);
        this.state={
            proyectos: [
                {codPaquete:1,nombre:"proyecto 1dfdf",codPlantilla:1,codUsuario:1,nombreLista:"l2"},
                {codPaquete:2,nombre:"proyecto 2",codPlantilla:1,codUsuario:1,nombreLista:"l2"},
                {codPaquete:3,nombre:"proyecto fas",codPlantilla:1,codUsuario:1,nombreLista:"l2"},
                {codPaquete:4,nombre:"proyecto df3r3",codPlantilla:1,codUsuario:1,nombreLista:"l2"}
              ],
        
              proyectoActual:{codPaquete:1,nombre:"proyecto 1dfdf",codPlantilla:1,codUsuario:1,nombreLista:"l2"},

              //===========model
              //proyecto
              proyectoNombre:"",
              //plantilla
              plantilladiseno:"",
              plantillaAncho:"",
              plantillaLargo:"",
              plantillaAlto:"",
        }
        this.listarProyectos=this.listarProyectos.bind(this);
    }
    componentDidMount(){
        this.listarProyectos();
    };
    listarProyectos(){
        this.props.fetchListaProyectos();
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.actionType===LISTAR_PROYECTOS){
            console.log(nextProps.respuesta);
            this.setState({proyectos:nextProps.respuesta});
          }
          else if(nextProps.actionType===LISTAR_PLANTILLA_POR_ID){
              console.log(nextProps.respuesta);
              this.props.setGlobalPlantilla(nextProps.respuesta);
          }
    }
    btnAbrirProyecto(index){
        this.props.fetchPlantillaXid(this.proyectos[index].codPlantilla);
        //this.listarPlantillaXProyecto();
        //this.listarListaMueblesXProyecto();
        //this.listarMueblesXlistaMuebles();
    };
    btnBorrarProyecto(index){
      /*DELETE*/ this.props.deleteProyectoXid(this.state.proyectos[index].codPaquete);
      /*GET*/ this.props.fetchListaProyectos();
    };
    btnCancelar(){
        this.limpiarProyectoForm();
    }
    btnCrearProyecto(){
        if(!this.validateForm()){return;}
        this.limpiarProyectoForm();

        //TRIGGER SET GLOBAL DATES
        this.props.setGlobalPlantilla({"ancho":parseInt(this.state.plantillaAncho),"largo":parseInt(this.state.plantillaLargo),"alto":parseInt(this.state.plantillaAlto)});
        this.props.setGlobalProyecto({"nombre":this.state.proyectoNombre});
        window.setCameraToCenter();
        window.cleanListaMuebles();
        window.addRoom([{x:-0.5,y:-0.5},{x:0.5,y:-0.5},{x:0.5,y:0.5},{x:-0.5,y:0.5}],parseInt(this.state.plantillaAncho),parseInt(this.state.plantillaLargo));
        window.panelProject.closer_fired();
    };
    //=============================
    //helpers
    //=============================
    validateForm(){
        if(this.state.proyectoNombre==""){
            alert("Ingrese un nombre valido");
            return false;
        }else if(isNaN(this.state.plantillaAncho) || this.state.plantillaAncho=="" || isNaN(this.state.plantillaLargo) || this.state.plantillaLargo=="" || isNaN(this.state.plantillaAlto) || this.state.plantillaAlto==""){
            alert("Ingrese dimenciones validas");
            return false;
        }
        return true;
    }
    limpiarProyectoForm(){
        this.setState({proyectoNombre:"",plantillaAncho:"",plantillaLargo:"",plantillaAlto:""});
    };

    render(){
        return(
            <section className="panel-project dark-filter">
            <div className="container">
                <div style={{opacity:this.props.existeProyecto?1:0.2}} className="btn-close"><i className="fa fa-close fa-lg"></i></div>
                <div className="mask" style={{display:this.props.existeProyecto?'none':'block'}}></div>
                <section className="oldprojects">
                <p className="title">Tus proyectos</p>
                <section className="list-projects">
                    {this.state.proyectos.map((proyecto,index)=>{
                        return (
                            <section className="item" key={index}>
                            <div className="projectItemContainer">
                              <img src="./dist/img/project-icon.png" alt=""></img>
                              <h4 className="title">{proyecto.nombre}</h4>
                              <div className="buttons">
                                <p className="btn" onClick={this.btnAbrirProyecto.bind(this,index)}>Abrir</p>
                                <p className="btn" onClick={this.btnBorrarProyecto.bind(this,index)}>Borrar</p>
                              </div>
                            </div>
                          </section>
                        );
                    })}
                    <section className="item"></section>
                </section>
                </section>
                <section className="newproject">
                <div className="header">
                    <p className="title">Nuevo Proyecto</p>
                    <p className="description">Crear un proyecto nuevo</p>
                </div>
                <div className="form">
                    <div className="form-group">
                    <label htmlFor="nombre">Nombre</label>
                    <input type="text" id="nombre" name="nombre" value={this.state.proyectoNombre} onChange={(e)=>this.setState({proyectoNombre:e.target.value})}/>
                    </div>
                    <div className="row clearfix">
                    <div className="form-group">
                        <label htmlFor="ancho">Ancho</label>
                        <input type="text" id="ancho" name="ancho" value={this.state.plantillaAncho} onChange={(e)=>this.setState({plantillaAncho:e.target.value})}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="largo">Largo</label>
                        <input type="text" id="largo" name="largo" value={this.state.plantillaLargo} onChange={(e)=>this.setState({plantillaLargo:e.target.value})}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="alto">Alto</label>
                        <input type="text" id="alto" name="alto" value={this.state.plantillaAlto} onChange={(e)=>this.setState({plantillaAlto:e.target.value})}/>
                    </div>
                    </div>
                    <div className="buttons">
                    <button style={{opacity:this.props.existeProyecto?1:0.2}} className="btn btn-close" onClick={this.btnCancelar.bind(this)}>Cancelar</button>
                    <div className="mask" style={{display:this.props.existeProyecto?'none':'block'}}></div>
                    <button className="btn btn-createproject" onClick={this.btnCrearProyecto.bind(this)}>Crear</button>
                    </div>
                </div>
                </section>
            </div>
            </section>
        );
    }
}
const mapState = state => {
    return {respuesta: state.project.respuesta || [],actionType: state.project.actionType}
  };
  
const mapDispatch = {
    fetchListaProyectos,
    deleteProyectoXid,
    fetchPlantillaXid
};
 export default connect(mapState,mapDispatch)(DesignerProject);