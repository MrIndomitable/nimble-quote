import {reduxForm} from 'redux-form';

const NewQuoteFormConfig = {
  form: 'NewQuoteForm',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true
};

export const NewQuoteHOC = reduxForm(NewQuoteFormConfig);
