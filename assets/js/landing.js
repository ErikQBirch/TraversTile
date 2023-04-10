import { helperFunctions } from "./helperFunctions.js";

const pageStuff = {
  aboutSection: function(
    sectionHolder = helperFunctions.generateElement('section',"aboutSection"),
    link = helperFunctions.generateElement('a',"","","","./pages/about.html"),
    figure = helperFunctions.generateElement('figure'),
    img = helperFunctions.generateElement('img',"","","","assets/resources/imgs/placeholder.jpg"),
    text = helperFunctions.generateElement('div',"","","ABOUT")
  ){
    sectionHolder = helperFunctions.nestChildren(sectionHolder, link, figure, img);
    link.appendChild(text);
    return sectionHolder;
  },
  constructHTML: function(
    body = document.querySelector('body'),
    footer = document.querySelector('footer')
  ){
    body.insertBefore(this.main(), footer);
    // this.theEvents();
  },
  gallerySamples: function(
    gallerySection = helperFunctions.generateElement('section',"gallerySection"),
    h1 = helperFunctions.generateElement('h1',"","","Gallery Samples"),
    list = [
      {
        "item":"Porcelain",
        "imgPath": "assets/resources/imgs/placeholder.jpg"
      },
      {
        "item":"Stone",
        "imgPath": "assets/resources/imgs/placeholder.jpg"
      },
      {
        "item":"Ceramic",
        "imgPath": "assets/resources/imgs/placeholder.jpg"
      }
    ],
    moreLink = helperFunctions.generateElement('a',"moreLink","","See More","./pages/gallery.html")
  ){
    gallerySection.appendChild(h1);

    list.forEach(element => {
      let option = helperFunctions.generateElement('article',"","galleryOption");
      let link = helperFunctions.generateElement('a',"","","",`./pages/gallery.html?option=${element.item}`);
      let figure = helperFunctions.generateElement('figure');
      let img = helperFunctions.generateElement('img',"","","",element.imgPath)
      option = helperFunctions.nestChildren(option, link, figure, img);
      let text = helperFunctions.generateElement('h2',"","",element.item);
      link.appendChild(text);
      gallerySection.appendChild(option);
      // gallerySection = helperFunctions.nestChildren(gallerySection, option, link);
    });
    gallerySection.appendChild(moreLink);

    return gallerySection;
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
    gallery_tag = this.gallerySamples(),
    aboutSection = this.aboutSection(),
    ){
      main_tag = helperFunctions.appendChildren(main_tag, hero_tag, gallery_tag, aboutSection);
    return main_tag;
  },
}

pageStuff.constructHTML();