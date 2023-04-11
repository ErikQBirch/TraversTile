import { helperFunctions } from "./helperFunctions.js";
import { specialFeatures } from "./specialFeatures.js";
import { reviewDB } from "../resources/reviewDB.js";

const pageStuff = {
  aboutSection: function(
    sectionHolder = helperFunctions.generateElement('section',"aboutSection"),
    link = helperFunctions.generateElement('a',"","","","./pages/about.html"),
    figure = helperFunctions.generateElement('figure'),
    img = helperFunctions.generateElement('img',"","","","assets/resources/imgs/landing/landing4.webp"),
    textHolder = helperFunctions.generateElement('div',""),
    h1 = helperFunctions.generateElement('h1',"","","About"),
    textSample = helperFunctions.generateElement('p',"","","LOTS OF TEXT, LOTS OF TEXT, LOTS OF TEXT, LOTS OF TEXT, LOTS OF TEXT, LOTS OF TEXT, LOTS OF TEXT, LOTS OF TEXT, LOTS OF TEXT, LOTS OF TEXT, LOTS OF TEXT, ")
  ){
    sectionHolder = helperFunctions.nestChildren(sectionHolder, link, figure, img);
    link.appendChild(textHolder);
    textHolder = helperFunctions.appendChildren(textHolder, h1, textSample)
    return sectionHolder;
  },
  constructHTML: function(
    body = document.querySelector('body'),
    footer = document.querySelector('footer')
  ){
    body.insertBefore(this.main(), footer);
    // this.theEvents();
    specialFeatures.carousel.functionality.setUp();
  },
  gallerySection: function(
    gallerySection = helperFunctions.generateElement('section',"gallerySection"),
    h1 = helperFunctions.generateElement('h1',"","","Gallery Samples"),
    sampleHolder = helperFunctions.generateElement('div',"sampleHolder"),
    list = [
      {
        "item":"Porcelain",
        "imgPath": "assets/resources/imgs/landing/landing1.webp"
      },
      {
        "item":"Stone",
        "imgPath": "assets/resources/imgs/landing/landing2.webp"
      },
      {
        "item":"Ceramic",
        "imgPath": "assets/resources/imgs/landing/landing3.webp"
      }
    ],
    moreLink = helperFunctions.generateElement('a',"moreLink","","See More","./pages/gallery.html")
  ){
    list.forEach(element => {
      let option = helperFunctions.generateElement('article',"","galleryOption");
      let link = helperFunctions.generateElement('a',"","","",`./pages/gallery.html?option=${element.item}`);
      let figure = helperFunctions.generateElement('figure');
      let img = helperFunctions.generateElement('img',"","","",element.imgPath)
      option = helperFunctions.nestChildren(option, link, figure, img);
      let text = helperFunctions.generateElement('h2',"","",element.item);
      link.appendChild(text);
      sampleHolder.appendChild(option);
      // gallerySection = helperFunctions.nestChildren(gallerySection, option, link);
    });
    gallerySection = helperFunctions.appendChildren(gallerySection, h1, sampleHolder, moreLink);
    return gallerySection;
  },
  hero: function(
    hero_tag = helperFunctions.generateElement('div',"hero"),
    figure_tag = helperFunctions.generateElement('figure'),
    img_tag = helperFunctions.generateElement('img',"","","","assets/resources/imgs/landing/landingBanner.png"),
    banner_tag = helperFunctions.generateElement('div', "banner","","Talk with an Expert Today! <a href='tel:208-749-6666'>208-749-6666</a>")
  ){
    figure_tag.appendChild(img_tag);
    hero_tag = helperFunctions.appendChildren(hero_tag, figure_tag, banner_tag)
    return hero_tag
  },
  main: function(
    main_tag = helperFunctions.generateElement('main'),
    hero_tag = this.hero(),
    gallery_tag = this.gallerySection(),
    aboutSection = this.aboutSection(),
    reviewSection = this.reviewSection()
    ){
      main_tag = helperFunctions.appendChildren(main_tag, hero_tag, gallery_tag, aboutSection, reviewSection);
    return main_tag;
  },
  reviewSection: function(
    sectionHolder = helperFunctions.generateElement('section',"reviewSection"),
    filter = helperFunctions.generateElement('div',"filter"),
    sampleArray = []
  ){
    console.log(reviewDB);
    for (let i = 0; i < 4; i++){
      // console.log(reviewDB.array[i]);
      sampleArray.push(reviewDB.array[i]);
    }
    // console.log(sampleArray);
    let carousel_organism_variable = specialFeatures.carousel.carousel_organism(reviewDB.contentType, sampleArray);
    carousel_organism_variable.forEach(element => {
      filter.appendChild(element);
    });
    sectionHolder.appendChild(filter);
    // console.log(sectionHolder);
    return sectionHolder
  }
}

pageStuff.constructHTML();