import React from 'react';
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

  return (
    <>
    <Wrapper>
      <Select
        className="select"
        placeholder={placeholder}
        options={options}
        onChange={onChange}
        currentValue={value}
        />
    </Wrapper>
    </>
  )
}

const Wrapper = styled.div`
  margin: 1rem 0;
`;

export default ChannelPicker;