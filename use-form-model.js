import React, {createContext, useContext, useState} from 'react'
import setPropTypes from 'set-prop-types'

const ModelContext = createContext()
class FormModel { }

function Form ({model, ...props}) {
  return React.createElement(ModelContext.Provider, {
    value: model
  }, React.createElement("form", props));
}
setPropTypes(Form, T => ({
  model: T.instanceOf(FormModel).isRequired
}))

function Control ({as, name, onChange, value, checked, type, ...props}) {
  const model = useContext(ModelContext)
  if (!(name in model)) {
    console.warn(`Provided name "${name}" does not exist in the provided FormModel.`)
  }
  if (type === 'checkbox') {
    checked = model[name]
  } else if (type === 'radio') {
    checked = (model[name] === value)
  } else {
    value = model[name]
  }
  const newProps = {
    onChange: function onChangeCaller (event) {
      if (type === 'checkbox') {
        model[name] = event.target.checked
      } else if (type === 'radio') {
        if (event.target.checked) model[name] = event.target.value
      } else {
        model[name] = event.target.value
      }
      if (typeof onChange === 'function') {
        onChange.call(this, event)
      }
    },
    value, checked, type, name, ...props
  }
  return React.createElement(as, newProps);
}
setPropTypes(Control, T => ({
  as: [T.oneOfType([T.string, T.func]), 'input'],
  name: T.string.isRequired
}))

const Input = props => React.createElement(Control, _extends({as: "input"}, props))
const TextArea = props => React.createElement(Control, _extends({as: "textarea"}, props))
const Select = props => React.createElement(Control, _extends({as: "select"}, props))

function useFormModel (obj) {
  const model = new FormModel()
  for (const key in obj) {
    const [value, setValue] = useState(obj[key])
    Object.defineProperty(model, key, {
      enumerable: true,
      get: () => value,
      set: value => setValue(value)
    })
  }
  return Object.freeze(model)
}

Form.Control = Control
Form.Input = Input
Form.TextArea = TextArea
Form.Select = Select

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

export default useFormModel
export {Form, Control, Input, TextArea, Select, useFormModel}
