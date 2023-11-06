/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    let chains = new Array()

    for (let i=0; this.words.length; i++) {
      let word = this.words[i];
      let nextWord = this.words[i+1] || null;

      if (chains.includes(word)) chains.get(word).push(nextWord);
      else chains.set(word, nextWord);
    }
    chains = this.chains;
  }

  // /** pick a random choice from array */
  //   static choice(ar) {
  //   return ar[Math.floor(Math.random() * ar.length)]
  // }

  /** return random text from chains */

  makeText(numWords = 100) {
    // pick a random key to start
    let keys = Array.from(this.chains.keys());
    let key = MarkovMachine.choice(keys);
    let out = [];

    // produce markov chain until reaching termination word
    while (out.length < numWords && key !== null) {
      out.push(key);
      // reset key
      key = MarkovMachine.choice(this.chains.get(key));
    }
    return out.join("");
  }
}

module.exports = { 
  MarkovMachine,
};

let mm = new MarkovMachine("the cat in the hat");
mm.makeText();
mm. makeText(numWords=50);