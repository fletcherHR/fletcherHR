import React from 'react';
import ReactStars from 'react-stars';

export default function Result(props) {
  console.log('these are props within Result.jsx: ', props);
  const imageURL = props.result.images;
  const saveToFavorites = () => {
    // this will save to favorites
  };

  return (
    <div>
      <ReactStars
        count={1}
        onChange={saveToFavorites}
        size={16}
        color2={'#ffd700'}
        half={false}
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
