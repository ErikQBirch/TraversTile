import { helperFunctions } from "./helperFunctions.js";

const pageStuff = {
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
    hero_tag = this.hero()
    ){
      main_tag = helperFunctions.appendChildren(main_tag, hero_tag);
    return main_tag;
  },
}


pageStuff.constructHTML();