import React, { useState, useRef, useEffect } from 'react';
import { keyframes } from 'emotion';
import styled from '@emotion/styled';
import StatusItem from '../components/StatusItem';
import Preview from '../components/Preview';
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { playPop } from '../components/Pop';
import '../components/reset.css';
import '../components/base.css';


const initialEmojis = ['🐶', '🐣', '🌸', '🌈', '️🐹', '🦖', '🍒', '🍑', '🥝' , '🍰'];
const getInitialEmoji = () => {
  return initialEmojis.splice(Math.floor(Math.random() * initialEmojis.length), 1);
};
const initialEmoji = getInitialEmoji();

function App() {
  const [ statusItems, setStatusItems ] = useState([{ emoji: initialEmoji }]);
  const [ result, setResult ] = useState('');
  const [ isCopied, setCopied ] = useState(false);
  const [ headline, setHeadline ] = useState('A quick summary...');
  const gifSrc = 'https://media.giphy.com/media/3ohc0WUqyvkVmFyZxe/giphy.mp4';
  const clipboardRef = useRef();

  const handleAdd = () => {
    const items = [...statusItems];
    
    playPop();
    items.push({ emoji: getInitialEmoji() });
    setStatusItems(items);
  };

  // MEH, We can random get a new gif BUT giphy is so rate limited its not even worth it
  // const getGif = () => {
    // fetch('http://api.giphy.com/v1/gifs/random?tag=nice&api_key=s0L9mFeGgAEiu0ohDrNedg0iVzewrrMv') 
    //   .then(r => r.status === 200 && r.json())
    //   .then(r => {
    //     if (r.data) {
    //       setGifSrc(r.data.image_mp4_url);
    //     }
    //   });
  // };

  const formatResult = items => {
    return items.reduce((res, item, index) => {
      const { emoji, title, body } = item;
      const spacer = index !== 0 ? '\n\n' : '';
      const chunk = `${spacer}*${ emoji ? `${emoji} ` : '' }${ title }*\n${ body }
      `;

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
      // getGif();
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
    // getGif();

    window.addEventListener('keyup', function(e){
      const isMeta = e.metaKey || e.ctrlKey;

      if (isMeta && e.key === 'c') {
        handleCopy();
      }
    });
  }, []);

  useEffect(() => {
    setResult(formatResult(statusItems));
  }, [ statusItems ]);

  return (
    <Main>
      <Header>
        <img alt="Cactus" src="https://www.nicepng.com/png/detail/110-1106868_tumblr-cactus-png-cute-cactus.png" />
      </Header>

      <Wrap>
        <Column>
          <Headline
            type="text"
            placeholder="Your headline"
            value={headline}
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
  const result = Array.from(list);
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
  padding: 60px;
`;

const Wrap = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Header = styled(Wrap)`
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
  width: calc(50% - 15px);

  footer {
    display: flex;
    justify-content: flex-end;
  }
`;

const ColumnRight = styled(Column)`
  max-height: calc(100vh - 75px);
  position: sticky;
  top: 35px;
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
  font-size: 1.2rem;
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


export default App;