import { ArticlesList } from "../components/ArticleList/ArticleList";
import { connect } from 'react-redux';
const mapStateToProps = (state) => {
    return {articles: state.articles}
};

export default connect(mapStateToProps)(ArticlesList);