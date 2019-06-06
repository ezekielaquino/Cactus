import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import Select from 'react-select';

function ChannelPicker(props) {
  const { channels, value, onChange } = props;

  const options = channels.map(channel => ({
    key: channel.id,
    value: channel.id,
    label: channel.name,
  }));

  const placeholder = options.length ? 'Select a channel' : 'Loading channels from Slack...';
  const getDefault = options.find(option => option.label === 'status');
  const getValue = options.find(option => option.value === value);

  // Initially set the default value of the select, React Select quirk.
  useEffect(() => {
    const { value, label } = getDefault;
    onChange(value, label);
  }, []);

  return (
    <>
    <Wrapper>
        <span>Pick a slack channel</span>
      <Select
        className="select"
        placeholder={placeholder}
        defaultValue={getDefault}
        options={options}
        onChange={({ value, label }) => onChange(value, label)}
        value={getValue}
        />
    </Wrapper>
    </>
  )
}

const Wrapper = styled.div`
  margin: 1rem 0;
`;

export default ChannelPicker;