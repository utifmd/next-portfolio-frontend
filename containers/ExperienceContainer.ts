import {getAllExperience} from "../actions/experienceAction"
import {connect} from "react-redux";
import Experience from "../app/Experience";

const mapStateToProps = (state: Record<string, IExperienceState>) => ({state: state.experience})
const mapReducerToProps = ({getAllExperience})

export default connect(mapStateToProps, mapReducerToProps)(Experience)