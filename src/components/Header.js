import React, { useContext } from "react"
import { graphql, StaticQuery } from "gatsby"
import { keyframes } from "emotion"
import { Context } from "../providers/Context"
import styled from "@emotion/styled"
import Image from "gatsby-image"

function Header() {
  const context = useContext(Context)

  const handleSlack = () => {
    const slackClientId = process.env.GATSBY_CLIENT_ID
    window.location = `https://slack.com/oauth/authorize?client_id=${slackClientId}&scope=channels:read,chat:write:user`
  }

  return (
    <StaticQuery
      query={query}
      render={data => {
        const { title } = data.site.siteMetadata
        const { fixed } = data.file.childImageSharp

        const showSlack = !context.slackAccessToken
        const showPrompt = showSlack

        return (
          <Wrap>
            <ImageWrap>
              <Image alt={title} fixed={fixed} critical={true} />

              {showPrompt && (
                <InitialPrompt>
                  <p>
                    Hey there! Welcome to me!
                    <br />
                    <br />
                    Looks like you're not logged in! You get wonderful features
                    like posting directly to Slack and integrating with Harvest
                    when you do!
                  </p>

                  {showSlack ? (
                    <button onClick={handleSlack}>Connect with Slack</button>
                  ) : null}
                </InitialPrompt>
              )}
            </ImageWrap>
          </Wrap>
        )
      }}
    />
  )
}

const dance = keyframes`
  0% { transform: skew(3deg) }
  50% { transform: skew(-1deg) }
  100% { transform: skew(3deg) }
`

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
    left: 90px;
    top: 42px;
    transform: rotate(2deg);
  }

  &:after {
    content: "Cactus sounds like Status™";
    top: 12px;
    left: 95px;
    transform: rotate(-6deg);
  }
`

const InitialPrompt = styled.div`
  position: absolute;
  border-radius: 8px;
  font-size: 14px;
  line-height: 1.2;
  padding: 2rem 1rem 1rem;
  left: 95px;
  top: 12%;
  background: pink;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;

  p {
    width: 50%;
  }

  button {
    width: 40%;
    border: 0;
    background: #50b350;
    color: white;
    border-radius: 30px;
    height: 3rem;
    cursor: pointer;
  }

  button + button {
    margin-left: 1rem;
  }
`

const Wrap = styled.header`
  display: block;

  img {
    width: 100px;
    height: auto;
    display: block;
    mix-blend-mode: darken;
  }
`

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
`

export default Header; 
