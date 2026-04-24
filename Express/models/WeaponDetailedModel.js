import mongoose from "mongoose";

const WeaponDetailedSchema = new mongoose.Schema({
    dataFirst: {
        type: Object,
        required: true
    },
    dataSecond: {
        type: Object,
        required: true
    }
});

const WeaponDetailedModel = mongoose.model("weapon_detaileds", WeaponDetailedSchema);

export default WeaponDetailedModel;
