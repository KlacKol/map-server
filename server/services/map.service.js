import {MapSchema} from '../models/Geo'
import faker from "faker";
import {insideBoundingBox} from "geolocation-utils";

export const mapGetAll = async () => {
    return MapSchema.find({});
};

export const mapGetOne = async (id) => {
    return MapSchema.findById(id);
};

export const mapAdd = async (data) => {
    return MapSchema.create(data);
};

export const mapFakeDataGenerate = async () => {
    const data = [];

    for(let i = 0; i<1000; i++) {
        let geo = new MapSchema({
            lat: faker.address.latitude(),
            lng: faker.address.longitude(),
            description: faker.lorem.words(10),
            date: faker.date.past(),
        });
        data.push(geo);
    }
    return MapSchema.create(data);
};

export const mapGetFilterDate = async (data) => {
    const allCoords = await MapSchema.find({});
    const success = [];
    allCoords.forEach(item => {
        const filter = insideBoundingBox({lat: item.lat, lon: item.lng}, {topLeft: data.topLeft, bottomRight: data.bottomRight});
        const year = item.date.getFullYear();
        const valid = year >= data.date[0] && year <= data.date[1];
        filter && valid ? success.push(item) : false
    });
    return success;
};

export const mapDelete = async (id) => {
    return MapSchema.deleteOne({
        _id: id
    });
};

export const mapDeleteAll = async () => {
    return MapSchema.deleteMany({});
};

export const mapUpdate = async (id, data) => {
    return MapSchema.findOneAndUpdate(id, data, {useFindAndModify: false, new: true});
};