 let deckId = ''
 let player1Score = 0
 let player2Score = 0
 document.querySelector('.p1').innerText = `Score: ${player1Score}`
 document.querySelector('.p2').innerText = `Score: ${player2Score}`

 
 
   fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
  .then(res => res.json()) // parse response as JSON
  .then(data => {
    console.log(data)
    deckId = data.deck_id
    war()
  })
    .catch(err => {
      console.log(`error ${err}`)
  });


//  document.addEventListener('DOMContentLoaded', loadDeck)
//  function loadDeck(){
//   url = `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`
//   fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
//   .then(res => res.json()) // parse response as JSON
//   .then(data => {
//     console.log(data)
//     deckId = data.deck_id
//     war()
//   })
//     .catch(err => {
//       console.log(`error ${err}`)
//   });
//  }


  // document.addEventListener('DOMContentLoaded', loadCards)

  // console.log(deckId)


  // function loadCards(){
  //   fetch(url)
  //   .then(res => res.json()) // parse response as JSON
  //   .then(data => {
  //     console.log(data) 
  //   })
  //   .catch(err => {
  //       console.log(`error ${err}`)
  //   });
  // }
// document.querySelector('#play').addEventListener('click', startGame())

// function startGame(){
//   document.querySelector('section').classList.toggle('hidden')
// }
//game mechnanics

document.querySelector('button').addEventListener('click', drawTwo)


function drawTwo(){
  const url = `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`
  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)
        document.querySelector('#player1').src = data.cards[0].image
        document.querySelector('#player2').src = data.cards[1].image
        let player1Val = convertToNum(data.cards[0].value)
        let player2Val = convertToNum(data.cards[1].value)
        if(player1Val > player2Val){
          document.querySelector('h3').innerText = 'Player 1 Wins'
          player1Score += 1
          console.log(player1Score)
          document.querySelector('.p1').innerText = `Score: ${player1Score}`
        } else if (player1Val < player2Val){
          document.querySelector('h3').innerText = 'Player 2 Wins'
          player2Score += 1
          console.log(player2Score)
          document.querySelector('.p2').innerText = `Score: ${player2Score}`
        } else {
          document.querySelector('h3').innerText = 'Time for war!'
          war()

          //draw 2 more cards
          //display winner
          //dole out points
        }
        
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
    }

function convertToNum(val){
  if(val === 'ACE'){
    return 14
  }else if(val === 'KING'){
    return 13
  }else if(val === 'QUEEN'){
    return 12
  }else if(val === 'JACK'){
    return 11
  }else{
    return Number(val)
  }
}

function war(){
  //draw 4 cards
  let war = `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=6`
  //display cards
  fetch(war)
  .then(res => res.json()) // parse response as JSON
  .then(data => {
    console.log(data)
    document.querySelector('.p1 img:first-of-type').src = data.cards[0].image
    document.querySelector('.p1 img:last-of-type').src = data.cards[1].image
    document.querySelector('.p2 img:first-of-type').src = data.cards[2].image
    document.querySelector('.p2 img:last-of-type').src = data.cards[3].image

  })
  .catch(err => {
      console.log(`error ${err}`)
  });
}


