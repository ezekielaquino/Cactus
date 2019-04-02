import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import ProjectPicker from 'components/ProjectPicker';
import EmojiDropdown from './EmojiDropdown';
import { DebounceInput } from 'react-debounce-input';
import { Draggable } from 'react-beautiful-dnd';
import { playPop } from './Pop';
import TimePicker from './TimePicker';


const propTypes = {
  index: PropTypes.number.isRequired,
  itemData: PropTypes.object.isRequired,
  handleDelete: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.bool,
  ]),
  onChange: PropTypes.func.isRequired,
};

function StatusItem(props) {
  const {
    index,
    itemData,
    handleDelete,
    onChange,
  } = props;
  const [ isInHarvest, setHarvestState ] = useState(false);
  const [ bodyHeight, setBodyHeight ] = useState(100);
  const bodyRef = useRef();

  const handleChange = (e, args) => {
    let key = args ? args.key : e.target.name;
    let value = args ? args.value : e.target.value;

    if (args && args.action === 'select-option') {
      key = e.key;
      value = e.label;
      setHarvestState(true);
    }

    if (args && args.action === 'create-option') {
      key = 'title';
      value = e.value;
      setHarvestState(false);
    }

    if (e && e.target && e.target.name === 'body') {
      setBodyHeight(bodyRef.current.scrollHeight);
    }

    onChange(index, { key, value });
  };

  const onDelete = () => {
    playPop();
    handleDelete(index);
  }

  return (
    <Draggable
      draggableId={`draggable-${index}`}
      index={index}>
      {provided => (
        <Wrap
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}>
          <Field>
            <div>
              <EmojiDropdown
                selectedEmoji={itemData.emoji}
                onChange={handleChange} />
              
              <ProjectPicker onChange={handleChange} />
            </div>
          </Field>
          
          { isInHarvest &&
            <TimePicker
              selectedValue={itemData.time}
              onChange={handleChange} />
          }

          <Field>
            <Input
              element="textarea"
              debounceTimeout={250}
              name="body"
              placeholder="A short description"
              height={bodyHeight}
              inputRef={bodyRef}
              onChange={handleChange} />
          </Field>

          { handleDelete &&
            <footer>
              <Delete onClick={onDelete}>
                Delete
              </Delete>
            </footer>
          }
        </Wrap>
      )}
    </Draggable>
  )
}

const Wrap = styled.div`
  background-color: var(--vaiant);
  border-radius: 10px;
  padding: 15px;
  margin-top: 15px;

  &:focus-within {
    box-shadow: 4px 5px 10px rgba(0, 0, 0, 0.04);
  }

  footer {
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    padding-top: 15px;
  }
`;

const Field = styled.div`
  > div {
    display: flex;
    align-items: center;
  }

  .select {
    width: 100%;
  }

  .select > div {
    flex-grow: 1;
  }

  & + & {
    margin-top: 10px;
  }
`;

const Input = styled(DebounceInput)`
  width: 100%;
  background-color: var(--vaiant2);
  height: ${props => props.height}px;
  border: 0;
  padding: 10px;
  border-radius: 4px;
  resize: none;
`;

const InputTitle = styled(Input)`
  font-family: 'Concert One';
  background-color: var(--vaiant2);
  
  @media (min-width: 800px) {
    font-size: 1.12rem;
  }
`;

const Delete = styled.button`
  background: none;
  border: 0;
  font-size: 9px;
  font-family: inherit;
  color: inherit;
  padding: 0;
  /* color: var(--muted); */
  cursor: pointer;

  &:hover {
    color: red;
    opacity: 0.7;
  }
`;

StatusItem.propTypes = propTypes;


export default React.memo(StatusItem);