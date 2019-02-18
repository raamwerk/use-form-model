# useFormModel()

### What is this?
This is a hook for React that provides 2-way data binding in forms. It's really easy to use.

### How to use this?

First, call the hook with your model definition and initial values. This will construct and return your model object:

```javascript
const album = useFormModel({
  artist: 'Pink Floyd',
  title: 'The Dark Side of the Moon',
  year: 1973
})
```


Then build your form with the components also provided in this package. Set the model prop on your form to the model returned by the hook, and set the name props on your controls to the field names in your model:

```javascript
<Form model={album}>
  <Input type="text" name="artist" />
  <Input type="text" name="title" />
  <Input type="number" name="year" />
</Form>
```

You can read from your model by referring to its properties:

```javascript
<p>{album.artist} - {album.title} ({album.year})</p>
```

Under the hood, the form controls will update the model when the user input changes, and any changes to the model's properties will update the UI.

### Examples

```javascript
import React from 'react'
import useFormModel, {Form, Input} from 'use-form-model'

export default function App () {

  const album = useFormModel({
    artist: 'Pink Floyd',
    title: 'The Dark Side of the Moon',
    year: 1973
  })

  return <>
    <Form model={album}>
      <Input type="text" name="artist" />
      <Input type="text" name="title" />
      <Input type="number" name="year" />
    </Form>
    <p>{album.artist} - {album.title} ({album.year})</p>
    <button onClick={handleClear}>Clear</button>
  </>

  function handleClear () {
    album.artist = ''
    album.title = ''
    album.year = ''
  }

}
```
There is no need to set 'value' (on text inputs) or 'onChange'. If you do set a 'value' prop on a text input, it'll be overwritten. You are free to add an 'onChange' prop if you want; it will not be overwritten.

```javascript
import React from 'react'
import {useFormModel, Form, Input, Select} from 'use-form-model'

export default function App () {

  const album = useFormModel({
    want: true,
    color: 'Red'
  })

  const [want, setWant] = useModel(true)
  const [color, setColor] = useModel('Red')

  return (
    <Form model={album}>
      <Input type="checkbox" name="want" value="Want" />Want
      <Input type="radio" name="color" value="Red" />Red
      <Input type="radio" name="color" value="Blue" />Blue
    </Form>
  )

}
```

The value prop on a checkbox input is optional and won't be used by the model. The corresponding property on the model will be set to `true` if checked and `false` if unchecked. With radio buttons (and selects as well) the value of the property will be set to the value of the selected option.

### Exports

The default export of this package is the __useFormModel__ hook. It is also available as a named export.

Other exports are the components __Form__, __Input__, __TextArea__, __Select__ and __Control__. The latter four are also members of __Form__ (e.g. `<Form.Control />`).

### Custom controls

If you are using other controls than the native HTML ones, you can use the __Control__ component and provide a reference to the control component in the 'as' prop:

```javascript
<Control as={MyControl} name="album" />
```

The 'as' prop can take a class (function) or a string. In fact, the provided form controls are only simple wrappers around the __Control__ component:

```javascript
const Input = props => <Control as="input" {...props} />
```

### Props

The __Form__ component passes all props other than 'model' on to the wrapped HTML form element. The control components pass their props on to the rendered controls, be it HTML elements or custom components.
