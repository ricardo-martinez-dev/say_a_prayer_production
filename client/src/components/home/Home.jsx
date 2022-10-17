import "./style.css";
import React from "react";
import Verse from "../verse/Verse";
import RankingComponent from "../rankingComponent/RankingComponent";
import Spinner from "../spinner/Spinner";
import Avatar from "../avatar/Avatar";
import RankingTags from "../rankingTags/RankingTags";
const axiosFetch = require("../../utils/axiosFetch");
require("dotenv").config();

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tags: null,
      topLovedPosts: null,
      topRequestingMembers: null,
      topPrayingMembers: null,
      topAnsweredMembers: null,
      topReceivingMembers: null,
      topLovedMembers: null,
      topLovingMembers: null,
    };
  }

  async componentDidMount() {
    this.fetchTopLovedPosts();
    this.fetchTopRequestingMembers();
    this.fetchTopPrayingMembers();
    this.fetchTopAnsweredMembers();
    this.fetchTopReceivingMembers();
    this.fetchTopLovedMembers();
    this.fetchTopLovingMembers();
    this.fetchCommonTags();
  }

  fetchTopLovedMembers = async () => {
    const url = `${process.env.REACT_APP_API_URL}/ranking/members/loved`;
    const topLovedMembers = await axiosFetch.axiosGet({ url });
    this.setState({ topLovedMembers });
  };

  fetchTopLovingMembers = async () => {
    const url = `${process.env.REACT_APP_API_URL}/ranking/members/loving`;
    const topLovingMembers = await axiosFetch.axiosGet({ url });
    this.setState({ topLovingMembers });
  };

  fetchTopReceivingMembers = async () => {
    const url = `${process.env.REACT_APP_API_URL}/ranking/members/receiving`;
    const topReceivingMembers = await axiosFetch.axiosGet({ url });
    this.setState({ topReceivingMembers });
  };

  fetchTopAnsweredMembers = async () => {
    const url = `${process.env.REACT_APP_API_URL}/ranking/members/answered`;
    const topAnsweredMembers = await axiosFetch.axiosGet({ url });
    this.setState({ topAnsweredMembers });
  };

  fetchTopRequestingMembers = async () => {
    const url = `${process.env.REACT_APP_API_URL}/ranking/members/requesting`;
    const topRequestingMembers = await axiosFetch.axiosGet({ url });
    this.setState({ topRequestingMembers });
  };

  fetchTopPrayingMembers = async () => {
    const url = `${process.env.REACT_APP_API_URL}/ranking/members/praying`;
    const topPrayingMembers = await axiosFetch.axiosGet({ url });
    this.setState({ topPrayingMembers });
  };

  fetchTopLovedPosts = async () => {
    const url = `${process.env.REACT_APP_API_URL}/ranking/posts`;
    const topLovedPosts = await axiosFetch.axiosGet({ url });
    this.setState({ topLovedPosts });
  };

  async fetchCommonTags() {
    const url = `${process.env.REACT_APP_API_URL}/tags/common`;
    const tags = await axiosFetch.axiosGet({ url });
    this.setState({ tags });
  }

  render() {
    const { verse } = this.props.properties;
    const { onPopUpPost } = this.props.functions;
    const { functions } = this.props;

    return (
      <div
        id="main"
        className="sectionComponent"
        onClick={() => this.props.functions.onHidenav()}
      >
        <Verse verse={verse} />

        <div id="home-holder">
          <div id="ranking">
            {!this.state.topLovedPosts && <Spinner />}
            {!this.state.topRequestingMembers && <Spinner />}
            {!this.state.topPrayingMembers && <Spinner />}
            {!this.state.topAnsweredMembers && <Spinner />}
            {!this.state.topReceivingMembers && <Spinner />}
            {!this.state.topLovedMembers && <Spinner />}
            {!this.state.topLovingMembers && <Spinner />}
            {!this.state.tags && <Spinner />}

            {this.state.topLovedPosts && (
              <div className="ranking" id="loved-posts">
                <p id="ranking-title">Top Loved Posts</p>
                <ul>
                  {this.state.topLovedPosts &&
                    this.state.topLovedPosts.map((el) => {
                      const { title, user_id, pic, _id, loveCount } = el;

                      return (
                        <li key={_id} userid={user_id}>
                          <Avatar
                            user_id={user_id}
                            functions={functions}
                            properties={this.props.post}
                          />
                          <span
                            id="post-title"
                            onClick={() => {
                              onPopUpPost({ postId: _id });
                            }}
                          >
                            <span id="name">{title}</span>
                          </span>
                          <span id="number">{loveCount}</span>
                        </li>
                      );
                    })}
                </ul>
              </div>
            )}

            {this.state.topRequestingMembers && (
              <RankingComponent
                users={this.state.topRequestingMembers}
                filter="requests"
                title="Top Members By Requesting"
                functions={functions}
              />
            )}

            {this.state.topPrayingMembers && (
              <RankingComponent
                users={this.state.topPrayingMembers}
                filter="sent"
                title="Top Members By Praying"
                functions={functions}
              />
            )}

            {this.state.topAnsweredMembers && (
              <RankingComponent
                users={this.state.topAnsweredMembers}
                filter="answered"
                title="Top Members By Answered Requests"
                functions={functions}
              />
            )}

            {this.state.topReceivingMembers && (
              <RankingComponent
                users={this.state.topReceivingMembers}
                filter="received"
                title="Top Members By Receiving Prayres"
                functions={functions}
              />
            )}

            {this.state.topLovedMembers && (
              <RankingComponent
                users={this.state.topLovedMembers}
                filter="count"
                title="Top Loved Members"
                functions={functions}
              />
            )}

            {this.state.topLovingMembers && (
              <RankingComponent
                users={this.state.topLovingMembers}
                filter="count"
                title="Top Loving Members"
                functions={functions}
              />
            )}

            {this.state.tags && <RankingTags tags={this.state.tags} />}
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
