import React, { useState, useEffect } from 'react';
import './App.css';
import { v4 as uuidv4 } from 'uuid';
import { randomColor } from 'randomcolor';
import Draggable from 'react-draggable';

function App() {
  const [item, setItem] = useState('')
  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem('items')) || []
  )

  const updatePos = (data, index) => {
    let newArray = [...items]
    newArray[index].defaultPos = { x: data.x, y: data.y }
    setItems(newArray)
  }

  const deleteNode = (id) => {
    setItems(items.filter((item) => item.id !== id))
  }

  const keyPress = (e) => {
    if (e.which === 13) {
      newItem()
    }
  }

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items))
  }, [items])

  const newItem = () => {
    if (item.trim() !== '') {
      function yPos(min, max) {
        min = -700;
        max = -200;
        return Math.random() * (max - min) + min;
      }
      const newItem = {
        id: uuidv4(),
        item: item,
        color: randomColor({
          luminosity: 'light'
        }),
        defaultPos: {
          x: 650,
          y: yPos()
        }
      }
      setItems((items) => [...items, newItem])
      setItem('')
    } else {
      alert('enter something...')
      setItem('')
    }
  }

  return (
    <div className="App">
      <div className="wrapper">
        <h2> In progress ...</h2>
        <div className="wrap">
          <input
            value={item}
            type="text"
            placeholder="Enter something..."
            onChange={(e) => setItem(e.target.value)}
            onKeyPress={(e) => keyPress(e)}
          />
          <button className="enter" onClick={newItem}>ENTER</button>
        </div>
        <h2> Finished...</h2>
      </div >
      {
        items.map((item, index) => {
          return (
            <Draggable
              key={index}
              defaultPosition={item.defaultPos}
              onStop={(_, data) => {
                updatePos(data, index)
              }}
            >
              <div className="todo_item" style={{ backgroundColor: item.color }}>
                {`${item.item}`}
                <button className='delete' onClick={() => deleteNode(item.id)}>X</button>
              </div>
            </Draggable>
          )
        })
      }
    </div>
  );
}

export default App;

