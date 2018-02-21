import React from 'react';
import { Button, Icon } from 'semantic-ui-react';

export default function Result(props) {
  console.log('these are props within Result.jsx: ', props);
  const imageURL = props.result.images;
  let starred = false;
  let iconState = 'empty star';
  const saveToFavorites = () => {
    if (starred) {
      starred = false;
      iconState = 'star';
    } else {
      starred = true;
      iconState = 'empty star';
    }
  };
  return (
    <div>
      <Button
        icon={iconState}
        onClick={saveToFavorites}
        color="yellow"
      />
      <span>
        ${props.result.prices}
      </span>
      <span>
        - {props.result.addresses}
      </span>
      <span>
        - <a href={imageURL}>Property Image</a>
      </span>
    </div>
  );
}
