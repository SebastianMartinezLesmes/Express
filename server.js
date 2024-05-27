const express = require('express')
var cors = require('cors')
const mongoose = require('mongoose')
const Testing = require('./models/Mongo')
const app = express()

app.use(cors())
app.use(express.json());

mongoose.set("strictQuery", false)
mongoose.connect('mongodb://localhost:27017/UserDB').then(() => {
    console.log('conection mongoDB sucerfully')
    app.listen(5000, ()=>{
        console.log('Backend is running in port 5000')
    })
}).catch(() => {
    console.log('conection mongoDB error', error)
})

// getUsers is OK
app.get('/getUsers', async(req,res) => {
    try {
        const testings = await Testing.find({});
        res.status(200).json(testings);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}) 
   
// postUser is OK
app.post('/postUsers', async(req,res,next) => {    
    try{
        const product = await Testing.create(req.body)
        res.status(200).json(product);
    } catch {
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
})

app.put('/testUpdate/:id', async(req,res,next) => {    
    try{
        const {id} = req.params;
        const {nombre} = req.body;
        const product = await Testing.findByIdAndUpdate(id, {"nombre": nombre})
        if(!product){
            return res.status(404).json({message: 'cannot not find the product'})
        }else{
            res.status(200).json(product);
        }
    } catch {
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
})

app.delete('/testDeleteConection/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        let { sg_estado } = req.body;

        sg_estado = parseInt(sg_estado, 10);

        const product = await Testing.findById(id);

        if (!product) {
            return res.status(404).json({ message: 'Cannot find the product' });
        }

        const lastIndex = product.sg_estado.lastIndexOf(sg_estado);

        if (lastIndex !== -1) {
            product.sg_estado.splice(lastIndex, 1);
        }

        await product.save();

        res.status(200).json(product);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});
