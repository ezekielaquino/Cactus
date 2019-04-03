import React, { useEffect, useContext } from 'react';
import { Context } from 'providers/Context';
import { init } from 'providers/Http';
import styled from '@emotion/styled';
import QueryString from 'query-string';
import initAccounts from '../providers/Accounts';


const INITSTUFF = [
  {
    key: 'accounts',
    label: 'Harvest Accounts',
  },
  {
    key: 'projects',
    label: 'Your projects from Harvest',
  },
];

function Callback() {
  const context = useContext(Context);

  useEffect(() => {
    const { access_token: accessToken } = QueryString.parse(window.location.search);

    init(accessToken);
    localStorage.setItem('harvestToken', accessToken);
    context.setHarvestToken(accessToken);
  }, []);

  initAccounts({ redirect: true });

  return (
    <Wrap>
      <Brand>
        🌵
        <span>Cactus</span>
      </Brand>
      
      <InitItems>
        { INITSTUFF.map((item, index) => {
          const initIcon = index < INITSTUFF.length - 1 ? `🐣` : `🍳`;
          const isInit = context.initState[item.key] === 'success';

          return (
            <li key={`initItem-${index}`}>
              <Indicator
                isInit={isInit}
                initIcon={initIcon} />

              { item.label }
            </li>
          )
        })}
      </InitItems>
    </Wrap>
  )
}

const Indicator = props => {
  const { isInit, initIcon } = props;

  return (
    <span>
      { !isInit ? `🥚` : initIcon }
    </span>
  )
}

const Wrap = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate3d(-50%, -50%, 0);
  width: 80%;
  max-width: 400px;
  background-color: #fff;
  padding: 30px;
  border-radius: 8px;
  text-align: center;
`;

const Brand = styled.h1`
  font-size: 80px;
  margin-bottom: 60px;

  span {
    display: none;
  }
`;

const InitItems = styled.ul`
  li + li {
    margin-top: 20px;
  }

  span {
    display: block;
    font-size: 48px;
    margin-bottom: 15px;
  }
`;


export default Callback;