import mapGetAll from './controllers/map/mapGetAll';
import mapGetOne from './controllers/map/mapGetOne';
import mapUpdate from './controllers/map/mapUpdate';
import mapPost from './controllers/map/mapPost';
import mapDeleteOne from './controllers/map/mapDeleteOne';
import mapDeleteAll from './controllers/map/mapDeleteAll';
import mapFakeDataGenerate from './controllers/map/mapFakeDataGenerate';
import mapSearchDate from './controllers/map/mapSearchDate';
import registrationUser from './controllers/user/registration';
import loginUser from './controllers/user/login';
import refreshToken from './controllers/user/refreshToken';
import deleteRefreshToken from './controllers/user/deleteRefreshToken';

const connect = (app) => {
    app.use('/map', [
        mapGetAll,
        mapGetOne,
        mapUpdate,
        mapPost,
        mapDeleteOne,
        mapDeleteAll,
        mapFakeDataGenerate,
        mapSearchDate
    ]);
    app.use('/auth', [
        registrationUser,
        loginUser,
        refreshToken,
        deleteRefreshToken
    ])
};

export default connect;