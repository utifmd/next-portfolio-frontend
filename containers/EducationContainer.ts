import {connect} from "react-redux";
import Educations from "../app/education/Educations";

const mapStateToProps = (state: Record<string, IEducationState>) => ({state: state.education})
const mapReducerToProps = null //({getAllEducations})

export default connect(mapStateToProps, mapReducerToProps)(Educations)