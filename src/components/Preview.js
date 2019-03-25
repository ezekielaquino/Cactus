import React, { useLayoutEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';


const propTypes = {
  handleCopy: PropTypes.func,
  statusItems: PropTypes.array,
  headline: PropTypes.string,
};

function Preview(props) {
  const {
    handleCopy,
    statusItems,
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
            const { emoji, title, body } = item;

            return (
              <PreviewItem key={`preview-${index}`}>
                <PreviewText
                  as="h4"
                  isDirty={title}>
                  { emoji ? `${ emoji } ` : '' } { title || `A little summary` }
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
  overflow-y: auto;

  h3 {
    margin-bottom: 1rem;
  }

  &:before {
    content: 'Cute little preview';
    position: absolute;
    font-size: 11px;
    color: #999;
    bottom: calc(100% + 10px);
    left: 0;
  }

  &:hover .prompt {
    opacity: 1;
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
  color: ${props => !props.isDirty && '#999'};
  pointer-events: none;
  white-space: pre-wrap;
  line-height: 1.2;
`;

const Prompt = styled.span`
  padding: 10px;
  font-size: 11px;
  background-color: #999;
  color: #fff;
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
  color: #999;
  display: block;
  padding-top: 10px;
`;

Preview.propTypes = propTypes;

export default Preview;