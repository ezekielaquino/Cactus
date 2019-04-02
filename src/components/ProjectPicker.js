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

  return (
    <Select
      className="select"
      placeholder="Select a project or type a custom summary"
      options={options}
      onChange={onChange} />
  )
}


export default ProjectPicker;