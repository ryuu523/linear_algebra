import { useEffect, useState } from 'react';
import './App.css';
import DrawField from './components/DrawField';
import ColorPalette from './components/ColorPalette';

function App() {
  const [fieldWidth, setFieldWidth] = useState(31);
  const [fieldHeight, setFieldHeight] = useState(31);
  const [fieldOrigin, setFieldOrigin] = useState({ x: 16, y: 16 });
  const [field, setField] = useState([]);
  const [drawColor, setDrawColor] = useState("rgb(255, 255, 255)");
  const [isDrawing, setIsDrawing] = useState(false); // Drawing状態を追加
  const [procession, setProcession] = useState({
    row1: { col1: 1, col2: 0 },
    row2: { col1: 0, col2: 1 }
  })
  const colorPalette = [
    // 色の配列
    "rgb(255, 107, 107)",
    "rgb(78, 205, 196)",
    "rgb(255, 217, 61)",
    "rgb(26, 83, 92)",
    "rgb(255, 159, 28)",
    "rgb(0, 0, 0)",
    "rgb(255, 255, 255)"
  ];

  const createField = () => {
    setField([...new Array(Number(fieldHeight))].map((_, y) =>
      [...new Array(Number(fieldWidth))].map((_,x)=>{
        if(x==fieldOrigin.x-1&&y==fieldOrigin.y-1){
          return "red"
        }
        else{
          return "white"
        }
      })
    ));
  };

  const selectColor = (e) => {
    const colors = Array.from(e.target.closest(".colorPalette").children);
    colors.map((color, i) => {
      if (color.style.backgroundColor == e.target.style.backgroundColor) {
        color.style.border = "2px solid rgb(0, 123, 255)";
      } else {
        color.style.border = "2px solid black";
      }
    });
    setDrawColor(e.target.style.backgroundColor);
  };
  const applyMatrixTransform = () => {

    const array = [...new Array(Number(fieldHeight))].map((_, y) =>
      [...new Array(Number(fieldWidth))].map((_, x) => {
        let maty = procession.row1.col1 * (y - Number(fieldOrigin.y) + 1) + procession.row1.col2 * (x - Number(fieldOrigin.x) + 1)
        let matx = procession.row2.col1 * (y - Number(fieldOrigin.y) + 1) + procession.row2.col2 * (x - Number(fieldOrigin.x) + 1)
        return ({ x: matx, y: maty })
      }))
      
    setField((prev) => {
      const newField = [...new Array(Number(fieldHeight))].map((_, y) =>
        [...new Array(Number(fieldWidth))].fill("white"))
      array.forEach((row, y) => {
        row.forEach((n, x) => {
          if (n.x + Number(fieldOrigin.x )- 1 > (Number(fieldWidth) - 1) || n.y + Number(fieldOrigin.y) - 1 > (Number(fieldHeight) - 1) || n.x + Number(fieldOrigin.x) - 1 < 0 || n.y + Number(fieldOrigin.y) - 1 < 0) {
          }
          else {
            newField[n.y+Number(fieldOrigin.y)-1][n.x+Number(fieldOrigin.x)-1] = prev[y][x ]
          }
        })
      });
      return newField

    })
  }
  const handleMouseDown = () => setIsDrawing(true);
  const handleMouseUp = () => setIsDrawing(false);
  const handleCellUpdate = (x, y) => {
    if (isDrawing) {
      const newField = [...field];
      newField[y][x] = drawColor;
      setField(newField);
    }
  };

  useEffect(() => {
    createField();
  }, []);

  return (
    <div>
      <div className='flex'>
        <div>
          fieldwidth: <input type="number" value={fieldWidth} onChange={(e) => setFieldWidth(e.target.value)} /><br />
          fieldheight: <input type="number" value={fieldHeight} onChange={(e) => setFieldHeight(e.target.value)} /><br />
          origin x: <input type="number" value={fieldOrigin.x} onChange={(e) => setFieldOrigin((prev) => ({ ...prev, x: e.target.value }))} /><br />
          origin y: <input type="number" value={fieldOrigin.y} onChange={(e) => setFieldOrigin((prev) => ({ ...prev, y: e.target.value }))} />
        </div>
        <div className='procession'>
          <p>表現行列(2*2)</p>
          <div className='content'>
            <input type="number" value={procession.row1.col1} className='box n1' onChange={(e) => {
              const value = e.target.value;
              setProcession((prev) => ({
                ...prev,
                row1: { ...prev.row1, col1: value },
              }));
            }} />
            <input type="number" value={procession.row1.col2} className='box n2' onChange={(e) => {
              const value = e.target.value;
              setProcession((prev) => ({
                ...prev,
                row1: { ...prev.row1, col2: value },
              }));
            }} />
            <input type="number" value={procession.row2.col1} className='box n3' onChange={(e) => {
              const value = e.target.value;
              setProcession((prev) => ({
                ...prev,
                row2: { ...prev.row2, col1: value },
              }));
            }} />
            <input type="number" value={procession.row2.col2} className='box n4' onChange={(e) => {
              const value = e.target.value;
              setProcession((prev) => ({
                ...prev,
                row2: { ...prev.row2, col2: value },
              }));
            }} />
          </div>
          <button onClick={() => applyMatrixTransform()}>表現行列を適用する</button>

        </div>
      </div>
      <button onClick={() => createField()}>適用</button>
      <ColorPalette colorPalette={colorPalette} selectColor={selectColor} drawColor={drawColor} />
      <DrawField field={field} onCellUpdate={handleCellUpdate} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} />
    </div>
  );
}

export default App;