import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import EmojiPicker from './EmojiPicker';
import 'emoji-mart/css/emoji-mart.css';

const propTypes = {
  selectedEmoji: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  onChange: PropTypes.func.isRequired,
};

function EmojiDropdown(props) {
  const {
    selectedEmoji,
    onChange,
  } = props;

  const detailsRef = useRef();

  const [isOpen, setIsOpen] = useState(false);

  const onPick = emoji => {
    onChange(null, { key: 'emoji', value: emoji.native });
    detailsRef.current.open = false;
  }

  return (
    <Wrap ref={detailsRef} open={isOpen} onToggle={(event) => {
      event.preventDefault();
      setIsOpen(!isOpen);
    }}>
      <summary>
        { selectedEmoji || 'Emoji' }
      </summary>

      <DropdownWrap>
        {isOpen &&
          <EmojiPicker onSelect={onPick}></EmojiPicker>
        }
      </DropdownWrap>
    </Wrap>
  )
}

const Wrap = styled.details`
  position: relative;
  margin-right: 15px;
  flex-shrink: 0;

  summary {
    font-size: 1.5rem;
    list-style: none;
    display: flex;
    align-items: center;
    outline: none;
    cursor: pointer;

    &::-webkit-details-marker {
      font-size: 0.75rem;
    }
  }

  &[open] summary:before {
    content: '';
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
  }
`;

const DropdownWrap = styled.div`
  position: absolute;
  z-index: 99;
`;

EmojiDropdown.propTypes = propTypes;


export default EmojiDropdown;