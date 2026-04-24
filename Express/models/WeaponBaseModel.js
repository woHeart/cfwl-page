import mongoose from 'mongoose'

let WeaponBaseSchema = new mongoose.Schema({
    weaImg: {
        type: String,
        required: true
    },
    weaName: {
        type: String,
        required: true,
        index: true
    },
    sequence: {
        type: String,
        required: true
    }
})

let WeaponBaseModel = mongoose.model('weapon_bases', WeaponBaseSchema)

export default WeaponBaseModel