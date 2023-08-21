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
    img_tag = helperFunctions.generateElement('img',"","","","../assets/resources/imgs/landing/banner3.webp"),
    banner_tag = helperFunctions.generateElement('h1',"","",`${document.querySelector('a.current').innerHTML}`),
  ){
    figure_tag = helperFunctions.appendChildren(figure_tag, img_tag);
    hero_tag = helperFunctions.appendChildren(hero_tag, figure_tag, banner_tag)
    
    return hero_tag
  },
  main: function(
    main_tag = helperFunctions.generateElement('main'),
    hero_tag = this.hero(),
    infoSection = this.infoSection(),
    ){
      main_tag = helperFunctions.appendChildren(main_tag, hero_tag, infoSection);
    return main_tag;
  },
  infoSection: function(
    sectionHolder = helperFunctions.generateElement('section',"", "infoSection"),
    options = [
      {"name":"Locations",
        "info":"Twin Falls<br>Magic Valley<br>Sun Valley",
        "icon":`<i class="fa-solid fa-map-location-dot"></i>`},
      {"name":"Phone",
        "info":"(208) 432-2846",
        "icon":`<i class="fa-solid fa-phone-volume"></i>`},
        {"name":"Email",
        "info":"ian.travers@gmail.com",
        "icon":`<i class="fa-solid fa-envelope"></i>`},
      {"name":"Hours",
        "info":`
          Mon-Fri: <br>9am-5pm`,
        "icon":`<i class="fa-solid fa-hourglass-half"></i>`},
    ]
  ){
    options.forEach(obj => {
      let article = helperFunctions.generateElement('article');
      let h2 = helperFunctions.generateElement('h2', "","",obj.name);
      let iconDiv = helperFunctions.generateElement('div',"","",obj.icon);
      let p = helperFunctions.generateElement('p',"","",obj.info);

      article = helperFunctions.appendChildren(article, h2, iconDiv, p);
      sectionHolder.appendChild(article);
    });
    return sectionHolder;
  }
}


pageStuff.constructHTML();