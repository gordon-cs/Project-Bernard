import Ember from 'ember';

/* Helper function to truncate some text.
  arg1: original text
  arg2: starting index
  arg3: ending index
  return: truncated string*/
export function truncateText([text, start, end]) {
  return text.slice(start, end);
}

export default Ember.Helper.helper(truncateText);
