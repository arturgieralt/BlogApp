import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import { connect } from 'react-redux';
import { StyledCard } from "../components/Card/Card";

function SingleArticle ({ match, location, history, articles }) {

if(articles && match.params.id) {
    const article = articles.find((art) => art._id === match.params.id);
    if(article) {
        return (
            <StyledCard width="90%" margin="20px auto" title={article.title}>
             {article.content}
            </StyledCard>
        );
    }
}
    return 'No such article.';
}

SingleArticle.propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    articles: state.articles
});


export default withRouter(connect(mapStateToProps)(SingleArticle));