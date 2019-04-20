import { connect } from 'react-redux';
import { ArticleEditor } from '../components/ArticleEditor/ArticleEditor';
import { addArticle } from '../actions/articles';

const mapDispatchToProps = dispatch => {
  return { addArticle: articleToAdd => dispatch(addArticle(articleToAdd)) };
};

export default connect(
  null,
  mapDispatchToProps
)(ArticleEditor);
