export const saveGametoStg = ( {board, turn} ) => {
    window.localStorage.setItem('board', JSON.stringify(board))
    window.localStorage.setItem('turn', turn)
}

export const removeGameInStg = () => {
    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
}