
// sidebar
function toggleSidebar(ref){
    document.getElementById("mobilesidemenu").classList.toggle('mobilesidebar');
    document.getElementById("sidebaroverlay-id").classList.add("sidebar-overlay");
    
    
  }
  function outsideclick(ref){
  
    document.getElementById("sidebaroverlay-id").classList.remove("sidebar-overlay");
    document.getElementById("mobilesidemenu").classList.remove("mobilesidebar");
    
  }

  // $(document).ready(function(){
  //   $('.teams').slick({
  //   slidesToShow: 3,
  //   dots:false,
  //   centerMode: true,
  //   arrow: true,
  //   responsive: [
  //     {
  //       breakpoint: 769,
  //       settings: {
  //       slidesToShow: 2,
  //       slidesToScroll: 2,
  //       }        
  //     },
  //     {
  //       breakpoint: 500,
  //       settings: {
  //       slidesToShow: 1,
  //       slidesToScroll: 1,
  //       }        
  //     }
  //   ] 
    
  //   });
   
  // });
  
