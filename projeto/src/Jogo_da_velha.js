import React, { useState, useEffect } from 'react';
import './Jogo_da_velha.css'

function Jogo_da_velha() {
  const bordaVazia = Array(9).fill("")
  const[borda, setBorda]=useState(bordaVazia)
  const[jogadorAtual, setJogadorAtual]=useState("X");
  const[ganhador, setGanhador]=useState(null);

 
  const handleCelulaClick =(index) => {
    if(borda[index]!== "")return null;
    if(ganhador)return null;
    setBorda(borda.map((item, itemIndex)=> itemIndex === index ? jogadorAtual: item));
    setJogadorAtual( jogadorAtual === "X" ? "O":"X")

  }

   
  const vencedor=()=>{
    const probabilidadeGanhar=[

    [borda[0], borda[1], borda[2]],
    [borda[3], borda[4], borda[5]],
    [borda[6], borda[7], borda[8]],


    [borda[0], borda[3], borda[6]],
    [borda[1], borda[4], borda[7]],
    [borda[2], borda[5], borda[8]],


    [borda[0], borda[4], borda[8]],
    [borda[2], borda[4], borda[6]],
    
   
  ];
  probabilidadeGanhar.forEach(celulas=>{
    if(celulas.every(celula => celula === "O")) setGanhador("O")
    if(celulas.every(celula => celula === "X")) setGanhador("X")
  })

  empatar();

}
const empatar =()=>{
  if(borda.every(item => item !== "")){
    setGanhador("E")
  }
}
useEffect(vencedor,[borda]);
const resertar = () => {
  setJogadorAtual(ganhador);
  setBorda(bordaVazia);
  setGanhador(null);
  if(ganhador === "E"){
    setJogadorAtual("X");
  }

  

}

  return (
    <main>
    <h1 className="titulo">Jogo da Velha</h1>
    {!ganhador &&
    <div className={`borda ${ganhador ? "perdeu": ""}` }>
      {borda.map((item,index) =>(
         <div key={index} className={`celula ${item}`} onClick={()=> handleCelulaClick(index)}>{item}</div>
      ))}
    
    </div>
}
    {ganhador && 
    <div className="mensagem">
      {ganhador === "E" ?
      <h1>
        <span className={ganhador}>Empate!</span><br/>
         
      </h1>
      :
      <h1>
        <span className={ganhador}>{ganhador}</span><br/>
         Venceu!
      </h1>
}
      <button onClick={resertar}>Recomeçar o jogo</button>
      </div>
    
}
    </main>
  );
}

export default Jogo_da_velha;
