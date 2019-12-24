function importAll(resolve) {
  resolve.keys().forEach(resolve);
}
importAll(require.context('../img', true, /\.(jpg|png|svg|png)$/));
importAll(require.context('../favicons/', true, /\.(svg|png|ico|xml|json)$/));
importAll(require.context('../styles', true, /\.(css|scss)$/));
importAll(require.context('../blocks', true, /\.(css|scss|jpg|png|svg|png|ico|xml|mp4|)$/));
importAll(require.context('../pages', true, /\.(css|scss)$/));
importAll(require.context('./', true, /\.(js)$/));
importAll(require.context('../blocks', true, /\.(js)$/));
