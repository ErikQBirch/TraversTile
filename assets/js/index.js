import { helperFunctions } from "./helperFunctions.js"
import { navigation } from "./navigation.js";
import { footer } from "./footer,.js";

const pageStuff = {
  constructHTML: function(
    body = document.querySelector('body')
  ){
    body = helperFunctions.appendChildren(body, 
      this.header(),
      this.footer(),
      this.backToTop()
    );
    navigation.postConstructionFunctions();
    this.favicon();
  },
  header: function(
    header_tag = helperFunctions.generateElement('header')
  ){
    let navigationPackage = navigation.getNavigationPackage();
    header_tag = helperFunctions.appendChildren(
      header_tag, 
      navigationPackage[0],
      navigationPackage[1], 
      navigationPackage[2],
      // navigationPackage[3]
      );
    return header_tag;
  },
  favicon: function(
    favicon = document.querySelector("link[rel~='icon']"),
    pathAdjuster = helperFunctions.getPathAdjuster(navigation.pageList)
  ){ 
    if (!favicon) {
        favicon = document.createElement('link');
        favicon.rel = 'icon';
        document.getElementsByTagName('head')[0].appendChild(favicon);
    }
    favicon.href = `${pathAdjuster[0]}assets/resources/imgs/TT_icon.ico`;
  },
  footer: function(
    footer_tag = helperFunctions.generateElement('footer'),
    package_array = (footer.getNavigationPackage()),
    text = helperFunctions.generateElement('p',"","","Erik Q. Birch | ©2023 | TripleA™"),
    topHalf = helperFunctions.generateElement('div',"topHalf_footer"),
    bottomHalf = helperFunctions.generateElement('div',"bottomHalf_footer")
  ){
    package_array.forEach(item => {
      topHalf.appendChild(item)
    });
    // console.log(package_array)
    bottomHalf.appendChild(text);
    footer_tag = helperFunctions.appendChildren(footer_tag, topHalf, bottomHalf);
    return footer_tag;
  },
  backToTop: function(
    btn = helperFunctions.generateElement('button',"backToTop","",`<i class="fa-solid fa-chevron-up"></i>`)
  ){
    btn.addEventListener('click',()=>{
      window.scrollTo({top: 0, behavior: 'smooth'})
    })
    window.addEventListener('scroll', (e)=>{
      let scroll = window.scrollY;
      try{
          if (scroll > 0){
              btn.style.opacity=1;
          }
          else{
              btn.style.opacity=0
          }
          
      }
      catch(err){console.log(err)};
    })
    return btn;
  },
  
  // scrollEvents:{
  //   headerScroll: function(
  //     header_tag = document.querySelector('header'),
  //     sideMenu = document.querySelector('#sideMenu')
  //   ){
  //     // console.log(header_tag);
  //     let currentScroll = 0;
  //     window.onscroll = function(e){
  //       let nextScroll = window.scrollY;
  //       if (nextScroll > currentScroll){
  //         if (window.innerWidth > 992){
  //           header_tag.style.top = "-6rem";
  //         }
  //       }
  //       else {
  //         header_tag.style.top = "0rem";
  //       }
  //       currentScroll = nextScroll;
  //     }
  //   }
  // }
}

pageStuff.constructHTML();