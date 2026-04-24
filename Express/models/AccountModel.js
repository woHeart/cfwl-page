import mongoose from 'mongoose'

let AccountSchema = new mongoose.Schema({
    account: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    }
})

let AccountModel = mongoose.model('accounts', AccountSchema)                                                                                                

export default AccountModel