import mongoose from 'mongoose'

let VideoSchema = new mongoose.Schema({
    video: {
        type: Array,
        required: true
    }
})

let VideoModel = mongoose.model('videos', VideoSchema)                                                                                                

export default VideoModel