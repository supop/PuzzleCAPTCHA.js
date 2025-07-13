import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import PuzzleCaptcha from '../../PuzzleCaptcha.jsx';

const defaultState = {
  imageURL: 'http://www.choikangstory.com/test-image.jpg',
  width: 'auto',
  height: 'auto',
  columns: 3,
  rows: 2,
};

function Demo() {
  const [props, setProps] = useState(defaultState);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProps((p) => ({ ...p, [name]: value }));
  };

  const numberInput = (name) => (
    <input
      type="number"
      name={name}
      value={props[name]}
      onChange={handleChange}
      min="1"
    />
  );

  return (
    <div>
      <form>
        <div>
          <label>
            Image URL:
            <input
              type="text"
              name="imageURL"
              value={props.imageURL}
              onChange={handleChange}
              style={{ width: '400px' }}
            />
          </label>
        </div>
        <div>
          <label>
            Width:
            <input
              type="text"
              name="width"
              value={props.width}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            Height:
            <input
              type="text"
              name="height"
              value={props.height}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            Columns:
            {numberInput('columns')}
          </label>
        </div>
        <div>
          <label>
            Rows:
            {numberInput('rows')}
          </label>
        </div>
      </form>
      <hr />
      <PuzzleCaptcha
        imageURL={props.imageURL}
        width={props.width}
        height={props.height}
        columns={parseInt(props.columns, 10) || 1}
        rows={parseInt(props.rows, 10) || 1}
      />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Demo />);
