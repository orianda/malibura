import './PopupComponent.less';
import {escape} from 'lodash';
import {IbuComponent} from './IbuComponent.ts';
import {IconChevronRight} from './IconChevronRight.ts';
import {PercentageComponent} from './PercentageComponent.ts';
import {getProduct} from './productService.ts';

const {BASE_URL} = import.meta.env;

/**
 * Render popup content
 */
export const PopupComponent = () => `
<section aria-hidden="true" class="popup">
  <div>
    <div>
      <div>
        <figure data-ibu="">
          <img/>
          <figcaption></figcaption>
          ${IbuComponent(0)}
        </figure>
        <header></header>
      </div>
      <div>
        <p></p>
        <button type="button">
          Order
          ${IconChevronRight()}
        </button>
      </div>
      <a href="${BASE_URL}">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </a>
    </div>
  </div>
  <menu aria-hidden="true">
    <li>
      <button type="button">
        Glass
        ${IconChevronRight()}
      </button>
      <menu aria-hidden="true">
        <li>
          <button type="button">
            1
          </button>
        </li>
        <li>
          <button type="button">
            2
          </button>
        </li>
        <li>
          <button type="button">
            3
          </button>
        </li>
      </menu>
    </li>
    <li>
      <button type="button">
        Can
        ${IconChevronRight()}
      </button>
      <menu aria-hidden="true">
        <li>
          <button type="button">
            1
          </button>
        </li>
        <li>
          <button type="button">
            2
          </button>
        </li>
        <li>
          <button type="button">
            3
          </button>
        </li>
      </menu>
    </li>
    <li>
      <button type="button">
        Box
        ${IconChevronRight()}
      </button>
      <menu aria-hidden="true">
        <li>
          <button type="button">
            1
          </button>
        </li>
        <li>
          <button type="button">
            2
          </button>
        </li>
        <li>
          <button type="button">
            3
          </button>
        </li>
      </menu>
    </li>
  </menu>
</section>`;

/**
 * Show and hide popup
 */
export const verifyPopup = (): void => {
  const [section] = document.getElementsByClassName('popup');
  if (!section) {
    return;
  }

  const show = (
    show = true
  ): void => {
    section
      .querySelectorAll('[aria-hidden]')
      .forEach((menu) => {
        menu.ariaHidden = 'true';
      });
    section.ariaHidden = (!show).toString();
  };

  const hide = (
    hide = true
  ): void => {
    show(!hide);
  };

  const {pathname} = window.location;
  if (!pathname.startsWith(BASE_URL)) {
    return;
  }

  const {length} = BASE_URL;
  const offset = pathname[length] === '/' ? length : length - 1;
  const suffix = pathname.substring(offset);
  const id = (/^\/products\/(?<id>\d+)\/?$/u).exec(suffix)?.groups?.id;
  if (!id) {
    hide();
    return;
  }


  const productId = parseInt(id, 10);
  getProduct(productId)
    .then((product) => {
      const [left, right] = section.querySelectorAll<HTMLDivElement>(':scope > div > div > div');
      const figure = left?.querySelector<HTMLElement>(':scope > figure');
      const img = figure?.querySelector<HTMLImageElement>(':scope > img');
      const figcaption = figure?.querySelector(':scope > figcaption');
      const ibu = figure?.querySelector<HTMLElement>(':scope > dl > dd');
      const header = left.querySelector<HTMLElement>(':scope > header');
      const paragraph = right?.querySelector(':scope > p');
      if (!product || !left || !right || !figure || !img || !figcaption || !ibu || !header || !paragraph) {
        hide();
        return;
      }

      img.src = product.image_url;
      img.alt = header.innerHTML = escape(product.name);
      figcaption.innerHTML = PercentageComponent(product.abv);
      ibu.innerHTML = figure.dataset.ibu = product.ibu.toString();
      paragraph.innerHTML = escape(product.description);
      show();
    })
    .catch(console.error);
};

/**
 * Handle order button
 */
document.addEventListener('click', (event) => {
  const {target} = event;
  if (!(target instanceof HTMLElement) || !target.matches('.popup > div > div > div > button')) {
    return;
  }

  const menu = document.querySelector<HTMLMenuElement>('.popup > menu');
  if (!menu) {
    return;
  }

  const {ariaHidden} = menu;
  document
    .querySelectorAll('.popup menu[aria-hidden]')
    .forEach((menu) => {
      menu.ariaHidden = 'true';
    });
  if (ariaHidden === 'false') {
    return;
  }

  menu.ariaHidden = 'false';
  const targetRect = target.getBoundingClientRect();
  const menuRect = menu.getBoundingClientRect();
  menu.style.top = targetRect.top + targetRect.height + menuRect.height + 1 < window.innerHeight
    ? `${targetRect.top + targetRect.height + 1}px`
    : `${targetRect.top - menuRect.height - 1}px`;
  menu.style.left = `${targetRect.left}px`;
  menu.style.width = `${targetRect.width}px`;
});

/**
 * Handle containment button
 */
document.addEventListener('click', (event) => {
  const {target} = event;
  if (!(target instanceof HTMLElement) || !target.matches('.popup > menu > li > button')) {
    return;
  }

  const menu = target.parentElement?.querySelector<HTMLMenuElement>(':scope > menu');
  if (!menu) {
    return;
  }

  const {ariaHidden} = menu;
  document
    .querySelectorAll('.popup > menu > li > menu')
    .forEach((menu) => {
      menu.ariaHidden = 'true';
    });
  if (ariaHidden === 'false') {
    return;
  }

  menu.ariaHidden = 'false';
});

/**
 * Handle amount buttons
 */
document.addEventListener('click', (event) => {
  const {target} = event;
  if (!(target instanceof HTMLElement) || !target.matches('.popup > menu > li > menu > li > button')) {
    return;
  }

  alert('Added to basket!');

  document
    .querySelectorAll<HTMLMenuElement>('.popup menu[aria-hidden="false"]')
    .forEach((menu) => {
      menu.ariaHidden = 'true';
    });
});
