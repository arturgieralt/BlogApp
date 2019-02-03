import React, { Component } from 'react';
import { StyledBanner } from '../components/Banner/Banner';
import { StyledCard } from '../components/Card/Card';
import { StyledBar } from '../components/Bar/Bar';
import { StyledMenuList } from '../components/Menu/MenuList';

class App extends Component {
  render() {
    return (
        <React.Fragment>
          <StyledBar>
            <StyledMenuList />
          </StyledBar>
          <StyledBanner />
          <StyledCard>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras finibus, lorem sit amet faucibus lobortis, nunc sapien molestie leo, vitae porta nunc neque eu ipsum. Fusce sed nulla et lacus feugiat suscipit. Integer facilisis in ante non mattis. Sed at dapibus turpis. Nullam ornare non velit luctus aliquet. Mauris lacinia sem nisi, sed fringilla augue viverra et. Aliquam lacinia purus sed tortor fermentum dictum.

  Fusce eu tellus in erat convallis ultricies. Nam gravida dui dignissim lacinia bibendum. Etiam ac interdum nunc. Praesent nec diam justo. Pellentesque fringilla, est at ultricies ultrices, neque ante malesuada erat, id imperdiet magna tortor id metus. Etiam at maximus purus. Sed vulputate finibus ultricies. In vehicula, nisl et commodo commodo, metus ligula feugiat dolor, quis malesuada mi ante vitae sapien. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Cras tempus venenatis facilisis. Fusce vestibulum, magna id fermentum sollicitudin, ipsum lorem vehicula augue, faucibus convallis felis magna et mi. Praesent tortor neque, laoreet nec nulla sit amet, pharetra ornare enim.

  Praesent venenatis nibh non odio imperdiet volutpat. Nulla ipsum lectus, dictum in nisl a, bibendum mollis erat. Nullam fringilla semper dui sed vehicula. Donec in scelerisque eros, in sodales orci. Maecenas vulputate est non pretium luctus. Aliquam elementum fringilla tortor, eu pharetra nisi iaculis fermentum. Nam a sapien orci. Fusce ut volutpat erat. Proin efficitur, felis vel mattis sollicitudin, leo leo tristique est, sit amet aliquet nunc tellus at elit. Morbi nec efficitur odio. Nunc luctus fringilla turpis sit amet tristique. Praesent pellentesque pulvinar lacus, eget porta eros fringilla ac. Nullam ornare id erat et ultrices.

  In sed quam et odio pharetra eleifend. Ut sodales felis eu posuere pharetra. Maecenas pretium libero non nulla tristique, et malesuada odio cursus. Nullam mattis venenatis odio. Etiam ac ipsum nec risus venenatis consectetur. Sed feugiat ex ut ipsum egestas vehicula. Ut aliquet id mauris eget vulputate. Mauris in lobortis ex. Donec ac gravida massa, ac porttitor ante. Fusce mi libero, hendrerit sed viverra in, elementum ac diam. In euismod, nulla sed consequat imperdiet, ex justo blandit lorem, suscipit congue magna augue quis tortor. Cras auctor augue orci, euismod ullamcorper leo rhoncus malesuada. Nullam consequat nisi in urna vehicula vulputate. Vestibulum non lectus in augue consectetur hendrerit.

  Fusce a diam vel sapien tempor ultricies tristique id quam. Pellentesque et nunc ut metus efficitur facilisis ac in odio. Praesent sollicitudin fermentum felis quis auctor. Duis cursus maximus auctor. Nullam elementum at tortor eu viverra. Duis nec semper arcu. Sed viverra imperdiet magna eget interdum. Nunc tincidunt pharetra ex vel hendrerit. Sed convallis semper orci mattis blandit. In fermentum lobortis nisl nec molestie. Cras pharetra tortor quis elit egestas, ut placerat ex ornare. Phasellus in tellus in leo euismod faucibus. Maecenas luctus metus arcu, vitae mattis orci aliquam at. Proin non varius erat. Aenean vel gravida purus, in rutrum dolor. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
          </StyledCard>
        </React.Fragment>
        
    );
  }
}

export default App;
