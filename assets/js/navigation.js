import { helperFunctions } from "./helperFunctions.js"

export const navigation = {
  // pageList: ["services","gallery","about","reviews","contact",],
  pageList: ["gallery","about","contact"],
  pathAdjuster: [],
  currentPage:  "",

  getNavigationPackage: function(){
    this.setGlobalVariables();
    let moleculePackage = [
      this.logo_molecule(),
      this.mobileNav_molecule(),
      this.nav_molecule()
    ]
    return moleculePackage;
  },
  dropDowns: function(
    navItem,
  ){
    return;
  },
  labelMainNav: function(
    header = document.querySelector('header'),
    mainNav = header.children[ header.children.length - 1]
  ){
    mainNav.id = "mainNav";
  },
  logo_molecule: function(
    div = helperFunctions.generateElement('div',"logoArea"),
    a_tag = helperFunctions.generateElement('a',"logoLink","","",`${this.pathAdjuster[0]}`),
    img_tag = helperFunctions.generateElement('img',"","","logo",`${this.pathAdjuster[0]}assets/resources/imgs/logo.webp`)
  ){
    div = helperFunctions.appendChildren(div, a_tag);
    a_tag.appendChild(img_tag);
    return div;
  },
  nav_molecule:function(
    // navOptions = ["Home","Gallery","Services","About","Reviews","Contact"],
    navOptions = ["Home","Gallery","About","Contact"],
    nav_tag = helperFunctions.generateElement('nav',"mainNav"),
    ul_tag = helperFunctions.generateElement('ul'))
  {
    navOptions.forEach(opt => {
      let li_tag = helperFunctions.generateElement('li');
      let a_tag;
      if (opt.toLocaleUpperCase() == this.currentPage.toUpperCase()){
        a_tag = helperFunctions.generateElement('a',"","current",opt + "<span class=underline></span>",`${this.pathAdjuster[1]}${opt.toLowerCase()}.html`);
      }
      else{
        a_tag = helperFunctions.generateElement('a',"","",opt + "<span class=underline></span>",`${this.pathAdjuster[1]}${opt.toLowerCase()}.html`);
      }
      if (opt == "Home"){
        a_tag = helperFunctions.generateElement('a',"","",opt + "<span class=underline></span>",`${this.pathAdjuster[0]}`);
        if(this.currentPage == 'index'){
          a_tag.classList.add('current');
        } 
      }
      if (opt == "Gallery" || opt == "Services"){
        this.dropDowns(opt);
      }
      
      ul_tag = helperFunctions.nestChildren(ul_tag, li_tag, a_tag);
    });
    nav_tag.appendChild(ul_tag);
    return nav_tag;
  },
  postConstructionFunctions: function(){
    this.mobileNav_events();
    this.labelMainNav();
  },
  setGlobalVariables: function(){
    this.currentPage = helperFunctions.getCurrentPage(this.pageList);
    this.pathAdjuster = helperFunctions.getPathAdjuster(this.pageList); 
  },
  mobileNav_molecule: function(
    mobileNav_tag = helperFunctions.generateElement('section',"mobileMenu"),
    nav = this.nav_molecule(),
    dropDownBtn = helperFunctions.generateElement('button',"dropDownBtn","",`<i class="fa-solid fa-chevron-down"></i>`)
  ){
    mobileNav_tag = helperFunctions.appendChildren(mobileNav_tag, 
      dropDownBtn, nav);
    nav.id = "mobileNav";
    return mobileNav_tag;
  },
  mobileNav_events: function(
    dropDownBtn = document.querySelector('#dropDownBtn'),
    header = document.querySelector('header'),
    isOpen = false
  ){
    dropDownBtn.addEventListener('click',(e)=>{
      console.log(e.target);
      if (isOpen == false){
        header.classList.add('isOpen');
        isOpen = true;
      }
      else if (isOpen == true){
        header.classList.remove('isOpen');
        isOpen = false;
      }

    })

  }
}