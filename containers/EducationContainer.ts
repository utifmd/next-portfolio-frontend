import {AppState} from "../store";
import {getAllEducations} from "../actions/educationAction"
import {connect} from "react-redux";
import Education from "../app/Education";

const mapStateToProps = (state: AppState) => ({state})
const mapReducerToProps = ({getAllEducations})

export default connect(mapStateToProps, mapReducerToProps)(Education)