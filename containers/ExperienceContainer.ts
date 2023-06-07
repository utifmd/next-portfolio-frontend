// import {getAllExperience} from "@/actions/experienceAction"
import {connect} from "react-redux";
import Experiences from "../app/experience/Experiences";

const mapStateToProps = null //(state: Record<string, IExperienceState>) => ({state: state.experience})
const mapReducerToProps = null // = ({getAllExperience})

export default connect(mapStateToProps, mapReducerToProps)(Experiences)