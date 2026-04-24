import mongoose from 'mongoose'

let MusicSchema = new mongoose.Schema({
    music: {
        type: Array,
        required: true
    }
})

let MusicModel = mongoose.model('musics', MusicSchema)                                                                                                

export default MusicModel