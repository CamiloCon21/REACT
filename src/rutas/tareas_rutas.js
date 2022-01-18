const express=require('express')
const router = express.Router();
const tarea = require('../modelos/tareas')




router.get('/', async (req,res)=>{
  const tareas = await tarea.find() 
  console.log(tareas)
  res.json(tareas)
})

router.get('/:id',async (req,res)=>{
  const Tarea = await tarea.findById(req.params.id)
  res.json(Tarea)
})

 router.post('/', async (req,res)=>{
     const { Titulo, Descripcion }= req.body
     const Tarea = new tarea ({Titulo,Descripcion})
     console.log(Tarea)
     await Tarea.save()
     res.json({status:'Tarea Guardada'})
 })

 router.put('/:id', async (req,res)=>{
    const { Titulo, Descripcion }= req.body
    const newtarea = { Titulo, Descripcion }
    await tarea.findByIdAndUpdate(req.params.id, newtarea)
    res.json({status:'Tarea Actualizada'})

   
 })

 router.delete('/:id', async (req,res)=>{
 await tarea.findByIdAndRemove(req.params.id)
   res.json({status:'Tarea eliminada'})
   
 })


module.exports = router;