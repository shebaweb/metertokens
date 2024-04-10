
const texts = ['3381-2271-2013-2325-9231,5648-0344-8354-1119-7039,4051-7910-7737-6727-2854,3590-1256-1663-4312-6955,0438-0778-4054-3475-4873,0223-0064-6890-8529-6876,6375-7306-1469-1629-8085,1826-4127-2518-1817-2182,4659-9983-8594-8437-8513 RTrx ID: 72QUX20Z','2029-5903-4699-6614-6111,5838-3318-2888-1260-0549,3444-2955-6655-9232-2660,7377-2220-4029-2871-6846,2804-9848-2081-5187-5739,6814-6491-7099-0379-6119,2102-0090-5528-2020-3409,5564-7322-9452-7009-1964,1518-7513-7756-6553-1244','3656-9485-4039-4610-9617,6672-2523-7474-3599-4626,5252-4868-0169-3230-4237,2197-1552-4814-9370-9186,3244-1382-7049-3313-8346,1744-4742-9974-2652-0516,3038-8203-6790-9890-4121,7065-2837-5702-6492-5787,0314-3916-7452-4190-8436'];
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