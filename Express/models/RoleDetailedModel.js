import mongoose from "mongoose";

const RoleDetailedSchema = new mongoose.Schema({
    dataFirst: {
        type: Object,
        required: true
    },
    dataSecond: {
        type: Object,
        required: true
    },
    dataThird: {
        type: Object,
        required: true
    }
});

const RoleDetailedModel = mongoose.model("role_detaileds", RoleDetailedSchema);

export default RoleDetailedModel;
