import { helperFunctions } from "./helperFunctions.js";
import { galleryDB } from "../resources/galleryDB.js"

const pageStuff = {
  constructHTML: function(
    body = document.querySelector('body'),
    footer = document.querySelector('footer')
  ){
    body.insertBefore(this.main(), footer);
  },
  gallery: function(
    section = helperFunctions.generateElement('section',"gallery"),
    urlParams = new URLSearchParams(window.location.search),
    urlOption = urlParams.get('option'),
    selectDiv = this.selectDiv(urlParams),
  ){
    let imgDiv; 

    if (urlOption == "Material"){
      imgDiv = this.showImgs("Material");
    }
    else if (urlOption == "Service"){
      imgDiv = this.showImgs("Service");
    }
    else {
      imgDiv = this.showImgs("Material");
    }

    try {

    }
    catch(err){}
     

    // console.log(selectDiv, imgDiv);
    section = helperFunctions.appendChildren(section, selectDiv, imgDiv);

    return section;
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
    gallery_tag = this.gallery()
    ){
      main_tag = helperFunctions.appendChildren(main_tag, hero_tag, gallery_tag);
    return main_tag;
  },
  selectDiv: function(
    urlParams,
    selectionDiv = helperFunctions.generateElement('div',"selectionDiv"),
    imgDiv = helperFunctions.generateElement('div',"imgDiv"),
    material_btn = helperFunctions.generateElement('button',"","","Material"),
    service_btn = helperFunctions.generateElement('button',"","","Service"),
  ){
    if (urlParams.get('option') == "Material"){
      material_btn.disabled = true;
      material_btn.classList.add('show');
    }
    else if (urlParams.get('option') == "Service"){
      service_btn.disabled = true;
      service_btn.classList.add('show');
    }
    else if (urlParams.get('option') == null){
      material_btn.disabled = true;
      material_btn.classList.add('show');
    }
    
    selectionDiv = helperFunctions.appendChildren(selectionDiv, material_btn, service_btn);
    return selectionDiv;
  },
  showImgs: function(
    showing,
    urlParams = new URLSearchParams(window.location.search),
    urlOption = urlParams.get('option'),
    urlType = urlParams.get('type'),
    standard = true,
    imgDiv = helperFunctions.generateElement('div',"imgDiv"),
    showingBtn = document.querySelector('button.show'),
    array_m = ["Porcelain","Stone","Ceramic","Travertine","Marble","Glass"],
    array_s = ["Kitchens","Bathrooms"],
    array_using = []
  ){
    //STEP1: check which array will be used based on showing option
    if (showing == "Material"){
      array_using = array_m;
    }
    else if (showing = "Service"){
      array_using = array_s;
    }

    //STEP2: check for urlType
    //STEP2a: if none, assign urlType a value (base it off of whichever button has the "show" class if possible)
    //STEP2b: if there is a urlType, page wasn't reached via header's nav bar (standard), base future urlType on "show" button
    if (urlType == null){
      try {
        if(showingBtn.innerHTML == "Material"){
          urlType = "Porcelain";
        }
        else if (showingBtn.innerHTML == "Service"){
          urlType = "Kitchens";
        }
      }
      catch(err){
        urlType = "Porcelain";
      }
    }
    else {
      standard = false;
      try{
        if(showingBtn.innerHTML == urlOption){
        }
        else if (showingBtn.innerHTML == "Material"){
          urlType = "Porcelain"
        }
        else if (showingBtn.innerHTML == "Service"){
          urlType = "Kitchens";
        }
      }
      catch(err){}
    }

    //STEP3: create sections based on urlType
    array_using.forEach(str => {
      let h2 = helperFunctions.generateElement('h2',"",str,str);
      h2.classList.add('keeper');
      let article = helperFunctions.generateElement('article',"",str);
      galleryDB.array.forEach(obj => {
        if ((obj.class1 == str) && (obj.class2 == showing)){
          let figure = helperFunctions.generateElement('figure');
          let img = helperFunctions.generateElement('img',"",`${obj.class1}`,"",`${obj.imgPath}`);
          article = helperFunctions.nestChildren(article, figure, img);
        }
      });
      imgDiv = helperFunctions.appendChildren(imgDiv, h2, article);
    });


    let holdArticle = imgDiv.querySelector(`article.${urlType}`);
    let holdH2 = imgDiv.querySelector(`h2.${urlType}`);
    imgDiv.insertBefore(holdArticle, imgDiv.children[0]);
    imgDiv.insertBefore(holdH2, imgDiv.children[0]);


    return imgDiv;
  },
  theEvents: {
    startEvents: function(){
      this.optionChange();
      this.clickTypeBtns();
    },
    optionChange: function(){
    },
    clickTypeBtns: function(
      btnArray = Array.from(document.querySelector('#selectionDiv').children),
      galleryElement = document.querySelector('#gallery')
    ){
      btnArray.forEach(btn=> {
        btn.addEventListener('click',()=>{
          let v = btn.innerHTML;
          let oldImgDiv = document.querySelector('#imgDiv');
          let newImgDiv;

          let prevDisabledBtn = document.querySelector('.show');
          prevDisabledBtn.disabled = false;
          btn.disabled = true;

          if (v == "Material"){
            btnArray[0].classList.add('show');
            btnArray[1].classList.remove('show');
            newImgDiv = pageStuff.showImgs('Material');
          }
          else {
            btnArray[1].classList.add('show');
            btnArray[0].classList.remove('show');
            newImgDiv = pageStuff.showImgs('Service');
          }
          galleryElement.insertBefore(newImgDiv, oldImgDiv);
          oldImgDiv.remove();
          // console.log(v);
        })
      });
    },
    
  }
}


pageStuff.constructHTML();
pageStuff.theEvents.startEvents()