import mongoose from 'mongoose'

let WordBannerSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    }
})

let WordBannerModel = mongoose.model('word_banners', WordBannerSchema)

export default WordBannerModel