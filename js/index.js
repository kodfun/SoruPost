// todo: 
// 1. font boyutu ayarlama range inputu ekle
// 2. background resmi ayarla
// 3. logo/brand ekle
// 4. belki konuyla ilgili otomatik resim (belki api png)
// 5. doğrudan paylaşma butonu (instaya atma)???


const { createApp } = Vue;

createApp({
  data() {
    return {
      soru: 'Sana mevcut veya muhtemel çocuğunun öğretmenini seçme fırsatı veriliyor. İşe başvuran öğretmenlerin özgeçmişlerinde eğitim ve becerilerinin yanı sıra isimlerinin, cinsiyetlerinin, milliyetlerinin ve bir fotoğraflarının yer almasını ister miydin?',
      opt1: 'Evet',
      opt2: 'Hayır',
      mtOpt1: 0.02,
      mtOpt2: 0.01,
      satirAdet: 0,
      p5: null,
      img: null,
      yaziBoyutYuzdesi: 48,
      canvas: null,
      contentWidth: 0,
    };
  },
  mounted() {
    this.sketch = new p5(this.createSketch, this.$refs.canvasContainer);
  },
  methods: {
    createSketch(p) {
      p.preload = () => {
        this.img = p.loadImage('img/sorubg.png');
      };

      p.setup = () => {
        this.canvas = p.createCanvas(1080, 1080);
        this.p5 = p;
        p.pixelDensity(1);
      };

      p.draw = () => {
        p.image(this.img, 0, 0, p.width, p.height);

        let fs = p.height * this.yaziBoyutYuzdesi / 1000; // fontsize
        let lh = fs * 1.5; // line-height
        let ml = p.width * 0.08; // margin-left
        let cw = p.width - 2 * ml; // content width
        let mtOpt1 = p.height * this.mtOpt1;
        let mtOpt2 = p.height * this.mtOpt2;
        this.contentWidth = cw;

        // Your p5.js sketch draw code here
        p.textStyle(p.NORMAL); // Set the text style
        p.textSize(fs); // Set the font size
        p.textAlign(p.LEFT); // Set the text alignment to center
        p.fill(70, 66, 63); // text color
        p.textFont("Roboto Condensed");
        p.textWrap(p.WORD);
        p.textLeading(lh); // Set the line-height
        let textQ = this.soru;
        let textA = "A) " + this.opt1;
        let textB = "B) " + this.opt2;
        let hq = this.calculateTextHeight(textQ);
        p.textStyle(p.BOLD);
        let ha = this.calculateTextHeight(textA);
        let hb = this.calculateTextHeight(textB);
        let hc = hq + mtOpt1 + ha + mtOpt2 + hb;
        let yq = p.height / 2 - hc / 2;
        p.textStyle(p.NORMAL); // Set the text style
        p.text(textQ, ml, yq, cw);
        p.textStyle(p.BOLD);
        p.text(textA, ml, yq + mtOpt1 + hq, cw);
        p.text(textB, ml, yq + mtOpt1 + hq + mtOpt2 + ha, cw);
        
        p.fill(70, 66, 63, 200); // text color
        p.textAlign(p.CENTER);
        p.textSize(fs * 0.9);
        p.textStyle(p.NORMAL);
        p.text("@zorular", p.width * .50, p.height * .94);
      };
    },
    getLineCount(text) {
      let lines = text.split('\n');
      let lineCount = 0;

      for (let i = 0; i < lines.length; i++) {
        lineCount++;
        let line = lines[i];
        let words = line.split(' ');
        let xPos = 0, yPos = 0;

        for (let i = 0; i < words.length; i++) {
          let word = words[i];
          let wordWidth = this.p5.textWidth(word + ' ');

          if (xPos + wordWidth > this.contentWidth) {
            lineCount++;
            xPos = 0;
            yPos += this.p5.textLeading();
          }
          xPos += wordWidth;
        }
      }
      return lineCount;
    },
    calculateTextHeight(text) {
      return this.getLineCount(text) * this.p5.textLeading();
    },
    kaydet() {
      this.p5.save("soru.png");
    },
    temizle() {
      this.soru = "";
      this.opt1 = "";
      this.opt2 = "";
    }
  }
}).mount('#app');

