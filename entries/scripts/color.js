import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let mainCont = document.querySelector('#mainContainer');
let containers = document.querySelectorAll('.container[data-color]');

gsap.set("#mainContainer",
{
  duration: 0.5,
  autoAlpha: 1,
  backgroundColor: containers[0].dataset.color,
  overwrite: 'auto'
});

containers.forEach((el, i) => {
  let color = el.dataset.color;
  let prevColor = i != 0 ? containers[i - 1].dataset.color : containers[i].dataset.color;

  ScrollTrigger.create({
    trigger: el,
    start: "top top+=300px",
    end:"bottom bottom-=100px",
    onEnter: function()
    {
      gsap.to("#mainContainer", { duration: 0.3, backgroundColor: color, overwrite: 'auto', autoAlpha: 1 });

      if (el.dataset.theme === 'dark')
      {
        mainCont.classList.add('dark-theme');
      }
    },
    onLeaveBack: function()
    {
      gsap.to("#mainContainer", { duration: 0.3, backgroundColor: prevColor, overwrite: 'auto', autoAlpha: 1 })
      if (el.dataset.theme === 'dark') {
        mainCont.classList.remove('dark-theme');
      }
    }
  })
})