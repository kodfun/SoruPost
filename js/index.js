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
      satirAdet: 0,
      p5: null,
      img: null,
      yaziBoyutYuzdesi: 48,
      canvas: null
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


        // Your p5.js sketch draw code here
        p.textSize(fs); // Set the font size
        p.textAlign(p.LEFT); // Set the text alignment to center
        p.fill(70, 66, 63); // text color
        p.textFont("Roboto Condensed");
        p.textWrap(p.WORD);
        p.textLeading(lh); // Set the line-height
        let text = `${this.soru}
        
        A) ${this.opt1}
        B) ${this.opt2}`;
        this.satirAdet = this.getLineCount(p, text, cw);
        let y = p.height / 2 - (lh * this.satirAdet) / 2;
        p.text(text, ml, y, cw);

        p.textAlign(p.CENTER);
        p.textSize(fs * 0.9);
        p.text("@zorular", p.width * .50, p.height * .94);
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
      this.p5.save("soru.png");
    },
    temizle() {
      this.soru = "";
      this.opt1 = "";
      this.opt2 = "";
    }
  }
}).mount('#app');

