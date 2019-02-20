"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Form = Form;
exports.Control = Control;
exports.useFormModel = useFormModel;
exports.Select = exports.TextArea = exports.Input = exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _setPropTypes = _interopRequireDefault(require("set-prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ModelContext = (0, _react.createContext)();

var FormModel = function FormModel() {
  _classCallCheck(this, FormModel);
};

function Form(_ref) {
  var model = _ref.model,
      props = _objectWithoutProperties(_ref, ["model"]);

  return _react.default.createElement(ModelContext.Provider, {
    value: model
  }, _react.default.createElement("form", props));
}

(0, _setPropTypes.default)(Form, function (T) {
  return {
    model: T.instanceOf(FormModel).isRequired
  };
});

function Control(_ref2) {
  var as = _ref2.as,
      name = _ref2.name,
      onChange = _ref2.onChange,
      value = _ref2.value,
      checked = _ref2.checked,
      type = _ref2.type,
      props = _objectWithoutProperties(_ref2, ["as", "name", "onChange", "value", "checked", "type"]);

  var model = (0, _react.useContext)(ModelContext);

  if (!(name in model)) {
    console.warn("Provided name \"".concat(name, "\" does not exist in the provided FormModel."));
  }

  if (type === 'checkbox') {
    checked = model[name];
  } else if (type === 'radio') {
    checked = model[name] === value;
  } else {
    value = model[name];
  }

  var newProps = _objectSpread({
    onChange: function onChangeCaller(event) {
      if (type === 'checkbox') {
        model[name] = event.target.checked;
      } else if (type === 'radio') {
        if (event.target.checked) model[name] = event.target.value;
      } else {
        model[name] = event.target.value;
      }

      if (typeof onChange === 'function') {
        onChange.call(this, event);
      }
    },
    value: value,
    checked: checked,
    type: type,
    name: name
  }, props);

  return _react.default.createElement(as, newProps);
}

(0, _setPropTypes.default)(Control, function (T) {
  return {
    as: [T.oneOfType([T.string, T.func]), 'input'],
    name: T.string.isRequired
  };
});

var Input = function Input(props) {
  return _react.default.createElement(Control, _extends({
    as: "input"
  }, props));
};

exports.Input = Input;

var TextArea = function TextArea(props) {
  return _react.default.createElement(Control, _extends({
    as: "textarea"
  }, props));
};

exports.TextArea = TextArea;

var Select = function Select(props) {
  return _react.default.createElement(Control, _extends({
    as: "select"
  }, props));
};

exports.Select = Select;

function useFormModel(obj) {
  var model = new FormModel();

  var _loop = function _loop(key) {
    var _useState = (0, _react.useState)(obj[key]),
        _useState2 = _slicedToArray(_useState, 2),
        value = _useState2[0],
        setValue = _useState2[1];

    Object.defineProperty(model, key, {
      enumerable: true,
      get: function get() {
        return value;
      },
      set: function set(value) {
        return setValue(value);
      }
    });
  };

  for (var key in obj) {
    _loop(key);
  }

  return Object.freeze(model);
}

Form.Control = Control;
Form.Input = Input;
Form.TextArea = TextArea;
Form.Select = Select;
var _default = useFormModel;
exports.default = _default;
//# sourceMappingURL=use-form-model.js.map