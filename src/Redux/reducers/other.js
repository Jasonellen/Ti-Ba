import { handleActions } from 'redux-actions';

let initialState = {
	analyzeShow:false,
	downloadShow:false,
	answerSheetShow:false,
	correctError:false
}
const other = handleActions({
	changeAnalyzeShow: (state, action) => ({
		...state,
		analyzeShow: action.payload
	}),
	changeDownloadShow: (state, action) => ({
		...state,
		downloadShow: action.payload
	}),
	changeAnswerSheetShow: (state, action) => ({
		...state,
		answerSheetShow: action.payload
	}),
	changeCorrectErrorShow: (state, action) => ({
		...state,
		correctError: action.payload
	}),

}, initialState);


export default other;
