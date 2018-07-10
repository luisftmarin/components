define(['exports', 'date-and-time', './abstract-type-strategy'], function (exports, _dateAndTime, _abstractTypeStrategy) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.DateStrategy = undefined;

  var _dateAndTime2 = _interopRequireDefault(_dateAndTime);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  var DEFAULT_FORMAT = 'YYYY-MM-DD';

  var DateStrategy = exports.DateStrategy = function (_AbstractTypeStrategy) {
    _inherits(DateStrategy, _AbstractTypeStrategy);

    function DateStrategy(options) {
      _classCallCheck(this, DateStrategy);

      var _this = _possibleConstructorReturn(this, (DateStrategy.__proto__ || Object.getPrototypeOf(DateStrategy)).call(this, options));

      _this.locale = options.format;
      return _this;
    }

    _createClass(DateStrategy, [{
      key: 'validate',
      value: function validate(value) {
        return _dateAndTime2.default.isValid(value, this.options.format || DEFAULT_FORMAT);
      }
    }, {
      key: 'convert',
      value: function convert(value) {
        return _dateAndTime2.default.format(value, this.options.format || DEFAULT_FORMAT);
      }
    }]);

    return DateStrategy;
  }(_abstractTypeStrategy.AbstractTypeStrategy);
});