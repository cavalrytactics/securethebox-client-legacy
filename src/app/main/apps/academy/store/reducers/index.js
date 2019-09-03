import {combineReducers} from 'redux';
import courses from './courses.reducer';
import course from './course.reducer';
import securethebox from './securethebox/securethebox.reducer';

const reducer = combineReducers({
    courses,
    course,
    securethebox
});

export default reducer;
