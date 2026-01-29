
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "redirectTo": "/home",
    "route": "/"
  },
  {
    "renderMode": 2,
    "route": "/login"
  },
  {
    "renderMode": 2,
    "route": "/home"
  },
  {
    "renderMode": 2,
    "route": "/questionnaire"
  },
  {
    "renderMode": 2,
    "redirectTo": "/login",
    "route": "/**"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 5028, hash: '8395af84db71e9f2fcb5ae875b57e72c38378ec11e17f9c91bc71a9e66c8324c', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1001, hash: 'c85808f5dd266b9e6b3930db3806e38b9a126217306f09e283c8d3c806247d7a', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'login/index.html': {size: 9835, hash: 'eb1932002ad3f791fdf796286b35f6a971ad4bc60e95ff40ea9b8efae2ff31bb', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'questionnaire/index.html': {size: 12319, hash: '2dfe7d176f3159fb91bf0261f3bd161d747f957cae03026694fbee2bc503c8e3', text: () => import('./assets-chunks/questionnaire_index_html.mjs').then(m => m.default)},
    'home/index.html': {size: 23835, hash: 'cd2cc83457bfb8647494a53621ea98b17ffe399bf6172bf41fbcabcbeb7bd3e1', text: () => import('./assets-chunks/home_index_html.mjs').then(m => m.default)},
    'styles-JG7EAGFK.css': {size: 230853, hash: 'YlmivfEfBiI', text: () => import('./assets-chunks/styles-JG7EAGFK_css.mjs').then(m => m.default)}
  },
};
