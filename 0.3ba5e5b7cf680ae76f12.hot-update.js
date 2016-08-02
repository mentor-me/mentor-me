webpackHotUpdate(0,{

/***/ 413:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(77);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactBigCalendar = __webpack_require__(414);
	
	var _reactBigCalendar2 = _interopRequireDefault(_reactBigCalendar);
	
	var _events = __webpack_require__(574);
	
	var _events2 = _interopRequireDefault(_events);
	
	var _Popup = __webpack_require__(575);
	
	var _Popup2 = _interopRequireDefault(_Popup);
	
	var _moment = __webpack_require__(576);
	
	var _moment2 = _interopRequireDefault(_moment);
	
	var _reactBootstrapDatetimepicker = __webpack_require__(679);
	
	var _reactBootstrapDatetimepicker2 = _interopRequireDefault(_reactBootstrapDatetimepicker);
	
	var _reactRedux = __webpack_require__(250);
	
	var _reactModal = __webpack_require__(728);
	
	var _reactModal2 = _interopRequireDefault(_reactModal);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	_reactBigCalendar2.default.setLocalizer(_reactBigCalendar2.default.momentLocalizer(_moment2.default));
	
	var customStyles = {
	  overlay: {
	    backgroundColor: 'rgba(255,255,255, .1)',
	    zIndex: 900
	  },
	
	  content: {
	    top: '50%',
	    left: '50%',
	    right: 'auto',
	    bottom: 'auto',
	    marginRight: '-50%',
	    transform: 'translate(-50%, -50%)'
	  }
	};
	
	var Calendar = function (_Component) {
	  _inherits(Calendar, _Component);
	
	  _createClass(Calendar, [{
	    key: 'componentWillMount',
	    value: function componentWillMount() {
	      //this.props.fetchEvents();
	    }
	  }]);
	
	  function Calendar(props) {
	    _classCallCheck(this, Calendar);
	
	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Calendar).call(this, props));
	
	    _this.handleChange = function (newDate) {
	      console.log("newDate", newDate);
	      return _this.setState({ date: newDate });
	    };
	
	    _this.state = {
	      events: [],
	      current: "",
	      modalIsOpen: false,
	      date: "2016-08-01",
	      format: "YYYY-MM-DD",
	      inputFormat: "DD/MM/YYYY",
	      mode: "date"
	    };
	
	    _this.open = _this.open.bind(_this);
	    return _this;
	  }
	
	  _createClass(Calendar, [{
	    key: 'open',
	    value: function open() {
	      console.log("inside open");
	      this.setState({
	        modalIsOpen: true
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this2 = this;
	
	      return _react2.default.createElement(
	        'div',
	        { style: { height: 640 } },
	        _react2.default.createElement(
	          'button',
	          { onClick: this.open.bind(this) },
	          'Open Modal'
	        ),
	        _react2.default.createElement(_reactBigCalendar2.default, {
	          selectable: true,
	          events: _events2.default,
	          onSelectEvent: function onSelectEvent(event) {
	            return _this2.open(event);
	          },
	          defaultView: 'month',
	          scrollToTime: new Date(1970, 1, 1, 6),
	          defaultDate: new Date(2015, 3, 12),
	          onSelectSlot: function onSelectSlot(slotInfo) {
	            return alert('selected slot: \n\nstart ' + slotInfo.start.toLocaleString() + ' ' + ('\nend: ' + slotInfo.end.toLocaleString()));
	          }
	        }),
	        _react2.default.createElement(
	          _reactModal2.default,
	          {
	            isOpen: this.state.modalIsOpen,
	            style: customStyles
	          },
	          _react2.default.createElement(_reactBootstrapDatetimepicker2.default, {
	            dateTime: this.state.date,
	            format: this.state.format,
	            inputFormat: this.state.inputFormat,
	            onChange: this.handleChange.bind(this),
	            viewMode: this.state.mode
	          }),
	          _react2.default.createElement(
	            'h2',
	            null,
	            'Hello'
	          )
	        )
	      );
	    }
	  }]);
	
	  return Calendar;
	}(_react.Component);
	
	exports.default = Calendar;

/***/ }

})
//# sourceMappingURL=0.3ba5e5b7cf680ae76f12.hot-update.js.map