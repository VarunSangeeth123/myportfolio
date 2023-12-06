const express = require("express");
const router = express.Router();

const Task = require("../Models/task");
const app = express()

const {createCustomError} = require("../Middleware/customerror")

const asyncWrapper = require("../Middleware/async")



router.get("/",  async (req, res) => {
   
  // const {id:taskID} = req.params;

  try{
       const task = await Task.find({})
        
        return  res.status(200).json({task:task})
  }catch(err){
    console.log(err);
  }
     

        // if (!task) {  
        
        //     // return  res.status(404).json({msg:"error"})
        //     // const err = new Error("Not found");
        //     // err.status = 404;
        //     // return next(err);
           
        //     return next(createCustomError(`No task with id ${taskID}`,404));
        // }else{
        //   return  res.status(200).json({task:task})
        // }
        
     
    });

router.get("/:id",  asyncWrapper(async (req, res,next) => {
   
  const {id:taskID} = req.params;
        const task = await Task.findOne({_id:taskID})
       

        if (!task) {  
        
            // return  res.status(404).json({msg:"error"})
            // const err = new Error("Not found");
            // err.status = 404;
            // return next(err);
           
            return next(createCustomError(`No task with id ${taskID}`,404));
        }else{
          return  res.status(200).json({task:task})
        }
        
     
    }));

router.post("/", async (req, res) => {
  try {
    const task = await Task.create(req.body)
    res.status(201).json({ task })
  } catch (err) {
    res.status(500).json({ msg: err });
  }
});

router.delete("/:id", async (req, res) => {
  try {
     
      const task = await Task.findOneAndDelete({ _id : req.params.id })

      if (task) {
          return  res.status(201).json({ task })

      }else{
        return res.status(500).send({msg:"invalid id"})
      }
    } catch (err) {
      res.status(500).json({ msg: err });
    }
  });

  router.put("/", async (req, res) => {
    try {
        const {id:taskID} = req.params;
        const task = await Task.findOneAndUpdate({ _id : taskID },req.body,{
          new: true,
          runValidators : true,
        });

        if (!task) {
            return  res.status(404).json({ msg:`no task with id ${taskID}` })

        }
        res.status(200).json({task})
      } catch (err) {
        res.status(500).json({ msg: err });
      }
    });



module.exports = router;
