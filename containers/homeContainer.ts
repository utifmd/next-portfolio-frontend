import {connect} from "react-redux";
import Home from "../app/Home";
import {onSelectFeedItem, onFeedStartedFalse, pagedFeed} from "@/actions/homeAction"
import {authenticate, signOut} from "@/actions/authenticationAction";

const mapStateToProps = ({home}: IAppState) => ({
    feed: home.feed, intro: home.intro, habit: home.habit, profile: home.profile
})
const mapReducerToProps = ({
    authenticate, pagedFeed, signOut, onSelectFeedItem, onFeedStartedFalse
})
const HomeContainer = connect(mapStateToProps, mapReducerToProps)(Home)

export {
    HomeContainer
}