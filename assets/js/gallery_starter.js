import { helperFunctions } from "./helperFunctions.js";
import { galleryDB } from "../resources/galleryDB2.js";

const pageStuff = {
  constructHTML: function(
    body = document.querySelector('body'),
    footer = document.querySelector('footer')
  ){
    body.insertBefore(this.main(), footer);
    helperFunctions.lazyLoading();
  },
  dropDown: function(
    selectedOpt,
    dropDownDiv = helperFunctions.generateElement('div',"materialDropDown"),
    label = helperFunctions.generateElement('label',"materialOptions", "","Search"),
    select = helperFunctions.generateElement('select',"materialOptions"),
    array_m = ["Porcelain","Stone","Ceramic","Travertine","Marble","Glass"],
  ){
    array_m.forEach(str => {
      let option = helperFunctions.generateElement('option',"","",str);
      if (str == selectedOpt){
        option.selected = true;
      }
      select.appendChild(option);
    });

    dropDownDiv = helperFunctions.appendChildren(dropDownDiv, label, select);

    return dropDownDiv;
  },

  gallery: function(
    section = helperFunctions.generateElement('section',"gallery"),
    urlParams = new URLSearchParams(window.location.search),
    urlOption = urlParams.get('option'),
    urlType = urlParams.get('type'),
    selectDiv = this.selectDiv(urlParams),
    materialDropDown = this.dropDown(urlType)
  ){
    let imgDiv; 

    switch(urlOption){
      case "Material":
        imgDiv = this.showImgs_starter("Material");
        break;
      case "Service":
        imgDiv = this.showImgs_starter("Service");
        materialDropDown.classList.add('hide');
        break;
      case "Basic":
        imgDiv = this.showImgs_starter("Basic");  
      break;
      default:
        imgDiv = this.showImgs_starter("Basic"); 
        break;
    }

    if ((urlOption == "Material")||(urlOption == "Service")){
      section = helperFunctions.appendChildren(section, selectDiv, materialDropDown, imgDiv);
    }
    else {
      section = helperFunctions.appendChildren(section, imgDiv);
      section.querySelector('h2').style.display="none";
      section.style.marginTop="2.5rem";
    }

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
  reorder:function(
    urlType,
    imgDiv,
    holdArticle = imgDiv.querySelector(`article.${urlType}`),
    holdH2 = imgDiv.querySelector(`h2.${urlType}`) 
  ){
    console.log(urlType);
    imgDiv.insertBefore(holdArticle, imgDiv.children[0]);
    imgDiv.insertBefore(holdH2, imgDiv.children[0]);
    return imgDiv
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
  showImgs_starter: function(
    showing,
    urlParams = new URLSearchParams(window.location.search),
    urlOption = urlParams.get('option'),
    urlType = urlParams.get('type'),
    standard = true,
    imgDiv = helperFunctions.generateElement('div',"imgDiv"),
    showingBtn = document.querySelector('button.show'),
    array_m = ["Porcelain","Stone","Ceramic","Travertine","Marble","Glass"],
    array_s = ["Kitchens","Bathrooms"],
    array_basic = ["Starter"],
    array_using = []
  ){
    //STEP1: check which array will be used based on showing option
    
    switch(showing){
      case "Material":
        array_using = array_m;
        break;
        case "Service":
        array_using = array_s;
        break;
      case "Basic":
        array_using = array_basic;
        break;
      default:
        array_using = array_basic;
        break;
    }

    //STEP2: check for urlType
    //STEP2a: if none, assign urlType a value (base it off of whichever button has the "show" class if possible)
    //STEP2b: if there is a urlType, page wasn't reached via header's nav bar (standard), base future urlType on "show" button
    
    // console.log(showingBtn.innerHTML);
    if (urlType == null){
      try {
        if(showingBtn.innerHTML == urlOption){
        }
        else if(showingBtn.innerHTML == "Material"){
          urlType = "Porcelain";
        }
        else if (showingBtn.innerHTML == "Service"){
          urlType = "Kitchens";
        }
      }
      catch(err){
        urlType = "Starter";
      }
    }
    else {
      standard = false;
      try{
        if (showingBtn.innerHTML == "Material"){
          urlType = "Porcelain"
        }
        else if (showingBtn.innerHTML == "Service"){
          urlType = "Kitchens";
        }
      }
      catch(err){
      }
    }

    //STEP3: create sections based on urlType
    array_using.forEach(str => {
      let h2 = helperFunctions.generateElement('h2',"",str,str);
      h2.classList.add('keeper');
      let article = helperFunctions.generateElement('article',"",str);
      article.classList.add('lazyParent');
      console.log(galleryDB);
      galleryDB.array.forEach(obj => {
        // if ((obj.type == str) && (obj.option == showing)){
          let figure = helperFunctions.generateElement('figure');
          let filter = helperFunctions.generateElement('div',"","filter");
          let img = helperFunctions.generateElement('img',"","lazyLoad","",obj.thmbPath);
          img = helperFunctions.customSpecialElements(img, obj.thmbPath, ""); //this comes before adding obj.type so that the customeSpecialElement only deals with one class
          img.classList.add(obj.type);
          figure.insertBefore(filter,figure.children[0]);
          article = helperFunctions.nestChildren(article, figure, img);

          
          figure.addEventListener('click',()=>{
            this.showPopUp(obj);
          })
        // }
      });
      imgDiv = helperFunctions.appendChildren(imgDiv, h2, article);
    });

    // console.log(urlType, imgDiv)
    // this.reorder(urlType, imgDiv);

    return imgDiv;
  },
  // showImgs_starter: function(
  //   showing,
  //   urlParams = new URLSearchParams(window.location.search),
  //   urlOption = urlParams.get('option'),
  //   urlType = urlParams.get('type'),
  //   standard = true,
  //   imgDiv = helperFunctions.generateElement('div',"imgDiv"),
  //   showingBtn = document.querySelector('button.show'),
  // ){
  //   //STEP1: check which array will be used based on showing option
  //   // switch(showing){
  //   //   case "Material":
  //   //     array_using = array_m;
  //   //     break;
  //   //     case "Service":
  //   //     array_using = array_s;
  //   //     break;
  //   //   case "Basic":
  //   //     array_using = array_basic;
  //   //     break;
  //   //   default:
  //   //     array_using = array_basic;
  //   //     break;
  //   // }

  //   // //STEP2: check for urlType
  //   // //STEP2a: if none, assign urlType a value (base it off of whichever button has the "show" class if possible)
  //   // //STEP2b: if there is a urlType, page wasn't reached via header's nav bar (standard), base future urlType on "show" button
  //   // if (urlType == null){
  //   //   try {
  //   //     if(showingBtn.innerHTML == urlOption){
  //   //     }
  //   //     else if(showingBtn.innerHTML == "Material"){
  //   //       urlType = "Porcelain";
  //   //     }
  //   //     else if (showingBtn.innerHTML == "Service"){
  //   //       urlType = "Bathroom";
  //   //     }
  //   //   }
  //   //   catch(err){
  //   //     urlType = "Starter";
  //   //   }
  //   // }
  //   // else{
  //   //   standard=false;
  //   //   // try{

  //   //   // }
  //   // }

  //   array_using.forEach(str => {
  //     let h2 = helperFunctions.generateElement('h2',"",str,str);
  //     h2.classList.add('keeper');
  //     let article = helperFunctions.generateElement('article',"",str);
  //     article.classList.add('lazyParent');
  //     console.log(galleryDB);
  //     galleryDB.array.forEach(obj => {
  //       if ((obj.type == str) && (obj.option == showing)){
  //         let figure = helperFunctions.generateElement('figure');
  //         let filter = helperFunctions.generateElement('div',"","filter");
  //         let img = helperFunctions.generateElement('img',"","lazyLoad","",obj.thmbPath);
  //         img = helperFunctions.customSpecialElements(img, obj.thmbPath, ""); //this comes before adding obj.type so that the customeSpecialElement only deals with one class
  //         img.classList.add(obj.type);
  //         figure.insertBefore(filter,figure.children[0]);
  //         article = helperFunctions.nestChildren(article, figure, img);

          
  //         figure.addEventListener('click',()=>{
  //           this.showPopUp(obj);
  //         })
  //       }
  //     });
  //     imgDiv = helperFunctions.appendChildren(imgDiv, h2, article);
  //   });

  //   // console.log(urlType, imgDiv)
  //   // this.reorder(urlType, imgDiv);

  //   return imgDiv;
  // },
  showPopUp: function(
    obj,
    main = document.querySelector('main'),
    section = helperFunctions.generateElement('section',"popUp"),
    div = helperFunctions.generateElement('div',"popUpHolder",obj.orientation),
    button = helperFunctions.generateElement('button',"","","X"),
    figure = helperFunctions.generateElement('figure',""),
    descript = helperFunctions.generateElement('div',"","",`Material: ${obj.material} / Service: ${obj.service}`),
    img = helperFunctions.generateElement('img',"","","",obj.imgPath)
  ){
    main = helperFunctions.nestChildren(main, section,div,figure,descript);
    figure.appendChild(img);
    div.insertBefore(button,div.children[0]);

    button.addEventListener('click',()=>{
      section.remove();
    })

    addEventListener("keypress", (e)=>{
      console.log(e.key)
      if (e.key == "Escape"){
        console.log("ESCAPE")
      }
    })
  },
  theEvents: {
    startEvents: function(){
      try{
        this.typeChange();
        this.clickTypeBtns();
      }
      catch(err){
        console.log(err);
      }
    },
    typeChange: function(
      select = document.querySelector('#materialOptions'),
    ){
      select.addEventListener('change',()=>{
        let imgDiv = document.querySelector('#imgDiv')
        console.log(imgDiv);
        pageStuff.reorder(select.value,imgDiv);
      })
    },
    clickTypeBtns: function(
      btnArray = Array.from(document.querySelector('#selectionDiv').children),
      galleryElement = document.querySelector('#gallery'),
      materialDropDown = document.querySelector('#materialDropDown')
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
            materialDropDown.classList.remove('hide');
            newImgDiv = pageStuff.showImgs('Material');
            console.log(document.querySelector('#materialOptions').value)
            pageStuff.reorder(document.querySelector('#materialOptions').value, newImgDiv)
          }
          else {
            btnArray[1].classList.add('show');
            btnArray[0].classList.remove('show');
            materialDropDown.classList.add('hide');
            newImgDiv = pageStuff.showImgs('Service');
          }
          galleryElement.insertBefore(newImgDiv, oldImgDiv);
          oldImgDiv.remove();
          helperFunctions.lazyLoading();
        })
      });
    },
    
  }
}


pageStuff.constructHTML();
pageStuff.theEvents.startEvents();