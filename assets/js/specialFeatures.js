import { helperFunctions } from "./helperFunctions.js";

export const specialFeatures = {
  carousel: {
    carousel_organism: function(
      contentType,
      carouselName,
      carouselArray,
      counter = 0,
      carousel_tag = helperFunctions.generateElement('div',"carousel"),
      slideHolder = helperFunctions.generateElement('div',"slideHolder"),
      slideControls = this.carousel_slideControls(),
      carousel_nav = helperFunctions.generateElement('div', "carousel_nav"),
      carousel_note = helperFunctions.generateElement('a',"carousel_note","","See More","../pages/reviews.html")
    ){
      
      carouselArray.forEach(item => {
        let slide = this.carousel_singleSlide(contentType, item, counter);
        slideHolder.appendChild(slide);
        carousel_nav = this.carousel_navBtns(carousel_nav, counter);
        counter++;
        
      });
  
      carousel_tag = helperFunctions.appendChildren(carousel_tag, slideHolder,slideControls)
      let carousel = [carousel_tag,carousel_nav, carousel_note];
      return carousel;
  
    },
    carousel_navBtns: function(
      navBtns,
      counter,
      slideBtn = helperFunctions.generateElement('button',`${counter}`,"slideBtn","<i class='fa-solid fa-circle'></i>") 
    ){
      navBtns.appendChild(slideBtn);
      return navBtns;
    },
    carousel_slideControls: function(
      slideControls = helperFunctions.generateElement('div',"slideControls"),
      prevBtn = helperFunctions.generateElement('button',"prevBtn","shiftBtn","<i class='fa-solid fa-caret-left'></i>"),
      nextBtn = helperFunctions.generateElement('button',"nextBtn","shiftBtn","<i class='fa-solid fa-caret-right'></i>")
    ){
      slideControls = helperFunctions.appendChildren(slideControls, prevBtn, nextBtn);
      return slideControls;
    },
    carousel_singleSlide: function(
      contentType,
      item,
      counter,)
      {
        let returnedSlide;
        switch (contentType) {
          case "img":
            returnedSlide = helperFunctions.generateElement('figure',`slide${counter}`, "slide");
            let img = helperFunctions.generateElement('img',"","","carouselImg",`../${item}`);
            returnedSlide.appendChild(img);
            break;
          case "textObject":
            returnedSlide = helperFunctions.generateElement('div',`slide${counter}`,"slide",)
            for (const key in item){
              let p = helperFunctions.generateElement('p',"","",item[key]);
              returnedSlide.append(p);
            }
            break;
          default:
            break;
        }
        return returnedSlide;
    },
    functionality: {
      index: 1,
      intervalFunction: 0,
      interval: 5000,
      touchstartX : 0, // SWIPE SCREEN
      touchendX : 0,
      assignCurrentSlide: function(
        centerSlide, formerslide, slideArray
      ){
        let target;
        document.querySelector(".currentBtn").classList.remove('currentBtn');
        formerslide.classList.remove('currentSlide');
        
        if (centerSlide.id == "firstClone"){slideArray[1].classList.add('currentSlide')}
        else if (centerSlide.id == "lastClone"){slideArray[slideArray.length - 2].classList.add('currentSlide')}
        else { centerSlide.classList.add('currentSlide')};

        target = document.querySelector('.currentSlide').id;
        document.getElementById(target.substring(5,6)).classList.add('currentBtn');
        
      },
      checkDirection: function(slideHolder, slideWidth) {
        clearInterval(this.intervalFunction);
        if (this.touchendX < this.touchstartX) {
          this.moveToNextSlide(slideHolder,slideWidth);
        }
        if (this.touchendX > this.touchstartX) {
          this.moveToPrevSlide(slideHolder,slideWidth);
        }
        this.startSlides(slideHolder,slideWidth);
      },
      getSlides: function(){return document.querySelectorAll('.slide')},   
      moveToNextSlide: function(slideHolder, slideWidth){
        let slideArray = this.getSlides();
        if (this.index >= (slideArray.length-1)){return};
        
        this.index++;
        this.assignCurrentSlide(slideArray[this.index], document.querySelector('.currentSlide'),slideArray);
        
        slideHolder.style.transform = `translate(${-slideWidth*this.index}px)`;
        slideHolder.style.transition = '0.75s';
      },
      moveToPrevSlide: function(slideHolder, slideWidth){
        let slideArray = this.getSlides();
        if (this.index <= 0){return};
        this.index--;
        
        this.assignCurrentSlide(slideArray[this.index], document.querySelector('.currentSlide'),slideArray);
        slideHolder.style.transform = `translate(${-slideWidth*this.index}px)`;
        slideHolder.style.transition = '0.75s';
      },
      setUp: function(
        carousel = document.getElementById('carousel'),
        slideHolder = document.getElementById('slideHolder'),
        prevBtn = document.getElementById('prevBtn'),
        nextBtn = document.getElementById('nextBtn'),
        slideArray = this.getSlides(),
        firstClone = slideArray[0].cloneNode(true),
        lastClone = slideArray[slideArray.length-1].cloneNode(true),
        slideWidth = slideArray[this.index].clientWidth,
        slideNav_array = document.querySelectorAll('.slideBtn')
      ){
        firstClone.id = "firstClone";
        lastClone.id = "lastClone";
        slideHolder.append(firstClone);
        slideHolder.prepend(lastClone);
        slideArray[0].classList.add('currentSlide');
        slideNav_array[0].classList.add('currentBtn');
        slideHolder.style.transform = `translateX(${-slideWidth * this.index}px)`;
        
        this.startSlides(slideHolder, slideWidth);
        this.theEvents(carousel, slideHolder,nextBtn,prevBtn,slideWidth,slideNav_array)

      },
      startSlides: function(slideHolder, slideWidth){
        this.intervalFunction = setInterval(()=>{
          this.moveToNextSlide(slideHolder,slideWidth);
        }, this.interval);
        return;
      },
      theEvents : function(carousel, slideHolder,nextBtn,prevBtn, slideWidth, slideNav_array){
        carousel.addEventListener('mouseenter',()=>{
          
          clearInterval(this.intervalFunction);
        });
        carousel.addEventListener('mouseleave', ()=>{
          this.startSlides(slideHolder,slideWidth);
        });
        document.addEventListener('touchstart', (e) => { // SWIPE SCREEN
          this.touchstartX = e.changedTouches[0].screenX;
        });
        document.addEventListener('touchend', (// SWIPE SCREEN
          e, 
          slideHolder = document.querySelector('#slideHolder'), 
          slideWidth = this.getSlides()[this.index].clientWidth,
          ) => { 
          this.touchendX = e.changedTouches[0].screenX
          this.checkDirection(slideHolder, slideWidth);
        });
        nextBtn.addEventListener('click',()=>{this.moveToNextSlide(slideHolder, slideWidth)});
        prevBtn.addEventListener('click',()=>{this.moveToPrevSlide(slideHolder, slideWidth)});
        slideHolder.addEventListener('transitionend',()=>{
          let slideArray = this.getSlides();
          
          if (slideArray[this.index].id == firstClone.id){
            slideHolder.style.transition = "none";
            this.index = 1;
            slideHolder.style.transform = `translateX(${-slideWidth * this.index}px`;
          }
          if (slideArray[this.index].id == lastClone.id){
            slideHolder.style.transition = "none";
            this.index = slideArray.length - 2;
            slideHolder.style.transform = `translateX(${-slideWidth * this.index}px`;
          }
        });
        slideHolder.addEventListener('click',(e)=>{
          if (e.target.id == "slideControls"){
            let currentSlide = document.querySelector('.currentSlide');
            let currentImg = currentSlide.children[0].src;
            // this.previewCurrentSlide(currentImg);
          }
        });

        for (let slideBtn of slideNav_array){
          slideBtn.addEventListener('click',()=>{
            let slideArray = this.getSlides();
            this.index = parseFloat(slideBtn.id) + 1;
            this.assignCurrentSlide(slideArray[this.index], document.querySelector('.currentSlide'),slideArray)
            slideHolder.style.transform = `translateX(${-slideWidth * this.index}px`;
            slideHolder.style.transition = '0.75s';
          })
        }
      },
    },
  },
  lazyLoading: function(
    imagesToLoad = document.querySelectorAll('img[data-src]'), //images elements with the attribute "data-src"; similar to css #data-src or .data-src
    // nonImgElements = document.querySelectorAll(".lazyLoad"),
    loadImages = (img) => {

      img.setAttribute('src', img.getAttribute('data-src'));
      img.onload = () => {
        img.removeAttribute('data-src');
        try{
          let lazyParent = helperFunctions.searchParents(img,"lazyParent");
          // console.log(lazyParent);
          lazyParent.classList.remove('lazyParent');
          img.classList.remove('lazyLoad');
        }
        catch(err){}
      }
    },
    imgOptions = {
      threshold: 0,
      rootMargin: "0px 0px -200px 0px" //make bottom positive so images load before entering screen;
    },
  ){
    //imagesToLoad - 
    //loadImages - 
    //imgOptions - 
    //Step1 - 
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((items, observer) => {
        items.forEach((item) => {
          if(item.isIntersecting) {
            loadImages(item.target);
            observer.unobserve(item.target);
          }
        });
      }, imgOptions);
      imagesToLoad.forEach((img) => {
        observer.observe(img);
      });
    } else {
      imagesToLoad.forEach((img)=> {
        loadImages(img);
      });
    }
  },
}