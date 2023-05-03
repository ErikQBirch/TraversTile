import { helperFunctions } from "./helperFunctions.js";
import { reviewDB } from "../resources/reviewDB.js";

const pageStuff = {
  counter : 0,
  limit: 5,
  constructHTML: function(
    body = document.querySelector('body'),
    footer = document.querySelector('footer')
  ){
    body.insertBefore(this.main(), footer);
  },
  hero: function(
    hero_tag = helperFunctions.generateElement('section',"hero"),
    figure_tag = helperFunctions.generateElement('figure'),
    img_tag = helperFunctions.generateElement('img',"","","","../assets/resources/imgs/landing/banner1.webp"),
    banner_tag = helperFunctions.generateElement('h1',"","",`${document.querySelector('a.current').innerHTML}`)
  ){
    figure_tag = helperFunctions.appendChildren(figure_tag, img_tag);
    hero_tag = helperFunctions.appendChildren(hero_tag, figure_tag, banner_tag)
    
    return hero_tag
  },
  main: function(
    main_tag = helperFunctions.generateElement('main'),
    hero_tag = this.hero(),
    reviewSection = this.reviewSection(),
    moreBtn = this.moreBtn(),
    ){
      console.log(this.counter);
      main_tag = helperFunctions.appendChildren(main_tag, hero_tag, reviewSection, moreBtn);
    return main_tag;
  },
  moreBtn: function(
    button = helperFunctions.generateElement('button',"moreBtn","", "Load More")
  ){
    console.log(reviewDB.array.length);
    button.addEventListener('click',()=>{
      let reviewSection = document.querySelector('#reviewSection');
      let current = this.counter;
      let useThis;
      
      if (this.counter < reviewDB.array.length){
        if ((this.counter+this.limit) > reviewDB.array.length){
          useThis = reviewDB.array.length - this.counter;
          console.log(useThis);
        }
        else {
          useThis = this.limit;
        }

        for (current; current < this.counter+useThis; current++){
            let newArticle = this.singleReview(reviewDB.array[current]);
            reviewSection.appendChild(newArticle);
        }
        this.counter = current;

        if (this.counter == reviewDB.array.length){
          button.setAttribute('disabled',"true");
          button.style.display = "none";
        }
      }    
    })
    return button;
  },
  reviewSection: function(
    sectionHolder = helperFunctions.generateElement('section',"reviewSection"),
  ){
    for (this.counter = 0; this.counter < this.limit; this.counter++){
      let obj = reviewDB.array[this.counter];
      let article = this.singleReview(obj);

        sectionHolder.appendChild(article);
    }
    return sectionHolder;
  },
  singleReview: function(obj){
    // console.log(obj);
    let article = helperFunctions.generateElement('article',`reviewNumb${this.counter}`,"",
        `
        <a href="${obj.link}">${obj.name}</a>
        <span class="date">${obj.date}</span>
        <span class="rating">${obj.rating}</span>
        <p class="text">${obj.text}</p>
        `);

        return article;
  }
  
}


pageStuff.constructHTML();