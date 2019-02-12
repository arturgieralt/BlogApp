import React from 'react';
import { StyledCard } from '../components/Card/Card';
import photo from './../static/photo.png'
import ArticleList from '../containers/ArticleList';

const Main = () => (
        <React.Fragment>
          <div style={{float: 'left', width:'75%', boxSizing: 'border-box'}}>
          <StyledCard width="calc(100% - 20px)" margin="20px 0 20px 20px" title="Welcome on my blog">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras finibus, lorem sit amet faucibus lobortis, nunc sapien molestie leo, vitae porta nunc neque eu ipsum. Fusce sed nulla et lacus feugiat suscipit. Integer facilisis in ante non mattis. Sed at dapibus turpis. Nullam ornare non velit luctus aliquet. Mauris lacinia sem nisi, sed fringilla augue viverra et. Aliquam lacinia purus sed tortor fermentum dictum.
          </StyledCard>
          <StyledCard width="calc(100% - 20px)" margin="20px 0 20px 20px" title="Last articles">
          <ArticleList />
          </StyledCard>
          </div>
          <div style={{float: 'right', width:'24%', boxSizing: 'border-box'}}>
          <StyledCard width="calc(100% - 40px)" margin="20px 20px 20px 20px" title="About me">
          <img src={photo} style={{width: '150px', float: 'right', margin: '0 10px 20px 20px', borderRadius: '10px'}} alt="Artur Gieralt" />
          . Duis cursus maximus auctor. Nullam elementum at tortor eu viverra. Duis nec semper arcu. Sed viverra imperdiet magna eget interdum.
           Nunc tincidunt pharetra ex vel hendrerit. Sed convallis semper orci mattis blandit. In fermentum lobortis nisl nec molestie.
            Cras pharetra tortor quis elit egestas, ut placerat ex ornare. Phasellus in tellus in leo euismod faucibus.
             Maecenas luctus metus arcu, vitae mattis orci aliquam at. Proin non varius erat. Aenean vel gravida purus, in rutrum dolor. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
          </StyledCard>

          <StyledCard width="calc(100% - 40px)"margin="20px 20px 20px 20px" title="Tags">
          . Duis cursus maximus auctor. Nullam elementum at tortor eu viverra. Duis nec semper arcu. Sed viverra imperdiet magna eget interdum. Nunc tincidunt pharetra ex vel hendrerit. Sed convallis semper orci mattis blandit. In fermentum lobortis nisl nec molestie. Cras pharetra tortor quis elit egestas, ut placerat ex ornare. Phasellus in tellus in leo euismod faucibus. Maecenas luctus metus arcu, vitae mattis orci aliquam at. Proin non varius erat. Aenean vel gravida purus, in rutrum dolor. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
          </StyledCard>

          </div>
          <div style={{clear: 'both'}}></div>
        </React.Fragment>
        
    );

export default Main;
