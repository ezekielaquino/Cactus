import React, { useContext } from 'react';
import Select from 'react-select/lib/Creatable';
import { Context } from '../providers/Context';


function ProjectPicker(props) {
  const { onChange } = props;
  const context = useContext(Context);
  const options = context.activeProjects.map(item => ({
    key: 'title',
    value: item.project.id,
    label: item.project.name,
  }));
  const placeholder = options.length ? 'Select a project or type a custom summary' : 'Loading projects from Harvest...';

  return (
    <Select
      className="select"
      placeholder={placeholder}
      options={options}
      onChange={onChange} />
  )
}


export default ProjectPicker;