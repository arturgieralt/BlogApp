import React from "react";
import { Link } from "react-router-dom";

export default class TagList extends React.Component {
  componentDidMount() {
    const { fetchTags } = this.props;
    fetchTags();
  }

  render() {
    const { tags } = this.props;
    if (tags.length === 0) {
      return "No tags.";
    }

    return tags.map(tag => 
        <Link key={tag._id} to={`/tags/${tag._id}`}>{tag._id} ({tag.count})</Link>
      );
  }
}
