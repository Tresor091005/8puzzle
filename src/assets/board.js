/**
 * only works when arr.length is divisble by chunkSize
 * @param {Array} arr the array you want to divide into array of subarrays of size chunkSize
 * @param {Number} chunkSize the size of subarray
 */
export function chunk(arr, chunkSize) {
  return Array.from({ length: Math.ceil(arr.length / chunkSize) }, (_, i) => 
    arr.slice(i * chunkSize, i * chunkSize + chunkSize)
  );
}

export function getBoard(size = 3) {
  const board = Array.from({ length: size * size }, (_, i) => i + 1);
  return chunk(board, size);
}

export function mixBoard(board, times) {
  let newBoard = board.map(row => row.slice());

  for (let i = 0; i < times; i++) {
    const spaceInd = findBlank(newBoard);
    const randInd = getRandomIndex(newBoard, spaceInd);

    newBoard = swap(newBoard, spaceInd, randInd);
  }

  return newBoard;
}

export function findBlank(board) {
  const size = board.length

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (board[i][j] === size ** 2) return { x: i, y: j };
    }
  }
}

export function getRandomIndex(board, index) {
  const validDirections = [];

  // Ajoute les directions valides
  if (index.x - 1 >= 0) validDirections.push("u");
  if (index.x + 1 < board.length) validDirections.push("d");
  if (index.y - 1 >= 0) validDirections.push("l");
  if (index.y + 1 < board.length) validDirections.push("r");

  // Si aucune direction valide n'est trouvée, on retourne null
  if (validDirections.length === 0) return null;

  // Choisir une direction aléatoire parmi celles valides
  const directIndex = Math.floor(Math.random() * validDirections.length);
  return getDirectedIndex(index, validDirections[directIndex]);
}

export function getDirectedIndex(index, direct) {
  if (direct === "u") return { x: index.x - 1, y: index.y };
  if (direct === "d") return { x: index.x + 1, y: index.y };
  if (direct === "l") return { x: index.x, y: index.y - 1 };
  if (direct === "r") return { x: index.x, y: index.y + 1 };
}


export function isValidIndex(board, index) {
  const size = board.length;
  return index.x >= 0 && index.x < size && index.y >= 0 && index.y < size;
}

export function isBoardSolved(board, correctBoard) {
  const size = board.length;
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (board[i][j] !== correctBoard[i][j]) return false;
    }
  }
  return true;
}

const DIRECTIONS = [
  { x: -1, y: 0 }, // Up (haut)
  { x: 1, y: 0 },  // Down (bas)
  { x: 0, y: -1 }, // Left (gauche)
  { x: 0, y: 1 },  // Right (droite)
];

export function isSwappable(board, { x, y }) {
  const size = board.length;

  // Itération sur les directions
  for (let { x: dx, y: dy } of DIRECTIONS) {
    const newX = x + dx;
    const newY = y + dy;

    if (newX >= 0 && newX < size && newY >= 0 && newY < size && board[newX][newY] === size ** 2) {
      return true;
    }
  }

  return false;
}

export function getSwappableIndexes(board, { x, y }) {
  const size = board.length;

  // Itération sur les directions
  for (let { x: dx, y: dy } of DIRECTIONS) {
    const newX = x + dx;
    const newY = y + dy;

    if (newX >= 0 && newX < size && newY >= 0 && newY < size && board[newX][newY] === size ** 2) {
      return [{ x, y }, { x: newX, y: newY }];
    }
  }

  return null; // Si aucune case n'est échangeable
}

export function swap(board, { x: x1, y: y1 }, { x: x2, y: y2 }) {
  const newBoard = board.map(row => row.slice());
  const tmp = newBoard[x1][y1];
  newBoard[x1][y1] = newBoard[x2][y2];
  newBoard[x2][y2] = tmp;
  return newBoard;
}
