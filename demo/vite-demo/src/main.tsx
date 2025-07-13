import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import PuzzleCaptcha from '../../PuzzleCaptcha.tsx';

interface State {
  imageURL: string;
  width: string;
  height: string;
  columns: number;
  rows: number;
}

const defaultState: State = {
  imageURL: 'http://www.choikangstory.com/test-image.jpg',
  width: 'auto',
  height: 'auto',
  columns: 3,
  rows: 2,
};

function Demo() {
  const [props, setProps] = useState<State>(defaultState);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'columns' || name === 'rows') {
      setProps((p) => ({ ...p, [name]: parseInt(value, 10) }));
    } else {
      setProps((p) => ({ ...p, [name]: value }));
    }
  };

  const numberInput = (name: 'columns' | 'rows') => (
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
        columns={props.columns}
        rows={props.rows}
      />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Demo />);
