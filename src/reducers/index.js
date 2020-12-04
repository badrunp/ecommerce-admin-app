import {combineReducers} from 'redux';
import authReducer from './auth.reducer';
import categoryReducer from './category.reducer';
import initialReducer from './initial.reducer';
import userReducer from './user.reducer';

const reducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    sidebar: initialReducer,
    category: categoryReducer
})

export default reducer