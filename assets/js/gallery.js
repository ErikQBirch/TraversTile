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
    selectDiv = this.selectDiv()
  ){
    section = helperFunctions.appendChildren(section, selectDiv);

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
    selectionDiv = helperFunctions.generateElement('div',"selectionDiv"),
    div_type = helperFunctions.generateElement('div',"div_type"),
    material_btn = helperFunctions.generateElement('button',"","","Material"),
    service_btn = helperFunctions.generateElement('button',"","","Service"),

    div_option = helperFunctions.generateElement('div',"div_option"),
    label_option = helperFunctions.generateElement('label',"Option","","Option: "),    
    select_material = helperFunctions.generateElement('select',"Material"),
    select_service = helperFunctions.generateElement('select',"Service"),
    array_m = ["Porcelain","Stone","Ceramic","Travertine","Marble","Glass"],
    array_s = ["Kitchen","Bathroom"]
  ){

    array_m.forEach(item => {
      let option = helperFunctions.generateElement('option',"","",item)
      select_material.appendChild(option);
    });
    array_s.forEach(item => {
      let option = helperFunctions.generateElement('option',"","",item)
      select_service.appendChild(option);
    });
    
    div_type = helperFunctions.appendChildren(div_type, material_btn, service_btn);
    div_option = helperFunctions.appendChildren(div_option, label_option, select_material, select_service);

    select_material.classList.add('show');

    console.log(galleryDB.array);

    selectionDiv = helperFunctions.appendChildren(selectionDiv, div_type, div_option);
    return selectionDiv;
  },
  theEvents: {
    startEvents: function(){
      this.optionChange();
      this.clickTypeBtns();
    },
    optionChange: function(){
    },
    clickTypeBtns: function(
      btnArray = Array.from(document.querySelector('#div_type').children),
      option_array = document.querySelector('div#div_option').children
    ){
      console.log(btnArray);
      btnArray.forEach(btn=> {
        btn.addEventListener('click',()=>{
          let v = btn.innerHTML;
          let array = option_array;
          if (v == "Material"){
          array[1].classList.add('show');
          array[2].classList.remove('show');
          }
          else {
          array[2].classList.add('show');
          array[1].classList.remove('show');
          }
          console.log(v);
        })
      });
    },
    
    // typeChange: function(
    //   type_select = document.querySelector('select#Type'),
    //   option_array = document.querySelector('div#div_option').children
    // ){
    //   type_select.addEventListener('change',()=>{
    //     let array = (option_array)
    //     let v = type_select.value;
    //     if (v == "Material"){
    //       array[1].classList.add('show');
    //       array[2].classList.remove('show');
    //     }
    //     else if (v == "Service"){
    //       array[2].classList.add('show');
    //       array[1].classList.remove('show');
    //     }
    //   })
    // }
  }
}


pageStuff.constructHTML();
pageStuff.theEvents.startEvents()