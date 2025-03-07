import './index.less';
import {documentReady} from './documentReady.ts';
import {ErrorComponent} from './ErrorComponent.ts';
import {LoaderComponent} from './LoaderComponent.ts';
import {PopupComponent, verifyPopup} from './PopupComponent.ts';
import {ProductsComponent} from './ProductsComponent.ts';
import './routing.ts';
import {getProducts} from './productService.ts';
import {onRouting} from './routing.ts';

documentReady()
  .then(()=> {
    const root = document.getElementById('app');
    if (!root) {
      throw new Error('Root element not found!');
    }

    root.innerHTML = LoaderComponent();

    return getProducts()
      .then((products) => {
        root.innerHTML = `${ProductsComponent(products)}${PopupComponent()}`;
        onRouting(verifyPopup);
        verifyPopup();
      })
      .catch((error) => {
        root.innerHTML = ErrorComponent();
        throw error;
      })
  })
  .catch(console.error);
