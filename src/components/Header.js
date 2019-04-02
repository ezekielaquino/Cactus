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

              { !context.harvestToken &&
                <InitialPrompt>
                  <p>
                    Hey there! Welcome to me!<br/>
                    <br/>
                    Looks like you're not logged in! You get wonderful features like Harvest integration when you do! Click below!
                  </p>

                  <button onClick={handleHarvest}>Connect with Harvest</button>
                </InitialPrompt>
              }
            </ImageWrap>
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

const InitialPrompt = styled.div`
  width: 250px;
  position: absolute;
  border-radius: 8px;
  font-size: 14px;
  line-height: 1.2;
  padding: 5px;
  left: 95px;
  top: 42px;
  background: pink;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);

  button {
    width: 100%;
    padding: 10px;
    border: 0;
    background: #50b350;
    color: white;
    border-radius: 30px;
    margin-top: 15px;
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