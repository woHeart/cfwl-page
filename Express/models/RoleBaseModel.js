import mongoose from 'mongoose'

let RoleBaseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    bgImg: {
        type: String,
        required: true
    },
    career: {
        type: String,
        required: true
    },
    dongOne: {
        type: String,
        required: true
    },
    dongTwo: {
        type: String,
        required: true
    },
    sequence: {
        type: String,
        required: true
    }
})

let RoleBaseModel = mongoose.model('role_bases', RoleBaseSchema)

export default RoleBaseModel