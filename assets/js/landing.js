import { helperFunctions } from "./helperFunctions.js";

const pageStuff = {
  constructHTML: function(
    body = document.querySelector('body'),
    footer = document.querySelector('footer')
  ){
    body.insertBefore(this.main(), footer);
    // this.theEvents();
  },
  hero: function(
    hero_tag = helperFunctions.generateElement('div',"hero"),
    figure_tag = helperFunctions.generateElement('figure'),
    img_tag = helperFunctions.generateElement('img',"","","","assets/resources/imgs/TT1.jpg"),
    banner_tag = helperFunctions.generateElement('div', "banner","","Talk with an Expert Today! <a href='tel:208-749-6666'>208-749-6666</a>")
  ){
    figure_tag.appendChild(img_tag);
    hero_tag = helperFunctions.appendChildren(hero_tag, figure_tag, banner_tag)
    return hero_tag
  },
  main: function(
    main_tag = helperFunctions.generateElement('main'),
    hero_tag = this.hero(),
    ){
      main_tag = helperFunctions.appendChildren(main_tag, hero_tag)
    return main_tag;
  },
  // theEvents: function(
  //   moreSection = document.querySelector('#seeMore'),
  //   moreDiv = moreSection.children[1]
  // ){
  //   console.log(moreSection)
  //   moreSection.children[0].addEventListener('click',()=>{
  //     moreSection.children[1].style.display = "flex";
  //     moreSection.children[2].style.display = "flex";
  //     moreSection.children[0].remove();
  //   })
  //   moreDiv.children[1].addEventListener('click', ()=>{
  //     if (moreDiv.children[0].value == "a"){
  //       moreSection.remove();
  //       this.fullGallery();
  //     }
  //     else {
  //       console.log("WRONG")
  //       moreDiv.children[0].value = "";
  //       console.log(moreSection.children[1])
  //       moreSection.children[1].innerHTML = `Failed Attempt! Try Again!`
  //     }
  //   })
  // }
}

pageStuff.constructHTML();