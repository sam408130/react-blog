import {reducer as front} from './frontReducer'
import admin from './admin'
import {reducer as globalState} from './globalStateReducer'
import {combineReducers} from 'redux'

export default combineReducers({
    front,
    globalState,
    admin
})
