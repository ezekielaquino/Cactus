import React, { useContext } from 'react';
import { graphql, StaticQuery } from 'gatsby';
import { keyframes } from 'emotion';
import { Context } from 'providers/Context';
import styled from '@emotion/styled';
import Image from 'gatsby-image';


function Header() {
  const context = useContext(Context);
  const handleHarvest = () => {
    window.location = 'https://id.getharvest.com/oauth2/authorize?client_id=Z8pIKUO8l441-GYAsK-DzqRq&response_type=token';
  };
  
  return (
    <StaticQuery
      query={query}
      render={data => {
        const { title } = data.site.siteMetadata;
        const { fixed } = data.file.childImageSharp;

        return (
          <Wrap>
            <Image
              alt={title}
              fixed={fixed}
              critical={true} />
            
            { !context.harvestToken &&
              <button onClick={handleHarvest}>Connect with Harvest</button>
            }

            { context.user &&
              <div>Hello, { context.user.first_name }</div>
            }
          </Wrap>
        )
      }} />
  )
}

const dance = keyframes`
  0% { transform: skew(3deg) }
  50% { transform: skew(-1deg) }
  100% { transform: skew(3deg) }
`;

const Wrap = styled.header`
  display: flex;
  justify-content: space-between;
  padding-bottom: 5px;
  display: block;
  background-color: #ececec;
  position: relative;
  animation: ${dance} 1s infinite;
  transform-origin: 50px 100%;
  
  img {
    width: 100px;
    height: auto;
    display: block;
    mix-blend-mode: darken;
  }

  &:after {
    content: 'Cactus sounds like Status™';
    font-size: 12px;
    background-color: #fff;
    border-radius: 8px;
    padding: 5px;
    color: #555;
    position: absolute;
    top: 12px;
    left: 95px;
    transform: rotate(-2deg);
  }
`;

const query = graphql`
  query HeaderQuery {
    file(relativePath: { eq: "cactus.png" }) {
      childImageSharp {
        fixed(width: 100, height: 107) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    site {
      siteMetadata {
        title
        description
        author
      }
    }
  }
`;


export default Header;