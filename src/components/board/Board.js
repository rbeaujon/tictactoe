import { useEffect, useState } from 'react'
import './Board.scss'

const Board = () => {
	const[win, setWin] = useState("");
	const[player, setPLayer] = useState("X");
	const[listX, setListX] = useState();
	const[listO, setListO] = useState();

	useEffect(() => {
		handleMatch()
	},[listX,listO])

	const handlePlayer = (column) => {
	
		if(win === ""){
			const exist = (listO && listO.includes(column)) || (listX && listX.includes(column));
			if (listX){
				if(!exist){
					if(player === "X" ){
						let newList = [...listX];
						newList.push(column)
						setListX(newList)
					}

					if(listO ) {
							if(player ==="O"){
							   let newList = [...listO];
							   newList.push(column)
							   setListO(newList)
							}
						} else if(player ==="O") {
							setListO([column])
					}
					document.getElementById(column).innerHTML = (player)
					setPLayer(player === "X" ? "O" : "X");
				}
			} else {
				setListX([column])
				document.getElementById(column).innerHTML = player
				setPLayer("O");
			}
		}

	}
	const handleMatch = () => {
		
		const posibilities = [
			["A3","A2","A1"],
			["B1","B2","B3"],
			["C1","C2","C3"],

			["A1","B1", "C1"],
			["A2","B2", "C2"],
			["A3", "B3", "C3"],

			["A1", "B2","C3"],
			["A3", "B2", "C1"]
		]
		
		if(listX) {
			const findMatch = (posibilities.map((p, index) => posibilities[index].every(i => listX.includes(i))))
			if(findMatch.includes(true)){
				setWin("X")	
			}
		}
		if(listO) {
			const findMatch = (posibilities.map((p, index) => posibilities[index].every(i => listO.includes(i))))
			if(findMatch.includes(true)){
				setWin("O")	
			}
		}
	
	}

	const resetAll = () => {
		setWin("")
		setPLayer("X")
		setListX()
		setListO()
		for(let x = 1; x<4; x++){
			document.getElementById("A"+x).innerHTML = ""
			document.getElementById("B"+x).innerHTML = ""
			document.getElementById("C"+x).innerHTML = ""
		}
	}

	return (
		<div className='board'>
			<div className='info'> Winner: {win} 
				<div onClick={()=> resetAll()} />
			</div>
			
			<div className="container">
				<div id="A1" onClick={() => handlePlayer("A1")}></div>
				<div id="A2" onClick={() => handlePlayer("A2")}></div>
				<div id="A3" onClick={() => handlePlayer("A3")}></div>

				<div id="B1" onClick={() => handlePlayer("B1")}></div>
				<div id="B2" onClick={() => handlePlayer("B2")}></div>
				<div id="B3" onClick={() => handlePlayer("B3")}></div>

				<div id="C1" onClick={() => handlePlayer("C1")}></div>
				<div id="C2" onClick={() => handlePlayer("C2")}></div>
				<div id="C3" onClick={() => handlePlayer("C3")}></div>
		</div>
		</div>

	)
	
}
export default Board