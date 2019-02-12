/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import Main from '../../views/Main';
import { shallow } from 'enzyme';
import { StyledCard } from '../../components/Card/Card';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ArticleList from '../../containers/ArticleList';

Enzyme.configure({ adapter: new Adapter() });

describe('<App />', () => {
    let wrapper;
    beforeAll(() => 
        wrapper = shallow(<Main />)
    );
    it ('renders four <StyledCard /> components', () => {
        expect(wrapper.find(StyledCard).length).toBe(4);
    });

    it ('renders ArticleList', () => {
        expect(wrapper.find(ArticleList).length).toBe(1);
    });
});