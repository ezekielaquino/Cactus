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
        const userString = context.user ? `Hello, ${context.user.first_name}` : '';
  
        return (
          <Wrap>
            <ImageWrap userMsg={userString}>
              <Image
                alt={title}
                fixed={fixed}
                critical={true} />

              { userString &&
                <h3>
                  { userString }
                </h3>
              }
            </ImageWrap>
            
            { !context.harvestToken &&
              <button onClick={handleHarvest}>Connect with Harvest</button>
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

const ImageWrap = styled.div`
  position: relative;
  flex-grow: 0;
  animation: ${dance} 1s infinite;
  transform-origin: 50px 100%;
  background-color: #ececec;

  &:after,
  h3 {
    position: absolute;
    font-size: 12px;
    background-color: #fff;
    border-radius: 8px;
    padding: 5px;
    color: #555;
  }

  h3 {
    background: cyan;
    left: 95px;
    top: 42px;
    transform: rotate(2deg);
  }

  &:after {
    content: 'Cactus sounds like Status™';
    top: 12px;
    left: 95px;
    transform: rotate(-2deg);
  }
`;

const Wrap = styled.header`
  display: flex;
  justify-content: space-between;
  padding-bottom: 5px;
  display: block;
  position: relative;
  
  img {
    width: 100px;
    height: auto;
    display: block;
    mix-blend-mode: darken;
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