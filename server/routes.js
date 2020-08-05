import mapGetAll from './controllers/map/mapGetAll';
import mapGetOne from './controllers/map/mapGetOne';
import mapUpdate from './controllers/map/mapUpdate';
import mapPost from './controllers/map/mapPost';
import mapDeleteOne from './controllers/map/mapDeleteOne';
import mapDeleteAll from './controllers/map/mapDeleteAll';

const connect = (app) => {
    app.use('/map', [
        mapGetAll,
        mapGetOne,
        mapUpdate,
        mapPost,
        mapDeleteOne,
        mapDeleteAll
    ])
};

export default connect;