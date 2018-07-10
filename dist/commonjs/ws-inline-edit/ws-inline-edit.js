'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WSInlineEdit = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _imports = require('../imports');

var _typeHandler = require('./types/type-handler');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WSInlineEdit = exports.WSInlineEdit = function (_Component) {
  _inherits(WSInlineEdit, _Component);

  function WSInlineEdit(props) {
    _classCallCheck(this, WSInlineEdit);

    var _this = _possibleConstructorReturn(this, (WSInlineEdit.__proto__ || Object.getPrototypeOf(WSInlineEdit)).call(this, props));

    Object.defineProperty(_this, 'onFocus', {
      enumerable: true,
      writable: true,
      value: function value(event) {
        event.stopPropagation();

        if (!_this.state.isEditing) {
          _this.setState({ isEditing: true }, function () {
            _this.input.select();
            _this.input.focus();
          });
        }
      }
    });
    Object.defineProperty(_this, 'onKeyUp', {
      enumerable: true,
      writable: true,
      value: function value(event) {
        event.stopPropagation();
        var inputValue = event.target.value;

        switch (event.key) {
          case 'Enter':
            _this.submit(inputValue);
            break;
          case 'Escape':
            _this.abort();
            break;
          default:
            _this.setState({
              isValid: _this.type.validate(inputValue),
              value: inputValue
            });
        }
      }
    });
    Object.defineProperty(_this, 'onBlur', {
      enumerable: true,
      writable: true,
      value: function value(event) {
        event.stopPropagation();
        _this.submit(event.target.value);
      }
    });

    _this.state = _this.createState(props);
    return _this;
  }

  _createClass(WSInlineEdit, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.input.addEventListener('focus', this.onFocus);
      this.input.addEventListener('keyup', this.onKeyUp);
      this.input.addEventListener('blur', this.onBlur);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      this.setState(this.createState(props));
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.input.removeEventListener('focus', this.onFocus);
      this.input.removeEventListener('keyup', this.onKeyUp);
      this.input.removeEventListener('blur', this.onBlur);
    }
  }, {
    key: 'createState',
    value: function createState(props) {
      this.type = _typeHandler.TypeHandler.getStrategy(props.type, props.options);
      return {
        isEditing: false,
        isValid: true,
        value: props.value,
        initialValue: props.value
      };
    }
  }, {
    key: 'submit',
    value: function submit(inputValue) {
      var state = { isEditing: false, value: inputValue };

      if (inputValue !== this.state.initialValue && this.type.validate(inputValue)) {
        state.initialValue = inputValue;

        var eventData = {
          plain: inputValue,
          value: this.type.convert(inputValue)
        };
        this.dispatchEvent('change', eventData);

        if (typeof this.props.onChange === 'function') {
          this.props.onChange(eventData);
        }
      }
      this.setState(state);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _state = this.state,
          isEditing = _state.isEditing,
          isValid = _state.isValid,
          value = _state.value;


      var classes = 'ws-inline-edit';
      classes += isEditing ? ' is-editing' : '';
      classes += ' ' + this.props.type;

      return _imports.React.createElement(
        'div',
        { className: classes, ref: function ref(element) {
            _this2.element = element;
          } },
        _imports.React.createElement(
          'div',
          { className: 'input-wrapper' },
          _imports.React.createElement('input', {
            type: 'text',
            className: !isValid ? 'is-invalid' : '',
            ref: function ref(element) {
              _this2.input = element;
            },
            value: value
          }),
          !isValid && _imports.React.createElement('span', { className: 'icon icon16 icon-cross' })
        )
      );
    }
  }]);

  return WSInlineEdit;
}(_imports.Component);

Object.defineProperty(WSInlineEdit, 'defaultProps', {
  enumerable: true,
  writable: true,
  value: {
    value: '',
    options: {},
    type: 'text',
    onChange: function onChange() {}
  }
});
Object.defineProperty(WSInlineEdit, 'propTypes', {
  enumerable: true,
  writable: true,
  value: {
    value: _imports.PropTypes.string,
    options: _imports.PropTypes.object,
    type: _imports.PropTypes.oneOf(['text', 'number', 'price']),
    onChange: _imports.PropTypes.func
  }
});