import React from 'react';
import PropTypes from 'prop-types';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import StatusItem from '../components/StatusItem';


const propTypes = {
  statusItems: PropTypes.array,
  handleChange: PropTypes.func,
  handleDragEnd: PropTypes.func,
  handleAdd: PropTypes.func,
  handleDelete: PropTypes.func,
};

function StatusMaker(props) {
  const {
    statusItems,
    handleChange,
    handleDragEnd,
    handleAdd,
    handleDelete,
  } = props;

  return (
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
  )
}

StatusMaker.propTypes = propTypes;


export default StatusMaker;