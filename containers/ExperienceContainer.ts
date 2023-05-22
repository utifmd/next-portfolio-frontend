import {getAllExperience} from "../actions/experienceAction"
import {connect} from "react-redux";
import Experiences from "../app/experience/Experiences";

const mapStateToProps = (state: Record<string, IExperienceState>) => ({state: state.experience})
const mapReducerToProps = ({getAllExperience})

export default connect(mapStateToProps, mapReducerToProps)(Experiences)