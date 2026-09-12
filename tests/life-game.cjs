const assert=require('node:assert/strict');
const game=require('../life-game.js').BaziLifeGame;
const reading={lifeGameStations:Array.from({length:8},(_,i)=>({ganzhi:'甲子',god:'印星',startAge:i*10+3,endAge:i*10+12}))};
assert.equal(game.board.length,12);
assert.equal(game.cards.length,12);
assert.equal(new Set(game.cards.map(c=>c.id)).size,12);
assert.deepEqual(new Set(game.cards.map(c=>c.type)),new Set(Object.keys(game.types)));
assert.throws(()=>game.roll(game.create(reading),0));
function play(choices,dice){
 const state=game.create(reading);
 for(let i=0;i<8;i++){
  assert.equal(state.phase,'roll');
  const turn=game.roll(state,dice[i]);
  assert.equal(state.phase,'card');
  assert.equal(turn.type,game.board[state.position]);
  const result=game.resolve(state,choices[i]);
  assert.equal(result.score,state.stats[turn.card.metric]+dice[i]*3);
  assert.equal(result.success,result.score>=turn.card.target);
  assert.deepEqual(Object.values(state.stats).every(v=>v>=0&&v<=100),true);
  game.next(state);
 }
 assert.equal(state.phase,'done');
 assert.equal(state.history.length,8);
 assert.throws(()=>game.roll(state,2));
 return game.summary(state);
}
const wins=play(Array(8).fill('a'),[4,1,2,5,1,6,5,4]);
const losses=play(Array(8).fill('b'),Array(8).fill(1));
assert.equal(wins.breakout,true);
assert.equal(losses.breakout,false);
assert.ok(wins.completed>=5);
assert.ok(losses.completed<5 || Object.values(losses.stats).some(v=>v<35));
console.log('Eight-round dice, card, mission and breakout game: OK');
