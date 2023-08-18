import { helperFunctions } from "./helperFunctions.js";
import { reviewDB } from "../resources/reviewDB.js";
import { specialFeatures } from "./specialFeatures.js";

const pageStuff = {
  constructHTML: function(
    body = document.querySelector('body'),
    footer = document.querySelector('footer')
  ){
    body.insertBefore(this.main(), footer);
    // specialFeatures.carousel.functionality.setUp();
  },
  hero: function(
    hero_tag = helperFunctions.generateElement('section',"hero"),
    figure_tag = helperFunctions.generateElement('figure'),
    img_tag = helperFunctions.generateElement('img',"","","","../assets/resources/imgs/landing/banner5.webp"),
    banner_tag = helperFunctions.generateElement('h1',"","",`${document.querySelector('a.current').innerHTML}`)
  ){
    figure_tag = helperFunctions.appendChildren(figure_tag, img_tag);
    hero_tag = helperFunctions.appendChildren(hero_tag, figure_tag, banner_tag)
    
    return hero_tag
  },
  main: function(
    main_tag = helperFunctions.generateElement('main'),
    hero_tag = this.hero(),
    aboutSection = this.aboutSection(),
    // reviewSection = this.reviewSection()
    ){
      main_tag = helperFunctions.appendChildren(main_tag, hero_tag, aboutSection);
    return main_tag;
  },
  aboutSection: function(
    sectionHolder = helperFunctions.generateElement('section',"aboutSection"),
    aboutDiv = helperFunctions.generateElement('div',"aboutDiv"),
    h2 = helperFunctions.generateElement('h2',"","","Ian Travers Thompson"),
    p = helperFunctions.generateElement('p', "","","Travers Tile offers a variety of services in porcelain, ceramic, natural stone, marble, and glass tile, for your floor, shower, backsplash, or any other space. We can even build and design custom mosaics to make your space your own. The sky's the limit! Our first priority is the customer's desired outcome, so we keep our team small to ensure the best quality control, because with Travers Tile, the difference is in the details."),
    contactBtn = helperFunctions.generateElement('a',"","","Contact", "../pages/contact.html"),
    figure = helperFunctions.generateElement('figure'),
    img = helperFunctions.generateElement('img',"","","","../assets/resources/imgs/landing/aboutLanding1.webp")
  ){
    aboutDiv = helperFunctions.appendChildren(aboutDiv, h2, p, contactBtn);
    sectionHolder.appendChild(aboutDiv);
    sectionHolder = helperFunctions.nestChildren(sectionHolder, figure, img);

    return sectionHolder;
  },
  reviewSection: function(
    sectionHolder = helperFunctions.generateElement('section',"reviewSection"),
    filter = helperFunctions.generateElement('div',"filter"),
    sampleArray = []
  ){
    for (let i = 0; i < 10; i++){
      if (reviewDB.array[i].focus == "Ian"){
        console.log(reviewDB.array[i])
        sampleArray.push(reviewDB.array[i]);
      }
    }
    let carousel_organism_variable = specialFeatures.carousel.carousel_organism(reviewDB.contentType, reviewDB.name, sampleArray);
    carousel_organism_variable.forEach(element => {
      filter.appendChild(element);
    });
    sectionHolder.appendChild(filter);
    return sectionHolder
  },
}


pageStuff.constructHTML();