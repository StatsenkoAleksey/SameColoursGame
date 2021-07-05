import { useState } from 'react'
import './App.css'

interface Item {
  id: number,
  color: string,
  opened: boolean,
  visible: boolean
}

function App() {

  const [chosenItem, setChosenItem] = useState<number>(-1)

  const getColorArray = () => {
    let colors: string[] = ['green', 'red', 'yellow', 'blue', 'greenyellow', 'orange', 'magenta', 'olive']
    colors = [...colors, ...colors]
    let colorArray: string[] = []
    while (colors.length > 0) {
        const chosenIndex: number = Math.floor(Math.random() * colors.length)
        colorArray.push(colors[chosenIndex])
        colors.splice(chosenIndex, 1)
    }
    return colorArray
  }


  const colorArray: string[] = getColorArray()
  const defaultItems: Item[] = colorArray.map((item, index) => {
    return {id: index, color: item, opened: false, visible: true}
  })
  const [items, setItems] = useState<Item[]>(defaultItems)

  const openColor = (id: number) => {
    
    setItems((prev: Item[]) => prev.map((elem: Item) => {
      if (elem.id !== id) return elem
      else return {...elem, opened: true}
    }))    

    if (chosenItem < 0) {
      setChosenItem(id)
    } else {
      
      if (chosenItem !== id) {

        setTimeout(() => {
          setItems((prev: Item[]) => {
            const colorPrev: Item[] = prev.filter(elem => elem.id === chosenItem)
            const colorCurrent: Item[] = prev.filter(elem => elem.id === id)
            const hidenItem: boolean = colorPrev[0].color === colorCurrent[0].color ? true : false
            let newState: Item[] = prev.map((elem: Item) => {
              if (elem.id !== id && elem.id !== chosenItem) 
                return elem
              else if (hidenItem) 
                return {...elem, visible: false} 
              else return {...elem, opened: false}                        
            })
            if (newState.every((elem: Item) => elem.visible === false)) {
              
              const newArray: string[] = getColorArray()
              const newItems: Item[] = newArray.map((item, index) => {
                return {id: index, color: item, opened: false, visible: true}
              })
              newState = [...newItems]
            }
            return newState
          })

        }, 500)
      }
          
      setChosenItem(-1)
    }

  }

  return (
    <div className="App">
      {items.map((elem: Item) => 
        (<div className={`
        color-item ${elem.opened ? 'color-'+elem.color : 'color-gray'}
        ${elem.visible ? '' : ' item-hidden'}
        `}
        key={elem.id}
        onClick={openColor.bind(null, elem.id)}></div>
      ))}
    </div>
  )
}

export default App
