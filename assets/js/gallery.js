import { helperFunctions } from "./helperFunctions.js";
import { galleryDB } from "../resources/galleryDB.js"

const pageStuff = {
  constructHTML: function(
    body = document.querySelector('body'),
    footer = document.querySelector('footer')
  ){
    body.insertBefore(this.main(), footer);
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
      console.log(str, selectedOpt)
      if (str == selectedOpt){
        // option.setAttribute('selected',true);
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

    if (urlOption == "Material"){
      imgDiv = this.showImgs("Material");
    }
    else if (urlOption == "Service"){
      imgDiv = this.showImgs("Service");
      materialDropDown.classList.add('hide');
    }
    else {
      imgDiv = this.showImgs("Material");
    }

    try {

    }
    catch(err){}
     

    // console.log(selectDiv, imgDiv);
    section = helperFunctions.appendChildren(section, selectDiv, materialDropDown, imgDiv);

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

    this.reorder(urlType, imgDiv);

    


    return imgDiv;
  },
  theEvents: {
    startEvents: function(){
      this.typeChange();
      this.clickTypeBtns();
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
          // console.log(v);
        })
      });
    },
    
  }
}


pageStuff.constructHTML();
pageStuff.theEvents.startEvents()