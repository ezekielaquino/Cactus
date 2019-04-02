import React, { useLayoutEffect, useRef, useState } from 'react';
import { Context} from 'providers/Context';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';


const propTypes = {
  handleCopy: PropTypes.func,
  headline: PropTypes.string,
};

function Preview(props) {
  const {
    statusItems,
    handleCopy,
    headline,
  } = props;
  const [ pointer, setPointer ] = useState({ offsetX: 0, offsetY: 0 });
  const previewRef = useRef();

  useLayoutEffect(() => {
    previewRef.current.addEventListener('mousemove', e => {
      const { clientX, clientY } = e;
      const { x, y } = previewRef.current.getBoundingClientRect();
      const offsetX = clientX - x;
      const offsetY = clientY - y;
      
      setPointer({ offsetX, offsetY });
    });
  }, []);

  return (
    <>
      <ResultWrap
        ref={previewRef}
        onClick={handleCopy}>
        <h3>
          { headline }
        </h3>

        <ul>
          { statusItems.map((item, index) => {
            const { emoji, title, body, time } = item;

            return (
              <PreviewItem key={`preview-${index}`}>
                <PreviewText
                  as="h4"
                  isDirty={title}>
                  { emoji ? `${ emoji } ` : '' } { title || `A little summary` }

                  { time &&
                    <Time>{ time }</Time>
                  }
                </PreviewText>

                <PreviewText isDirty={body}>
                  { body || `A little something or a novel about it` }
                </PreviewText>
              </PreviewItem>
            )
          }) }
        </ul>

        <Prompt
          className="prompt"
          position={pointer}>
          Click &rarr; Clipboard
        </Prompt>
      </ResultWrap>

      <Fineprint>
        Press anywhere here to copy, or Ctrl + C!
      </Fineprint>
    </>
  )
}

const ResultWrap = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  border: 1px dashed #bababa;
  border-radius: 8px;
  padding: 15px;
  cursor: pointer;
  overflow-x:hidden;
  overflow-y: auto;

  h3 {
    margin-bottom: 1rem;
  }

  &:before {
    content: 'Cute little preview';
    position: absolute;
    font-size: 11px;
    bottom: calc(100% + 10px);
    left: 0;
  }

  &:hover .prompt {
    opacity: 1;
  }

  @media (max-width: 800px) {
    padding-top: 30px;
  }
`;

const PreviewItem = styled.li`
  list-style-type: none;
  
  h4 {
    margin-bottom: 0.35rem;
  }

  & + & {
    margin-top: 1rem;
  }
`;

const PreviewText = styled.p`
  color: ${props => !props.isDirty && 'var(--muted)'};
  pointer-events: none;
  white-space: pre-wrap;
  line-height: 1.2;
`;

const Prompt = styled.span`
  padding: 10px;
  font-size: 11px;
  background-color: var(--muted);
  color: var(--vaiant);
  position: absolute;
  border-radius: 15px;
  left: ${props => props.position.offsetX + 10}px;
  top: ${props => props.position.offsetY + 10}px;
  white-space: nowrap;
  z-index: 9999;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.15s;
`;

const Fineprint = styled.span`
  font-size: 11px;
  text-align: right;
  color: var(--muted);
  display: block;
  padding-top: 10px;

  @media (max-width: 800px) {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 10px;
  }
`;

const Time = styled.sup`
  vertical-align: top;
  font-size: 12px;
  opacity: 0.35;
  padding-left: 4px;
`;

Preview.propTypes = propTypes;


export default Preview;