import { helperFunctions } from "./helperFunctions.js";

const pageStuff = {
  constructHTML: function(
    body = document.querySelector('body'),
    footer = document.querySelector('footer')
  ){
    body.insertBefore(this.main(), footer);
    this.theEvents.readyEvents();
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
    serviceSection = this.serviceSection()
    ){
      main_tag = helperFunctions.appendChildren(main_tag, hero_tag, serviceSection);
    return main_tag;
  },
  serviceSection: function(
    serviceSection = helperFunctions.generateElement('section',"serviceSection"),
    side1 = this.serviceOptions(),
    side2 = this.serviceImgs()
  ){
    serviceSection = helperFunctions.appendChildren(serviceSection, side1, side2);

    return serviceSection;
  },
  serviceOptions: function(
    side1 = helperFunctions.generateElement('div',"side1"),
    options = [
      {
        "name":"Standard",
        "text":"asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, <br>asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, <br>asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, ",
        "pricing":"$9.99"
      },
      {
        "name":"Deluxe",
        "text":"asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, <br>asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, <br>asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, ",
        "pricing":"$9.99"
      },
      {
        "name":"Premium",
        "text":"asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, <br>asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, <br>asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, asdf, ",
        "pricing":"$9.99"
      }
    ]
  ){
    options.forEach(obj => {
      let article = helperFunctions.generateElement('article');
      let h2 = helperFunctions.generateElement('h2',"","",obj.name);
      let descript = helperFunctions.generateElement('div',"","description");
      let text = helperFunctions.generateElement('p',"","",obj.text);
      let price = helperFunctions.generateElement('p',"","",obj.price);

      descript = helperFunctions.appendChildren(descript, text, price);
      article = helperFunctions.appendChildren(article, h2, descript);
      side1.appendChild(article);
    });

    return side1;
  },
  serviceImgs: function(
    side2 = helperFunctions.generateElement('div',"side2"),
    figure = helperFunctions.generateElement('figure',"serviceFigure"),
    img = helperFunctions.generateElement('img',"","","","../assets/resources/imgs/landing/banner1.webp"),
  ){
    side2 = helperFunctions.nestChildren(side2, figure, img);
    return side2;
  },
  theEvents: {
    readyEvents: function(
      h2Array = document.querySelectorAll('h2'),
    ){
      console.log(h2Array);
      h2Array.forEach(h2 => {
        h2.addEventListener('click',()=>{
          this.serviceDropDown(h2);
        })
      });
    },
    serviceDropDown: function(h2){
      let article = h2.parentElement;
      let alreadyOpen;
      try {
        alreadyOpen = document.querySelector('.open');
      }
      catch(err){console.log(err)}

      if (alreadyOpen == article){
        article.classList.remove('open');
        this.fadingServiceImg("Same");
      }
      else if (alreadyOpen !== null){
        alreadyOpen.classList.remove('open');
        article.classList.toggle('open');
        this.fadingServiceImg(h2.innerHTML);
      }
      else {
        article.classList.toggle('open');
        this.fadingServiceImg(h2.innerHTML);
      }
    },
    fadingServiceImg: function(
      option,
      serviceFigure = document.querySelector('#serviceFigure'),
      // nextToDie = serviceFigure.children[1],
      newImg = helperFunctions.generateElement('img',"","newImg"),
      imgOptions = [
        "../assets/resources/imgs/landing/banner1.webp",
        "../assets/resources/imgs/landing/banner2.webp",
        "../assets/resources/imgs/landing/banner3.webp",
        "../assets/resources/imgs/landing/banner4.webp",
        "../assets/resources/imgs/landing/banner5.webp"
      ],
    ){

      if (serviceFigure.children.length  == 2){
        serviceFigure.children[0].remove();
      }


      serviceFigure.appendChild(newImg);
      switch(option){
        case "Standard":
          newImg.setAttribute('src',imgOptions[1])
          break;
        case "Deluxe":
          newImg.setAttribute('src',imgOptions[2])
          break;
        case "Premium":
          newImg.setAttribute('src',imgOptions[3])
          break;
        default:
          newImg.setAttribute('src',imgOptions[0])
          break;
      }

      serviceFigure.appendChild(newImg);

    }
  }
}


pageStuff.constructHTML();