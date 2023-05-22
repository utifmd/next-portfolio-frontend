import EducationContainer from "./EducationContainer";
import ExperienceContainer from "./ExperienceContainer";
import {connect} from "react-redux";
import Home from "../app/Home";
import {pagedFeed} from "../actions"

const mapStateToProps = (
    {feed, intro, status, habit, message}: IAppState) => ({
    feed, intro, status, habit, message
})
const mapReducerToProps = ({
    morePagination: pagedFeed
})
const HomeContainer = connect(mapStateToProps, mapReducerToProps)(Home)

export {
    HomeContainer, EducationContainer, ExperienceContainer
}