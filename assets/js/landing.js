import { helperFunctions } from "./helperFunctions.js";

const pageStuff = {
  aboutSection: function(
    sectionHolder = helperFunctions.generateElement('section',"aboutSection", "lazyParent"),
    link = helperFunctions.generateElement('a',"","","","./pages/about.html"),
    figure = helperFunctions.generateElement('figure'),
    img = helperFunctions.generateElement('img',"","lazyLoad"),
    textHolder = helperFunctions.generateElement('div',""),
    h1 = helperFunctions.generateElement('h1',"","","About"),
    textSample = helperFunctions.generateElement('p',"","","Travers Tile offers a variety of services in porcelain, ceramic, natural stone, marble, and glass tile, for your floor, shower, backsplash, or any other space.")
  ){
    /**
     * Create Small About section and link
     * Step1: set background imgs
     * Step2: nest elements together
     * Step3: package for future use
     */
    img = helperFunctions.customSpecialElements(img,"assets/resources/imgs/landing/aboutLanding1.webp", "");
    sectionHolder.style.backgroundImage = "url('assets/resources/imgs/landing/aboutLanding2.webp')"
    sectionHolder = helperFunctions.nestChildren(sectionHolder, figure, img);
    link = helperFunctions.appendChildren(link, h1, textSample)
    sectionHolder = helperFunctions.nestChildren(sectionHolder, textHolder, link);
    return sectionHolder;
  },
  constructHTML: function(
    body = document.querySelector('body'),
    footer = document.querySelector('footer')
  ){
    /**
     * Assimulate webpage's HTML (1 step per line of code)
     * Step1: create content
     * Step2: add lazy loading to increase load speed
     * Step3: turn on events 
     */
    body.insertBefore(this.main(), footer);
    helperFunctions.lazyLoading();
    this.theEvents.heroBackgrounds();
  },
  gallerySection: function(
    gallerySection = helperFunctions.generateElement('section',"gallerySection"),
    h1 = helperFunctions.generateElement('h1',"","","Gallery Samples"),
    sampleHolder = helperFunctions.generateElement('div',"sampleHolder"),
    list = [
      {
        "item":"Porcelain",
        "class":"Material",
        "imgPath": "assets/resources/imgs/landing/gallerySample1.webp"
      },
      {
        "item":"Stone",
        "class":"Material",
        "imgPath": "assets/resources/imgs/landing/gallerySample2.webp"
      },
      {
        "item":"Ceramic",
        "class":"Material",
        "imgPath": "assets/resources/imgs/landing/gallerySample3.webp"
      },
      {
        "item":"Kitchens",
        "class":"Service",
        "imgPath": "assets/resources/imgs/landing/gallerySample4.webp"
      },
      {
        "item":"Bathrooms",
        "class":"Service",
        "imgPath": "assets/resources/imgs/landing/gallerySample5.webp"
      },
      {
        "item":"Custom",
        "class":"Service",
        "imgPath": "assets/resources/imgs/landing/gallerySample6.webp"
      },
    ],
    moreLink = helperFunctions.generateElement('a',"moreLink","","See More","./pages/gallery.html")
  ){
    /**
     * Create Gallery section
     * Step1: make small packages of HTML code based on list options
     * Step1a: adjust small packages based on list options
     * Step1b: nest packages together
     * Step2: nest elements together and package for later
     */
    //Step1
    list.forEach(element => {
      let option = helperFunctions.generateElement('article',"","lazyParent");
      let link = helperFunctions.generateElement('a',"","","",`./pages/gallery.html`); //STARTER
      let figure = helperFunctions.generateElement('figure');
      let img = helperFunctions.generateElement('img',"","lazyLoad","",element.imgPath);
      let text = helperFunctions.generateElement('h2',"","",element.item);

      //Step1a
      img = helperFunctions.customSpecialElements(img, element.imgPath, "");
      option.classList.add('galleryOption');
      option.classList.add(element.class);
      //Step1b
      option = helperFunctions.nestChildren(option, link, figure, img);
      link.appendChild(text);
      sampleHolder.appendChild(option);
    });
    //Step2
    gallerySection = helperFunctions.appendChildren(gallerySection, h1, sampleHolder, moreLink);
    return gallerySection;
  },
  hero: function(
    hero_tag = helperFunctions.generateElement('section',"hero","landing"),
    figure_tag = helperFunctions.generateElement('figure'),
    img_tag = helperFunctions.generateElement('img',"","dyingImg","","assets/resources/imgs/landing/banner1.webp"),
    img_tag2 = helperFunctions.generateElement('img',"","","","assets/resources/imgs/landing/banner2.webp"),
    banner_tag = helperFunctions.generateElement('a', "banner","","Talk with an Expert Today! <br>(208) 432-2846","tel:208-432-2846"),
  ){
    /**
     * Create Hero element (1 step)
     * Step1: nest pieces together and package for later
     */
    figure_tag = helperFunctions.appendChildren(figure_tag, img_tag, img_tag2);
    hero_tag = helperFunctions.appendChildren(hero_tag, figure_tag, banner_tag)

    return hero_tag
  },
  main: function(
    main_tag = helperFunctions.generateElement('main'),
    hero_tag = this.hero(),
    gallery_tag = this.gallerySection(),
    aboutSection = this.aboutSection(),
    ){

    /**
     * Create Main element (1 step)
     * Step1: nest pieces together and package for later
     */
      main_tag = helperFunctions.appendChildren(main_tag, hero_tag, gallery_tag, aboutSection);
    return main_tag;
  },
  theEvents: {
    heroBackgrounds: function(
      heroElement = document.getElementById('hero'),
      figureElement = heroElement.children[0],
      imgOptions = [
        "assets/resources/imgs/landing/banner1.webp",
        "assets/resources/imgs/landing/banner2.webp",
        "assets/resources/imgs/landing/banner3.webp",
        "assets/resources/imgs/landing/banner4.webp",
        "assets/resources/imgs/landing/banner5.webp"
      ],
      counter = 2,
    ){
      /**
       * Cause fading effect for Hero Element
       * Step1: set images to change every 5 seconds
       * Step1a: construct elements
       * Step1b: take away old image and replace with next imgOption after each interval
       */

      //Step1
      let fadingImg = setInterval(()=>{
        //Step1a
        let dyingImg = figureElement.children[0];
        let substituteImg = figureElement.children[1];
        let newImg = helperFunctions.generateElement('img',"","","",`${imgOptions[counter]}`);
        //Step1b
        counter++;
        if (counter == imgOptions.length){
          counter = 0;
        }
        dyingImg.remove();
        substituteImg.classList.add("dyingImg");
        figureElement.appendChild(newImg);
      },5000)   
    }
  }
}

pageStuff.constructHTML();