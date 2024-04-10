
const texts = ['Successful!Your BPDBprepaid Prepaid Token is 0042-7625-0083-9306-3788,3808-6109-5742-8986-2022,3608-3085-3874-5802-0423,SquNo:0~2 for offline Meter No:010210747231,Vending Amt:1075.0,Enrg Cost: 808.68,Total Charge:266.32,Meter Rent 1P:40,Demand Charge:180,VAT:51.19,Rebate:-4.87.'];
    const textarea = document.querySelector('#tokenbox');
    const animationWorker = function (textarea, texts) {
      this.textarea = textarea;
      this.defaultPlaceholder = this.textarea.getAttribute('placeholder');
      this.texts = texts;
      this.curTextNum = 0;
      this.curPlaceholder = '';
      this.blinkCounter = 0;
      this.animationFrameId = 0;
      this.animationActive = false;
      this.textarea.setAttribute('placeholder',this.curPlaceholder);
    
      this.switch = (timeout) => {
        this.textarea.classList.add('imitatefocus');
        setTimeout(
          () => { 
            this.textarea.classList.remove('imitatefocus');
            if (this.curTextNum == 0) 
              this.textarea.setAttribute('placeholder',this.defaultPlaceholder);
            else
              this.textarea.setAttribute('placeholder',this.curPlaceholder);
    
            setTimeout(
              () => { 
                this.textarea.setAttribute('placeholder',this.curPlaceholder);
                if(this.animationActive) 
                  this.animationFrameId = window.requestAnimationFrame(this.animate)}, 
              timeout);
          }, 
          timeout);
      }
    
      this.animate = () => {
        if(!this.animationActive) return;
        let curPlaceholderFullText = this.texts[this.curTextNum];
        let timeout = 900;
        if (this.curPlaceholder == curPlaceholderFullText+'|' && this.blinkCounter==3) {
          this.blinkCounter = 0;
          this.curTextNum = (this.curTextNum >= this.texts.length-1)? 0 : this.curTextNum+1;
          this.curPlaceholder = '|';
          this.switch(3000);
          return;
        }
        else if (this.curPlaceholder == curPlaceholderFullText+'|' && this.blinkCounter<3) {
          this.curPlaceholder = curPlaceholderFullText;
          this.blinkCounter++;
        }
        else if (this.curPlaceholder == curPlaceholderFullText && this.blinkCounter<3) {
          this.curPlaceholder = this.curPlaceholder+'|';
        }
        else {
          this.curPlaceholder = curPlaceholderFullText
            .split('')
            .slice(0,this.curPlaceholder.length+1)
            .join('') + '|';
          timeout = 150;
        }
        this.textarea.setAttribute('placeholder',this.curPlaceholder);
        setTimeout(
          () => { if(this.animationActive) this.animationFrameId = window.requestAnimationFrame(this.animate)}, 
          timeout);
      }
    
      this.stop = () => {
        this.animationActive = false;
        window.cancelAnimationFrame(this.animationFrameId);
      }
    
      this.start = () => {
        this.animationActive = true;
        this.animationFrameId = window.requestAnimationFrame(this.animate);
        return this;
      }
    }
    
    document.addEventListener("DOMContentLoaded", () => {
      let aw = new animationWorker(textarea, texts).start();
      textarea.addEventListener("focus", (e) => aw.stop());
      textarea.addEventListener("blur", (e) => {
        aw = new animationWorker(textarea, texts);
        if(e.target.value == '') setTimeout( aw.start, 2000);
      });
    });