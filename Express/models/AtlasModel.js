import mongoose from 'mongoose'

let AtlasSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    }
})

let AtlasModel = mongoose.model('atlas', AtlasSchema)                                                                                                

export default AtlasModel