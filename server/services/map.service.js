import {MapSchema} from '../models/Geo'

export const mapGetAll = async () => {
    return await MapSchema.find({});
};

export const mapGetOne = async (id) => {
    return await MapSchema.findById(id);
};

export const mapAdd = async (data) => {
    const geo = new MapSchema({
        lat: data.lat,
        lng: data.lng,
        description: data.description,
        date: data.date,
    });
    return await geo.save();
};

export const mapDelete = async (id) => {
    return await MapSchema.findOneAndDelete(id);
};

export const mapUpdate = async (id, data) => {
    return await MapSchema.findOneAndUpdate(id, data, {useFindAndModify: false, new: true});
};