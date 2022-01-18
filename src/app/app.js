import React , { Component} from "react";

class App extends Component {
    constructor(){
        super();
        this.state = {
            Titulo: '',
            Descripcion: '',
            Tareas: [],
            _id : []
        }
        this.handleChange = this.handleChange.bind(this)
        this.addtarea = this.addtarea.bind(this)
    }
    addtarea(e){ 
        if(this.state._id){
            fetch(`/api/tareas/${this.state._id}`,{
                method: 'PUT',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                console.log(data),
                M.toast({html: 'Tarea actualizada'})
                this.setState({Titulo: '', Descripcion: '', _id:''})
                this.obtenertarea()
            })
        }else {
            fetch('/api/tareas', {
                method: 'POST',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
             .then(res => res.json())
             .then(data => {
                 console.log(data)
                 M.toast({html: 'Tarea Guardada'})
                 this.setState({Titulo: '', Descripcion: ''})
                 this.obtenertarea()
             })
             .catch(err => console.error(err))

        }
       
        e.preventDefault()
    }
    
    componentDidMount(){
        this.obtenertarea()
    }

    obtenertarea(){
        fetch('/api/tareas')
        .then(res => res.json())
        .then(data =>{
            console.log(data),
            this.setState({Tareas: data})
            console.log(this.state.Tareas)
        })
    }

    eliminar(id){
       if (confirm('Esta seguro de querer eliminar este elemento?')){
        fetch(`/api/tareas/${id}`,{
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            M.toast({ html: 'Tarea eliminada '})
            this.obtenertarea()
        })
       }
    }

    editar(id){

       fetch(`/api/tareas/${id}`)

       .then(res => res.json())
       .then(data => {
           console.log(data)
           this.setState({
               Titulo: data.Titulo,
               Descripcion: data.Descripcion,
               _id: data._id
           })
       })
       
    }

    handleChange(e){
        const {name, value}= e.target;
        this.setState({
            [name]: value
        })
    }


    render() {
        return (
            <div>
                {/* Navegacion */}
               <nav className="purple darken-4">
                  <div className="container">
                      <a className="brand-logo" href= "/"> Aplicacion REACT</a>
                  </div>
               </nav>
               <br></br>
               <div className="container">
                   <div className="row">

                       <div className = "col s5">

                           
                           <div className="card">
                               <div className = "card-content">
                                   <form onSubmit={this.addtarea}>
                                       <div className="row">
                                           <div className="input-field col s12">
                                               <input name="Titulo" onChange={this.handleChange} type="text" placeholder="TAREA"
                                               value={this.state.Titulo}/>
                                           </div>
                                           <div className="row">
                                           <div className="input-field col s12">
                                               <textarea name="Descripcion" onChange={this.handleChange} placeholder="descripcion de la tarea" className="materialize-textarea" value={this.state.Descripcion}></textarea>
                                           </div>
                                           
                                       </div>
                                       <button type="submit" className="btn light-blue darken-4">Enviar</button>
                                           
                                       </div>
                                   </form>
                               </div>
                           </div>
                       </div>
                       <div className = "col s7"></div>
                          <table>
                              <thead>
                                  <tr>
                                      <th>
                                          <h4>Mis tareas</h4>
                                          </th>
                                      <th><h4>Descripcion</h4></th>
                                  </tr>
                              </thead>
                              <tbody>
                                  {
                                      this.state.Tareas.map(Tareas =>{
                                          return (
                                              <tr key={Tareas._id}>
                                                  <td>
                                                      {Tareas.Titulo}
                                                  </td>
                                                  <td>
                                                      {Tareas.Descripcion}
                                                  </td>
                                                  <td>
                                                      <button className="btn light-blue darken-2" style={{margin: '4px'}}
                                                      onClick={() => this.editar(Tareas._id)}>
                                                          <i className="material-icons">edit</i>
                                                          </button>
                                                      <button className="btn red" onClick={() =>this.eliminar(Tareas._id)}>
                                                          <i className="material-icons">delete</i></button>
                                                  </td>
                                              </tr>
                                          )
                                      })
                                  }
                              </tbody>
                          </table>
                   </div>
                 


               </div>
            </div>
        )
    }
}

export default App