const { withMainApplication } = require('@expo/config-plugins');

const plugin = (expoConfig) => {
  return withMainApplication(expoConfig, (modConfig) => {
    let contents = modConfig.modResults.contents.replace(
      /public void onCreate\(\) \{\n((.|\n)*?)\}\n\n/,
      'public void onCreate() {\n$1\n    WebView.setWebContentsDebuggingEnabled(true);\n  }\n\n'
    );

    const index = contents.indexOf('public class MainApplication');

    contents = contents.slice(0, index) + 'import android.webkit.WebView;\n\n' + contents.slice(index);
    modConfig.modResults.contents = contents;

    // console.log(contents);
    return modConfig;
  });
};

module.exports = plugin;
