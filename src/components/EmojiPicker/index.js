import React, {lazy, Suspense} from 'react';

function EmojiPicker(props) {
  if (typeof window === 'undefined') {
    return null;
  } else {
    const Picker = lazy(() => import(/* webpackChunkName: "emoji-picker" */ './emoji-mart'));

    return (
      <Suspense fallback={<p>Loading..</p>}>
        <Picker {...props} />
      </Suspense>
    )
  }
}

export default EmojiPicker;