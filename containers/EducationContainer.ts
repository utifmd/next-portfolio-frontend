import {AppState} from "../store";
import {getAllEducations} from "../actions/educationAction"
import {connect} from "react-redux";
import Educations from "../app/education/Educations";

const mapStateToProps = (state: Record<string, IEducationState>) => ({state: state.education})
const mapReducerToProps = ({getAllEducations})

export default connect(mapStateToProps, mapReducerToProps)(Educations)