import React, { Component } from "react";
import { useParams } from "react-router-dom";

import Image from "../../../components/Image/Image";
import "./SinglePost.css";

// Wrapper component to get the params and pass them as props
const SinglePostWrapper = (props) => {
  const params = useParams();
  return <SinglePost {...props} params={params} />;
};

class SinglePost extends Component {
  state = {
    title: "",
    author: "",
    date: "",
    image: "",
    content: "",
  };

  componentDidMount() {
    const postId = this.props.params.postId;
    console.log(this.props);
    const graphqlQuery = {
      query: ` query FetchSinglePost($postId: ID!) {
      post(id: "$postId") {
        _id
        title
        content
        imageUrl
        creator {
          name
        }
        createdAt
    }
        }
       `,
      variables: {
        postId: postId,
      },
    };
    fetch("http://localhost:8080/graphql", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + this.props.token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(graphqlQuery),
    })
      .then((res) => {
        console.log(res);
        if (res.status !== 200) {
          throw new Error("Failed to fetch status");
        }
        return res.json();
      })
      .then((resData) => {
        if (resData.errors) {
          console.log(resData.errors);
          throw new Error("Fetching post failed!");
        }
        console.log(resData);
        this.setState({
          title: resData.data.post.title,
          author: resData.data.post.creator.name,
          image: "http://localhost:8080/" + resData.data.post.imageUrl,
          date: new Date(resData.data.post.createdAt).toLocaleDateString(
            "en-US"
          ),
          content: resData.data.post.content,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <section className="single-post">
        <h1>{this.state.title}</h1>
        <h2>
          Created by {this.state.author} on {this.state.date}
        </h2>
        <div className="single-post__image">
          <Image contain imageUrl={this.state.image} />
        </div>
        <p>{this.state.content}</p>
      </section>
    );
  }
}

export default SinglePostWrapper;
