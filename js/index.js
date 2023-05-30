// todo: 
// 1. font boyutu ayarlama range inputu ekle
// 2. background resmi ayarla
// 3. logo/brand ekle
// 4. belki konuyla ilgili otomatik resim (belki api png)


const { createApp } = Vue;

createApp({
  data() {
    return {
      soru: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum!',
      opt1: 'Lorem',
      opt2: 'Ipsum',
      satirAdet: 0,
      p5: null
    };
  },
  mounted() {
    this.sketch = new p5(this.createSketch, this.$refs.canvasContainer);
  },
  methods: {
    createSketch(p) {
      p.setup = () => {
        p.createCanvas(300, 300);
        this.p5 = p;
        // Your p5.js sketch setup code here
      };
      
      p.draw = () => {
        let fs = p.height * 0.044;
        let lh = fs * 1.5;

        // Your p5.js sketch draw code here
        p.background(149, 208, 255);
        p.textSize(p.height * 0.044); // Set the font size
        p.textAlign(p.LEFT); // Set the text alignment to center
        p.fill(0); // Set the text color to black
        p.textFont("Playfair Display");
        
        p.textWrap(p.WORD);
        p.textLeading(lh); // Set the line-height
        let text = `${this.soru}
        
        A) ${this.opt1}
        B) ${this.opt2}`;
        this.satirAdet = this.getLineCount(p, text, p.width*.8);
        let y = p.height/2 - (lh * this.satirAdet)/2;
        p.text(text, p.width/10, y, p.width*.8);
      };
    },
    getLineCount(p, text, width) {
      let lines = text.split('\n');
      let lineCount = 0;

      for (let i = 0; i < lines.length; i++) {
        lineCount++;
        let line = lines[i];
        let words = line.split(' ');
        let xPos = 0, yPos = 0;
      
        for (let i = 0; i < words.length; i++) {
          let word = words[i];
          let wordWidth = p.textWidth(word + ' ');
      
          if (xPos + wordWidth > width) {
            lineCount++;
            xPos = 0;
            yPos += p.textLeading();
          }
      
          xPos += wordWidth;
        }
        
      }
      
    
      return lineCount;
    },
    kaydet() {
      this.p5.saveCanvas('post', 'png');
    }
  }
}).mount('#app');

