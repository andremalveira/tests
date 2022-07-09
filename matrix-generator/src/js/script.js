import {GetById} from './utils.js'

/* INPUT's */
let inputRows = GetById('rows')
let inputColumns = GetById('columns')

let diagonalColor1 = GetById('diagonal_color_1')
let diagonalColor2 = GetById('diagonal_color_2')

/* CHECKBOX's */
let checkboxMarker = GetById('marker_matrix')

/* BUTTON's */
let btnGenerate = GetById('generate')
let btnApplyColor = GetById('apply_color')

/* TABLE CONTAINER */
let containerTable = GetById('matrix_table')

function MarkerShowOptions(e) {
    if(e.target.checked) diagonalColor1.show()
    else diagonalColor1.hide();
}

function MarkerChange() {
  checkboxMarker.show()

  if(checkboxMarker.checked) diagonalColor1.show()

  checkboxMarker.removeEventListener('change', MarkerShowOptions)
  checkboxMarker.addEventListener('change', MarkerShowOptions)
}

function GenerateTable(rows, columns) {
  let color1, color2;

  if(rows == columns) {
    color1 = diagonalColor1.value
    color2 = diagonalColor2.value
  }

  const table = (tbody) => {
    return (`<table class="m-auto">${tbody}</table>`)
  }

  const create_columns = (row_index) => {
    let td_html = ''
    for (var i = 0; i < columns; i++) {
      let index = i+1
      let rindex = row_index + 1
      let first = rindex == index && color1
      let second = rindex + index == columns + 1 && color2

      td_html += `<td 
      ${first && second ?`style="background:conic-gradient(${color2} 0deg, ${color2} 90deg, ${color1} 90deg, ${color1} 180deg, ${color2} 180deg, ${color2} 270deg, ${color1} 270deg, ${color1} 360deg);"`
      : first ? `style="background:${color1}"`
      : second ? `style="background:${color2}"`
      : ''}
      >
      ${rindex}${index}
      </td>`
    }
    return (`<tr>${td_html}</tr>`)
  }

  const create_rows = () => {
    let td_html = ''
    for (var i = 0; i < rows; i++) {
      td_html += create_columns(i)
    }
    return (`<tr>${td_html}</tr>`)
  }

  if(rows && columns) {
    let result = create_rows()
    containerTable.innerHTML = table(result)
  }
}

function init() {
  let row = inputRows.value
  let columns = inputColumns.value

  if(row && columns) {
    row = JSON.parse(row)
    columns = JSON.parse(columns)

    if(row == columns) {
      MarkerChange()
    } else {
      checkboxMarker.hide(); 
      diagonalColor1.hide()
    }

    GenerateTable(row, columns)
  }
}

btnGenerate.addEventListener('click', () => {
  init()
})
btnApplyColor.addEventListener('click', () => {
  init()
})