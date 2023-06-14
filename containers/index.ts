import EducationContainer from "./EducationContainer";
import ExperienceContainer from "./ExperienceContainer";
import {connect} from "react-redux";
import Home from "../app/Home";
import {onSelectFeedItem, onFeedStartedFalse, pagedFeed} from "@/actions/homeAction"

const mapStateToProps = ({home}: IAppState) => ({
    feed: home.feed, intro: home.intro, habit: home.habit, profile: home.profile
})
const mapReducerToProps = ({
    pagedFeed, onSelectFeedItem, onFeedStartedFalse
})
const HomeContainer = connect(mapStateToProps, mapReducerToProps)(Home)

export {
    HomeContainer, EducationContainer, ExperienceContainer
}