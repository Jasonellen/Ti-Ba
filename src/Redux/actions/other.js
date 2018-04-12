import { createActions } from 'redux-actions';

export const {
	changeAnalyzeShow,
	changeDownloadShow,
	changeAnswerSheetShow,
} = createActions(
		'changeAnalyzeShow',
		'changeDownloadShow',
		'changeAnswerSheetShow',
	)

// export const getUser = (token) => (dispatch) =>{
// 	axios.get(url.get_users+'?token='+token)
// 		.then(data=>{
// 			if(data.data.user){
// 				dispatch(changeUser(data.data.user))
// 			}
// 		})
// }
