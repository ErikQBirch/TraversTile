import { helperFunctions } from "./helperFunctions.js"
import { navigation } from "./navigation.js";
import { footer } from "./footer.js";

const pageStuff = {
  constructHTML: function(
    body = document.querySelector('body')
  ){
    /*
    Creates html using other functions and displays it as a whole
    * Step1: inserts html elements into existing body element
    * Step2: applies navigation elements and functionalities
    * Step3: inserts image for web tab
    */
   //Step1
    body = helperFunctions.appendChildren(body, 
      this.header(),
      this.footer(),
      this.backToTop()
    );
    //Step2
    navigation.postConstructionFunctions();
    //Step3
    this.favicon();
  },
  header: function(
    header_tag = helperFunctions.generateElement('header')
  ){
    /**
    Creates header html element
    * Step1: pulls in navigation elements and functionalities
    * Step2: addes naviation content to header element
    * Step3: packages header element to be used in other functions
     */

    //Step1
    let navigationPackage = navigation.getNavigationPackage();
    //Step2
    header_tag = helperFunctions.appendChildren(
      header_tag, 
      navigationPackage[0],
      navigationPackage[1], 
      navigationPackage[2],
      );
      //Step3
    return header_tag;
  },
  favicon: function(
    favicon = document.querySelector("link[rel~='icon']"),
    pathAdjuster = helperFunctions.getPathAdjuster(navigation.pageList)
  ){ 
    /**
     Adds favicon image to web tab
     *Step1: checks to see if favicon element exists
     *Step2: if doesn't exist, creates favicon element
     *Step3: puts created favicon element into head element
     *Step4: sets the favicon element to display desired img
     */

     //Step1
    if (!favicon) {
      //Step2
        favicon = document.createElement('link');
        favicon.rel = 'icon';
        //Step3
        document.getElementsByTagName('head')[0].appendChild(favicon);
    }
    //Step4
    favicon.href = `${pathAdjuster[0]}assets/resources/imgs/TT_icon.ico`;
  },
  footer: function(
    footer_tag = helperFunctions.generateElement('footer'),
    package_array = (footer.getNavigationPackage()),
    text = helperFunctions.generateElement('p',"","","Erik Q. Birch | ©2023 | AWDs™"),
    topHalf = helperFunctions.generateElement('div',"topHalf_footer"),
    bottomHalf = helperFunctions.generateElement('div',"bottomHalf_footer")
  ){
    /**
     Construct Footer Element
     *Step1: add navigation content to top half
     *Step2: construct bottom half
     *Step3: add the two together and package it up
     */

     //Step1
    package_array.forEach(item => {
      topHalf.appendChild(item)
    });
    //Step2
    bottomHalf.appendChild(text);
    //Step3
    footer_tag = helperFunctions.appendChildren(footer_tag, topHalf, bottomHalf);
    return footer_tag;
  },
  backToTop: function(
    btn = helperFunctions.generateElement('button',"backToTop","",`<i class="fa-solid fa-chevron-up"></i>`)
  ){
    /**
     * Creates button to return to top of page after scrolling
     * Step1: make button invisible upon initial creation
     * Step2: add event listener that will cause screen to scroll to top after clicking btn
     * Step3: make it so button appears when screen is not at very top of page
     * Step4: package button for further use
     */

    //Step1
    btn.style.opacity = 0;
    //Step2
    btn.addEventListener('click',()=>{
      window.scrollTo({top: 0, behavior: 'smooth'})
    })
    //Step3
    window.addEventListener('scroll', (e)=>{
      let scroll = window.scrollY;
      try{
          if ((scroll > 0)){
              btn.style.opacity=1;
          }
          else{
              btn.style.opacity=0;
          }      
      }
      catch(err){console.log(err)};
    })
    //Step4
    return btn;
  },
}

pageStuff.constructHTML();