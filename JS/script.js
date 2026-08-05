const loadingAreaGrey = document.querySelector('#loading');
const loadingAreaGreen = document.querySelector('#loading-screen');
const loadingText = document.querySelector('#loading p');
window.addEventListener('load', () => {
  loadingText.animate(
    [
      { opacity: 1, offset: 0.8 },
      { opacity: 0, offset: 1 }
    ],
    {
      duration: 1200,
      easing: 'ease',
      fill: 'forwards',
    }
  );
  loadingAreaGreen.animate(
    [
      { transform: 'translateY(100vh)' },
      { transform: 'translateY(0vh)', offset: 0.4 },
      { transform: 'translateY(-100vh)' }
    ],
    {
      duration: 2000,
      delay: 800,
      easing: 'ease',
      fill: 'forwards',
    }
  );
  const greyAnimation = loadingAreaGrey.animate(
    [
      { opacity: 1 },
      { opacity: 0 }
    ],
    {
      duration: 2000,
      delay: 1200,
      easing: 'ease',
      fill: 'forwards',
    }
  );
  greyAnimation.onfinish = () => {
    loadingAreaGrey.classList.add('is-loaded');
    loadingAreaGreen.classList.add('is-loaded');
    loadingAreaGrey.style.display = 'none';
    loadingAreaGreen.style.display = 'none';
  };
});
const menuOpen = document.querySelector('#menu-open');
const menuClose = document.querySelector('#menu-close');
const menuPanel = document.querySelector('#menu-panel');
const menuItems = document.querySelectorAll('#menu-panel li');
const menuOptions ={
  duration: 1400,
  easing: 'ease',
  fill: 'forwards'
};
menuOpen.addEventListener('click', () => {
  menuPanel.animate({translate: ['100vw', 0]}, menuOptions);
  menuItems.forEach((menuItem,index) => {
    menuItem.animate(
      {
        opacity: [0, 1],
        translate: ['2rem', 0],
      },
      {
        duration: 2400,
        delay: 300 * index,
        easing: 'ease',
        fill: 'forwards',
      }
    );
  });
});
menuClose.addEventListener('click', () => {
  menuPanel.animate({translate: [0, '100vw']}, menuOptions);
  menuItems.forEach((menuItem) => {
    menuItem.animate({opacity: [1, 0]}, menuOptions);
  });
});