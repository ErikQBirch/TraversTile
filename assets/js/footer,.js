import { helperFunctions } from "./helperFunctions.js"

export const footer = {
  pageList: ["services","gallery","about","reviews","contact","deadEnd"],
  pathAdjuster: [],
  currentPage:  "",
  getNavigationPackage: function(){
    this.setGlobalVariables();
    let moleculePackage = [
      this.logo_molecule(),
      this.nav_molecule(),
      this.contact_molecule()
    ]
    return moleculePackage;
  },
  logo_molecule: function(
    div = helperFunctions.generateElement('div',"logoArea"),
    a_tag = helperFunctions.generateElement('a',"logoLink","","",`${this.pathAdjuster[0]}`),
    img_tag = helperFunctions.generateElement('img',"","","logo",`${this.pathAdjuster[0]}assets/resources/imgs/logo(alt).webp`)
  ){
    div = helperFunctions.appendChildren(div, a_tag);
    a_tag.appendChild(img_tag);
    return div;
  },
  nav_molecule:function(
    navOptions = ["Home","Gallery","Services","About","Reviews","Contact"],
    nav_tag = helperFunctions.generateElement('nav',"footerNav"),
    ul_tag = helperFunctions.generateElement('ul'))
  {
    navOptions.forEach(opt => {
      let li_tag = helperFunctions.generateElement('li');
      let a_tag;
      // console.log(this.currentPage);
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
      
      ul_tag = helperFunctions.nestChildren(ul_tag, li_tag, a_tag);
    });
    nav_tag.appendChild(ul_tag);
    return nav_tag;
  },
  contact_molecule: function(
    options = 
    {
      "call":"<a href='tel:208-749-6666'><i class='fa-solid fa-phone-volume'></i></a>",
      "text":"<a href='sms:208-749-6666'><i class='fa-solid fa-message'></i></a>",
      "email":"<a href='email:erikqbirch@gmail.com'><i class='fa-solid fa-envelope'></i></a>",
      "facebook":"<a href='https://www.facebook.com/profile.php?id=100013516478893'><i class='fa-brands fa-facebook'></i></a>"
    },
    molecule = helperFunctions.generateElement('div',"contactMolecule")
  ){
    for (let key in options){
      // console.log(key);
      molecule.innerHTML += (options[key])
    }
    return molecule;
  },
  setGlobalVariables: function(){
    this.currentPage = helperFunctions.getCurrentPage(this.pageList);
    this.pathAdjuster = helperFunctions.getPathAdjuster(this.pageList); 
  },
}