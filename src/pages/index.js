import React, { useState, useRef, useEffect } from 'react';
import {graphql} from 'gatsby';
import Image from 'gatsby-image';
import { keyframes } from 'emotion';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { playPop } from '../components/Pop';
import styled from '@emotion/styled';
import StatusItem from '../components/StatusItem';
import Preview from '../components/Preview';
import '../components/reset.css';
import '../components/base.css';


const initialEmojis = ['🐶', '🐣', '🌸', '🌈', '️🐹', '🦖', '🍒', '🍑', '🥝' , '🍰'];
const getInitialEmoji = () => initialEmojis.splice(Math.floor(Math.random() * initialEmojis.length), 1);
const initialEmoji = getInitialEmoji();

function App(props) {
  const [ statusItems, setStatusItems ] = useState([{ emoji: initialEmoji }]);
  const [ result, setResult ] = useState('');
  const [ isCopied, setCopied ] = useState(false);
  const [ headline, setHeadline ] = useState('A quick summary...');
  const clipboardRef = useRef();
  // Previously, this was randomized via giphy api, but is very rate limiated
  const gifSrc = 'https://media.giphy.com/media/3ohc0WUqyvkVmFyZxe/giphy.mp4';

  const handleAdd = () => {
    const items = [...statusItems];
    
    playPop();
    items.push({ emoji: getInitialEmoji() });
    setStatusItems(items);
  };

  const formatResult = items => {
    return items.reduce((res, item, index) => {
      const { emoji, title = '', body = '' } = item;
      const spacer = index !== 0 ? '\n' : '';
      const emojiString = emoji ? `${emoji} ` : '';
      const headerString = `*${emojiString}${title}*`;
      const bodyString = body ? `\n${body}` : '';
      const chunk = `${spacer}${headerString}${bodyString}`;

      return res += chunk;
    }, `${headline ? `*${headline}*\n\n` : ''}`);
  };

  const handleChange = (itemIndex, args) => {
    const { key, value } = args;
    const items = [...statusItems];
    const item = items[itemIndex];

    item[key] = value;

    setStatusItems(items);
  };

  const handleCopy = () => {
    clipboardRef.current.select();
    document.execCommand('copy');

    playPop();
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  const handleDelete = index => {
    const items = [...statusItems];
    
    if (items.length > 1) {
      items.splice(index, 1);
      setStatusItems(items);
    }
  };

  const handleDragEnd = result => {
    if (!result.destination) return false;

    const items = reorder(
      statusItems,
      result.source.index,
      result.destination.index,
    );

    setStatusItems(items);
  };

  useEffect(() => {
    window.addEventListener('keyup', function(e){
      const isMeta = e.metaKey || e.ctrlKey;

      if (isMeta && e.key === 'c') {
        handleCopy();
      }
    });
  }, []);

  useEffect(() => {
    setResult(formatResult(statusItems).trim());
  }, [ statusItems ]);

  return (
    <Main>
      <Header>
        <Image alt="Cactus" fixed={props.data.file.childImageSharp.fixed} />
      </Header>

      <Wrap>
        <Column>
          <Headline
            type="text"
            placeholder="Your headline"
            value={headline}
            onClick={e => e.currentTarget.select()}
            onChange={e => setHeadline(e.target.value)} />
          
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="droppable">
              {provided => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}>
                  { statusItems.map((status, index) => {
                    return (
                      <StatusItem
                        key={`status-${index}`}
                        index={index}
                        itemData={statusItems[index]}
                        onChange={handleChange}
                        handleAdd={handleAdd}
                        handleDelete={statusItems.length > 1 && handleDelete} />
                    )
                  }) }

                  { provided.placeholder }
                </div>
              )}
            </Droppable>
          </DragDropContext>

          <footer>
            <AddButton onClick={handleAdd}>+</AddButton>
          </footer>
        </Column>

        <ColumnRight>
          <Preview
            statusItems={statusItems}
            handleCopy={handleCopy}
            isCopied={isCopied}
            headline={headline} />
        </ColumnRight>

        { (gifSrc && isCopied) &&
          <Success>
            <div>
              <video autoPlay loop muted>
                <source src={gifSrc} type="video/mp4" />
              </video>

              Now go paste it into Slack! Have a nice day!
            </div>
          </Success>
        }

        <Clipboard ref={clipboardRef} value={result} readOnly />
      </Wrap>
    </Main>
  )
}

const reorder = (list, startIndex, endIndex) => {
  const result = [...list];
  const [removed] = result.splice(startIndex, 1);

  result.splice(endIndex, 0, removed);
  return result;
};

const dance = keyframes`
  0% { transform: skew(3deg) }
  50% { transform: skew(-1deg) }
  100% { transform: skew(3deg) }
`;

const Main = styled.main`
  @media (min-width: 800px) {
    padding: 60px;
  }

  @media (max-width: 800px) {
    padding: 30px;
    padding-bottom: 35vh;
  }
`;

const Wrap = styled.div`
  @media (min-width: 800px) {
    display: flex;
    justify-content: space-between;
  }
`;

const Header = styled.div`
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

const Column = styled.div`
  @media (min-width: 800px) {
    width: calc(50% - 15px);
  }

  footer {
    display: flex;
    justify-content: flex-end;
  }
`;

const ColumnRight = styled(Column)`
  @media (min-width: 800px) {
    max-height: calc(100vh - 75px);
    position: sticky;
    top: 35px;
  }

  @media (max-width: 800px) {
    width: 100%;
    height: 30vh;
    position: fixed;
    bottom: 0;
    left: 0;
    background-color: #fbfbfb;
    box-shadow: 0px -5px 8px rgba(0, 0, 0, 0.03);
    padding: 15px;
  }
`;

const AddButton = styled.button`
  width: 100%;
  height: 160px;
  border-radius: 8px;
  font-size: 32px;
  text-align: center;
  color: #fff;
  position: relative;
  margin-top: 15px;
  padding: 15px;
  border: 0;
  cursor: pointer;
  background: #f2f2f2;

  &:before {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    content: '+';
    width: 60px;
    height: 60px;
    background-color: #A3A1DE;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &:hover:before {
    background-color: #9a98d4;
  }
`;

const Headline = styled.input`
  border: 0;
  width: 100%;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 15px;
  font-family: 'Concert One';
  
  @media (min-width: 800px) {
    font-size: 1.12rem;
  }
`;

const Clipboard = styled.textarea`
  position: absolute;
  left: -999999px;
`;

const Success = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #80b3ff9c;

  video {
    display: block;
    margin-bottom: 15px;
    width: auto;
    height: 60vh;
  }

  > div {
    background-color: #fff;
    border-radius: 8px;
    margin: auto;
    padding: 15px;
    text-align: center;
    box-shadow: 4px 5px 10px rgba(0, 0, 0, 0.04);
    font-weight: bold;
  }
`;


export const query = graphql`
  query {
    file(relativePath: { eq: "cactus.png" }) {
      childImageSharp {
        fixed(width: 100, height: 107) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`;

export default App;