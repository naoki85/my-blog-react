import marked from 'marked';
import * as hljs from 'highlight.js'

export const convertToHtml = (content: string = ''): string => {
  if (!content) return '';

  const renderer = new marked.Renderer();
  renderer.code = function(code: string, lang: string) {
    return (
      '<pre><code class="' +
      lang +
      '">' +
      hljs.highlightAuto(code).value +
      '</code></pre>'
    )
  };

  return marked(content, { renderer })
};
