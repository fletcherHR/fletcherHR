import React from 'react';

export default function Result(props) {
  return (
    <li>{props.result.prices}{props.result.addresses}{props.result.images}</li>
  );
}
