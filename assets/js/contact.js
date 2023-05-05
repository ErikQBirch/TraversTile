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
    banner_tag = helperFunctions.generateElement('h1',"","",`${document.querySelector('a.current').innerHTML}`),
    // infoSection = this.infoSection()
  ){
    // infoSection.classList.add('hero');
    figure_tag = helperFunctions.appendChildren(figure_tag, img_tag);
    hero_tag = helperFunctions.appendChildren(hero_tag, figure_tag, banner_tag)
    
    return hero_tag
  },
  main: function(
    main_tag = helperFunctions.generateElement('main'),
    hero_tag = this.hero(),
    infoSection = this.infoSection(),
    ){
      // infoSection.classList.add('main');
      main_tag = helperFunctions.appendChildren(main_tag, hero_tag, infoSection);
    return main_tag;
  },
  infoSection: function(
    sectionHolder = helperFunctions.generateElement('section',"", "infoSection"),
    // div = helperFunctions.generateElement('div'),
    // h2 = helperFunctions.generateElement('h2',"","","Info"),
    options = [
      {"name":"Address",
        "info":"685 W 2050 N<br>Provo, UT 84604",
        "icon":`<i class="fa-solid fa-map-location-dot"></i>`},
      {"name":"Phone",
        "info":"(208)-749-6666",
        "icon":`<i class="fa-solid fa-phone-volume"></i>`},
      {"name":"Hours",
        "info":`
          Mon-Fri: 9am-5pm<br>
          Sat: 10am - 6pm<br>
          Sun: NA`,
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
    
    // sectionHolder.appendChild(div);
    return sectionHolder;
  }
}


pageStuff.constructHTML();