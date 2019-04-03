import React, { useContext } from 'react';
import Select from 'react-select';
import { Context } from '../providers/Context';


function TasksPicker(props) {
  const { selectedProject, onChange } = props;
  const context = useContext(Context);
  const projectData = context.activeProjects.find(item => item.id === selectedProject);
  const options = projectData['task_assignments'].map(item => ({
    key: 'projectTask',
    value: item.task.id,
    label: item.task.name,
  }));
  const placeholder = options.length ? 'Select a task' : 'Loading projects from Harvest...';

  return (
    <Select
      className="select"
      placeholder={placeholder}
      options={options}
      onChange={onChange} />
  )
}


export default TasksPicker;