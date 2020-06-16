import parse from 'html-react-parser';
import DOMPurify from 'dompurify';

export default function html(input, opts = {}) {
  return parse(DOMPurify.sanitize(input), {
    ...{
      replace: replaceNode,
    },
    ...opts,
  });
}
