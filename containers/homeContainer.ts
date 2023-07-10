"use client"

import {connect} from "react-redux";
import Home from "../app/Home";
import {onSelectFeedItem, onFeedStartedFalse, pagedFeed} from "@/actions/homeAction"
import {authenticate, signOut} from "@/actions/authenticationAction";

const mapStateToProps = ({home, profile}: IAppState) => ({
    feed: home.feed, profile
})
const mapDispatchToProps = ({
    authenticate, pagedFeed, signOut, onSelectFeedItem, onFeedStartedFalse
})
const HomeContainer = connect(mapStateToProps, mapDispatchToProps)(Home)

export {
    HomeContainer
}