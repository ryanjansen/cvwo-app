import { G as Global, k as keyframes$2 } from '../common/emotion-react.browser.esm-7ec52134.js';
import { r as react } from '../common/index-c277be94.js';
import { b as callAllHandlers, i as isBrowser$1, d as detectBrowser, r as runIfFn, e as isRefObject$1, g as contains, h as focus, j as getAllFocusable, w as wrapPointerEventHandler, k as getPointerEventName$1, l as getActiveElement, m as isTabbable, n as getOwnerDocument, o as isActiveElement, p as createContext, T as ThemeProvider, C as ColorModeProvider, G as GlobalStyle, E as EnvironmentProvider, q as warn, s as memoizedGet, t as isEmptyObject, u as fromEntries, v as isObject, x as lodash_mergewith, a as chakra, f as forwardRef, y as useStyleConfig, z as omitThemingProps, c as cx, A as dataAttr, B as useMultiStyleConfig, D as callAll, F as mergeRefs, S as StylesProvider, H as ariaAttr, I as useStyles, J as filterUndefined, K as mapResponsive, L as getValidChildren, M as useTheme, N as determineLazyBehavior, O as px$1, P as getRelatedTarget, Q as pipe$1, R as isFunction } from '../common/chakra-ui-system.esm-6a57124c.js';
import '../common/index-61588a8d.js';
import { c as createPopper } from '../common/popper-4868b91d.js';
import '../common/extends-7477639a.js';
import '../common/_commonjsHelpers-eb5a497e.js';
import '../common/hoist-non-react-statics.cjs-0f28cd76.js';
import '../common/index-f500590d.js';

var defaultTimestep = (1 / 60) * 1000;
var getCurrentTime = typeof performance !== "undefined"
    ? function () { return performance.now(); }
    : function () { return Date.now(); };
var onNextFrame = typeof window !== "undefined"
    ? function (callback) {
        return window.requestAnimationFrame(callback);
    }
    : function (callback) {
        return setTimeout(function () { return callback(getCurrentTime()); }, defaultTimestep);
    };

function createRenderStep(runNextFrame) {
    var toRun = [];
    var toRunNextFrame = [];
    var numToRun = 0;
    var isProcessing = false;
    var toKeepAlive = new WeakSet();
    var step = {
        schedule: function (callback, keepAlive, immediate) {
            if (keepAlive === void 0) { keepAlive = false; }
            if (immediate === void 0) { immediate = false; }
            var addToCurrentFrame = immediate && isProcessing;
            var buffer = addToCurrentFrame ? toRun : toRunNextFrame;
            if (keepAlive)
                toKeepAlive.add(callback);
            if (buffer.indexOf(callback) === -1) {
                buffer.push(callback);
                if (addToCurrentFrame && isProcessing)
                    numToRun = toRun.length;
            }
            return callback;
        },
        cancel: function (callback) {
            var index = toRunNextFrame.indexOf(callback);
            if (index !== -1)
                toRunNextFrame.splice(index, 1);
            toKeepAlive.delete(callback);
        },
        process: function (frameData) {
            var _a;
            isProcessing = true;
            _a = [toRunNextFrame, toRun], toRun = _a[0], toRunNextFrame = _a[1];
            toRunNextFrame.length = 0;
            numToRun = toRun.length;
            if (numToRun) {
                for (var i = 0; i < numToRun; i++) {
                    var callback = toRun[i];
                    callback(frameData);
                    if (toKeepAlive.has(callback)) {
                        step.schedule(callback);
                        runNextFrame();
                    }
                }
            }
            isProcessing = false;
        },
    };
    return step;
}

var maxElapsed = 40;
var useDefaultElapsed = true;
var runNextFrame = false;
var isProcessing = false;
var frame = {
    delta: 0,
    timestamp: 0
};
var stepsOrder = ["read", "update", "preRender", "render", "postRender"];
var steps = /*#__PURE__*/stepsOrder.reduce(function (acc, key) {
    acc[key] = createRenderStep(function () {
        return runNextFrame = true;
    });
    return acc;
}, {});
var sync = /*#__PURE__*/stepsOrder.reduce(function (acc, key) {
    var step = steps[key];
    acc[key] = function (process, keepAlive, immediate) {
        if (keepAlive === void 0) {
            keepAlive = false;
        }
        if (immediate === void 0) {
            immediate = false;
        }
        if (!runNextFrame) startLoop();
        return step.schedule(process, keepAlive, immediate);
    };
    return acc;
}, {});
var cancelSync = /*#__PURE__*/stepsOrder.reduce(function (acc, key) {
    acc[key] = steps[key].cancel;
    return acc;
}, {});
var flushSync = /*#__PURE__*/stepsOrder.reduce(function (acc, key) {
    acc[key] = function () {
        return steps[key].process(frame);
    };
    return acc;
}, {});
var processStep = function (stepId) {
    return steps[stepId].process(frame);
};
var processFrame = function (timestamp) {
    runNextFrame = false;
    frame.delta = useDefaultElapsed ? defaultTimestep : Math.max(Math.min(timestamp - frame.timestamp, maxElapsed), 1);
    frame.timestamp = timestamp;
    isProcessing = true;
    stepsOrder.forEach(processStep);
    isProcessing = false;
    if (runNextFrame) {
        useDefaultElapsed = false;
        onNextFrame(processFrame);
    }
};
var startLoop = function () {
    runNextFrame = true;
    useDefaultElapsed = true;
    if (!isProcessing) onNextFrame(processFrame);
};
var getFrameData = function () {
    return frame;
};

var CSSReset = function CSSReset() {
  return /*#__PURE__*/react.createElement(Global, {
    styles: "\n      html {\n        line-height: 1.5;\n        -webkit-text-size-adjust: 100%;\n        font-family: system-ui, sans-serif;\n        -webkit-font-smoothing: antialiased;\n        text-rendering: optimizeLegibility;\n        -moz-osx-font-smoothing: grayscale;\n        touch-action: manipulation;\n      }\n\n      body {\n        position: relative;\n        min-height: 100%;\n        font-feature-settings: 'kern';\n      }\n\n      *,\n      *::before,\n      *::after {\n        border-width: 0;\n        border-style: solid;\n        box-sizing: border-box;\n      }\n\n      main {\n        display: block;\n      }\n\n      hr {\n        border-top-width: 1px;\n        box-sizing: content-box;\n        height: 0;\n        overflow: visible;\n      }\n\n      pre,\n      code,\n      kbd,\n      samp {\n        font-family: SFMono-Regular,  Menlo, Monaco, Consolas, monospace;\n        font-size: 1em;\n      }\n\n      a {\n        background-color: transparent;\n        color: inherit;\n        text-decoration: inherit;\n      }\n\n      abbr[title] {\n        border-bottom: none;\n        text-decoration: underline;\n        -webkit-text-decoration: underline dotted;\n        text-decoration: underline dotted;\n      }\n\n      b,\n      strong {\n        font-weight: bold;\n      }\n\n      small {\n        font-size: 80%;\n      }\n\n      sub,\n      sup {\n        font-size: 75%;\n        line-height: 0;\n        position: relative;\n        vertical-align: baseline;\n      }\n\n      sub {\n        bottom: -0.25em;\n      }\n\n      sup {\n        top: -0.5em;\n      }\n\n      img {\n        border-style: none;\n      }\n\n      button,\n      input,\n      optgroup,\n      select,\n      textarea {\n        font-family: inherit;\n        font-size: 100%;\n        line-height: 1.15;\n        margin: 0;\n      }\n\n      button,\n      input {\n        overflow: visible;\n      }\n\n      button,\n      select {\n        text-transform: none;\n      }\n\n      button::-moz-focus-inner,\n      [type=\"button\"]::-moz-focus-inner,\n      [type=\"reset\"]::-moz-focus-inner,\n      [type=\"submit\"]::-moz-focus-inner {\n        border-style: none;\n        padding: 0;\n      }\n\n      fieldset {\n        padding: 0.35em 0.75em 0.625em;\n      }\n\n      legend {\n        box-sizing: border-box;\n        color: inherit;\n        display: table;\n        max-width: 100%;\n        padding: 0;\n        white-space: normal;\n      }\n\n      progress {\n        vertical-align: baseline;\n      }\n\n      textarea {\n        overflow: auto;\n      }\n\n      [type=\"checkbox\"],\n      [type=\"radio\"] {\n        box-sizing: border-box;\n        padding: 0;\n      }\n\n      [type=\"number\"]::-webkit-inner-spin-button,\n      [type=\"number\"]::-webkit-outer-spin-button {\n        -webkit-appearance: none !important;\n      }\n\n      input[type=\"number\"] {\n        -moz-appearance: textfield;\n      }\n\n      [type=\"search\"] {\n        -webkit-appearance: textfield;\n        outline-offset: -2px;\n      }\n\n      [type=\"search\"]::-webkit-search-decoration {\n        -webkit-appearance: none !important;\n      }\n\n      ::-webkit-file-upload-button {\n        -webkit-appearance: button;\n        font: inherit;\n      }\n\n      details {\n        display: block;\n      }\n\n      summary {\n        display: list-item;\n      }\n\n      template {\n        display: none;\n      }\n\n      [hidden] {\n        display: none !important;\n      }\n\n      body,\n      blockquote,\n      dl,\n      dd,\n      h1,\n      h2,\n      h3,\n      h4,\n      h5,\n      h6,\n      hr,\n      figure,\n      p,\n      pre {\n        margin: 0;\n      }\n\n      button {\n        background: transparent;\n        padding: 0;\n      }\n\n      fieldset {\n        margin: 0;\n        padding: 0;\n      }\n\n      ol,\n      ul {\n        margin: 0;\n        padding: 0;\n      }\n\n      textarea {\n        resize: vertical;\n      }\n\n      button,\n      [role=\"button\"] {\n        cursor: pointer;\n      }\n\n      button::-moz-focus-inner {\n        border: 0 !important;\n      }\n\n      table {\n        border-collapse: collapse;\n      }\n\n      h1,\n      h2,\n      h3,\n      h4,\n      h5,\n      h6 {\n        font-size: inherit;\n        font-weight: inherit;\n      }\n\n      button,\n      input,\n      optgroup,\n      select,\n      textarea {\n        padding: 0;\n        line-height: inherit;\n        color: inherit;\n      }\n\n      img,\n      svg,\n      video,\n      canvas,\n      audio,\n      iframe,\n      embed,\n      object {\n        display: block;\n      }\n\n      img,\n      video {\n        max-width: 100%;\n        height: auto;\n      }\n\n      [data-js-focus-visible] :focus:not([data-focus-visible-added]) {\n        outline: none;\n        box-shadow: none;\n      }\n\n      select::-ms-expand {\n        display: none;\n      }\n    "
  });
};
var CSSReset$1 = CSSReset;

/**
 * React hook to manage boolean (on - off) states
 *
 * @param initialState the initial boolean state value
 */
function useBoolean(initialState) {
  if (initialState === void 0) {
    initialState = false;
  }

  var _useState = react.useState(initialState),
      value = _useState[0],
      setValue = _useState[1];

  var on = react.useCallback(function () {
    setValue(true);
  }, []);
  var off = react.useCallback(function () {
    setValue(false);
  }, []);
  var toggle = react.useCallback(function () {
    setValue(function (prev) {
      return !prev;
    });
  }, []);
  return [value, {
    on: on,
    off: off,
    toggle: toggle
  }];
}

/**
 * useSafeLayoutEffect enables us to safely call `useLayoutEffect` on the browser
 * (for SSR reasons)
 *
 * React currently throws a warning when using useLayoutEffect on the server.
 * To get around it, we can conditionally useEffect on the server (no-op) and
 * useLayoutEffect in the browser.
 *
 * @see https://gist.github.com/gaearon/e7d97cdf38a2907924ea12e4ebdf3c85
 */

var useSafeLayoutEffect = isBrowser$1 ? react.useLayoutEffect : react.useEffect;

/**
 * React hook to persist any value between renders,
 * but keeps it up-to-date if it changes.
 *
 * @param value the value or function to persist
 */

function useCallbackRef(fn, deps) {
  if (deps === void 0) {
    deps = [];
  }

  var ref = react.useRef(fn);
  useSafeLayoutEffect(function () {
    ref.current = fn;
  }); // eslint-disable-next-line react-hooks/exhaustive-deps

  return react.useCallback(function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return ref.current == null ? void 0 : ref.current.apply(ref, args);
  }, deps);
}

function useControllableProp(prop, state) {
  var isControlled = prop !== undefined;
  var value = isControlled && typeof prop !== "undefined" ? prop : state;
  return [isControlled, value];
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

// This implementation is heavily inspired by react-aria's implementation
var defaultIdContext = {
  prefix: Math.round(Math.random() * 10000000000),
  current: 0
};
var IdContext = /*#__PURE__*/react.createContext(defaultIdContext);
var IdProvider = /*#__PURE__*/react.memo(function (_ref) {
  var children = _ref.children;
  var currentContext = react.useContext(IdContext);
  var isRoot = currentContext === defaultIdContext;
  var context = react.useMemo(function () {
    return {
      prefix: isRoot ? 0 : ++currentContext.prefix,
      current: 0
    };
  }, [isRoot, currentContext]);
  return /*#__PURE__*/react.createElement(IdContext.Provider, {
    value: context
  }, children);
});
function useId(idProp, prefix) {
  var context = react.useContext(IdContext);
  return react.useMemo(function () {
    return idProp || [prefix, context.prefix, ++context.current].filter(Boolean).join("-");
  }, // eslint-disable-next-line react-hooks/exhaustive-deps
  [idProp, prefix]);
}
/**
 * Reack hook to generate ids for use in compound components
 *
 * @param idProp the external id passed from the user
 * @param prefixes array of prefixes to use
 *
 * @example
 *
 * ```js
 * const [buttonId, menuId] = useIds("52", "button", "menu")
 *
 * // buttonId will be `button-52`
 * // menuId will be `menu-52`
 * ```
 */

function useIds(idProp) {
  for (var _len = arguments.length, prefixes = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    prefixes[_key - 1] = arguments[_key];
  }

  var id = useId(idProp);
  return react.useMemo(function () {
    return prefixes.map(function (prefix) {
      return prefix + "-" + id;
    });
  }, [id, prefixes]);
}

function useDisclosure(props) {
  if (props === void 0) {
    props = {};
  }

  var _props = props,
      onCloseProp = _props.onClose,
      onOpenProp = _props.onOpen,
      isOpenProp = _props.isOpen,
      idProp = _props.id;
  var onOpenPropCallbackRef = useCallbackRef(onOpenProp);
  var onClosePropCallbackRef = useCallbackRef(onCloseProp);

  var _React$useState = react.useState(props.defaultIsOpen || false),
      isOpenState = _React$useState[0],
      setIsOpen = _React$useState[1];

  var _useControllableProp = useControllableProp(isOpenProp, isOpenState),
      isControlled = _useControllableProp[0],
      isOpen = _useControllableProp[1];

  var id = useId(idProp, "disclosure");
  var onClose = react.useCallback(function () {
    if (!isControlled) {
      setIsOpen(false);
    }

    onClosePropCallbackRef == null ? void 0 : onClosePropCallbackRef();
  }, [isControlled, onClosePropCallbackRef]);
  var onOpen = react.useCallback(function () {
    if (!isControlled) {
      setIsOpen(true);
    }

    onOpenPropCallbackRef == null ? void 0 : onOpenPropCallbackRef();
  }, [isControlled, onOpenPropCallbackRef]);
  var onToggle = react.useCallback(function () {
    var action = isOpen ? onClose : onOpen;
    action();
  }, [isOpen, onOpen, onClose]);
  return {
    isOpen: !!isOpen,
    onOpen: onOpen,
    onClose: onClose,
    onToggle: onToggle,
    isControlled: isControlled,
    getButtonProps: function getButtonProps(props) {
      if (props === void 0) {
        props = {};
      }

      return _extends({}, props, {
        "aria-expanded": "true",
        "aria-controls": id,
        onClick: callAllHandlers(props.onClick, onToggle)
      });
    },
    getDisclosureProps: function getDisclosureProps(props) {
      if (props === void 0) {
        props = {};
      }

      return _extends({}, props, {
        hidden: !isOpen,
        id: id
      });
    }
  };
}

/**
 * React hook to manage browser event listeners
 *
 * @param event the event name
 * @param handler the event handler function to execute
 * @param doc the dom environment to execute against (defaults to `document`)
 * @param options the event listener options
 *
 * @internal
 */
function useEventListener(event, handler, env, options) {
  var listener = useCallbackRef(handler);
  react.useEffect(function () {
    var _runIfFn;

    var node = (_runIfFn = runIfFn(env)) != null ? _runIfFn : document;
    node.addEventListener(event, listener, options);
    return function () {
      node.removeEventListener(event, listener, options);
    };
  }, [event, env, options, listener]);
  return function () {
    var _runIfFn2;

    var node = (_runIfFn2 = runIfFn(env)) != null ? _runIfFn2 : document;
    node.removeEventListener(event, listener, options);
  };
}

/**
 * React effect hook that invokes only on update.
 * It doesn't invoke on mount
 */

var useUpdateEffect = function useUpdateEffect(effect, deps) {
  var mounted = react.useRef(false);
  react.useEffect(function () {
    if (mounted.current) {
      return effect();
    }

    mounted.current = true;
    return undefined; // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  return mounted.current;
};

function preventReturnFocus(containerRef) {
  var el = containerRef.current;
  if (!el) return false;
  var activeElement = getActiveElement(el);
  if (!activeElement) return false;
  if (contains(el, activeElement)) return false;
  if (isTabbable(activeElement)) return true;
  return false;
}
/**
 * Popover hook to manage the focus when the popover closes or hides.
 *
 * We either want to return focus back to the popover trigger or
 * let focus proceed normally if user moved to another interactive
 * element in the viewport.
 */


function useFocusOnHide(containerRef, options) {
  var shouldFocusProp = options.shouldFocus,
      visible = options.visible,
      focusRef = options.focusRef;
  var shouldFocus = shouldFocusProp && !visible;
  useUpdateEffect(function () {
    if (!shouldFocus) return;

    if (preventReturnFocus(containerRef)) {
      return;
    }

    var el = (focusRef == null ? void 0 : focusRef.current) || containerRef.current;

    if (el) {
      focus(el, {
        nextTick: true
      });
    }
  }, [shouldFocus, containerRef, focusRef]);
}

/**
 * Credit goes to `framer-motion` of this useful utilities.
 * License can be found here: https://github.com/framer/motion
 */
/**
 * @internal
 */

function usePointerEvent(env, eventName, handler, options) {
  return useEventListener(getPointerEventName$1(eventName), wrapPointerEventHandler(handler, eventName === "pointerdown"), env, options);
}

/**
 * Polyfill to get `relatedTarget` working correctly consistently
 * across all browsers.
 *
 * It ensures that elements receives focus on pointer down if
 * it's not the active active element.
 *
 * @internal
 */
function useFocusOnPointerDown(props) {
  var ref = props.ref,
      elements = props.elements,
      enabled = props.enabled;
  var isSafari = detectBrowser("Safari");

  var doc = function doc() {
    return getOwnerDocument(ref.current);
  };

  usePointerEvent(doc, "pointerdown", function (event) {
    if (!isSafari || !enabled) return;
    var target = event.target;
    var els = elements != null ? elements : [ref];
    var isValidTarget = els.some(function (elementOrRef) {
      var el = isRefObject$1(elementOrRef) ? elementOrRef.current : elementOrRef;
      return contains(el, target);
    });

    if (!isActiveElement(target) && isValidTarget) {
      event.preventDefault();
      focus(target);
    }
  });
}

var defaultOptions = {
  preventScroll: true,
  shouldFocus: false
};
function useFocusOnShow(target, options) {
  if (options === void 0) {
    options = defaultOptions;
  }

  var _options = options,
      focusRef = _options.focusRef,
      preventScroll = _options.preventScroll,
      shouldFocus = _options.shouldFocus,
      visible = _options.visible;
  var element = isRefObject$1(target) ? target.current : target;
  var autoFocus = shouldFocus && visible;
  var onFocus = react.useCallback(function () {
    if (!element || !autoFocus) return;
    if (contains(element, document.activeElement)) return;

    if (focusRef != null && focusRef.current) {
      focus(focusRef.current, {
        preventScroll: preventScroll,
        nextTick: true
      });
    } else {
      var tabbableEls = getAllFocusable(element);

      if (tabbableEls.length > 0) {
        focus(tabbableEls[0], {
          preventScroll: preventScroll,
          nextTick: true
        });
      }
    }
  }, [autoFocus, preventScroll, element, focusRef]);
  useUpdateEffect(function () {
    onFocus();
  }, [onFocus]);
  useEventListener("transitionend", onFocus, element);
}

/* eslint-disable react-hooks/exhaustive-deps */
function assignRef(ref, value) {
  if (ref == null) return;

  if (typeof ref === "function") {
    ref(value);
    return;
  }

  try {
    // @ts-ignore
    ref.current = value;
  } catch (error) {
    throw new Error("Cannot assign value '" + value + "' to ref '" + ref + "'");
  }
}
/**
 * React hook that merges react refs into a single memoized function
 *
 * @example
 * import React from "react";
 * import { useMergeRefs } from `@chakra-ui/hooks`;
 *
 * const Component = React.forwardRef((props, ref) => {
 *   const internalRef = React.useRef();
 *   return <div {...props} ref={useMergeRefs(internalRef, ref)} />;
 * });
 */

function useMergeRefs() {
  for (var _len = arguments.length, refs = new Array(_len), _key = 0; _key < _len; _key++) {
    refs[_key] = arguments[_key];
  }

  return react.useMemo(function () {
    if (refs.every(function (ref) {
      return ref == null;
    })) {
      return null;
    }

    return function (node) {
      refs.forEach(function (ref) {
        if (ref) assignRef(ref, node);
      });
    };
  }, refs);
}

var _createContext$1 = createContext({
  strict: false,
  name: "PortalManagerContext"
}),
    PortalManagerContextProvider = _createContext$1[0];
function PortalManager(props) {
  var children = props.children,
      zIndex = props.zIndex;
  return /*#__PURE__*/react.createElement(PortalManagerContextProvider, {
    value: {
      zIndex: zIndex
    }
  }, children);
}

var _createContext = createContext({
  strict: false,
  name: "PortalContext"
});

/**
 * The global provider that must be added to make all Chakra components
 * work correctly
 */
var ChakraProvider = function ChakraProvider(props) {
  var children = props.children,
      colorModeManager = props.colorModeManager,
      portalZIndex = props.portalZIndex,
      _props$resetCSS = props.resetCSS,
      resetCSS = _props$resetCSS === void 0 ? true : _props$resetCSS,
      _props$theme = props.theme,
      theme = _props$theme === void 0 ? {} : _props$theme,
      environment = props.environment,
      cssVarsRoot = props.cssVarsRoot;

  var _children = /*#__PURE__*/react.createElement(EnvironmentProvider, {
    environment: environment
  }, children);

  return /*#__PURE__*/react.createElement(IdProvider, null, /*#__PURE__*/react.createElement(ThemeProvider, {
    theme: theme,
    cssVarsRoot: cssVarsRoot
  }, /*#__PURE__*/react.createElement(ColorModeProvider, {
    colorModeManager: colorModeManager,
    options: theme.config
  }, resetCSS && /*#__PURE__*/react.createElement(CSSReset$1, null), /*#__PURE__*/react.createElement(GlobalStyle, null), portalZIndex ? /*#__PURE__*/react.createElement(PortalManager, {
    zIndex: portalZIndex
  }, _children) : _children)));
};

/**
 * Take input from [0, n] and return it as [0, 1]
 * @hidden
 */
function bound01(n, max) {
    if (isOnePointZero(n)) {
        n = '100%';
    }
    var isPercent = isPercentage(n);
    n = max === 360 ? n : Math.min(max, Math.max(0, parseFloat(n)));
    // Automatically convert percentage into number
    if (isPercent) {
        n = parseInt(String(n * max), 10) / 100;
    }
    // Handle floating point rounding errors
    if (Math.abs(n - max) < 0.000001) {
        return 1;
    }
    // Convert into [0, 1] range if it isn't already
    if (max === 360) {
        // If n is a hue given in degrees,
        // wrap around out-of-range values into [0, 360] range
        // then convert into [0, 1].
        n = (n < 0 ? (n % max) + max : n % max) / parseFloat(String(max));
    }
    else {
        // If n not a hue given in degrees
        // Convert into [0, 1] range if it isn't already.
        n = (n % max) / parseFloat(String(max));
    }
    return n;
}
/**
 * Force a number between 0 and 1
 * @hidden
 */
function clamp01(val) {
    return Math.min(1, Math.max(0, val));
}
/**
 * Need to handle 1.0 as 100%, since once it is a number, there is no difference between it and 1
 * <http://stackoverflow.com/questions/7422072/javascript-how-to-detect-number-as-a-decimal-including-1-0>
 * @hidden
 */
function isOnePointZero(n) {
    return typeof n === 'string' && n.indexOf('.') !== -1 && parseFloat(n) === 1;
}
/**
 * Check to see if string passed in is a percentage
 * @hidden
 */
function isPercentage(n) {
    return typeof n === 'string' && n.indexOf('%') !== -1;
}
/**
 * Return a valid alpha value [0,1] with all invalid values being set to 1
 * @hidden
 */
function boundAlpha(a) {
    a = parseFloat(a);
    if (isNaN(a) || a < 0 || a > 1) {
        a = 1;
    }
    return a;
}
/**
 * Replace a decimal with it's percentage value
 * @hidden
 */
function convertToPercentage(n) {
    if (n <= 1) {
        return Number(n) * 100 + "%";
    }
    return n;
}
/**
 * Force a hex value to have 2 characters
 * @hidden
 */
function pad2(c) {
    return c.length === 1 ? '0' + c : String(c);
}

// `rgbToHsl`, `rgbToHsv`, `hslToRgb`, `hsvToRgb` modified from:
// <http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript>
/**
 * Handle bounds / percentage checking to conform to CSS color spec
 * <http://www.w3.org/TR/css3-color/>
 * *Assumes:* r, g, b in [0, 255] or [0, 1]
 * *Returns:* { r, g, b } in [0, 255]
 */
function rgbToRgb(r, g, b) {
    return {
        r: bound01(r, 255) * 255,
        g: bound01(g, 255) * 255,
        b: bound01(b, 255) * 255,
    };
}
/**
 * Converts an RGB color value to HSL.
 * *Assumes:* r, g, and b are contained in [0, 255] or [0, 1]
 * *Returns:* { h, s, l } in [0,1]
 */
function rgbToHsl(r, g, b) {
    r = bound01(r, 255);
    g = bound01(g, 255);
    b = bound01(b, 255);
    var max = Math.max(r, g, b);
    var min = Math.min(r, g, b);
    var h = 0;
    var s = 0;
    var l = (max + min) / 2;
    if (max === min) {
        s = 0;
        h = 0; // achromatic
    }
    else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }
        h /= 6;
    }
    return { h: h, s: s, l: l };
}
function hue2rgb(p, q, t) {
    if (t < 0) {
        t += 1;
    }
    if (t > 1) {
        t -= 1;
    }
    if (t < 1 / 6) {
        return p + (q - p) * (6 * t);
    }
    if (t < 1 / 2) {
        return q;
    }
    if (t < 2 / 3) {
        return p + (q - p) * (2 / 3 - t) * 6;
    }
    return p;
}
/**
 * Converts an HSL color value to RGB.
 *
 * *Assumes:* h is contained in [0, 1] or [0, 360] and s and l are contained [0, 1] or [0, 100]
 * *Returns:* { r, g, b } in the set [0, 255]
 */
function hslToRgb(h, s, l) {
    var r;
    var g;
    var b;
    h = bound01(h, 360);
    s = bound01(s, 100);
    l = bound01(l, 100);
    if (s === 0) {
        // achromatic
        g = l;
        b = l;
        r = l;
    }
    else {
        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }
    return { r: r * 255, g: g * 255, b: b * 255 };
}
/**
 * Converts an RGB color value to HSV
 *
 * *Assumes:* r, g, and b are contained in the set [0, 255] or [0, 1]
 * *Returns:* { h, s, v } in [0,1]
 */
function rgbToHsv(r, g, b) {
    r = bound01(r, 255);
    g = bound01(g, 255);
    b = bound01(b, 255);
    var max = Math.max(r, g, b);
    var min = Math.min(r, g, b);
    var h = 0;
    var v = max;
    var d = max - min;
    var s = max === 0 ? 0 : d / max;
    if (max === min) {
        h = 0; // achromatic
    }
    else {
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }
        h /= 6;
    }
    return { h: h, s: s, v: v };
}
/**
 * Converts an HSV color value to RGB.
 *
 * *Assumes:* h is contained in [0, 1] or [0, 360] and s and v are contained in [0, 1] or [0, 100]
 * *Returns:* { r, g, b } in the set [0, 255]
 */
function hsvToRgb(h, s, v) {
    h = bound01(h, 360) * 6;
    s = bound01(s, 100);
    v = bound01(v, 100);
    var i = Math.floor(h);
    var f = h - i;
    var p = v * (1 - s);
    var q = v * (1 - f * s);
    var t = v * (1 - (1 - f) * s);
    var mod = i % 6;
    var r = [v, q, p, p, t, v][mod];
    var g = [t, v, v, q, p, p][mod];
    var b = [p, p, t, v, v, q][mod];
    return { r: r * 255, g: g * 255, b: b * 255 };
}
/**
 * Converts an RGB color to hex
 *
 * Assumes r, g, and b are contained in the set [0, 255]
 * Returns a 3 or 6 character hex
 */
function rgbToHex(r, g, b, allow3Char) {
    var hex = [
        pad2(Math.round(r).toString(16)),
        pad2(Math.round(g).toString(16)),
        pad2(Math.round(b).toString(16)),
    ];
    // Return a 3 character hex if possible
    if (allow3Char &&
        hex[0].startsWith(hex[0].charAt(1)) &&
        hex[1].startsWith(hex[1].charAt(1)) &&
        hex[2].startsWith(hex[2].charAt(1))) {
        return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0);
    }
    return hex.join('');
}
/**
 * Converts an RGBA color plus alpha transparency to hex
 *
 * Assumes r, g, b are contained in the set [0, 255] and
 * a in [0, 1]. Returns a 4 or 8 character rgba hex
 */
// eslint-disable-next-line max-params
function rgbaToHex(r, g, b, a, allow4Char) {
    var hex = [
        pad2(Math.round(r).toString(16)),
        pad2(Math.round(g).toString(16)),
        pad2(Math.round(b).toString(16)),
        pad2(convertDecimalToHex(a)),
    ];
    // Return a 4 character hex if possible
    if (allow4Char &&
        hex[0].startsWith(hex[0].charAt(1)) &&
        hex[1].startsWith(hex[1].charAt(1)) &&
        hex[2].startsWith(hex[2].charAt(1)) &&
        hex[3].startsWith(hex[3].charAt(1))) {
        return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0) + hex[3].charAt(0);
    }
    return hex.join('');
}
/** Converts a decimal to a hex value */
function convertDecimalToHex(d) {
    return Math.round(parseFloat(d) * 255).toString(16);
}
/** Converts a hex value to a decimal */
function convertHexToDecimal(h) {
    return parseIntFromHex(h) / 255;
}
/** Parse a base-16 hex value into a base-10 integer */
function parseIntFromHex(val) {
    return parseInt(val, 16);
}
function numberInputToObject(color) {
    return {
        r: color >> 16,
        g: (color & 0xff00) >> 8,
        b: color & 0xff,
    };
}

// https://github.com/bahamas10/css-color-names/blob/master/css-color-names.json
/**
 * @hidden
 */
var names = {
    aliceblue: '#f0f8ff',
    antiquewhite: '#faebd7',
    aqua: '#00ffff',
    aquamarine: '#7fffd4',
    azure: '#f0ffff',
    beige: '#f5f5dc',
    bisque: '#ffe4c4',
    black: '#000000',
    blanchedalmond: '#ffebcd',
    blue: '#0000ff',
    blueviolet: '#8a2be2',
    brown: '#a52a2a',
    burlywood: '#deb887',
    cadetblue: '#5f9ea0',
    chartreuse: '#7fff00',
    chocolate: '#d2691e',
    coral: '#ff7f50',
    cornflowerblue: '#6495ed',
    cornsilk: '#fff8dc',
    crimson: '#dc143c',
    cyan: '#00ffff',
    darkblue: '#00008b',
    darkcyan: '#008b8b',
    darkgoldenrod: '#b8860b',
    darkgray: '#a9a9a9',
    darkgreen: '#006400',
    darkgrey: '#a9a9a9',
    darkkhaki: '#bdb76b',
    darkmagenta: '#8b008b',
    darkolivegreen: '#556b2f',
    darkorange: '#ff8c00',
    darkorchid: '#9932cc',
    darkred: '#8b0000',
    darksalmon: '#e9967a',
    darkseagreen: '#8fbc8f',
    darkslateblue: '#483d8b',
    darkslategray: '#2f4f4f',
    darkslategrey: '#2f4f4f',
    darkturquoise: '#00ced1',
    darkviolet: '#9400d3',
    deeppink: '#ff1493',
    deepskyblue: '#00bfff',
    dimgray: '#696969',
    dimgrey: '#696969',
    dodgerblue: '#1e90ff',
    firebrick: '#b22222',
    floralwhite: '#fffaf0',
    forestgreen: '#228b22',
    fuchsia: '#ff00ff',
    gainsboro: '#dcdcdc',
    ghostwhite: '#f8f8ff',
    goldenrod: '#daa520',
    gold: '#ffd700',
    gray: '#808080',
    green: '#008000',
    greenyellow: '#adff2f',
    grey: '#808080',
    honeydew: '#f0fff0',
    hotpink: '#ff69b4',
    indianred: '#cd5c5c',
    indigo: '#4b0082',
    ivory: '#fffff0',
    khaki: '#f0e68c',
    lavenderblush: '#fff0f5',
    lavender: '#e6e6fa',
    lawngreen: '#7cfc00',
    lemonchiffon: '#fffacd',
    lightblue: '#add8e6',
    lightcoral: '#f08080',
    lightcyan: '#e0ffff',
    lightgoldenrodyellow: '#fafad2',
    lightgray: '#d3d3d3',
    lightgreen: '#90ee90',
    lightgrey: '#d3d3d3',
    lightpink: '#ffb6c1',
    lightsalmon: '#ffa07a',
    lightseagreen: '#20b2aa',
    lightskyblue: '#87cefa',
    lightslategray: '#778899',
    lightslategrey: '#778899',
    lightsteelblue: '#b0c4de',
    lightyellow: '#ffffe0',
    lime: '#00ff00',
    limegreen: '#32cd32',
    linen: '#faf0e6',
    magenta: '#ff00ff',
    maroon: '#800000',
    mediumaquamarine: '#66cdaa',
    mediumblue: '#0000cd',
    mediumorchid: '#ba55d3',
    mediumpurple: '#9370db',
    mediumseagreen: '#3cb371',
    mediumslateblue: '#7b68ee',
    mediumspringgreen: '#00fa9a',
    mediumturquoise: '#48d1cc',
    mediumvioletred: '#c71585',
    midnightblue: '#191970',
    mintcream: '#f5fffa',
    mistyrose: '#ffe4e1',
    moccasin: '#ffe4b5',
    navajowhite: '#ffdead',
    navy: '#000080',
    oldlace: '#fdf5e6',
    olive: '#808000',
    olivedrab: '#6b8e23',
    orange: '#ffa500',
    orangered: '#ff4500',
    orchid: '#da70d6',
    palegoldenrod: '#eee8aa',
    palegreen: '#98fb98',
    paleturquoise: '#afeeee',
    palevioletred: '#db7093',
    papayawhip: '#ffefd5',
    peachpuff: '#ffdab9',
    peru: '#cd853f',
    pink: '#ffc0cb',
    plum: '#dda0dd',
    powderblue: '#b0e0e6',
    purple: '#800080',
    rebeccapurple: '#663399',
    red: '#ff0000',
    rosybrown: '#bc8f8f',
    royalblue: '#4169e1',
    saddlebrown: '#8b4513',
    salmon: '#fa8072',
    sandybrown: '#f4a460',
    seagreen: '#2e8b57',
    seashell: '#fff5ee',
    sienna: '#a0522d',
    silver: '#c0c0c0',
    skyblue: '#87ceeb',
    slateblue: '#6a5acd',
    slategray: '#708090',
    slategrey: '#708090',
    snow: '#fffafa',
    springgreen: '#00ff7f',
    steelblue: '#4682b4',
    tan: '#d2b48c',
    teal: '#008080',
    thistle: '#d8bfd8',
    tomato: '#ff6347',
    turquoise: '#40e0d0',
    violet: '#ee82ee',
    wheat: '#f5deb3',
    white: '#ffffff',
    whitesmoke: '#f5f5f5',
    yellow: '#ffff00',
    yellowgreen: '#9acd32',
};

/**
 * Given a string or object, convert that input to RGB
 *
 * Possible string inputs:
 * ```
 * "red"
 * "#f00" or "f00"
 * "#ff0000" or "ff0000"
 * "#ff000000" or "ff000000"
 * "rgb 255 0 0" or "rgb (255, 0, 0)"
 * "rgb 1.0 0 0" or "rgb (1, 0, 0)"
 * "rgba (255, 0, 0, 1)" or "rgba 255, 0, 0, 1"
 * "rgba (1.0, 0, 0, 1)" or "rgba 1.0, 0, 0, 1"
 * "hsl(0, 100%, 50%)" or "hsl 0 100% 50%"
 * "hsla(0, 100%, 50%, 1)" or "hsla 0 100% 50%, 1"
 * "hsv(0, 100%, 100%)" or "hsv 0 100% 100%"
 * ```
 */
function inputToRGB(color) {
    var rgb = { r: 0, g: 0, b: 0 };
    var a = 1;
    var s = null;
    var v = null;
    var l = null;
    var ok = false;
    var format = false;
    if (typeof color === 'string') {
        color = stringInputToObject(color);
    }
    if (typeof color === 'object') {
        if (isValidCSSUnit(color.r) && isValidCSSUnit(color.g) && isValidCSSUnit(color.b)) {
            rgb = rgbToRgb(color.r, color.g, color.b);
            ok = true;
            format = String(color.r).substr(-1) === '%' ? 'prgb' : 'rgb';
        }
        else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.v)) {
            s = convertToPercentage(color.s);
            v = convertToPercentage(color.v);
            rgb = hsvToRgb(color.h, s, v);
            ok = true;
            format = 'hsv';
        }
        else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.l)) {
            s = convertToPercentage(color.s);
            l = convertToPercentage(color.l);
            rgb = hslToRgb(color.h, s, l);
            ok = true;
            format = 'hsl';
        }
        if (Object.prototype.hasOwnProperty.call(color, 'a')) {
            a = color.a;
        }
    }
    a = boundAlpha(a);
    return {
        ok: ok,
        format: color.format || format,
        r: Math.min(255, Math.max(rgb.r, 0)),
        g: Math.min(255, Math.max(rgb.g, 0)),
        b: Math.min(255, Math.max(rgb.b, 0)),
        a: a,
    };
}
// <http://www.w3.org/TR/css3-values/#integers>
var CSS_INTEGER = '[-\\+]?\\d+%?';
// <http://www.w3.org/TR/css3-values/#number-value>
var CSS_NUMBER = '[-\\+]?\\d*\\.\\d+%?';
// Allow positive/negative integer/number.  Don't capture the either/or, just the entire outcome.
var CSS_UNIT = "(?:" + CSS_NUMBER + ")|(?:" + CSS_INTEGER + ")";
// Actual matching.
// Parentheses and commas are optional, but not required.
// Whitespace can take the place of commas or opening paren
var PERMISSIVE_MATCH3 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";
var PERMISSIVE_MATCH4 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";
var matchers = {
    CSS_UNIT: new RegExp(CSS_UNIT),
    rgb: new RegExp('rgb' + PERMISSIVE_MATCH3),
    rgba: new RegExp('rgba' + PERMISSIVE_MATCH4),
    hsl: new RegExp('hsl' + PERMISSIVE_MATCH3),
    hsla: new RegExp('hsla' + PERMISSIVE_MATCH4),
    hsv: new RegExp('hsv' + PERMISSIVE_MATCH3),
    hsva: new RegExp('hsva' + PERMISSIVE_MATCH4),
    hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
    hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
    hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
    hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
};
/**
 * Permissive string parsing.  Take in a number of formats, and output an object
 * based on detected format.  Returns `{ r, g, b }` or `{ h, s, l }` or `{ h, s, v}`
 */
function stringInputToObject(color) {
    color = color.trim().toLowerCase();
    if (color.length === 0) {
        return false;
    }
    var named = false;
    if (names[color]) {
        color = names[color];
        named = true;
    }
    else if (color === 'transparent') {
        return { r: 0, g: 0, b: 0, a: 0, format: 'name' };
    }
    // Try to match string input using regular expressions.
    // Keep most of the number bounding out of this function - don't worry about [0,1] or [0,100] or [0,360]
    // Just return an object and let the conversion functions handle that.
    // This way the result will be the same whether the tinycolor is initialized with string or object.
    var match = matchers.rgb.exec(color);
    if (match) {
        return { r: match[1], g: match[2], b: match[3] };
    }
    match = matchers.rgba.exec(color);
    if (match) {
        return { r: match[1], g: match[2], b: match[3], a: match[4] };
    }
    match = matchers.hsl.exec(color);
    if (match) {
        return { h: match[1], s: match[2], l: match[3] };
    }
    match = matchers.hsla.exec(color);
    if (match) {
        return { h: match[1], s: match[2], l: match[3], a: match[4] };
    }
    match = matchers.hsv.exec(color);
    if (match) {
        return { h: match[1], s: match[2], v: match[3] };
    }
    match = matchers.hsva.exec(color);
    if (match) {
        return { h: match[1], s: match[2], v: match[3], a: match[4] };
    }
    match = matchers.hex8.exec(color);
    if (match) {
        return {
            r: parseIntFromHex(match[1]),
            g: parseIntFromHex(match[2]),
            b: parseIntFromHex(match[3]),
            a: convertHexToDecimal(match[4]),
            format: named ? 'name' : 'hex8',
        };
    }
    match = matchers.hex6.exec(color);
    if (match) {
        return {
            r: parseIntFromHex(match[1]),
            g: parseIntFromHex(match[2]),
            b: parseIntFromHex(match[3]),
            format: named ? 'name' : 'hex',
        };
    }
    match = matchers.hex4.exec(color);
    if (match) {
        return {
            r: parseIntFromHex(match[1] + match[1]),
            g: parseIntFromHex(match[2] + match[2]),
            b: parseIntFromHex(match[3] + match[3]),
            a: convertHexToDecimal(match[4] + match[4]),
            format: named ? 'name' : 'hex8',
        };
    }
    match = matchers.hex3.exec(color);
    if (match) {
        return {
            r: parseIntFromHex(match[1] + match[1]),
            g: parseIntFromHex(match[2] + match[2]),
            b: parseIntFromHex(match[3] + match[3]),
            format: named ? 'name' : 'hex',
        };
    }
    return false;
}
/**
 * Check to see if it looks like a CSS unit
 * (see `matchers` above for definition).
 */
function isValidCSSUnit(color) {
    return Boolean(matchers.CSS_UNIT.exec(String(color)));
}

var TinyColor = /** @class */ (function () {
    function TinyColor(color, opts) {
        if (color === void 0) { color = ''; }
        if (opts === void 0) { opts = {}; }
        var _a;
        // If input is already a tinycolor, return itself
        if (color instanceof TinyColor) {
            // eslint-disable-next-line no-constructor-return
            return color;
        }
        if (typeof color === 'number') {
            color = numberInputToObject(color);
        }
        this.originalInput = color;
        var rgb = inputToRGB(color);
        this.originalInput = color;
        this.r = rgb.r;
        this.g = rgb.g;
        this.b = rgb.b;
        this.a = rgb.a;
        this.roundA = Math.round(100 * this.a) / 100;
        this.format = (_a = opts.format) !== null && _a !== void 0 ? _a : rgb.format;
        this.gradientType = opts.gradientType;
        // Don't let the range of [0,255] come back in [0,1].
        // Potentially lose a little bit of precision here, but will fix issues where
        // .5 gets interpreted as half of the total, instead of half of 1
        // If it was supposed to be 128, this was already taken care of by `inputToRgb`
        if (this.r < 1) {
            this.r = Math.round(this.r);
        }
        if (this.g < 1) {
            this.g = Math.round(this.g);
        }
        if (this.b < 1) {
            this.b = Math.round(this.b);
        }
        this.isValid = rgb.ok;
    }
    TinyColor.prototype.isDark = function () {
        return this.getBrightness() < 128;
    };
    TinyColor.prototype.isLight = function () {
        return !this.isDark();
    };
    /**
     * Returns the perceived brightness of the color, from 0-255.
     */
    TinyColor.prototype.getBrightness = function () {
        // http://www.w3.org/TR/AERT#color-contrast
        var rgb = this.toRgb();
        return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
    };
    /**
     * Returns the perceived luminance of a color, from 0-1.
     */
    TinyColor.prototype.getLuminance = function () {
        // http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef
        var rgb = this.toRgb();
        var R;
        var G;
        var B;
        var RsRGB = rgb.r / 255;
        var GsRGB = rgb.g / 255;
        var BsRGB = rgb.b / 255;
        if (RsRGB <= 0.03928) {
            R = RsRGB / 12.92;
        }
        else {
            // eslint-disable-next-line prefer-exponentiation-operator
            R = Math.pow((RsRGB + 0.055) / 1.055, 2.4);
        }
        if (GsRGB <= 0.03928) {
            G = GsRGB / 12.92;
        }
        else {
            // eslint-disable-next-line prefer-exponentiation-operator
            G = Math.pow((GsRGB + 0.055) / 1.055, 2.4);
        }
        if (BsRGB <= 0.03928) {
            B = BsRGB / 12.92;
        }
        else {
            // eslint-disable-next-line prefer-exponentiation-operator
            B = Math.pow((BsRGB + 0.055) / 1.055, 2.4);
        }
        return 0.2126 * R + 0.7152 * G + 0.0722 * B;
    };
    /**
     * Returns the alpha value of a color, from 0-1.
     */
    TinyColor.prototype.getAlpha = function () {
        return this.a;
    };
    /**
     * Sets the alpha value on the current color.
     *
     * @param alpha - The new alpha value. The accepted range is 0-1.
     */
    TinyColor.prototype.setAlpha = function (alpha) {
        this.a = boundAlpha(alpha);
        this.roundA = Math.round(100 * this.a) / 100;
        return this;
    };
    /**
     * Returns the object as a HSVA object.
     */
    TinyColor.prototype.toHsv = function () {
        var hsv = rgbToHsv(this.r, this.g, this.b);
        return { h: hsv.h * 360, s: hsv.s, v: hsv.v, a: this.a };
    };
    /**
     * Returns the hsva values interpolated into a string with the following format:
     * "hsva(xxx, xxx, xxx, xx)".
     */
    TinyColor.prototype.toHsvString = function () {
        var hsv = rgbToHsv(this.r, this.g, this.b);
        var h = Math.round(hsv.h * 360);
        var s = Math.round(hsv.s * 100);
        var v = Math.round(hsv.v * 100);
        return this.a === 1 ? "hsv(" + h + ", " + s + "%, " + v + "%)" : "hsva(" + h + ", " + s + "%, " + v + "%, " + this.roundA + ")";
    };
    /**
     * Returns the object as a HSLA object.
     */
    TinyColor.prototype.toHsl = function () {
        var hsl = rgbToHsl(this.r, this.g, this.b);
        return { h: hsl.h * 360, s: hsl.s, l: hsl.l, a: this.a };
    };
    /**
     * Returns the hsla values interpolated into a string with the following format:
     * "hsla(xxx, xxx, xxx, xx)".
     */
    TinyColor.prototype.toHslString = function () {
        var hsl = rgbToHsl(this.r, this.g, this.b);
        var h = Math.round(hsl.h * 360);
        var s = Math.round(hsl.s * 100);
        var l = Math.round(hsl.l * 100);
        return this.a === 1 ? "hsl(" + h + ", " + s + "%, " + l + "%)" : "hsla(" + h + ", " + s + "%, " + l + "%, " + this.roundA + ")";
    };
    /**
     * Returns the hex value of the color.
     * @param allow3Char will shorten hex value to 3 char if possible
     */
    TinyColor.prototype.toHex = function (allow3Char) {
        if (allow3Char === void 0) { allow3Char = false; }
        return rgbToHex(this.r, this.g, this.b, allow3Char);
    };
    /**
     * Returns the hex value of the color -with a # appened.
     * @param allow3Char will shorten hex value to 3 char if possible
     */
    TinyColor.prototype.toHexString = function (allow3Char) {
        if (allow3Char === void 0) { allow3Char = false; }
        return '#' + this.toHex(allow3Char);
    };
    /**
     * Returns the hex 8 value of the color.
     * @param allow4Char will shorten hex value to 4 char if possible
     */
    TinyColor.prototype.toHex8 = function (allow4Char) {
        if (allow4Char === void 0) { allow4Char = false; }
        return rgbaToHex(this.r, this.g, this.b, this.a, allow4Char);
    };
    /**
     * Returns the hex 8 value of the color -with a # appened.
     * @param allow4Char will shorten hex value to 4 char if possible
     */
    TinyColor.prototype.toHex8String = function (allow4Char) {
        if (allow4Char === void 0) { allow4Char = false; }
        return '#' + this.toHex8(allow4Char);
    };
    /**
     * Returns the object as a RGBA object.
     */
    TinyColor.prototype.toRgb = function () {
        return {
            r: Math.round(this.r),
            g: Math.round(this.g),
            b: Math.round(this.b),
            a: this.a,
        };
    };
    /**
     * Returns the RGBA values interpolated into a string with the following format:
     * "RGBA(xxx, xxx, xxx, xx)".
     */
    TinyColor.prototype.toRgbString = function () {
        var r = Math.round(this.r);
        var g = Math.round(this.g);
        var b = Math.round(this.b);
        return this.a === 1 ? "rgb(" + r + ", " + g + ", " + b + ")" : "rgba(" + r + ", " + g + ", " + b + ", " + this.roundA + ")";
    };
    /**
     * Returns the object as a RGBA object.
     */
    TinyColor.prototype.toPercentageRgb = function () {
        var fmt = function (x) { return Math.round(bound01(x, 255) * 100) + "%"; };
        return {
            r: fmt(this.r),
            g: fmt(this.g),
            b: fmt(this.b),
            a: this.a,
        };
    };
    /**
     * Returns the RGBA relative values interpolated into a string
     */
    TinyColor.prototype.toPercentageRgbString = function () {
        var rnd = function (x) { return Math.round(bound01(x, 255) * 100); };
        return this.a === 1
            ? "rgb(" + rnd(this.r) + "%, " + rnd(this.g) + "%, " + rnd(this.b) + "%)"
            : "rgba(" + rnd(this.r) + "%, " + rnd(this.g) + "%, " + rnd(this.b) + "%, " + this.roundA + ")";
    };
    /**
     * The 'real' name of the color -if there is one.
     */
    TinyColor.prototype.toName = function () {
        if (this.a === 0) {
            return 'transparent';
        }
        if (this.a < 1) {
            return false;
        }
        var hex = '#' + rgbToHex(this.r, this.g, this.b, false);
        for (var _i = 0, _a = Object.entries(names); _i < _a.length; _i++) {
            var _b = _a[_i], key = _b[0], value = _b[1];
            if (hex === value) {
                return key;
            }
        }
        return false;
    };
    TinyColor.prototype.toString = function (format) {
        var formatSet = Boolean(format);
        format = format !== null && format !== void 0 ? format : this.format;
        var formattedString = false;
        var hasAlpha = this.a < 1 && this.a >= 0;
        var needsAlphaFormat = !formatSet && hasAlpha && (format.startsWith('hex') || format === 'name');
        if (needsAlphaFormat) {
            // Special case for "transparent", all other non-alpha formats
            // will return rgba when there is transparency.
            if (format === 'name' && this.a === 0) {
                return this.toName();
            }
            return this.toRgbString();
        }
        if (format === 'rgb') {
            formattedString = this.toRgbString();
        }
        if (format === 'prgb') {
            formattedString = this.toPercentageRgbString();
        }
        if (format === 'hex' || format === 'hex6') {
            formattedString = this.toHexString();
        }
        if (format === 'hex3') {
            formattedString = this.toHexString(true);
        }
        if (format === 'hex4') {
            formattedString = this.toHex8String(true);
        }
        if (format === 'hex8') {
            formattedString = this.toHex8String();
        }
        if (format === 'name') {
            formattedString = this.toName();
        }
        if (format === 'hsl') {
            formattedString = this.toHslString();
        }
        if (format === 'hsv') {
            formattedString = this.toHsvString();
        }
        return formattedString || this.toHexString();
    };
    TinyColor.prototype.toNumber = function () {
        return (Math.round(this.r) << 16) + (Math.round(this.g) << 8) + Math.round(this.b);
    };
    TinyColor.prototype.clone = function () {
        return new TinyColor(this.toString());
    };
    /**
     * Lighten the color a given amount. Providing 100 will always return white.
     * @param amount - valid between 1-100
     */
    TinyColor.prototype.lighten = function (amount) {
        if (amount === void 0) { amount = 10; }
        var hsl = this.toHsl();
        hsl.l += amount / 100;
        hsl.l = clamp01(hsl.l);
        return new TinyColor(hsl);
    };
    /**
     * Brighten the color a given amount, from 0 to 100.
     * @param amount - valid between 1-100
     */
    TinyColor.prototype.brighten = function (amount) {
        if (amount === void 0) { amount = 10; }
        var rgb = this.toRgb();
        rgb.r = Math.max(0, Math.min(255, rgb.r - Math.round(255 * -(amount / 100))));
        rgb.g = Math.max(0, Math.min(255, rgb.g - Math.round(255 * -(amount / 100))));
        rgb.b = Math.max(0, Math.min(255, rgb.b - Math.round(255 * -(amount / 100))));
        return new TinyColor(rgb);
    };
    /**
     * Darken the color a given amount, from 0 to 100.
     * Providing 100 will always return black.
     * @param amount - valid between 1-100
     */
    TinyColor.prototype.darken = function (amount) {
        if (amount === void 0) { amount = 10; }
        var hsl = this.toHsl();
        hsl.l -= amount / 100;
        hsl.l = clamp01(hsl.l);
        return new TinyColor(hsl);
    };
    /**
     * Mix the color with pure white, from 0 to 100.
     * Providing 0 will do nothing, providing 100 will always return white.
     * @param amount - valid between 1-100
     */
    TinyColor.prototype.tint = function (amount) {
        if (amount === void 0) { amount = 10; }
        return this.mix('white', amount);
    };
    /**
     * Mix the color with pure black, from 0 to 100.
     * Providing 0 will do nothing, providing 100 will always return black.
     * @param amount - valid between 1-100
     */
    TinyColor.prototype.shade = function (amount) {
        if (amount === void 0) { amount = 10; }
        return this.mix('black', amount);
    };
    /**
     * Desaturate the color a given amount, from 0 to 100.
     * Providing 100 will is the same as calling greyscale
     * @param amount - valid between 1-100
     */
    TinyColor.prototype.desaturate = function (amount) {
        if (amount === void 0) { amount = 10; }
        var hsl = this.toHsl();
        hsl.s -= amount / 100;
        hsl.s = clamp01(hsl.s);
        return new TinyColor(hsl);
    };
    /**
     * Saturate the color a given amount, from 0 to 100.
     * @param amount - valid between 1-100
     */
    TinyColor.prototype.saturate = function (amount) {
        if (amount === void 0) { amount = 10; }
        var hsl = this.toHsl();
        hsl.s += amount / 100;
        hsl.s = clamp01(hsl.s);
        return new TinyColor(hsl);
    };
    /**
     * Completely desaturates a color into greyscale.
     * Same as calling `desaturate(100)`
     */
    TinyColor.prototype.greyscale = function () {
        return this.desaturate(100);
    };
    /**
     * Spin takes a positive or negative amount within [-360, 360] indicating the change of hue.
     * Values outside of this range will be wrapped into this range.
     */
    TinyColor.prototype.spin = function (amount) {
        var hsl = this.toHsl();
        var hue = (hsl.h + amount) % 360;
        hsl.h = hue < 0 ? 360 + hue : hue;
        return new TinyColor(hsl);
    };
    /**
     * Mix the current color a given amount with another color, from 0 to 100.
     * 0 means no mixing (return current color).
     */
    TinyColor.prototype.mix = function (color, amount) {
        if (amount === void 0) { amount = 50; }
        var rgb1 = this.toRgb();
        var rgb2 = new TinyColor(color).toRgb();
        var p = amount / 100;
        var rgba = {
            r: (rgb2.r - rgb1.r) * p + rgb1.r,
            g: (rgb2.g - rgb1.g) * p + rgb1.g,
            b: (rgb2.b - rgb1.b) * p + rgb1.b,
            a: (rgb2.a - rgb1.a) * p + rgb1.a,
        };
        return new TinyColor(rgba);
    };
    TinyColor.prototype.analogous = function (results, slices) {
        if (results === void 0) { results = 6; }
        if (slices === void 0) { slices = 30; }
        var hsl = this.toHsl();
        var part = 360 / slices;
        var ret = [this];
        for (hsl.h = (hsl.h - ((part * results) >> 1) + 720) % 360; --results;) {
            hsl.h = (hsl.h + part) % 360;
            ret.push(new TinyColor(hsl));
        }
        return ret;
    };
    /**
     * taken from https://github.com/infusion/jQuery-xcolor/blob/master/jquery.xcolor.js
     */
    TinyColor.prototype.complement = function () {
        var hsl = this.toHsl();
        hsl.h = (hsl.h + 180) % 360;
        return new TinyColor(hsl);
    };
    TinyColor.prototype.monochromatic = function (results) {
        if (results === void 0) { results = 6; }
        var hsv = this.toHsv();
        var h = hsv.h;
        var s = hsv.s;
        var v = hsv.v;
        var res = [];
        var modification = 1 / results;
        while (results--) {
            res.push(new TinyColor({ h: h, s: s, v: v }));
            v = (v + modification) % 1;
        }
        return res;
    };
    TinyColor.prototype.splitcomplement = function () {
        var hsl = this.toHsl();
        var h = hsl.h;
        return [
            this,
            new TinyColor({ h: (h + 72) % 360, s: hsl.s, l: hsl.l }),
            new TinyColor({ h: (h + 216) % 360, s: hsl.s, l: hsl.l }),
        ];
    };
    /**
     * Compute how the color would appear on a background
     */
    TinyColor.prototype.onBackground = function (background) {
        var fg = this.toRgb();
        var bg = new TinyColor(background).toRgb();
        return new TinyColor({
            r: bg.r + (fg.r - bg.r) * fg.a,
            g: bg.g + (fg.g - bg.g) * fg.a,
            b: bg.b + (fg.b - bg.b) * fg.a,
        });
    };
    /**
     * Alias for `polyad(3)`
     */
    TinyColor.prototype.triad = function () {
        return this.polyad(3);
    };
    /**
     * Alias for `polyad(4)`
     */
    TinyColor.prototype.tetrad = function () {
        return this.polyad(4);
    };
    /**
     * Get polyad colors, like (for 1, 2, 3, 4, 5, 6, 7, 8, etc...)
     * monad, dyad, triad, tetrad, pentad, hexad, heptad, octad, etc...
     */
    TinyColor.prototype.polyad = function (n) {
        var hsl = this.toHsl();
        var h = hsl.h;
        var result = [this];
        var increment = 360 / n;
        for (var i = 1; i < n; i++) {
            result.push(new TinyColor({ h: (h + i * increment) % 360, s: hsl.s, l: hsl.l }));
        }
        return result;
    };
    /**
     * compare color vs current color
     */
    TinyColor.prototype.equals = function (color) {
        return this.toRgbString() === new TinyColor(color).toRgbString();
    };
    return TinyColor;
}());

// randomColor by David Merfield under the CC0 license
function random(options) {
    if (options === void 0) { options = {}; }
    // Check if we need to generate multiple colors
    if (options.count !== undefined &&
        options.count !== null) {
        var totalColors = options.count;
        var colors = [];
        options.count = undefined;
        while (totalColors > colors.length) {
            // Since we're generating multiple colors,
            // incremement the seed. Otherwise we'd just
            // generate the same color each time...
            options.count = null;
            if (options.seed) {
                options.seed += 1;
            }
            colors.push(random(options));
        }
        options.count = totalColors;
        return colors;
    }
    // First we pick a hue (H)
    var h = pickHue(options.hue, options.seed);
    // Then use H to determine saturation (S)
    var s = pickSaturation(h, options);
    // Then use S and H to determine brightness (B).
    var v = pickBrightness(h, s, options);
    var res = { h: h, s: s, v: v };
    if (options.alpha !== undefined) {
        res.a = options.alpha;
    }
    // Then we return the HSB color in the desired format
    return new TinyColor(res);
}
function pickHue(hue, seed) {
    var hueRange = getHueRange(hue);
    var res = randomWithin(hueRange, seed);
    // Instead of storing red as two seperate ranges,
    // we group them, using negative numbers
    if (res < 0) {
        res = 360 + res;
    }
    return res;
}
function pickSaturation(hue, options) {
    if (options.hue === 'monochrome') {
        return 0;
    }
    if (options.luminosity === 'random') {
        return randomWithin([0, 100], options.seed);
    }
    var saturationRange = getColorInfo(hue).saturationRange;
    var sMin = saturationRange[0];
    var sMax = saturationRange[1];
    switch (options.luminosity) {
        case 'bright':
            sMin = 55;
            break;
        case 'dark':
            sMin = sMax - 10;
            break;
        case 'light':
            sMax = 55;
            break;
    }
    return randomWithin([sMin, sMax], options.seed);
}
function pickBrightness(H, S, options) {
    var bMin = getMinimumBrightness(H, S);
    var bMax = 100;
    switch (options.luminosity) {
        case 'dark':
            bMax = bMin + 20;
            break;
        case 'light':
            bMin = (bMax + bMin) / 2;
            break;
        case 'random':
            bMin = 0;
            bMax = 100;
            break;
    }
    return randomWithin([bMin, bMax], options.seed);
}
function getMinimumBrightness(H, S) {
    var lowerBounds = getColorInfo(H).lowerBounds;
    for (var i = 0; i < lowerBounds.length - 1; i++) {
        var s1 = lowerBounds[i][0];
        var v1 = lowerBounds[i][1];
        var s2 = lowerBounds[i + 1][0];
        var v2 = lowerBounds[i + 1][1];
        if (S >= s1 && S <= s2) {
            var m = (v2 - v1) / (s2 - s1);
            var b = v1 - m * s1;
            return m * S + b;
        }
    }
    return 0;
}
function getHueRange(colorInput) {
    var num = parseInt(colorInput, 10);
    if (!Number.isNaN(num) && num < 360 && num > 0) {
        return [num, num];
    }
    if (typeof colorInput === 'string') {
        var namedColor = bounds.find(function (n) { return n.name === colorInput; });
        if (namedColor) {
            var color = defineColor(namedColor);
            if (color.hueRange) {
                return color.hueRange;
            }
        }
        var parsed = new TinyColor(colorInput);
        if (parsed.isValid) {
            var hue = parsed.toHsv().h;
            return [hue, hue];
        }
    }
    return [0, 360];
}
function getColorInfo(hue) {
    // Maps red colors to make picking hue easier
    if (hue >= 334 && hue <= 360) {
        hue -= 360;
    }
    for (var _i = 0, bounds_1 = bounds; _i < bounds_1.length; _i++) {
        var bound = bounds_1[_i];
        var color = defineColor(bound);
        if (color.hueRange && hue >= color.hueRange[0] && hue <= color.hueRange[1]) {
            return color;
        }
    }
    throw Error('Color not found');
}
function randomWithin(range, seed) {
    if (seed === undefined) {
        return Math.floor(range[0] + Math.random() * (range[1] + 1 - range[0]));
    }
    // Seeded random algorithm from http://indiegamr.com/generate-repeatable-random-numbers-in-js/
    var max = range[1] || 1;
    var min = range[0] || 0;
    seed = (seed * 9301 + 49297) % 233280;
    var rnd = seed / 233280.0;
    return Math.floor(min + rnd * (max - min));
}
function defineColor(bound) {
    var sMin = bound.lowerBounds[0][0];
    var sMax = bound.lowerBounds[bound.lowerBounds.length - 1][0];
    var bMin = bound.lowerBounds[bound.lowerBounds.length - 1][1];
    var bMax = bound.lowerBounds[0][1];
    return {
        name: bound.name,
        hueRange: bound.hueRange,
        lowerBounds: bound.lowerBounds,
        saturationRange: [sMin, sMax],
        brightnessRange: [bMin, bMax],
    };
}
/**
 * @hidden
 */
var bounds = [
    {
        name: 'monochrome',
        hueRange: null,
        lowerBounds: [
            [0, 0],
            [100, 0],
        ],
    },
    {
        name: 'red',
        hueRange: [-26, 18],
        lowerBounds: [
            [20, 100],
            [30, 92],
            [40, 89],
            [50, 85],
            [60, 78],
            [70, 70],
            [80, 60],
            [90, 55],
            [100, 50],
        ],
    },
    {
        name: 'orange',
        hueRange: [19, 46],
        lowerBounds: [
            [20, 100],
            [30, 93],
            [40, 88],
            [50, 86],
            [60, 85],
            [70, 70],
            [100, 70],
        ],
    },
    {
        name: 'yellow',
        hueRange: [47, 62],
        lowerBounds: [
            [25, 100],
            [40, 94],
            [50, 89],
            [60, 86],
            [70, 84],
            [80, 82],
            [90, 80],
            [100, 75],
        ],
    },
    {
        name: 'green',
        hueRange: [63, 178],
        lowerBounds: [
            [30, 100],
            [40, 90],
            [50, 85],
            [60, 81],
            [70, 74],
            [80, 64],
            [90, 50],
            [100, 40],
        ],
    },
    {
        name: 'blue',
        hueRange: [179, 257],
        lowerBounds: [
            [20, 100],
            [30, 86],
            [40, 80],
            [50, 74],
            [60, 60],
            [70, 52],
            [80, 44],
            [90, 39],
            [100, 35],
        ],
    },
    {
        name: 'purple',
        hueRange: [258, 282],
        lowerBounds: [
            [20, 100],
            [30, 87],
            [40, 79],
            [50, 70],
            [60, 65],
            [70, 59],
            [80, 52],
            [90, 45],
            [100, 42],
        ],
    },
    {
        name: 'pink',
        hueRange: [283, 334],
        lowerBounds: [
            [20, 100],
            [30, 90],
            [40, 86],
            [60, 84],
            [80, 80],
            [90, 75],
            [100, 73],
        ],
    },
];

/**
 * Get the color raw value from theme
 * @param theme - the theme object
 * @param color - the color path ("green.200")
 * @param fallback - the fallback color
 */

var getColor = function getColor(theme, color, fallback) {
  var hex = memoizedGet(theme, "colors." + color, color);

  var _TinyColor = new TinyColor(hex),
      isValid = _TinyColor.isValid;

  return isValid ? hex : fallback;
};
/**
 * Determines if the tone of given color is "light" or "dark"
 * @param color - the color in hex, rgb, or hsl
 */

var tone = function tone(color) {
  return function (theme) {
    var hex = getColor(theme, color);
    var isDark = new TinyColor(hex).isDark();
    return isDark ? "dark" : "light";
  };
};
/**
 * Determines if a color tone is "dark"
 * @param color - the color in hex, rgb, or hsl
 */

var isDark = function isDark(color) {
  return function (theme) {
    return tone(color)(theme) === "dark";
  };
};
/**
 * Make a color transparent
 * @param color - the color in hex, rgb, or hsl
 * @param opacity - the amount of opacity the color should have (0-1)
 */

var transparentize = function transparentize(color, opacity) {
  return function (theme) {
    var raw = getColor(theme, color);
    return new TinyColor(raw).setAlpha(opacity).toRgbString();
  };
};
function generateStripe(size, color) {
  if (size === void 0) {
    size = "1rem";
  }

  if (color === void 0) {
    color = "rgba(255, 255, 255, 0.15)";
  }

  return {
    backgroundImage: "linear-gradient(\n    45deg,\n    " + color + " 25%,\n    transparent 25%,\n    transparent 50%,\n    " + color + " 50%,\n    " + color + " 75%,\n    transparent 75%,\n    transparent\n  )",
    backgroundSize: size + " " + size
  };
}
function randomColor(opts) {
  var fallback = random().toHexString();

  if (!opts || isEmptyObject(opts)) {
    return fallback;
  }

  if (opts.string && opts.colors) {
    return randomColorFromList(opts.string, opts.colors);
  }

  if (opts.string && !opts.colors) {
    return randomColorFromString(opts.string);
  }

  if (opts.colors && !opts.string) {
    return randomFromList(opts.colors);
  }

  return fallback;
}

function randomColorFromString(str) {
  var hash = 0;
  if (str.length === 0) return hash.toString();

  for (var i = 0; i < str.length; i += 1) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash;
  }

  var color = "#";

  for (var j = 0; j < 3; j += 1) {
    var value = hash >> j * 8 & 255;
    color += ("00" + value.toString(16)).substr(-2);
  }

  return color;
}

function randomColorFromList(str, list) {
  var index = 0;
  if (str.length === 0) return list[0];

  for (var i = 0; i < str.length; i += 1) {
    index = str.charCodeAt(i) + ((index << 5) - index);
    index = index & index;
  }

  index = (index % list.length + list.length) % list.length;
  return list[index];
}

function randomFromList(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function mode(light, dark) {
  return function (props) {
    return props.colorMode === "dark" ? dark : light;
  };
}
function orient(options) {
  var orientation = options.orientation,
      vertical = options.vertical,
      horizontal = options.horizontal;
  if (!orientation) return {};
  return orientation === "vertical" ? vertical : horizontal;
}

function _extends$1() {
  _extends$1 = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends$1.apply(this, arguments);
}

var createBreakpoints = function createBreakpoints(config) {
  warn({
    condition: true,
    message: ["[chakra-ui]: createBreakpoints(...) will be deprecated pretty soon", "simply pass the breakpoints as an object. Remove the createBreakpoint(..) call"].join("")
  });
  return _extends$1({
    base: "0em"
  }, config);
};

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

/**
 * Used to define the anatomy/parts of a component in a way that provides
 * a consistent API for `className`, css selector and `theming`.
 */

var Anatomy = /*#__PURE__*/function () {
  function Anatomy(name) {
    var _this = this;

    this.map = {};
    this.called = false;

    this.assert = function () {
      if (!_this.called) {
        _this.called = true;
        return;
      }

      throw new Error("[anatomy] .part(...) should only be called once. Did you mean to use .extend(...) ?");
    };

    this.parts = function () {
      _this.assert();

      for (var _len = arguments.length, values = new Array(_len), _key = 0; _key < _len; _key++) {
        values[_key] = arguments[_key];
      }

      for (var _i = 0, _values = values; _i < _values.length; _i++) {
        var part = _values[_i];
        _this.map[part] = _this.toPart(part);
      }

      return _this;
    };

    this.extend = function () {
      for (var _len2 = arguments.length, parts = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        parts[_key2] = arguments[_key2];
      }

      for (var _i2 = 0, _parts = parts; _i2 < _parts.length; _i2++) {
        var part = _parts[_i2];
        if (part in _this.map) continue;
        _this.map[part] = _this.toPart(part);
      }

      return _this;
    };

    this.toPart = function (part) {
      var el = ["container", "root"].includes(part != null ? part : "") ? [_this.name] : [_this.name, part];
      var attr = el.filter(Boolean).join("__");
      var className = "chakra-" + attr;
      var partObj = {
        className: className,
        selector: "." + className,
        toString: function toString() {
          return part;
        }
      };
      return partObj;
    };

    this.__type = {};
  }
  /**
   * Prevents user from calling `.parts` multiple times.
   * It should only be called once.
   */


  _createClass(Anatomy, [{
    key: "selectors",
    get:
    /**
     * Get all selectors for the component anatomy
     */
    function get() {
      var value = fromEntries(Object.entries(this.map).map(function (_ref) {
        var key = _ref[0],
            part = _ref[1];
        return [key, part.selector];
      }));
      return value;
    }
    /**
     * Get all classNames for the component anatomy
     */

  }, {
    key: "classNames",
    get: function get() {
      var value = fromEntries(Object.entries(this.map).map(function (_ref2) {
        var key = _ref2[0],
            part = _ref2[1];
        return [key, part.className];
      }));
      return value;
    }
    /**
     * Get all parts as array of string
     */

  }, {
    key: "keys",
    get: function get() {
      return Object.keys(this.map);
    }
    /**
     * Creates the part object for the given part
     */

  }]);

  return Anatomy;
}();
function anatomy(name) {
  return new Anatomy(name);
}

function toRef(operand) {
  if (isObject(operand) && operand.reference) {
    return operand.reference;
  }

  return String(operand);
}

var toExpr = function toExpr(operator) {
  for (var _len = arguments.length, operands = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    operands[_key - 1] = arguments[_key];
  }

  return operands.map(toRef).join(" " + operator + " ").replace(/calc/g, "");
};

var _add = function add() {
  for (var _len2 = arguments.length, operands = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    operands[_key2] = arguments[_key2];
  }

  return "calc(" + toExpr.apply(void 0, ["+"].concat(operands)) + ")";
};

var _subtract = function subtract() {
  for (var _len3 = arguments.length, operands = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    operands[_key3] = arguments[_key3];
  }

  return "calc(" + toExpr.apply(void 0, ["-"].concat(operands)) + ")";
};

var _multiply = function multiply() {
  for (var _len4 = arguments.length, operands = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
    operands[_key4] = arguments[_key4];
  }

  return "calc(" + toExpr.apply(void 0, ["*"].concat(operands)) + ")";
};

var _divide = function divide() {
  for (var _len5 = arguments.length, operands = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
    operands[_key5] = arguments[_key5];
  }

  return "calc(" + toExpr.apply(void 0, ["/"].concat(operands)) + ")";
};

var _negate = function negate(x) {
  var value = toRef(x);

  if (value != null && !Number.isNaN(parseFloat(value))) {
    return String(value).startsWith("-") ? String(value).slice(1) : "-" + value;
  }

  return _multiply(value, -1);
};

var calc = Object.assign(function (x) {
  return {
    add: function add() {
      for (var _len6 = arguments.length, operands = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
        operands[_key6] = arguments[_key6];
      }

      return calc(_add.apply(void 0, [x].concat(operands)));
    },
    subtract: function subtract() {
      for (var _len7 = arguments.length, operands = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
        operands[_key7] = arguments[_key7];
      }

      return calc(_subtract.apply(void 0, [x].concat(operands)));
    },
    multiply: function multiply() {
      for (var _len8 = arguments.length, operands = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
        operands[_key8] = arguments[_key8];
      }

      return calc(_multiply.apply(void 0, [x].concat(operands)));
    },
    divide: function divide() {
      for (var _len9 = arguments.length, operands = new Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
        operands[_key9] = arguments[_key9];
      }

      return calc(_divide.apply(void 0, [x].concat(operands)));
    },
    negate: function negate() {
      return calc(_negate(x));
    },
    toString: function toString() {
      return x.toString();
    }
  };
}, {
  add: _add,
  subtract: _subtract,
  multiply: _multiply,
  divide: _divide,
  negate: _negate
});

function isDecimal(value) {
  return !Number.isInteger(parseFloat(value.toString()));
}

function replaceWhiteSpace(value, replaceValue) {
  if (replaceValue === void 0) {
    replaceValue = "-";
  }

  return value.replace(/\s+/g, replaceValue);
}

function escape(value) {
  var valueStr = replaceWhiteSpace(value.toString());
  if (valueStr.includes("\\.")) return value;
  return isDecimal(value) ? valueStr.replace(".", "\\.") : value;
}

function addPrefix(value, prefix) {
  if (prefix === void 0) {
    prefix = "";
  }

  return [prefix, escape(value)].filter(Boolean).join("-");
}
function toVarRef(name, fallback) {
  return "var(" + escape(name) + (fallback ? ", " + fallback : "") + ")";
}
function toVar(value, prefix) {
  if (prefix === void 0) {
    prefix = "";
  }

  return "--" + addPrefix(value, prefix);
}
function cssVar(name, options) {
  var cssVariable = toVar(name, options == null ? void 0 : options.prefix);
  return {
    variable: cssVariable,
    reference: toVarRef(cssVariable, getFallback(options == null ? void 0 : options.fallback))
  };
}

function getFallback(fallback) {
  if (typeof fallback === "string") return fallback;
  return fallback == null ? void 0 : fallback.reference;
}

/**
 * **Accordion anatomy**
 * - Item: the accordion item contains the button and panel
 * - Button: the button is the trigger for the panel
 * - Panel: the panel is the content of the accordion item
 * - Icon: the expanded/collapsed icon
 */

var accordionAnatomy = anatomy("accordion").parts("container", "item", "button", "panel").extend("icon");
/**
 * **Alert anatomy**
 * - Title: the alert's title
 * - Description: the alert's description
 * - Icon: the alert's icon
 */

var alertAnatomy = anatomy("alert").parts("title", "description", "container").extend("icon");
/**
 * **Avatar anatomy**
 * - Container: the container for the avatar
 * - Label: the avatar initials text
 * - Excess Label: the label or text that represents excess avatar count.
 * Typically used in avatar groups.
 * - Group: the container for the avatar group
 */

var avatarAnatomy = anatomy("avatar").parts("label", "badge", "container").extend("excessLabel", "group");
/**
 * **Breadcrumb anatomy**
 * - Item: the container for a breadcrumb item
 * - Link: the element that represents the breadcrumb link
 * - Container: the container for the breadcrumb items
 * - Separator: the separator between breadcrumb items
 */

var breadcrumbAnatomy = anatomy("breadcrumb").parts("link", "item", "container").extend("separator");
var buttonAnatomy = anatomy("button").parts();
var checkboxAnatomy = anatomy("checkbox").parts("control", "icon", "container").extend("label");
var circularProgressAnatomy = anatomy("progress").parts("track", "filledTrack").extend("label");
var drawerAnatomy = anatomy("drawer").parts("overlay", "dialogContainer", "dialog").extend("header", "closeButton", "body", "footer");
var editableAnatomy = anatomy("editable").parts("preview", "input");
var formAnatomy = anatomy("form").parts("container", "requiredIndicator", "helperText");
var formErrorAnatomy = anatomy("formError").parts("text", "icon");
var inputAnatomy = anatomy("input").parts("addon", "field", "element");
var listAnatomy = anatomy("list").parts("container", "item", "icon");
var menuAnatomy = anatomy("menu").parts("button", "list", "item").extend("groupTitle", "command", "divider");
var modalAnatomy = anatomy("modal").parts("overlay", "dialogContainer", "dialog").extend("header", "closeButton", "body", "footer");
var numberInputAnatomy = anatomy("numberinput").parts("root", "field", "stepperGroup", "stepper");
var pinInputAnatomy = anatomy("pininput").parts("field");
var popoverAnatomy = anatomy("popover").parts("content", "header", "body", "footer").extend("popper", "arrow", "closeButton");
var progressAnatomy = anatomy("progress").parts("label", "filledTrack", "track");
var radioAnatomy = anatomy("radio").parts("container", "control", "label");
var selectAnatomy = anatomy("select").parts("field", "icon");
var sliderAnatomy = anatomy("slider").parts("container", "track", "thumb", "filledTrack");
var statAnatomy = anatomy("stat").parts("container", "label", "helpText", "number", "icon");
var switchAnatomy = anatomy("switch").parts("container", "track", "thumb");
var tableAnatomy = anatomy("table").parts("table", "thead", "tbody", "tr", "th", "td", "tfoot", "caption");
var tabsAnatomy = anatomy("tabs").parts("root", "tab", "tablist", "tabpanel", "tabpanels", "indicator");
/**
 * **Tag anatomy**
 * - Container: the container for the tag
 * - Label: the text content of the tag
 * - closeButton: the close button for the tag
 */

var tagAnatomy = anatomy("tag").parts("container", "label", "closeButton");

function _extends$2() {
  _extends$2 = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends$2.apply(this, arguments);
}

var baseStyleContainer$3 = {
  borderTopWidth: "1px",
  borderColor: "inherit",
  _last: {
    borderBottomWidth: "1px"
  }
};
var baseStyleButton$1 = {
  transitionProperty: "common",
  transitionDuration: "normal",
  fontSize: "1rem",
  _focus: {
    boxShadow: "outline"
  },
  _hover: {
    bg: "blackAlpha.50"
  },
  _disabled: {
    opacity: 0.4,
    cursor: "not-allowed"
  },
  px: 4,
  py: 2
};
var baseStylePanel = {
  pt: 2,
  px: 4,
  pb: 5
};
var baseStyleIcon$5 = {
  fontSize: "1.25em"
};
var baseStyle$D = {
  container: baseStyleContainer$3,
  button: baseStyleButton$1,
  panel: baseStylePanel,
  icon: baseStyleIcon$5
};
var Accordion = {
  parts: accordionAnatomy.keys,
  baseStyle: baseStyle$D
};

var baseStyle$C = {
  container: {
    px: 4,
    py: 3
  },
  title: {
    fontWeight: "bold",
    lineHeight: 6,
    marginEnd: 2
  },
  description: {
    lineHeight: 6
  },
  icon: {
    flexShrink: 0,
    marginEnd: 3,
    w: 5,
    h: 6
  }
};

function getBg(props) {
  var theme = props.theme,
      c = props.colorScheme;
  var lightBg = getColor(theme, c + ".100", c);
  var darkBg = transparentize(c + ".200", 0.16)(theme);
  return mode(lightBg, darkBg)(props);
}

var variantSubtle$1 = function variantSubtle(props) {
  var c = props.colorScheme;
  return {
    container: {
      bg: getBg(props)
    },
    icon: {
      color: mode(c + ".500", c + ".200")(props)
    }
  };
};

var variantLeftAccent = function variantLeftAccent(props) {
  var c = props.colorScheme;
  return {
    container: {
      paddingStart: 3,
      borderStartWidth: "4px",
      borderStartColor: mode(c + ".500", c + ".200")(props),
      bg: getBg(props)
    },
    icon: {
      color: mode(c + ".500", c + ".200")(props)
    }
  };
};

var variantTopAccent = function variantTopAccent(props) {
  var c = props.colorScheme;
  return {
    container: {
      pt: 2,
      borderTopWidth: "4px",
      borderTopColor: mode(c + ".500", c + ".200")(props),
      bg: getBg(props)
    },
    icon: {
      color: mode(c + ".500", c + ".200")(props)
    }
  };
};

var variantSolid$3 = function variantSolid(props) {
  var c = props.colorScheme;
  return {
    container: {
      bg: mode(c + ".500", c + ".200")(props),
      color: mode("white", "gray.900")(props)
    }
  };
};

var variants$b = {
  subtle: variantSubtle$1,
  "left-accent": variantLeftAccent,
  "top-accent": variantTopAccent,
  solid: variantSolid$3
};
var defaultProps$n = {
  variant: "subtle",
  colorScheme: "blue"
};
var Alert = {
  parts: alertAnatomy.keys,
  baseStyle: baseStyle$C,
  variants: variants$b,
  defaultProps: defaultProps$n
};

var spacing = {
  px: "1px",
  0.5: "0.125rem",
  1: "0.25rem",
  1.5: "0.375rem",
  2: "0.5rem",
  2.5: "0.625rem",
  3: "0.75rem",
  3.5: "0.875rem",
  4: "1rem",
  5: "1.25rem",
  6: "1.5rem",
  7: "1.75rem",
  8: "2rem",
  9: "2.25rem",
  10: "2.5rem",
  12: "3rem",
  14: "3.5rem",
  16: "4rem",
  20: "5rem",
  24: "6rem",
  28: "7rem",
  32: "8rem",
  36: "9rem",
  40: "10rem",
  44: "11rem",
  48: "12rem",
  52: "13rem",
  56: "14rem",
  60: "15rem",
  64: "16rem",
  72: "18rem",
  80: "20rem",
  96: "24rem"
};
/**
 * @deprecated
 * Spacing tokens are a part of DefaultChakraTheme['sizes']
 */

var largeSizes = {
  max: "max-content",
  min: "min-content",
  full: "100%",
  "3xs": "14rem",
  "2xs": "16rem",
  xs: "20rem",
  sm: "24rem",
  md: "28rem",
  lg: "32rem",
  xl: "36rem",
  "2xl": "42rem",
  "3xl": "48rem",
  "4xl": "56rem",
  "5xl": "64rem",
  "6xl": "72rem",
  "7xl": "80rem",
  "8xl": "90rem"
};
var container = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px"
};

var sizes$l = _extends$2({}, spacing, largeSizes, {
  container: container
});
/**
 * @deprecated
 * You can derive the Sizes type from the DefaultChakraTheme
 *
 * type Sizes = DefaultChakraTheme['sizes']
 */


var sizes$m = sizes$l;

var baseStyleBadge = function baseStyleBadge(props) {
  return {
    transform: "translate(25%, 25%)",
    borderRadius: "full",
    border: "0.2em solid",
    borderColor: mode("white", "gray.800")(props)
  };
};

var baseStyleExcessLabel = function baseStyleExcessLabel(props) {
  return {
    bg: mode("gray.200", "whiteAlpha.400")(props)
  };
};

var baseStyleContainer$2 = function baseStyleContainer(props) {
  var name = props.name,
      theme = props.theme;
  var bg = name ? randomColor({
    string: name
  }) : "gray.400";
  var isBgDark = isDark(bg)(theme);
  var color = "white";
  if (!isBgDark) color = "gray.800";
  var borderColor = mode("white", "gray.800")(props);
  return {
    bg: bg,
    color: color,
    borderColor: borderColor,
    verticalAlign: "top"
  };
};

var baseStyle$B = function baseStyle(props) {
  return {
    badge: baseStyleBadge(props),
    excessLabel: baseStyleExcessLabel(props),
    container: baseStyleContainer$2(props)
  };
};

function getSize$3(size) {
  var themeSize = sizes$m[size];
  return {
    container: {
      width: size,
      height: size,
      fontSize: "calc(" + (themeSize != null ? themeSize : size) + " / 2.5)"
    },
    excessLabel: {
      width: size,
      height: size
    },
    label: {
      fontSize: "calc(" + (themeSize != null ? themeSize : size) + " / 2.5)",
      lineHeight: size !== "100%" ? themeSize != null ? themeSize : size : undefined
    }
  };
}

var sizes$k = {
  "2xs": getSize$3("4"),
  xs: getSize$3("6"),
  sm: getSize$3("8"),
  md: getSize$3("12"),
  lg: getSize$3("16"),
  xl: getSize$3("24"),
  "2xl": getSize$3("32"),
  full: getSize$3("100%")
};
var defaultProps$m = {
  size: "md"
};
var Avatar = {
  parts: avatarAnatomy.keys,
  baseStyle: baseStyle$B,
  sizes: sizes$k,
  defaultProps: defaultProps$m
};

var baseStyle$A = {
  px: 1,
  textTransform: "uppercase",
  fontSize: "xs",
  borderRadius: "sm",
  fontWeight: "bold"
};

var variantSolid$2 = function variantSolid(props) {
  var c = props.colorScheme,
      theme = props.theme;
  var dark = transparentize(c + ".500", 0.6)(theme);
  return {
    bg: mode(c + ".500", dark)(props),
    color: mode("white", "whiteAlpha.800")(props)
  };
};

var variantSubtle = function variantSubtle(props) {
  var c = props.colorScheme,
      theme = props.theme;
  var darkBg = transparentize(c + ".200", 0.16)(theme);
  return {
    bg: mode(c + ".100", darkBg)(props),
    color: mode(c + ".800", c + ".200")(props)
  };
};

var variantOutline$2 = function variantOutline(props) {
  var c = props.colorScheme,
      theme = props.theme;
  var darkColor = transparentize(c + ".200", 0.8)(theme);
  var lightColor = getColor(theme, c + ".500");
  var color = mode(lightColor, darkColor)(props);
  return {
    color: color,
    boxShadow: "inset 0 0 0px 1px " + color
  };
};

var variants$a = {
  solid: variantSolid$2,
  subtle: variantSubtle,
  outline: variantOutline$2
};
var defaultProps$l = {
  variant: "subtle",
  colorScheme: "gray"
};
var Badge = {
  baseStyle: baseStyle$A,
  variants: variants$a,
  defaultProps: defaultProps$l
};

var baseStyleLink = {
  transitionProperty: "common",
  transitionDuration: "fast",
  transitionTimingFunction: "ease-out",
  cursor: "pointer",
  textDecoration: "none",
  outline: "none",
  color: "inherit",
  _hover: {
    textDecoration: "underline"
  },
  _focus: {
    boxShadow: "outline"
  }
};
var baseStyle$z = {
  link: baseStyleLink
};
var Breadcrumb = {
  parts: breadcrumbAnatomy.keys,
  baseStyle: baseStyle$z
};

var baseStyle$y = {
  lineHeight: "1.2",
  borderRadius: "md",
  fontWeight: "semibold",
  transitionProperty: "common",
  transitionDuration: "normal",
  _focus: {
    boxShadow: "outline"
  },
  _disabled: {
    opacity: 0.4,
    cursor: "not-allowed",
    boxShadow: "none"
  },
  _hover: {
    _disabled: {
      bg: "initial"
    }
  }
};

var variantGhost = function variantGhost(props) {
  var c = props.colorScheme,
      theme = props.theme;

  if (c === "gray") {
    return {
      color: mode("inherit", "whiteAlpha.900")(props),
      _hover: {
        bg: mode("gray.100", "whiteAlpha.200")(props)
      },
      _active: {
        bg: mode("gray.200", "whiteAlpha.300")(props)
      }
    };
  }

  var darkHoverBg = transparentize(c + ".200", 0.12)(theme);
  var darkActiveBg = transparentize(c + ".200", 0.24)(theme);
  return {
    color: mode(c + ".600", c + ".200")(props),
    bg: "transparent",
    _hover: {
      bg: mode(c + ".50", darkHoverBg)(props)
    },
    _active: {
      bg: mode(c + ".100", darkActiveBg)(props)
    }
  };
};

var variantOutline$1 = function variantOutline(props) {
  var c = props.colorScheme;
  var borderColor = mode("gray.200", "whiteAlpha.300")(props);
  return _extends$2({
    border: "1px solid",
    borderColor: c === "gray" ? borderColor : "currentColor"
  }, variantGhost(props));
};

/** Accessible color overrides for less accessible colors. */
var accessibleColorMap = {
  yellow: {
    bg: "yellow.400",
    color: "black",
    hoverBg: "yellow.500",
    activeBg: "yellow.600"
  },
  cyan: {
    bg: "cyan.400",
    color: "black",
    hoverBg: "cyan.500",
    activeBg: "cyan.600"
  }
};

var variantSolid$1 = function variantSolid(props) {
  var _accessibleColorMap$c;

  var c = props.colorScheme;

  if (c === "gray") {
    var _bg = mode("gray.100", "whiteAlpha.200")(props);

    return {
      bg: _bg,
      _hover: {
        bg: mode("gray.200", "whiteAlpha.300")(props),
        _disabled: {
          bg: _bg
        }
      },
      _active: {
        bg: mode("gray.300", "whiteAlpha.400")(props)
      }
    };
  }

  var _ref = (_accessibleColorMap$c = accessibleColorMap[c]) != null ? _accessibleColorMap$c : {},
      _ref$bg = _ref.bg,
      bg = _ref$bg === void 0 ? c + ".500" : _ref$bg,
      _ref$color = _ref.color,
      color = _ref$color === void 0 ? "white" : _ref$color,
      _ref$hoverBg = _ref.hoverBg,
      hoverBg = _ref$hoverBg === void 0 ? c + ".600" : _ref$hoverBg,
      _ref$activeBg = _ref.activeBg,
      activeBg = _ref$activeBg === void 0 ? c + ".700" : _ref$activeBg;

  var background = mode(bg, c + ".200")(props);
  return {
    bg: background,
    color: mode(color, "gray.800")(props),
    _hover: {
      bg: mode(hoverBg, c + ".300")(props),
      _disabled: {
        bg: background
      }
    },
    _active: {
      bg: mode(activeBg, c + ".400")(props)
    }
  };
};

var variantLink = function variantLink(props) {
  var c = props.colorScheme;
  return {
    padding: 0,
    height: "auto",
    lineHeight: "normal",
    verticalAlign: "baseline",
    color: mode(c + ".500", c + ".200")(props),
    _hover: {
      textDecoration: "underline",
      _disabled: {
        textDecoration: "none"
      }
    },
    _active: {
      color: mode(c + ".700", c + ".500")(props)
    }
  };
};

var variantUnstyled$2 = {
  bg: "none",
  color: "inherit",
  display: "inline",
  lineHeight: "inherit",
  m: 0,
  p: 0
};
var variants$9 = {
  ghost: variantGhost,
  outline: variantOutline$1,
  solid: variantSolid$1,
  link: variantLink,
  unstyled: variantUnstyled$2
};
var sizes$j = {
  lg: {
    h: 12,
    minW: 12,
    fontSize: "lg",
    px: 6
  },
  md: {
    h: 10,
    minW: 10,
    fontSize: "md",
    px: 4
  },
  sm: {
    h: 8,
    minW: 8,
    fontSize: "sm",
    px: 3
  },
  xs: {
    h: 6,
    minW: 6,
    fontSize: "xs",
    px: 2
  }
};
var defaultProps$k = {
  variant: "solid",
  size: "md",
  colorScheme: "gray"
};
var Button = {
  baseStyle: baseStyle$y,
  variants: variants$9,
  sizes: sizes$j,
  defaultProps: defaultProps$k
};

var baseStyleControl$1 = function baseStyleControl(props) {
  var c = props.colorScheme;
  return {
    w: "100%",
    transitionProperty: "box-shadow",
    transitionDuration: "normal",
    border: "2px solid",
    borderRadius: "sm",
    borderColor: "inherit",
    color: "white",
    _checked: {
      bg: mode(c + ".500", c + ".200")(props),
      borderColor: mode(c + ".500", c + ".200")(props),
      color: mode("white", "gray.900")(props),
      _hover: {
        bg: mode(c + ".600", c + ".300")(props),
        borderColor: mode(c + ".600", c + ".300")(props)
      },
      _disabled: {
        borderColor: mode("gray.200", "transparent")(props),
        bg: mode("gray.200", "whiteAlpha.300")(props),
        color: mode("gray.500", "whiteAlpha.500")(props)
      }
    },
    _indeterminate: {
      bg: mode(c + ".500", c + ".200")(props),
      borderColor: mode(c + ".500", c + ".200")(props),
      color: mode("white", "gray.900")(props)
    },
    _disabled: {
      bg: mode("gray.100", "whiteAlpha.100")(props),
      borderColor: mode("gray.100", "transparent")(props)
    },
    _focus: {
      boxShadow: "outline"
    },
    _invalid: {
      borderColor: mode("red.500", "red.300")(props)
    }
  };
};

var baseStyleLabel$3 = {
  userSelect: "none",
  _disabled: {
    opacity: 0.4
  }
};
var baseStyleIcon$4 = {
  transitionProperty: "transform",
  transitionDuration: "normal"
};

var baseStyle$x = function baseStyle(props) {
  return {
    icon: baseStyleIcon$4,
    control: baseStyleControl$1(props),
    label: baseStyleLabel$3
  };
};

var sizes$i = {
  sm: {
    control: {
      h: 3,
      w: 3
    },
    label: {
      fontSize: "sm"
    },
    icon: {
      fontSize: "0.45rem"
    }
  },
  md: {
    control: {
      w: 4,
      h: 4
    },
    label: {
      fontSize: "md"
    },
    icon: {
      fontSize: "0.625rem"
    }
  },
  lg: {
    control: {
      w: 5,
      h: 5
    },
    label: {
      fontSize: "lg"
    },
    icon: {
      fontSize: "0.625rem"
    }
  }
};
var defaultProps$j = {
  size: "md",
  colorScheme: "blue"
};
var Checkbox = {
  parts: checkboxAnatomy.keys,
  baseStyle: baseStyle$x,
  sizes: sizes$i,
  defaultProps: defaultProps$j
};

var _lg$1, _md$1, _sm$1;
var $size$1 = cssVar("close-button-size");

var baseStyle$w = function baseStyle(props) {
  var hoverBg = mode("blackAlpha.100", "whiteAlpha.100")(props);
  var activeBg = mode("blackAlpha.200", "whiteAlpha.200")(props);
  return {
    w: [$size$1.reference],
    h: [$size$1.reference],
    borderRadius: "md",
    transitionProperty: "common",
    transitionDuration: "normal",
    _disabled: {
      opacity: 0.4,
      cursor: "not-allowed",
      boxShadow: "none"
    },
    _hover: {
      bg: hoverBg
    },
    _active: {
      bg: activeBg
    },
    _focus: {
      boxShadow: "outline"
    }
  };
};

var sizes$h = {
  lg: (_lg$1 = {}, _lg$1[$size$1.variable] = "40px", _lg$1.fontSize = "16px", _lg$1),
  md: (_md$1 = {}, _md$1[$size$1.variable] = "32px", _md$1.fontSize = "12px", _md$1),
  sm: (_sm$1 = {}, _sm$1[$size$1.variable] = "24px", _sm$1.fontSize = "10px", _sm$1)
};
var defaultProps$i = {
  size: "md"
};
var CloseButton = {
  baseStyle: baseStyle$w,
  sizes: sizes$h,
  defaultProps: defaultProps$i
};

var variants$8 = Badge.variants,
    defaultProps$h = Badge.defaultProps;
var baseStyle$v = {
  fontFamily: "mono",
  fontSize: "sm",
  px: "0.2em",
  borderRadius: "sm"
};
var Code = {
  baseStyle: baseStyle$v,
  variants: variants$8,
  defaultProps: defaultProps$h
};

var baseStyle$u = {
  w: "100%",
  mx: "auto",
  maxW: "60ch",
  px: "1rem"
};
var Container = {
  baseStyle: baseStyle$u
};

var baseStyle$t = {
  opacity: 0.6,
  borderColor: "inherit"
};
var variantSolid = {
  borderStyle: "solid"
};
var variantDashed = {
  borderStyle: "dashed"
};
var variants$7 = {
  solid: variantSolid,
  dashed: variantDashed
};
var defaultProps$g = {
  variant: "solid"
};
var Divider = {
  baseStyle: baseStyle$t,
  variants: variants$7,
  defaultProps: defaultProps$g
};

/**
 * Since the `maxWidth` prop references theme.sizes internally,
 * we can leverage that to size our modals.
 */

function getSize$2(value) {
  if (value === "full") {
    return {
      dialog: {
        maxW: "100vw",
        h: "100vh"
      }
    };
  }

  return {
    dialog: {
      maxW: value
    }
  };
}

var baseStyleOverlay$1 = {
  bg: "blackAlpha.600",
  zIndex: "overlay"
};
var baseStyleDialogContainer$1 = {
  display: "flex",
  zIndex: "modal",
  justifyContent: "center"
};

var baseStyleDialog$1 = function baseStyleDialog(props) {
  var isFullHeight = props.isFullHeight;
  return _extends$2({}, isFullHeight && {
    height: "100vh"
  }, {
    zIndex: "modal",
    maxH: "100vh",
    bg: mode("white", "gray.700")(props),
    color: "inherit",
    boxShadow: mode("lg", "dark-lg")(props)
  });
};

var baseStyleHeader$2 = {
  px: 6,
  py: 4,
  fontSize: "xl",
  fontWeight: "semibold"
};
var baseStyleCloseButton$3 = {
  position: "absolute",
  top: 2,
  insetEnd: 3
};
var baseStyleBody$2 = {
  px: 6,
  py: 2,
  flex: 1,
  overflow: "auto"
};
var baseStyleFooter$2 = {
  px: 6,
  py: 4
};

var baseStyle$s = function baseStyle(props) {
  return {
    overlay: baseStyleOverlay$1,
    dialogContainer: baseStyleDialogContainer$1,
    dialog: baseStyleDialog$1(props),
    header: baseStyleHeader$2,
    closeButton: baseStyleCloseButton$3,
    body: baseStyleBody$2,
    footer: baseStyleFooter$2
  };
};

var sizes$g = {
  xs: getSize$2("xs"),
  sm: getSize$2("md"),
  md: getSize$2("lg"),
  lg: getSize$2("2xl"),
  xl: getSize$2("4xl"),
  full: getSize$2("full")
};
var defaultProps$f = {
  size: "xs"
};
var Drawer = {
  parts: drawerAnatomy.keys,
  baseStyle: baseStyle$s,
  sizes: sizes$g,
  defaultProps: defaultProps$f
};

var baseStylePreview = {
  borderRadius: "md",
  py: "3px",
  transitionProperty: "common",
  transitionDuration: "normal"
};
var baseStyleInput = {
  borderRadius: "md",
  py: "3px",
  transitionProperty: "common",
  transitionDuration: "normal",
  width: "full",
  _focus: {
    boxShadow: "outline"
  },
  _placeholder: {
    opacity: 0.6
  }
};
var baseStyle$r = {
  preview: baseStylePreview,
  input: baseStyleInput
};
var Editable = {
  parts: editableAnatomy.keys,
  baseStyle: baseStyle$r
};

var baseStyleRequiredIndicator = function baseStyleRequiredIndicator(props) {
  return {
    marginStart: 1,
    color: mode("red.500", "red.300")(props)
  };
};

var baseStyleHelperText = function baseStyleHelperText(props) {
  return {
    mt: 2,
    color: mode("gray.500", "whiteAlpha.600")(props),
    lineHeight: "normal",
    fontSize: "sm"
  };
};

var baseStyle$q = function baseStyle(props) {
  return {
    container: {
      width: "100%",
      position: "relative"
    },
    requiredIndicator: baseStyleRequiredIndicator(props),
    helperText: baseStyleHelperText(props)
  };
};

var Form = {
  parts: formAnatomy.keys,
  baseStyle: baseStyle$q
};

var baseStyle$p = {
  fontSize: "md",
  marginEnd: 3,
  mb: 2,
  fontWeight: "medium",
  transitionProperty: "common",
  transitionDuration: "normal",
  opacity: 1,
  _disabled: {
    opacity: 0.4
  }
};
var FormLabel = {
  baseStyle: baseStyle$p
};

var baseStyle$o = {
  fontFamily: "heading",
  fontWeight: "bold"
};
var sizes$f = {
  "4xl": {
    fontSize: ["6xl", null, "7xl"],
    lineHeight: 1
  },
  "3xl": {
    fontSize: ["5xl", null, "6xl"],
    lineHeight: 1
  },
  "2xl": {
    fontSize: ["4xl", null, "5xl"],
    lineHeight: [1.2, null, 1]
  },
  xl: {
    fontSize: ["3xl", null, "4xl"],
    lineHeight: [1.33, null, 1.2]
  },
  lg: {
    fontSize: ["2xl", null, "3xl"],
    lineHeight: [1.33, null, 1.2]
  },
  md: {
    fontSize: "xl",
    lineHeight: 1.2
  },
  sm: {
    fontSize: "md",
    lineHeight: 1.2
  },
  xs: {
    fontSize: "sm",
    lineHeight: 1.2
  }
};
var defaultProps$e = {
  size: "xl"
};
var Heading = {
  baseStyle: baseStyle$o,
  sizes: sizes$f,
  defaultProps: defaultProps$e
};

var baseStyle$n = {
  field: {
    width: "100%",
    minWidth: 0,
    outline: 0,
    position: "relative",
    appearance: "none",
    transitionProperty: "common",
    transitionDuration: "normal"
  }
};
var size = {
  lg: {
    fontSize: "lg",
    px: 4,
    h: 12,
    borderRadius: "md"
  },
  md: {
    fontSize: "md",
    px: 4,
    h: 10,
    borderRadius: "md"
  },
  sm: {
    fontSize: "sm",
    px: 3,
    h: 8,
    borderRadius: "sm"
  },
  xs: {
    fontSize: "xs",
    px: 2,
    h: 6,
    borderRadius: "sm"
  }
};
var sizes$e = {
  lg: {
    field: size.lg,
    addon: size.lg
  },
  md: {
    field: size.md,
    addon: size.md
  },
  sm: {
    field: size.sm,
    addon: size.sm
  },
  xs: {
    field: size.xs,
    addon: size.xs
  }
};

function getDefaults(props) {
  var fc = props.focusBorderColor,
      ec = props.errorBorderColor;
  return {
    focusBorderColor: fc || mode("blue.500", "blue.300")(props),
    errorBorderColor: ec || mode("red.500", "red.300")(props)
  };
}

var variantOutline = function variantOutline(props) {
  var theme = props.theme;

  var _getDefaults = getDefaults(props),
      fc = _getDefaults.focusBorderColor,
      ec = _getDefaults.errorBorderColor;

  return {
    field: {
      border: "1px solid",
      borderColor: "inherit",
      bg: "inherit",
      _hover: {
        borderColor: mode("gray.300", "whiteAlpha.400")(props)
      },
      _readOnly: {
        boxShadow: "none !important",
        userSelect: "all"
      },
      _disabled: {
        opacity: 0.4,
        cursor: "not-allowed"
      },
      _invalid: {
        borderColor: getColor(theme, ec),
        boxShadow: "0 0 0 1px " + getColor(theme, ec)
      },
      _focus: {
        zIndex: 1,
        borderColor: getColor(theme, fc),
        boxShadow: "0 0 0 1px " + getColor(theme, fc)
      }
    },
    addon: {
      border: "1px solid",
      borderColor: mode("inherit", "whiteAlpha.50")(props),
      bg: mode("gray.100", "whiteAlpha.300")(props)
    }
  };
};

var variantFilled = function variantFilled(props) {
  var theme = props.theme;

  var _getDefaults2 = getDefaults(props),
      fc = _getDefaults2.focusBorderColor,
      ec = _getDefaults2.errorBorderColor;

  return {
    field: {
      border: "2px solid",
      borderColor: "transparent",
      bg: mode("gray.100", "whiteAlpha.50")(props),
      _hover: {
        bg: mode("gray.200", "whiteAlpha.100")(props)
      },
      _readOnly: {
        boxShadow: "none !important",
        userSelect: "all"
      },
      _disabled: {
        opacity: 0.4,
        cursor: "not-allowed"
      },
      _invalid: {
        borderColor: getColor(theme, ec)
      },
      _focus: {
        bg: "transparent",
        borderColor: getColor(theme, fc)
      }
    },
    addon: {
      border: "2px solid",
      borderColor: "transparent",
      bg: mode("gray.100", "whiteAlpha.50")(props)
    }
  };
};

var variantFlushed = function variantFlushed(props) {
  var theme = props.theme;

  var _getDefaults3 = getDefaults(props),
      fc = _getDefaults3.focusBorderColor,
      ec = _getDefaults3.errorBorderColor;

  return {
    field: {
      borderBottom: "1px solid",
      borderColor: "inherit",
      borderRadius: 0,
      px: 0,
      bg: "transparent",
      _readOnly: {
        boxShadow: "none !important",
        userSelect: "all"
      },
      _invalid: {
        borderColor: getColor(theme, ec),
        boxShadow: "0px 1px 0px 0px " + getColor(theme, ec)
      },
      _focus: {
        borderColor: getColor(theme, fc),
        boxShadow: "0px 1px 0px 0px " + getColor(theme, fc)
      }
    },
    addon: {
      borderBottom: "2px solid",
      borderColor: "inherit",
      borderRadius: 0,
      px: 0,
      bg: "transparent"
    }
  };
};

var variantUnstyled$1 = {
  field: {
    bg: "transparent",
    px: 0,
    height: "auto"
  },
  addon: {
    bg: "transparent",
    px: 0,
    height: "auto"
  }
};
var variants$6 = {
  outline: variantOutline,
  filled: variantFilled,
  flushed: variantFlushed,
  unstyled: variantUnstyled$1
};
var defaultProps$d = {
  size: "md",
  variant: "outline"
};
var Input = {
  parts: inputAnatomy.keys,
  baseStyle: baseStyle$n,
  sizes: sizes$e,
  variants: variants$6,
  defaultProps: defaultProps$d
};

var baseStyle$m = function baseStyle(props) {
  return {
    bg: mode("gray.100", "whiteAlpha")(props),
    borderRadius: "md",
    borderWidth: "1px",
    borderBottomWidth: "3px",
    fontSize: "0.8em",
    fontWeight: "bold",
    lineHeight: "normal",
    px: "0.4em",
    whiteSpace: "nowrap"
  };
};

var Kbd = {
  baseStyle: baseStyle$m
};

var baseStyle$l = {
  transitionProperty: "common",
  transitionDuration: "fast",
  transitionTimingFunction: "ease-out",
  cursor: "pointer",
  textDecoration: "none",
  outline: "none",
  color: "inherit",
  _hover: {
    textDecoration: "underline"
  },
  _focus: {
    boxShadow: "outline"
  }
};
var Link = {
  baseStyle: baseStyle$l
};

var baseStyleIcon$3 = {
  marginEnd: "0.5rem",
  display: "inline",
  verticalAlign: "text-bottom"
};
var baseStyle$k = {
  container: {},
  item: {},
  icon: baseStyleIcon$3
};
var List = {
  parts: listAnatomy.keys,
  baseStyle: baseStyle$k
};

var baseStyleList = function baseStyleList(props) {
  return {
    bg: mode("#fff", "gray.700")(props),
    boxShadow: mode("sm", "dark-lg")(props),
    color: "inherit",
    minW: "3xs",
    py: "2",
    zIndex: 1,
    borderRadius: "md",
    borderWidth: "1px"
  };
};

var baseStyleItem = function baseStyleItem(props) {
  return {
    py: "0.4rem",
    px: "0.8rem",
    transitionProperty: "background",
    transitionDuration: "ultra-fast",
    transitionTimingFunction: "ease-in",
    _focus: {
      bg: mode("gray.100", "whiteAlpha.100")(props)
    },
    _active: {
      bg: mode("gray.200", "whiteAlpha.200")(props)
    },
    _expanded: {
      bg: mode("gray.100", "whiteAlpha.100")(props)
    },
    _disabled: {
      opacity: 0.4,
      cursor: "not-allowed"
    }
  };
};

var baseStyleGroupTitle = {
  mx: 4,
  my: 2,
  fontWeight: "semibold",
  fontSize: "sm"
};
var baseStyleCommand = {
  opacity: 0.6
};
var baseStyleDivider = {
  border: 0,
  borderBottom: "1px solid",
  borderColor: "inherit",
  my: "0.5rem",
  opacity: 0.6
};
var baseStyleButton = {
  transitionProperty: "common",
  transitionDuration: "normal"
};

var baseStyle$j = function baseStyle(props) {
  return {
    button: baseStyleButton,
    list: baseStyleList(props),
    item: baseStyleItem(props),
    groupTitle: baseStyleGroupTitle,
    command: baseStyleCommand,
    divider: baseStyleDivider
  };
};

var Menu = {
  parts: menuAnatomy.keys,
  baseStyle: baseStyle$j
};

var baseStyleOverlay = {
  bg: "blackAlpha.600",
  zIndex: "modal"
};

var baseStyleDialogContainer = function baseStyleDialogContainer(props) {
  var isCentered = props.isCentered,
      scrollBehavior = props.scrollBehavior;
  return {
    display: "flex",
    zIndex: "modal",
    justifyContent: "center",
    alignItems: isCentered ? "center" : "flex-start",
    overflow: scrollBehavior === "inside" ? "hidden" : "auto"
  };
};

var baseStyleDialog = function baseStyleDialog(props) {
  var scrollBehavior = props.scrollBehavior;
  return {
    borderRadius: "md",
    bg: mode("white", "gray.700")(props),
    color: "inherit",
    my: "3.75rem",
    zIndex: "modal",
    maxH: scrollBehavior === "inside" ? "calc(100% - 7.5rem)" : undefined,
    boxShadow: mode("lg", "dark-lg")(props)
  };
};

var baseStyleHeader$1 = {
  px: 6,
  py: 4,
  fontSize: "xl",
  fontWeight: "semibold"
};
var baseStyleCloseButton$2 = {
  position: "absolute",
  top: 2,
  insetEnd: 3
};

var baseStyleBody$1 = function baseStyleBody(props) {
  var scrollBehavior = props.scrollBehavior;
  return {
    px: 6,
    py: 2,
    flex: 1,
    overflow: scrollBehavior === "inside" ? "auto" : undefined
  };
};

var baseStyleFooter$1 = {
  px: 6,
  py: 4
};

var baseStyle$i = function baseStyle(props) {
  return {
    overlay: baseStyleOverlay,
    dialogContainer: baseStyleDialogContainer(props),
    dialog: baseStyleDialog(props),
    header: baseStyleHeader$1,
    closeButton: baseStyleCloseButton$2,
    body: baseStyleBody$1(props),
    footer: baseStyleFooter$1
  };
};
/**
 * Since the `maxWidth` prop references theme.sizes internally,
 * we can leverage that to size our modals.
 */


function getSize$1(value) {
  if (value === "full") {
    return {
      dialog: {
        maxW: "100vw",
        minH: "100vh",
        my: 0
      }
    };
  }

  return {
    dialog: {
      maxW: value
    }
  };
}

var sizes$d = {
  xs: getSize$1("xs"),
  sm: getSize$1("sm"),
  md: getSize$1("md"),
  lg: getSize$1("lg"),
  xl: getSize$1("xl"),
  "2xl": getSize$1("2xl"),
  "3xl": getSize$1("3xl"),
  "4xl": getSize$1("4xl"),
  "5xl": getSize$1("5xl"),
  "6xl": getSize$1("6xl"),
  full: getSize$1("full")
};
var defaultProps$c = {
  size: "md"
};
var Modal = {
  parts: modalAnatomy.keys,
  baseStyle: baseStyle$i,
  sizes: sizes$d,
  defaultProps: defaultProps$c
};

var typography = {
  letterSpacings: {
    tighter: "-0.05em",
    tight: "-0.025em",
    normal: "0",
    wide: "0.025em",
    wider: "0.05em",
    widest: "0.1em"
  },
  lineHeights: {
    normal: "normal",
    none: 1,
    shorter: 1.25,
    "short": 1.375,
    base: 1.5,
    tall: 1.625,
    taller: "2",
    "3": ".75rem",
    "4": "1rem",
    "5": "1.25rem",
    "6": "1.5rem",
    "7": "1.75rem",
    "8": "2rem",
    "9": "2.25rem",
    "10": "2.5rem"
  },
  fontWeights: {
    hairline: 100,
    thin: 200,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900
  },
  fonts: {
    heading: "-apple-system, BlinkMacSystemFont, \"Segoe UI\", Helvetica, Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\"",
    body: "-apple-system, BlinkMacSystemFont, \"Segoe UI\", Helvetica, Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\"",
    mono: "SFMono-Regular,Menlo,Monaco,Consolas,\"Liberation Mono\",\"Courier New\",monospace"
  },
  fontSizes: {
    xs: "0.75rem",
    sm: "0.875rem",
    md: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem",
    "5xl": "3rem",
    "6xl": "3.75rem",
    "7xl": "4.5rem",
    "8xl": "6rem",
    "9xl": "8rem"
  }
};
/**
 * @deprecated
 * You can derive the Typography type from the DefaultChakraTheme
 *
 * type Typography = Pick<
 *   DefaultChakraTheme,
 *   | "letterSpacings"
 *   | "lineHeights"
 *   | "fontWeights"
 *   | "fonts"
 *   | "fontSizes"
 *  >
 */

var typography$1 = typography;

var _baseStyleRoot, _Input$baseStyle$fiel, _Input$baseStyle;
var variants$5 = Input.variants,
    defaultProps$b = Input.defaultProps;
var $stepperWidth = cssVar("number-input-stepper-width");
var $inputPadding = cssVar("number-input-input-padding");
var inputPaddingValue = calc($stepperWidth).add("0.5rem").toString();
var baseStyleRoot$1 = (_baseStyleRoot = {}, _baseStyleRoot[$stepperWidth.variable] = "24px", _baseStyleRoot[$inputPadding.variable] = inputPaddingValue, _baseStyleRoot);
var baseStyleField$1 = (_Input$baseStyle$fiel = (_Input$baseStyle = Input.baseStyle) == null ? void 0 : _Input$baseStyle.field) != null ? _Input$baseStyle$fiel : {};
var baseStyleStepperGroup = {
  width: [$stepperWidth.reference]
};

var baseStyleStepper = function baseStyleStepper(props) {
  return {
    borderStart: "1px solid",
    borderStartColor: mode("inherit", "whiteAlpha.300")(props),
    color: mode("inherit", "whiteAlpha.800")(props),
    _active: {
      bg: mode("gray.200", "whiteAlpha.300")(props)
    },
    _disabled: {
      opacity: 0.4,
      cursor: "not-allowed"
    }
  };
};

var baseStyle$h = function baseStyle(props) {
  return {
    root: baseStyleRoot$1,
    field: baseStyleField$1,
    stepperGroup: baseStyleStepperGroup,
    stepper: baseStyleStepper(props)
  };
};

function getSize(size) {
  var _sizeStyle$field$font, _sizeStyle$field;

  var sizeStyle = Input.sizes[size];
  var radius = {
    lg: "md",
    md: "md",
    sm: "sm",
    xs: "sm"
  };

  var _fontSize = (_sizeStyle$field$font = (_sizeStyle$field = sizeStyle.field) == null ? void 0 : _sizeStyle$field.fontSize) != null ? _sizeStyle$field$font : "md";

  var fontSize = typography$1.fontSizes[_fontSize.toString()];

  return {
    field: _extends$2({}, sizeStyle.field, {
      paddingInlineEnd: $inputPadding.reference,
      verticalAlign: "top"
    }),
    stepper: {
      fontSize: calc(fontSize).multiply(0.75).toString(),
      _first: {
        borderTopEndRadius: radius[size]
      },
      _last: {
        borderBottomEndRadius: radius[size],
        mt: "-1px",
        borderTopWidth: 1
      }
    }
  };
}

var sizes$c = {
  xs: getSize("xs"),
  sm: getSize("sm"),
  md: getSize("md"),
  lg: getSize("lg")
};
var NumberInput = {
  parts: numberInputAnatomy.keys,
  baseStyle: baseStyle$h,
  sizes: sizes$c,
  variants: variants$5,
  defaultProps: defaultProps$b
};

var _Input$variants$unsty$1;

var baseStyle$g = _extends$2({}, Input.baseStyle.field, {
  textAlign: "center"
});

var sizes$b = {
  lg: {
    fontSize: "lg",
    w: 12,
    h: 12,
    borderRadius: "md"
  },
  md: {
    fontSize: "md",
    w: 10,
    h: 10,
    borderRadius: "md"
  },
  sm: {
    fontSize: "sm",
    w: 8,
    h: 8,
    borderRadius: "sm"
  },
  xs: {
    fontSize: "xs",
    w: 6,
    h: 6,
    borderRadius: "sm"
  }
};
var variants$4 = {
  outline: function outline(props) {
    var _Input$variants$outli;

    return (_Input$variants$outli = Input.variants.outline(props).field) != null ? _Input$variants$outli : {};
  },
  flushed: function flushed(props) {
    var _Input$variants$flush;

    return (_Input$variants$flush = Input.variants.flushed(props).field) != null ? _Input$variants$flush : {};
  },
  filled: function filled(props) {
    var _Input$variants$fille;

    return (_Input$variants$fille = Input.variants.filled(props).field) != null ? _Input$variants$fille : {};
  },
  unstyled: (_Input$variants$unsty$1 = Input.variants.unstyled.field) != null ? _Input$variants$unsty$1 : {}
};
var defaultProps$a = Input.defaultProps;
var PinInput = {
  baseStyle: baseStyle$g,
  sizes: sizes$b,
  variants: variants$4,
  defaultProps: defaultProps$a
};

var $popperBg = cssVar("popper-bg");
var $arrowBg$1 = cssVar("popper-arrow-bg");
var $arrowShadowColor = cssVar("popper-arrow-shadow-color");
var baseStylePopper = {
  zIndex: 10
};

var baseStyleContent = function baseStyleContent(props) {
  var _ref;

  var bg = mode("white", "gray.700")(props);
  var shadowColor = mode("gray.200", "whiteAlpha.300")(props);
  return _ref = {}, _ref[$popperBg.variable] = "colors." + bg, _ref.bg = $popperBg.reference, _ref[$arrowBg$1.variable] = $popperBg.reference, _ref[$arrowShadowColor.variable] = "colors." + shadowColor, _ref.width = "xs", _ref.border = "1px solid", _ref.borderColor = "inherit", _ref.borderRadius = "md", _ref.boxShadow = "sm", _ref.zIndex = "inherit", _ref._focus = {
    outline: 0,
    boxShadow: "outline"
  }, _ref;
};

var baseStyleHeader = {
  px: 3,
  py: 2,
  borderBottomWidth: "1px"
};
var baseStyleBody = {
  px: 3,
  py: 2
};
var baseStyleFooter = {
  px: 3,
  py: 2,
  borderTopWidth: "1px"
};
var baseStyleCloseButton$1 = {
  position: "absolute",
  borderRadius: "md",
  top: 1,
  insetEnd: 2,
  padding: 2
};

var baseStyle$f = function baseStyle(props) {
  return {
    popper: baseStylePopper,
    content: baseStyleContent(props),
    header: baseStyleHeader,
    body: baseStyleBody,
    footer: baseStyleFooter,
    arrow: {},
    closeButton: baseStyleCloseButton$1
  };
};

var Popover = {
  parts: popoverAnatomy.keys,
  baseStyle: baseStyle$f
};

function filledStyle(props) {
  var c = props.colorScheme,
      t = props.theme,
      isIndeterminate = props.isIndeterminate,
      hasStripe = props.hasStripe;
  var stripeStyle = mode(generateStripe(), generateStripe("1rem", "rgba(0,0,0,0.1)"))(props);
  var bgColor = mode(c + ".500", c + ".200")(props);
  var gradient = "linear-gradient(\n    to right,\n    transparent 0%,\n    " + getColor(t, bgColor) + " 50%,\n    transparent 100%\n  )";
  var addStripe = !isIndeterminate && hasStripe;
  return _extends$2({}, addStripe && stripeStyle, isIndeterminate ? {
    bgImage: gradient
  } : {
    bgColor: bgColor
  });
}

var baseStyleLabel$2 = {
  lineHeight: "1",
  fontSize: "0.25em",
  fontWeight: "bold",
  color: "white"
};

var baseStyleTrack$2 = function baseStyleTrack(props) {
  return {
    bg: mode("gray.100", "whiteAlpha.300")(props)
  };
};

var baseStyleFilledTrack$1 = function baseStyleFilledTrack(props) {
  return _extends$2({
    transitionProperty: "common",
    transitionDuration: "slow"
  }, filledStyle(props));
};

var baseStyle$e = function baseStyle(props) {
  return {
    label: baseStyleLabel$2,
    filledTrack: baseStyleFilledTrack$1(props),
    track: baseStyleTrack$2(props)
  };
};

var sizes$a = {
  xs: {
    track: {
      h: "0.25rem"
    }
  },
  sm: {
    track: {
      h: "0.5rem"
    }
  },
  md: {
    track: {
      h: "0.75rem"
    }
  },
  lg: {
    track: {
      h: "1rem"
    }
  }
};
var defaultProps$9 = {
  size: "md",
  colorScheme: "blue"
};
var Progress = {
  parts: progressAnatomy.keys,
  sizes: sizes$a,
  baseStyle: baseStyle$e,
  defaultProps: defaultProps$9
};

var baseStyleControl = function baseStyleControl(props) {
  var _Checkbox$baseStyle = Checkbox.baseStyle(props),
      _Checkbox$baseStyle$c = _Checkbox$baseStyle.control,
      control = _Checkbox$baseStyle$c === void 0 ? {} : _Checkbox$baseStyle$c;

  return _extends$2({}, control, {
    borderRadius: "full",
    _checked: _extends$2({}, control["_checked"], {
      _before: {
        content: "\"\"",
        display: "inline-block",
        pos: "relative",
        w: "50%",
        h: "50%",
        borderRadius: "50%",
        bg: "currentColor"
      }
    })
  });
};

var baseStyle$d = function baseStyle(props) {
  return {
    label: Checkbox.baseStyle(props).label,
    control: baseStyleControl(props)
  };
};

var sizes$9 = {
  md: {
    control: {
      w: 4,
      h: 4
    },
    label: {
      fontSize: "md"
    }
  },
  lg: {
    control: {
      w: 5,
      h: 5
    },
    label: {
      fontSize: "lg"
    }
  },
  sm: {
    control: {
      width: 3,
      height: 3
    },
    label: {
      fontSize: "sm"
    }
  }
};
var defaultProps$8 = {
  size: "md",
  colorScheme: "blue"
};
var Radio = {
  parts: radioAnatomy.keys,
  baseStyle: baseStyle$d,
  sizes: sizes$9,
  defaultProps: defaultProps$8
};

var baseStyleField = function baseStyleField(props) {
  return _extends$2({}, Input.baseStyle.field, {
    bg: mode("white", "gray.700")(props),
    appearance: "none",
    paddingBottom: "1px",
    lineHeight: "normal",
    "> option, > optgroup": {
      bg: mode("white", "gray.700")(props)
    }
  });
};

var baseStyleIcon$2 = {
  width: "1.5rem",
  height: "100%",
  insetEnd: "0.5rem",
  position: "relative",
  color: "currentColor",
  fontSize: "1.25rem",
  _disabled: {
    opacity: 0.5
  }
};

var baseStyle$c = function baseStyle(props) {
  return {
    field: baseStyleField(props),
    icon: baseStyleIcon$2
  };
};

var iconSpacing = {
  paddingInlineEnd: "2rem"
};
var sizes$8 = lodash_mergewith({}, Input.sizes, {
  lg: {
    field: iconSpacing
  },
  md: {
    field: iconSpacing
  },
  sm: {
    field: iconSpacing
  },
  xs: {
    field: iconSpacing,
    icon: {
      insetEnd: "0.25rem"
    }
  }
});
var Select = {
  parts: selectAnatomy.keys,
  baseStyle: baseStyle$c,
  sizes: sizes$8,
  variants: Input.variants,
  defaultProps: Input.defaultProps
};

var fade = function fade(startColor, endColor) {
  return keyframes$2({
    from: {
      borderColor: startColor,
      background: startColor
    },
    to: {
      borderColor: endColor,
      background: endColor
    }
  });
};

var baseStyle$b = function baseStyle(props) {
  var defaultStartColor = mode("gray.100", "gray.800")(props);
  var defaultEndColor = mode("gray.400", "gray.600")(props);
  var _props$startColor = props.startColor,
      startColor = _props$startColor === void 0 ? defaultStartColor : _props$startColor,
      _props$endColor = props.endColor,
      endColor = _props$endColor === void 0 ? defaultEndColor : _props$endColor,
      speed = props.speed,
      theme = props.theme;
  var start = getColor(theme, startColor);
  var end = getColor(theme, endColor);
  return {
    opacity: 0.7,
    borderRadius: "2px",
    borderColor: start,
    background: end,
    animation: speed + "s linear infinite alternate " + fade(start, end)
  };
};

var Skeleton = {
  baseStyle: baseStyle$b
};

var baseStyle$a = function baseStyle(props) {
  return {
    borderRadius: "md",
    fontWeight: "semibold",
    _focus: {
      boxShadow: "outline",
      padding: "1rem",
      position: "fixed",
      top: "1.5rem",
      insetStart: "1.5rem",
      bg: mode("white", "gray.700")(props)
    }
  };
};

var SkipLink = {
  baseStyle: baseStyle$a
};

function thumbOrientation(props) {
  return orient({
    orientation: props.orientation,
    vertical: {
      left: "50%",
      transform: "translateX(-50%)",
      _active: {
        transform: "translateX(-50%) scale(1.15)"
      }
    },
    horizontal: {
      top: "50%",
      transform: "translateY(-50%)",
      _active: {
        transform: "translateY(-50%) scale(1.15)"
      }
    }
  });
}

var baseStyleContainer$1 = function baseStyleContainer(props) {
  var orientation = props.orientation;
  return _extends$2({
    display: "inline-block",
    position: "relative",
    cursor: "pointer",
    _disabled: {
      opacity: 0.6,
      cursor: "default",
      pointerEvents: "none"
    }
  }, orient({
    orientation: orientation,
    vertical: {
      h: "100%"
    },
    horizontal: {
      w: "100%"
    }
  }));
};

var baseStyleTrack$1 = function baseStyleTrack(props) {
  return {
    overflow: "hidden",
    borderRadius: "sm",
    bg: mode("gray.200", "whiteAlpha.200")(props),
    _disabled: {
      bg: mode("gray.300", "whiteAlpha.300")(props)
    }
  };
};

var baseStyleThumb$1 = function baseStyleThumb(props) {
  return _extends$2({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    outline: 0,
    zIndex: 1,
    borderRadius: "full",
    bg: "white",
    boxShadow: "base",
    border: "1px solid",
    borderColor: "transparent",
    transitionProperty: "transform",
    transitionDuration: "normal",
    _focus: {
      boxShadow: "outline"
    },
    _disabled: {
      bg: "gray.300"
    }
  }, thumbOrientation(props));
};

var baseStyleFilledTrack = function baseStyleFilledTrack(props) {
  var c = props.colorScheme;
  return {
    width: "inherit",
    height: "inherit",
    bg: mode(c + ".500", c + ".200")(props)
  };
};

var baseStyle$9 = function baseStyle(props) {
  return {
    container: baseStyleContainer$1(props),
    track: baseStyleTrack$1(props),
    thumb: baseStyleThumb$1(props),
    filledTrack: baseStyleFilledTrack(props)
  };
};

var sizeLg = function sizeLg(props) {
  return {
    thumb: {
      w: "16px",
      h: "16px"
    },
    track: orient({
      orientation: props.orientation,
      horizontal: {
        h: "4px"
      },
      vertical: {
        w: "4px"
      }
    })
  };
};

var sizeMd = function sizeMd(props) {
  return {
    thumb: {
      w: "14px",
      h: "14px"
    },
    track: orient({
      orientation: props.orientation,
      horizontal: {
        h: "4px"
      },
      vertical: {
        w: "4px"
      }
    })
  };
};

var sizeSm = function sizeSm(props) {
  return {
    thumb: {
      w: "10px",
      h: "10px"
    },
    track: orient({
      orientation: props.orientation,
      horizontal: {
        h: "2px"
      },
      vertical: {
        w: "2px"
      }
    })
  };
};

var sizes$7 = {
  lg: sizeLg,
  md: sizeMd,
  sm: sizeSm
};
var defaultProps$7 = {
  size: "md",
  colorScheme: "blue"
};
var Slider = {
  parts: sliderAnatomy.keys,
  sizes: sizes$7,
  baseStyle: baseStyle$9,
  defaultProps: defaultProps$7
};

var _xs, _sm, _md, _lg, _xl;
var $size = cssVar("spinner-size");
var baseStyle$8 = {
  width: [$size.reference],
  height: [$size.reference]
};
var sizes$6 = {
  xs: (_xs = {}, _xs[$size.variable] = "0.75rem", _xs),
  sm: (_sm = {}, _sm[$size.variable] = "1rem", _sm),
  md: (_md = {}, _md[$size.variable] = "1.5rem", _md),
  lg: (_lg = {}, _lg[$size.variable] = "2rem", _lg),
  xl: (_xl = {}, _xl[$size.variable] = "3rem", _xl)
};
var defaultProps$6 = {
  size: "md"
};
var Spinner = {
  baseStyle: baseStyle$8,
  sizes: sizes$6,
  defaultProps: defaultProps$6
};

var baseStyleLabel$1 = {
  fontWeight: "medium"
};
var baseStyleHelpText = {
  opacity: 0.8,
  marginBottom: 2
};
var baseStyleNumber = {
  verticalAlign: "baseline",
  fontWeight: "semibold"
};
var baseStyleIcon$1 = {
  marginEnd: 1,
  w: "14px",
  h: "14px",
  verticalAlign: "middle"
};
var baseStyle$7 = {
  container: {},
  label: baseStyleLabel$1,
  helpText: baseStyleHelpText,
  number: baseStyleNumber,
  icon: baseStyleIcon$1
};
var sizes$5 = {
  md: {
    label: {
      fontSize: "sm"
    },
    helpText: {
      fontSize: "sm"
    },
    number: {
      fontSize: "2xl"
    }
  }
};
var defaultProps$5 = {
  size: "md"
};
var Stat = {
  parts: statAnatomy.keys,
  baseStyle: baseStyle$7,
  sizes: sizes$5,
  defaultProps: defaultProps$5
};

var _container2, _container3, _container4;
var $width = cssVar("switch-track-width");
var $height = cssVar("switch-track-height");
var $diff = cssVar("switch-track-diff");
var diffValue = calc.subtract($width, $height);
var $translateX = cssVar("switch-thumb-x");

var baseStyleTrack = function baseStyleTrack(props) {
  var c = props.colorScheme;
  return {
    borderRadius: "full",
    p: "2px",
    width: [$width.reference],
    height: [$height.reference],
    transitionProperty: "common",
    transitionDuration: "fast",
    bg: mode("gray.300", "whiteAlpha.400")(props),
    _focus: {
      boxShadow: "outline"
    },
    _disabled: {
      opacity: 0.4,
      cursor: "not-allowed"
    },
    _checked: {
      bg: mode(c + ".500", c + ".200")(props)
    }
  };
};

var baseStyleThumb = {
  bg: "white",
  transitionProperty: "transform",
  transitionDuration: "normal",
  borderRadius: "inherit",
  width: [$height.reference],
  height: [$height.reference],
  _checked: {
    transform: "translateX(" + $translateX.reference + ")"
  }
};

var baseStyle$6 = function baseStyle(props) {
  var _rtl, _container;

  return {
    container: (_container = {}, _container[$diff.variable] = diffValue, _container[$translateX.variable] = $diff.reference, _container._rtl = (_rtl = {}, _rtl[$translateX.variable] = calc($diff).negate().toString(), _rtl), _container),
    track: baseStyleTrack(props),
    thumb: baseStyleThumb
  };
};

var sizes$4 = {
  sm: {
    container: (_container2 = {}, _container2[$width.variable] = "1.375rem", _container2[$height.variable] = "0.75rem", _container2)
  },
  md: {
    container: (_container3 = {}, _container3[$width.variable] = "1.875rem", _container3[$height.variable] = "1rem", _container3)
  },
  lg: {
    container: (_container4 = {}, _container4[$width.variable] = "2.875rem", _container4[$height.variable] = "1.5rem", _container4)
  }
};
var defaultProps$4 = {
  size: "md",
  colorScheme: "blue"
};
var Switch = {
  parts: switchAnatomy.keys,
  baseStyle: baseStyle$6,
  sizes: sizes$4,
  defaultProps: defaultProps$4
};

var baseStyle$5 = {
  table: {
    fontVariantNumeric: "lining-nums tabular-nums",
    borderCollapse: "collapse",
    width: "full"
  },
  th: {
    fontFamily: "heading",
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: "wider",
    textAlign: "start"
  },
  td: {
    textAlign: "start"
  },
  caption: {
    mt: 4,
    fontFamily: "heading",
    textAlign: "center",
    fontWeight: "medium"
  }
};
var numericStyles = {
  "&[data-is-numeric=true]": {
    textAlign: "end"
  }
};

var variantSimple = function variantSimple(props) {
  var c = props.colorScheme;
  return {
    th: _extends$2({
      color: mode("gray.600", "gray.400")(props),
      borderBottom: "1px",
      borderColor: mode(c + ".100", c + ".700")(props)
    }, numericStyles),
    td: _extends$2({
      borderBottom: "1px",
      borderColor: mode(c + ".100", c + ".700")(props)
    }, numericStyles),
    caption: {
      color: mode("gray.600", "gray.100")(props)
    },
    tfoot: {
      tr: {
        "&:last-of-type": {
          th: {
            borderBottomWidth: 0
          }
        }
      }
    }
  };
};

var variantStripe = function variantStripe(props) {
  var c = props.colorScheme;
  return {
    th: _extends$2({
      color: mode("gray.600", "gray.400")(props),
      borderBottom: "1px",
      borderColor: mode(c + ".100", c + ".700")(props)
    }, numericStyles),
    td: _extends$2({
      borderBottom: "1px",
      borderColor: mode(c + ".100", c + ".700")(props)
    }, numericStyles),
    caption: {
      color: mode("gray.600", "gray.100")(props)
    },
    tbody: {
      tr: {
        "&:nth-of-type(odd)": {
          "th, td": {
            borderBottomWidth: "1px",
            borderColor: mode(c + ".100", c + ".700")(props)
          },
          td: {
            background: mode(c + ".100", c + ".700")(props)
          }
        }
      }
    },
    tfoot: {
      tr: {
        "&:last-of-type": {
          th: {
            borderBottomWidth: 0
          }
        }
      }
    }
  };
};

var variants$3 = {
  simple: variantSimple,
  striped: variantStripe,
  unstyled: {}
};
var sizes$3 = {
  sm: {
    th: {
      px: "4",
      py: "1",
      lineHeight: "4",
      fontSize: "xs"
    },
    td: {
      px: "4",
      py: "2",
      fontSize: "sm",
      lineHeight: "4"
    },
    caption: {
      px: "4",
      py: "2",
      fontSize: "xs"
    }
  },
  md: {
    th: {
      px: "6",
      py: "3",
      lineHeight: "4",
      fontSize: "xs"
    },
    td: {
      px: "6",
      py: "4",
      lineHeight: "5"
    },
    caption: {
      px: "6",
      py: "2",
      fontSize: "sm"
    }
  },
  lg: {
    th: {
      px: "8",
      py: "4",
      lineHeight: "5",
      fontSize: "sm"
    },
    td: {
      px: "8",
      py: "5",
      lineHeight: "6"
    },
    caption: {
      px: "6",
      py: "2",
      fontSize: "md"
    }
  }
};
var defaultProps$3 = {
  variant: "simple",
  size: "md",
  colorScheme: "gray"
};
var Table = {
  parts: tableAnatomy.keys,
  baseStyle: baseStyle$5,
  variants: variants$3,
  sizes: sizes$3,
  defaultProps: defaultProps$3
};

var baseStyleRoot = function baseStyleRoot(props) {
  var orientation = props.orientation;
  return {
    display: orientation === "vertical" ? "flex" : "block"
  };
};

var baseStyleTab = function baseStyleTab(props) {
  var isFitted = props.isFitted;
  return {
    flex: isFitted ? 1 : undefined,
    transitionProperty: "common",
    transitionDuration: "normal",
    _focus: {
      zIndex: 1,
      boxShadow: "outline"
    }
  };
};

var baseStyleTablist = function baseStyleTablist(props) {
  var _props$align = props.align,
      align = _props$align === void 0 ? "start" : _props$align,
      orientation = props.orientation;
  var alignments = {
    end: "flex-end",
    center: "center",
    start: "flex-start"
  };
  return {
    justifyContent: alignments[align],
    flexDirection: orientation === "vertical" ? "column" : "row"
  };
};

var baseStyleTabpanel = {
  p: 4
};

var baseStyle$4 = function baseStyle(props) {
  return {
    root: baseStyleRoot(props),
    tab: baseStyleTab(props),
    tablist: baseStyleTablist(props),
    tabpanel: baseStyleTabpanel
  };
};

var sizes$2 = {
  sm: {
    tab: {
      py: 1,
      px: 4,
      fontSize: "sm"
    }
  },
  md: {
    tab: {
      fontSize: "md",
      py: 2,
      px: 4
    }
  },
  lg: {
    tab: {
      fontSize: "lg",
      py: 3,
      px: 4
    }
  }
};

var variantLine = function variantLine(props) {
  var _tablist, _tab;

  var c = props.colorScheme,
      orientation = props.orientation;
  var isVertical = orientation === "vertical";
  var borderProp = orientation === "vertical" ? "borderStart" : "borderBottom";
  var marginProp = isVertical ? "marginStart" : "marginBottom";
  return {
    tablist: (_tablist = {}, _tablist[borderProp] = "2px solid", _tablist.borderColor = "inherit", _tablist),
    tab: (_tab = {}, _tab[borderProp] = "2px solid", _tab.borderColor = "transparent", _tab[marginProp] = "-2px", _tab._selected = {
      color: mode(c + ".600", c + ".300")(props),
      borderColor: "currentColor"
    }, _tab._active = {
      bg: mode("gray.200", "whiteAlpha.300")(props)
    }, _tab._disabled = {
      opacity: 0.4,
      cursor: "not-allowed"
    }, _tab)
  };
};

var variantEnclosed = function variantEnclosed(props) {
  var c = props.colorScheme;
  return {
    tab: {
      borderTopRadius: "md",
      border: "1px solid",
      borderColor: "transparent",
      mb: "-1px",
      _selected: {
        color: mode(c + ".600", c + ".300")(props),
        borderColor: "inherit",
        borderBottomColor: mode("white", "gray.800")(props)
      }
    },
    tablist: {
      mb: "-1px",
      borderBottom: "1px solid",
      borderColor: "inherit"
    }
  };
};

var variantEnclosedColored = function variantEnclosedColored(props) {
  var c = props.colorScheme;
  return {
    tab: {
      border: "1px solid",
      borderColor: "inherit",
      bg: mode("gray.50", "whiteAlpha.50")(props),
      mb: "-1px",
      _notLast: {
        marginEnd: "-1px"
      },
      _selected: {
        bg: mode("#fff", "gray.800")(props),
        color: mode(c + ".600", c + ".300")(props),
        borderColor: "inherit",
        borderTopColor: "currentColor",
        borderBottomColor: "transparent"
      }
    },
    tablist: {
      mb: "-1px",
      borderBottom: "1px solid",
      borderColor: "inherit"
    }
  };
};

var variantSoftRounded = function variantSoftRounded(props) {
  var c = props.colorScheme,
      theme = props.theme;
  return {
    tab: {
      borderRadius: "full",
      fontWeight: "semibold",
      color: "gray.600",
      _selected: {
        color: getColor(theme, c + ".700"),
        bg: getColor(theme, c + ".100")
      }
    }
  };
};

var variantSolidRounded = function variantSolidRounded(props) {
  var c = props.colorScheme;
  return {
    tab: {
      borderRadius: "full",
      fontWeight: "semibold",
      color: mode("gray.600", "inherit")(props),
      _selected: {
        color: mode("#fff", "gray.800")(props),
        bg: mode(c + ".600", c + ".300")(props)
      }
    }
  };
};

var variantUnstyled = {};
var variants$2 = {
  line: variantLine,
  enclosed: variantEnclosed,
  "enclosed-colored": variantEnclosedColored,
  "soft-rounded": variantSoftRounded,
  "solid-rounded": variantSolidRounded,
  unstyled: variantUnstyled
};
var defaultProps$2 = {
  size: "md",
  variant: "line",
  colorScheme: "blue"
};
var Tabs = {
  parts: tabsAnatomy.keys,
  baseStyle: baseStyle$4,
  sizes: sizes$2,
  variants: variants$2,
  defaultProps: defaultProps$2
};

var baseStyleContainer = {
  fontWeight: "medium",
  lineHeight: 1.2,
  outline: 0,
  _focus: {
    boxShadow: "outline"
  }
};
var baseStyleLabel = {
  lineHeight: 1.2,
  overflow: "visible"
};
var baseStyleCloseButton = {
  fontSize: "18px",
  w: "1.25rem",
  h: "1.25rem",
  transitionProperty: "common",
  transitionDuration: "normal",
  borderRadius: "full",
  marginStart: "0.375rem",
  marginEnd: "-1",
  opacity: 0.5,
  _disabled: {
    opacity: 0.4
  },
  _focus: {
    boxShadow: "outline",
    bg: "rgba(0, 0, 0, 0.14)"
  },
  _hover: {
    opacity: 0.8
  },
  _active: {
    opacity: 1
  }
};
var baseStyle$3 = {
  container: baseStyleContainer,
  label: baseStyleLabel,
  closeButton: baseStyleCloseButton
};
var sizes$1 = {
  sm: {
    container: {
      minH: "1.25rem",
      minW: "1.25rem",
      fontSize: "xs",
      px: 2,
      borderRadius: "md"
    },
    closeButton: {
      marginEnd: "-2px",
      marginStart: "0.35rem"
    }
  },
  md: {
    container: {
      minH: "1.5rem",
      minW: "1.5rem",
      fontSize: "sm",
      borderRadius: "md",
      px: 2
    }
  },
  lg: {
    container: {
      minH: 8,
      minW: 8,
      fontSize: "md",
      borderRadius: "md",
      px: 3
    }
  }
};
var variants$1 = {
  subtle: function subtle(props) {
    return {
      container: Badge.variants.subtle(props)
    };
  },
  solid: function solid(props) {
    return {
      container: Badge.variants.solid(props)
    };
  },
  outline: function outline(props) {
    return {
      container: Badge.variants.outline(props)
    };
  }
};
var defaultProps$1 = {
  size: "md",
  variant: "subtle",
  colorScheme: "gray"
};
var Tag = {
  parts: tagAnatomy.keys,
  variants: variants$1,
  baseStyle: baseStyle$3,
  sizes: sizes$1,
  defaultProps: defaultProps$1
};

var _Input$variants$unsty, _Input$sizes$xs$field, _Input$sizes$sm$field, _Input$sizes$md$field, _Input$sizes$lg$field;

var baseStyle$2 = _extends$2({}, Input.baseStyle.field, {
  paddingY: "8px",
  minHeight: "80px",
  lineHeight: "short",
  verticalAlign: "top"
});

var variants = {
  outline: function outline(props) {
    var _Input$variants$outli;

    return (_Input$variants$outli = Input.variants.outline(props).field) != null ? _Input$variants$outli : {};
  },
  flushed: function flushed(props) {
    var _Input$variants$flush;

    return (_Input$variants$flush = Input.variants.flushed(props).field) != null ? _Input$variants$flush : {};
  },
  filled: function filled(props) {
    var _Input$variants$fille;

    return (_Input$variants$fille = Input.variants.filled(props).field) != null ? _Input$variants$fille : {};
  },
  unstyled: (_Input$variants$unsty = Input.variants.unstyled.field) != null ? _Input$variants$unsty : {}
};
var sizes = {
  xs: (_Input$sizes$xs$field = Input.sizes.xs.field) != null ? _Input$sizes$xs$field : {},
  sm: (_Input$sizes$sm$field = Input.sizes.sm.field) != null ? _Input$sizes$sm$field : {},
  md: (_Input$sizes$md$field = Input.sizes.md.field) != null ? _Input$sizes$md$field : {},
  lg: (_Input$sizes$lg$field = Input.sizes.lg.field) != null ? _Input$sizes$lg$field : {}
};
var defaultProps = {
  size: "md",
  variant: "outline"
};
var Textarea = {
  baseStyle: baseStyle$2,
  sizes: sizes,
  variants: variants,
  defaultProps: defaultProps
};

var $bg = cssVar("tooltip-bg");
var $arrowBg = cssVar("popper-arrow-bg");

var baseStyle$1 = function baseStyle(props) {
  var _ref;

  var bg = mode("gray.700", "gray.300")(props);
  return _ref = {}, _ref[$bg.variable] = "colors." + bg, _ref.px = "8px", _ref.py = "2px", _ref.bg = [$bg.reference], _ref[$arrowBg.variable] = [$bg.reference], _ref.color = mode("whiteAlpha.900", "gray.900")(props), _ref.borderRadius = "sm", _ref.fontWeight = "medium", _ref.fontSize = "sm", _ref.boxShadow = "md", _ref.maxW = "320px", _ref.zIndex = "tooltip", _ref;
};

var Tooltip = {
  baseStyle: baseStyle$1
};

var baseStyleText = function baseStyleText(props) {
  return {
    color: mode("red.500", "red.300")(props),
    mt: 2,
    fontSize: "sm"
  };
};

var baseStyleIcon = function baseStyleIcon(props) {
  return {
    marginEnd: "0.5em",
    color: mode("red.500", "red.300")(props)
  };
};

var baseStyle = function baseStyle(props) {
  return {
    text: baseStyleText(props),
    icon: baseStyleIcon(props)
  };
};

var FormError = {
  parts: formErrorAnatomy.keys,
  baseStyle: baseStyle
};

var components = {
  Accordion: Accordion,
  Alert: Alert,
  Avatar: Avatar,
  Badge: Badge,
  Breadcrumb: Breadcrumb,
  Button: Button,
  Checkbox: Checkbox,
  CloseButton: CloseButton,
  Code: Code,
  Container: Container,
  Divider: Divider,
  Drawer: Drawer,
  Editable: Editable,
  Form: Form,
  FormLabel: FormLabel,
  Heading: Heading,
  Input: Input,
  Kbd: Kbd,
  Link: Link,
  List: List,
  Menu: Menu,
  Modal: Modal,
  NumberInput: NumberInput,
  PinInput: PinInput,
  Popover: Popover,
  Progress: Progress,
  Radio: Radio,
  Select: Select,
  Skeleton: Skeleton,
  SkipLink: SkipLink,
  Slider: Slider,
  Spinner: Spinner,
  Stat: Stat,
  Switch: Switch,
  Table: Table,
  Tabs: Tabs,
  Tag: Tag,
  Textarea: Textarea,
  Tooltip: Tooltip,
  FormError: FormError
};

var borders = {
  none: 0,
  "1px": "1px solid",
  "2px": "2px solid",
  "4px": "4px solid",
  "8px": "8px solid"
};
var borders$1 = borders;

/**
 * Breakpoints for responsive design
 */

var breakpoints = createBreakpoints({
  sm: "30em",
  md: "48em",
  lg: "62em",
  xl: "80em",
  "2xl": "96em"
});
var breakpoints$1 = breakpoints;

/**
 * @deprecated
 * You can derive the Colors type from the DefaultChakraTheme:
 *
 * type Colors = DefaultChakraTheme["colors"]
 */
var colors = {
  transparent: "transparent",
  current: "currentColor",
  black: "#000000",
  white: "#FFFFFF",
  whiteAlpha: {
    50: "rgba(255, 255, 255, 0.04)",
    100: "rgba(255, 255, 255, 0.06)",
    200: "rgba(255, 255, 255, 0.08)",
    300: "rgba(255, 255, 255, 0.16)",
    400: "rgba(255, 255, 255, 0.24)",
    500: "rgba(255, 255, 255, 0.36)",
    600: "rgba(255, 255, 255, 0.48)",
    700: "rgba(255, 255, 255, 0.64)",
    800: "rgba(255, 255, 255, 0.80)",
    900: "rgba(255, 255, 255, 0.92)"
  },
  blackAlpha: {
    50: "rgba(0, 0, 0, 0.04)",
    100: "rgba(0, 0, 0, 0.06)",
    200: "rgba(0, 0, 0, 0.08)",
    300: "rgba(0, 0, 0, 0.16)",
    400: "rgba(0, 0, 0, 0.24)",
    500: "rgba(0, 0, 0, 0.36)",
    600: "rgba(0, 0, 0, 0.48)",
    700: "rgba(0, 0, 0, 0.64)",
    800: "rgba(0, 0, 0, 0.80)",
    900: "rgba(0, 0, 0, 0.92)"
  },
  gray: {
    50: "#F7FAFC",
    100: "#EDF2F7",
    200: "#E2E8F0",
    300: "#CBD5E0",
    400: "#A0AEC0",
    500: "#718096",
    600: "#4A5568",
    700: "#2D3748",
    800: "#1A202C",
    900: "#171923"
  },
  red: {
    50: "#FFF5F5",
    100: "#FED7D7",
    200: "#FEB2B2",
    300: "#FC8181",
    400: "#F56565",
    500: "#E53E3E",
    600: "#C53030",
    700: "#9B2C2C",
    800: "#822727",
    900: "#63171B"
  },
  orange: {
    50: "#FFFAF0",
    100: "#FEEBC8",
    200: "#FBD38D",
    300: "#F6AD55",
    400: "#ED8936",
    500: "#DD6B20",
    600: "#C05621",
    700: "#9C4221",
    800: "#7B341E",
    900: "#652B19"
  },
  yellow: {
    50: "#FFFFF0",
    100: "#FEFCBF",
    200: "#FAF089",
    300: "#F6E05E",
    400: "#ECC94B",
    500: "#D69E2E",
    600: "#B7791F",
    700: "#975A16",
    800: "#744210",
    900: "#5F370E"
  },
  green: {
    50: "#F0FFF4",
    100: "#C6F6D5",
    200: "#9AE6B4",
    300: "#68D391",
    400: "#48BB78",
    500: "#38A169",
    600: "#2F855A",
    700: "#276749",
    800: "#22543D",
    900: "#1C4532"
  },
  teal: {
    50: "#E6FFFA",
    100: "#B2F5EA",
    200: "#81E6D9",
    300: "#4FD1C5",
    400: "#38B2AC",
    500: "#319795",
    600: "#2C7A7B",
    700: "#285E61",
    800: "#234E52",
    900: "#1D4044"
  },
  blue: {
    50: "#ebf8ff",
    100: "#bee3f8",
    200: "#90cdf4",
    300: "#63b3ed",
    400: "#4299e1",
    500: "#3182ce",
    600: "#2b6cb0",
    700: "#2c5282",
    800: "#2a4365",
    900: "#1A365D"
  },
  cyan: {
    50: "#EDFDFD",
    100: "#C4F1F9",
    200: "#9DECF9",
    300: "#76E4F7",
    400: "#0BC5EA",
    500: "#00B5D8",
    600: "#00A3C4",
    700: "#0987A0",
    800: "#086F83",
    900: "#065666"
  },
  purple: {
    50: "#FAF5FF",
    100: "#E9D8FD",
    200: "#D6BCFA",
    300: "#B794F4",
    400: "#9F7AEA",
    500: "#805AD5",
    600: "#6B46C1",
    700: "#553C9A",
    800: "#44337A",
    900: "#322659"
  },
  pink: {
    50: "#FFF5F7",
    100: "#FED7E2",
    200: "#FBB6CE",
    300: "#F687B3",
    400: "#ED64A6",
    500: "#D53F8C",
    600: "#B83280",
    700: "#97266D",
    800: "#702459",
    900: "#521B41"
  },
  linkedin: {
    50: "#E8F4F9",
    100: "#CFEDFB",
    200: "#9BDAF3",
    300: "#68C7EC",
    400: "#34B3E4",
    500: "#00A0DC",
    600: "#008CC9",
    700: "#0077B5",
    800: "#005E93",
    900: "#004471"
  },
  facebook: {
    50: "#E8F4F9",
    100: "#D9DEE9",
    200: "#B7C2DA",
    300: "#6482C0",
    400: "#4267B2",
    500: "#385898",
    600: "#314E89",
    700: "#29487D",
    800: "#223B67",
    900: "#1E355B"
  },
  messenger: {
    50: "#D0E6FF",
    100: "#B9DAFF",
    200: "#A2CDFF",
    300: "#7AB8FF",
    400: "#2E90FF",
    500: "#0078FF",
    600: "#0063D1",
    700: "#0052AC",
    800: "#003C7E",
    900: "#002C5C"
  },
  whatsapp: {
    50: "#dffeec",
    100: "#b9f5d0",
    200: "#90edb3",
    300: "#65e495",
    400: "#3cdd78",
    500: "#22c35e",
    600: "#179848",
    700: "#0c6c33",
    800: "#01421c",
    900: "#001803"
  },
  twitter: {
    50: "#E5F4FD",
    100: "#C8E9FB",
    200: "#A8DCFA",
    300: "#83CDF7",
    400: "#57BBF5",
    500: "#1DA1F2",
    600: "#1A94DA",
    700: "#1681BF",
    800: "#136B9E",
    900: "#0D4D71"
  },
  telegram: {
    50: "#E3F2F9",
    100: "#C5E4F3",
    200: "#A2D4EC",
    300: "#7AC1E4",
    400: "#47A9DA",
    500: "#0088CC",
    600: "#007AB8",
    700: "#006BA1",
    800: "#005885",
    900: "#003F5E"
  }
};
var colors$1 = colors;

var radii = {
  none: "0",
  sm: "0.125rem",
  base: "0.25rem",
  md: "0.375rem",
  lg: "0.5rem",
  xl: "0.75rem",
  "2xl": "1rem",
  "3xl": "1.5rem",
  full: "9999px"
};
/**
 * @deprecated
 * You can derive the Radii type from the DefaultChakraTheme
 *
 * type Radii = DefaultChakraTheme['radii']
 */

var radii$1 = radii;

var shadows = {
  xs: "0 0 0 1px rgba(0, 0, 0, 0.05)",
  sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
  base: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
  md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
  xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
  outline: "0 0 0 3px rgba(66, 153, 225, 0.6)",
  inner: "inset 0 2px 4px 0 rgba(0,0,0,0.06)",
  none: "none",
  "dark-lg": "rgba(0, 0, 0, 0.1) 0px 0px 0px 1px, rgba(0, 0, 0, 0.2) 0px 5px 10px, rgba(0, 0, 0, 0.4) 0px 15px 40px"
};
/**
 * @deprecated
 * You can derive the Shadows type from the DefaultChakraTheme
 *
 * type Shadows = DefaultChakraTheme['shadows']
 */

var shadows$1 = shadows;

var transitionProperty = {
  common: "background-color, border-color, color, fill, stroke, opacity, box-shadow, transform",
  colors: "background-color, border-color, color, fill, stroke",
  dimensions: "width, height",
  position: "left, right, top, bottom",
  background: "background-color, background-image, background-position"
};
var transitionTimingFunction = {
  "ease-in": "cubic-bezier(0.4, 0, 1, 1)",
  "ease-out": "cubic-bezier(0, 0, 0.2, 1)",
  "ease-in-out": "cubic-bezier(0.4, 0, 0.2, 1)"
};
var transitionDuration = {
  "ultra-fast": "50ms",
  faster: "100ms",
  fast: "150ms",
  normal: "200ms",
  slow: "300ms",
  slower: "400ms",
  "ultra-slow": "500ms"
};
var transition = {
  property: transitionProperty,
  easing: transitionTimingFunction,
  duration: transitionDuration
};
var transition$1 = transition;

var zIndices = {
  hide: -1,
  auto: "auto",
  base: 0,
  docked: 10,
  dropdown: 1000,
  sticky: 1100,
  banner: 1200,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  skipLink: 1600,
  toast: 1700,
  tooltip: 1800
};
/**
 * @deprecated
 * You can derive the ZIndices type from the DefaultChakraTheme
 *
 * type ZIndices = DefaultChakraTheme['zIndices']
 */

var zIndices$1 = zIndices;

var blur = {
  none: 0,
  sm: "4px",
  base: "8px",
  md: "12px",
  lg: "16px",
  xl: "24px",
  "2xl": "40px",
  "3xl": "64px"
};
var blur$1 = blur;

var foundations = _extends$2({
  breakpoints: breakpoints$1,
  zIndices: zIndices$1,
  radii: radii$1,
  blur: blur$1,
  colors: colors$1
}, typography$1, {
  sizes: sizes$m,
  shadows: shadows$1,
  space: spacing,
  borders: borders$1,
  transition: transition$1
});

var foundations$1 = foundations;

var styles = {
  global: function global(props) {
    return {
      body: {
        fontFamily: "body",
        color: mode("gray.800", "whiteAlpha.900")(props),
        bg: mode("white", "gray.800")(props),
        transitionProperty: "background-color",
        transitionDuration: "normal",
        lineHeight: "base"
      },
      "*::placeholder": {
        color: mode("gray.400", "whiteAlpha.400")(props)
      },
      "*, *::before, &::after": {
        borderColor: mode("gray.200", "whiteAlpha.300")(props),
        wordWrap: "break-word"
      }
    };
  }
};
var styles$1 = styles;

var requiredChakraThemeKeys = ["borders", "breakpoints", "colors", "components", "config", "direction", "fonts", "fontSizes", "fontWeights", "letterSpacings", "lineHeights", "radii", "shadows", "sizes", "space", "styles", "transition", "zIndices"];
function isChakraTheme(unit) {
  if (!isObject(unit)) {
    return false;
  }

  return requiredChakraThemeKeys.every(function (propertyName) {
    return Object.prototype.hasOwnProperty.call(unit, propertyName);
  });
}

var direction = "ltr";
var config = {
  useSystemColorMode: false,
  initialColorMode: "light",
  cssVarPrefix: "chakra"
};
var theme = _extends$2({
  direction: direction
}, foundations$1, {
  components: components,
  styles: styles$1,
  config: config
});

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

var createDefinition = function (propNames) { return ({
    isEnabled: function (props) { return propNames.some(function (name) { return !!props[name]; }); },
}); };
var featureDefinitions = {
    measureLayout: createDefinition([
        "layout",
        "layoutId",
        "drag",
        "_layoutResetTransform",
    ]),
    animation: createDefinition([
        "animate",
        "exit",
        "variants",
        "whileHover",
        "whileTap",
        "whileFocus",
        "whileDrag",
    ]),
    exit: createDefinition(["exit"]),
    drag: createDefinition(["drag", "dragControls"]),
    focus: createDefinition(["whileFocus"]),
    hover: createDefinition(["whileHover", "onHoverStart", "onHoverEnd"]),
    tap: createDefinition(["whileTap", "onTap", "onTapStart", "onTapCancel"]),
    pan: createDefinition([
        "onPan",
        "onPanStart",
        "onPanSessionStart",
        "onPanEnd",
    ]),
    layoutAnimation: createDefinition(["layout", "layoutId"]),
};
function loadFeatures(features) {
    for (var key in features) {
        var Component = features[key];
        if (Component !== null)
            featureDefinitions[key].Component = Component;
    }
}

var invariant = function () { };

var LazyContext = react.createContext({ strict: false });

var featureNames = Object.keys(featureDefinitions);
var numFeatures = featureNames.length;
/**
 * Load features via renderless components based on the provided MotionProps.
 */
function useFeatures(props, visualElement, preloadedFeatures) {
    var features = [];
    var lazyContext = react.useContext(LazyContext);
    if (!visualElement)
        return null;
    for (var i = 0; i < numFeatures; i++) {
        var name_1 = featureNames[i];
        var _a = featureDefinitions[name_1], isEnabled = _a.isEnabled, Component = _a.Component;
        /**
         * It might be possible in the future to use this moment to
         * dynamically request functionality. In initial tests this
         * was producing a lot of duplication amongst bundles.
         */
        if (isEnabled(props) && Component) {
            features.push(react.createElement(Component, __assign({ key: name_1 }, props, { visualElement: visualElement })));
        }
    }
    return features;
}

/**
 * @public
 */
var MotionConfigContext = react.createContext({
    transformPagePoint: function (p) { return p; },
    isStatic: false,
});

var MotionContext = react.createContext({});
function useVisualElementContext() {
    return react.useContext(MotionContext).visualElement;
}

/**
 * @public
 */
var PresenceContext = react.createContext(null);

/**
 * Creates a constant value over the lifecycle of a component.
 *
 * Even if `useMemo` is provided an empty array as its final argument, it doesn't offer
 * a guarantee that it won't re-run for performance reasons later on. By using `useConstant`
 * you can ensure that initialisers don't execute twice or more.
 */
function useConstant(init) {
    var ref = react.useRef(null);
    if (ref.current === null) {
        ref.current = init();
    }
    return ref.current;
}

/**
 * When a component is the child of `AnimatePresence`, it can use `usePresence`
 * to access information about whether it's still present in the React tree.
 *
 * ```jsx
 * import { usePresence } from "framer-motion"
 *
 * export const Component = () => {
 *   const [isPresent, safeToRemove] = usePresence()
 *
 *   useEffect(() => {
 *     !isPresent && setTimeout(safeToRemove, 1000)
 *   }, [isPresent])
 *
 *   return <div />
 * }
 * ```
 *
 * If `isPresent` is `false`, it means that a component has been removed the tree, but
 * `AnimatePresence` won't really remove it until `safeToRemove` has been called.
 *
 * @public
 */
function usePresence() {
    var context = react.useContext(PresenceContext);
    if (context === null)
        return [true, null];
    var isPresent = context.isPresent, onExitComplete = context.onExitComplete, register = context.register;
    // It's safe to call the following hooks conditionally (after an early return) because the context will always
    // either be null or non-null for the lifespan of the component.
    // Replace with useOpaqueId when released in React
    var id = useUniqueId();
    react.useEffect(function () { return register(id); }, []);
    var safeToRemove = function () { return onExitComplete === null || onExitComplete === void 0 ? void 0 : onExitComplete(id); };
    return !isPresent && onExitComplete ? [false, safeToRemove] : [true];
}
function isPresent(context) {
    return context === null ? true : context.isPresent;
}
var counter = 0;
var incrementId = function () { return counter++; };
var useUniqueId = function () { return useConstant(incrementId); };

/**
 * @internal
 */
var LayoutGroupContext = react.createContext(null);

var isBrowser = typeof window !== "undefined";

var useIsomorphicLayoutEffect = isBrowser ? react.useLayoutEffect : react.useEffect;

function useLayoutId(_a) {
    var layoutId = _a.layoutId;
    var layoutGroupId = react.useContext(LayoutGroupContext);
    return layoutGroupId && layoutId !== undefined
        ? layoutGroupId + "-" + layoutId
        : layoutId;
}
function useVisualElement(Component, visualState, props, createVisualElement) {
    var config = react.useContext(MotionConfigContext);
    var lazyContext = react.useContext(LazyContext);
    var parent = useVisualElementContext();
    var presenceContext = react.useContext(PresenceContext);
    var layoutId = useLayoutId(props);
    var visualElementRef = react.useRef(undefined);
    /**
     * If we haven't preloaded a renderer, check to see if we have one lazy-loaded
     */
    if (!createVisualElement)
        createVisualElement = lazyContext.renderer;
    if (!visualElementRef.current && createVisualElement) {
        visualElementRef.current = createVisualElement(Component, {
            visualState: visualState,
            parent: parent,
            props: __assign(__assign({}, props), { layoutId: layoutId }),
            presenceId: presenceContext === null || presenceContext === void 0 ? void 0 : presenceContext.id,
            blockInitialAnimation: (presenceContext === null || presenceContext === void 0 ? void 0 : presenceContext.initial) === false,
        });
    }
    var visualElement = visualElementRef.current;
    useIsomorphicLayoutEffect(function () {
        if (!visualElement)
            return;
        visualElement.setProps(__assign(__assign(__assign({}, config), props), { layoutId: layoutId }));
        visualElement.isPresent = isPresent(presenceContext);
        visualElement.isPresenceRoot =
            !parent || parent.presenceId !== (presenceContext === null || presenceContext === void 0 ? void 0 : presenceContext.id);
        /**
         * Fire a render to ensure the latest state is reflected on-screen.
         */
        visualElement.syncRender();
    });
    react.useEffect(function () {
        var _a;
        if (!visualElement)
            return;
        /**
         * In a future refactor we can replace the features-as-components and
         * have this loop through them all firing "effect" listeners
         */
        (_a = visualElement.animationState) === null || _a === void 0 ? void 0 : _a.animateChanges();
    });
    useIsomorphicLayoutEffect(function () { return function () { return visualElement === null || visualElement === void 0 ? void 0 : visualElement.notifyUnmount(); }; }, []);
    return visualElement;
}

function isRefObject(ref) {
    return (typeof ref === "object" &&
        Object.prototype.hasOwnProperty.call(ref, "current"));
}

/**
 * Creates a ref function that, when called, hydrates the provided
 * external ref and VisualElement.
 */
function useMotionRef(visualState, visualElement, externalRef) {
    return react.useCallback(function (instance) {
        var _a;
        instance && ((_a = visualState.mount) === null || _a === void 0 ? void 0 : _a.call(visualState, instance));
        if (visualElement) {
            instance
                ? visualElement.mount(instance)
                : visualElement.unmount();
        }
        if (externalRef) {
            if (typeof externalRef === "function") {
                externalRef(instance);
            }
            else if (isRefObject(externalRef)) {
                externalRef.current = instance;
            }
        }
    }, 
    /**
     * Only pass a new ref callback to React if we've received a visual element
     * factory. Otherwise we'll be mounting/remounting every time externalRef
     * or other dependencies change.
     */
    [visualElement]);
}

/**
 * Decides if the supplied variable is an array of variant labels
 */
function isVariantLabels(v) {
    return Array.isArray(v);
}
/**
 * Decides if the supplied variable is variant label
 */
function isVariantLabel(v) {
    return typeof v === "string" || isVariantLabels(v);
}
/**
 * Creates an object containing the latest state of every MotionValue on a VisualElement
 */
function getCurrent(visualElement) {
    var current = {};
    visualElement.forEachValue(function (value, key) { return (current[key] = value.get()); });
    return current;
}
/**
 * Creates an object containing the latest velocity of every MotionValue on a VisualElement
 */
function getVelocity(visualElement) {
    var velocity = {};
    visualElement.forEachValue(function (value, key) { return (velocity[key] = value.getVelocity()); });
    return velocity;
}
function resolveVariantFromProps(props, definition, custom, currentValues, currentVelocity) {
    var _a;
    if (currentValues === void 0) { currentValues = {}; }
    if (currentVelocity === void 0) { currentVelocity = {}; }
    if (typeof definition === "string") {
        definition = (_a = props.variants) === null || _a === void 0 ? void 0 : _a[definition];
    }
    return typeof definition === "function"
        ? definition(custom !== null && custom !== void 0 ? custom : props.custom, currentValues, currentVelocity)
        : definition;
}
function resolveVariant(visualElement, definition, custom) {
    var props = visualElement.getProps();
    return resolveVariantFromProps(props, definition, custom !== null && custom !== void 0 ? custom : props.custom, getCurrent(visualElement), getVelocity(visualElement));
}
function checkIfControllingVariants(props) {
    var _a;
    return (typeof ((_a = props.animate) === null || _a === void 0 ? void 0 : _a.start) === "function" ||
        isVariantLabel(props.initial) ||
        isVariantLabel(props.animate) ||
        isVariantLabel(props.whileHover) ||
        isVariantLabel(props.whileDrag) ||
        isVariantLabel(props.whileTap) ||
        isVariantLabel(props.whileFocus) ||
        isVariantLabel(props.exit));
}
function checkIfVariantNode(props) {
    return Boolean(checkIfControllingVariants(props) || props.variants);
}

function getCurrentTreeVariants(props, context) {
    if (checkIfControllingVariants(props)) {
        var initial = props.initial, animate = props.animate;
        return {
            initial: initial === false || isVariantLabel(initial)
                ? initial
                : undefined,
            animate: isVariantLabel(animate) ? animate : undefined,
        };
    }
    return props.inherit !== false ? context : {};
}

function useCreateMotionContext(props, isStatic) {
    var _a = getCurrentTreeVariants(props, react.useContext(MotionContext)), initial = _a.initial, animate = _a.animate;
    return react.useMemo(function () { return ({ initial: initial, animate: animate }); }, 
    /**
     * Only break memoisation in static mode
     */
    isStatic
        ? [
            variantLabelsAsDependency(initial),
            variantLabelsAsDependency(animate),
        ]
        : []);
}
function variantLabelsAsDependency(prop) {
    return Array.isArray(prop) ? prop.join(" ") : prop;
}

/**
 * Create a `motion` component.
 *
 * This function accepts a Component argument, which can be either a string (ie "div"
 * for `motion.div`), or an actual React component.
 *
 * Alongside this is a config option which provides a way of rendering the provided
 * component "offline", or outside the React render cycle.
 *
 * @internal
 */
function createMotionComponent(_a) {
    var preloadedFeatures = _a.preloadedFeatures, createVisualElement = _a.createVisualElement, useRender = _a.useRender, useVisualState = _a.useVisualState, Component = _a.Component;
    preloadedFeatures && loadFeatures(preloadedFeatures);
    function MotionComponent(props, externalRef) {
        /**
         * If we're rendering in a static environment, we only visually update the component
         * as a result of a React-rerender rather than interactions or animations. This
         * means we don't need to load additional memory structures like VisualElement,
         * or any gesture/animation features.
         */
        var isStatic = react.useContext(MotionConfigContext).isStatic;
        var features = null;
        /**
         * Create the tree context. This is memoized and will only trigger renders
         * when the current tree variant changes in static mode.
         */
        var context = useCreateMotionContext(props, isStatic);
        /**
         *
         */
        var visualState = useVisualState(props, isStatic);
        if (!isStatic && isBrowser) {
            /**
             * Create a VisualElement for this component. A VisualElement provides a common
             * interface to renderer-specific APIs (ie DOM/Three.js etc) as well as
             * providing a way of rendering to these APIs outside of the React render loop
             * for more performant animations and interactions
             */
            context.visualElement = useVisualElement(Component, visualState, props, createVisualElement);
            /**
             * Load Motion gesture and animation features. These are rendered as renderless
             * components so each feature can optionally make use of React lifecycle methods.
             *
             * TODO: The intention is to move these away from a React-centric to a
             * VisualElement-centric lifecycle scheme.
             */
            features = useFeatures(props, context.visualElement);
        }
        /**
         * The mount order and hierarchy is specific to ensure our element ref
         * is hydrated by the time features fire their effects.
         */
        return (react.createElement(react.Fragment, null,
            react.createElement(MotionContext.Provider, { value: context }, useRender(Component, props, useMotionRef(visualState, context.visualElement, externalRef), visualState, isStatic)),
            features));
    }
    return react.forwardRef(MotionComponent);
}

/**
 * Convert any React component into a `motion` component. The provided component
 * **must** use `React.forwardRef` to the underlying DOM component you want to animate.
 *
 * ```jsx
 * const Component = React.forwardRef((props, ref) => {
 *   return <div ref={ref} />
 * })
 *
 * const MotionComponent = motion(Component)
 * ```
 *
 * @public
 */
function createMotionProxy(createConfig) {
    function custom(Component, customMotionComponentConfig) {
        if (customMotionComponentConfig === void 0) { customMotionComponentConfig = {}; }
        return createMotionComponent(createConfig(Component, customMotionComponentConfig));
    }
    /**
     * A cache of generated `motion` components, e.g `motion.div`, `motion.input` etc.
     * Rather than generating them anew every render.
     */
    var componentCache = new Map();
    return new Proxy(custom, {
        /**
         * Called when `motion` is referenced with a prop: `motion.div`, `motion.input` etc.
         * The prop name is passed through as `key` and we can use that to generate a `motion`
         * DOM component with that name.
         */
        get: function (_target, key) {
            /**
             * If this element doesn't exist in the component cache, create it and cache.
             */
            if (!componentCache.has(key)) {
                componentCache.set(key, custom(key));
            }
            return componentCache.get(key);
        },
    });
}

/**
 * We keep these listed seperately as we use the lowercase tag names as part
 * of the runtime bundle to detect SVG components
 */
var lowercaseSVGElements = [
    "animate",
    "circle",
    "defs",
    "desc",
    "ellipse",
    "g",
    "image",
    "line",
    "filter",
    "marker",
    "mask",
    "metadata",
    "path",
    "pattern",
    "polygon",
    "polyline",
    "rect",
    "stop",
    "svg",
    "switch",
    "symbol",
    "text",
    "tspan",
    "use",
    "view",
];

function isSVGComponent(Component) {
    if (
    /**
     * If it's not a string, it's a custom React component. Currently we only support
     * HTML custom React components.
     */
    typeof Component !== "string" ||
        /**
         * If it contains a dash, the element is a custom HTML webcomponent.
         */
        Component.includes("-")) {
        return false;
    }
    else if (
    /**
     * If it's in our list of lowercase SVG tags, it's an SVG component
     */
    lowercaseSVGElements.indexOf(Component) > -1 ||
        /**
         * If it contains a capital letter, it's an SVG component
         */
        /[A-Z]/.test(Component)) {
        return true;
    }
    return false;
}

var valueScaleCorrection = {};
/**
 * @internal
 */
function addScaleCorrection(correctors) {
    for (var key in correctors) {
        valueScaleCorrection[key] = correctors[key];
    }
}

/**
 * A list of all transformable axes. We'll use this list to generated a version
 * of each axes for each transform.
 */
var transformAxes = ["", "X", "Y", "Z"];
/**
 * An ordered array of each transformable value. By default, transform values
 * will be sorted to this order.
 */
var order = ["translate", "scale", "rotate", "skew"];
/**
 * Generate a list of every possible transform key.
 */
var transformProps = ["transformPerspective", "x", "y", "z"];
order.forEach(function (operationKey) {
    return transformAxes.forEach(function (axesKey) {
        return transformProps.push(operationKey + axesKey);
    });
});
/**
 * A function to use with Array.sort to sort transform keys by their default order.
 */
function sortTransformProps(a, b) {
    return transformProps.indexOf(a) - transformProps.indexOf(b);
}
/**
 * A quick lookup for transform props.
 */
var transformPropSet = new Set(transformProps);
function isTransformProp(key) {
    return transformPropSet.has(key);
}
/**
 * A quick lookup for transform origin props
 */
var transformOriginProps = new Set(["originX", "originY", "originZ"]);
function isTransformOriginProp(key) {
    return transformOriginProps.has(key);
}

function isForcedMotionValue(key, _a) {
    var layout = _a.layout, layoutId = _a.layoutId;
    return (isTransformProp(key) ||
        isTransformOriginProp(key) ||
        ((layout || layoutId !== undefined) &&
            (!!valueScaleCorrection[key] || key === "opacity")));
}

var isMotionValue = function (value) {
    return value !== null && typeof value === "object" && value.getVelocity;
};

var translateAlias = {
    x: "translateX",
    y: "translateY",
    z: "translateZ",
    transformPerspective: "perspective",
};
/**
 * Build a CSS transform style from individual x/y/scale etc properties.
 *
 * This outputs with a default order of transforms/scales/rotations, this can be customised by
 * providing a transformTemplate function.
 */
function buildTransform(_a, _b, transformIsDefault, transformTemplate) {
    var transform = _a.transform, transformKeys = _a.transformKeys;
    var _c = _b.enableHardwareAcceleration, enableHardwareAcceleration = _c === void 0 ? true : _c, _d = _b.allowTransformNone, allowTransformNone = _d === void 0 ? true : _d;
    // The transform string we're going to build into.
    var transformString = "";
    // Transform keys into their default order - this will determine the output order.
    transformKeys.sort(sortTransformProps);
    // Track whether the defined transform has a defined z so we don't add a
    // second to enable hardware acceleration
    var transformHasZ = false;
    // Loop over each transform and build them into transformString
    var numTransformKeys = transformKeys.length;
    for (var i = 0; i < numTransformKeys; i++) {
        var key = transformKeys[i];
        transformString += (translateAlias[key] || key) + "(" + transform[key] + ") ";
        if (key === "z")
            transformHasZ = true;
    }
    if (!transformHasZ && enableHardwareAcceleration) {
        transformString += "translateZ(0)";
    }
    else {
        transformString = transformString.trim();
    }
    // If we have a custom `transform` template, pass our transform values and
    // generated transformString to that before returning
    if (transformTemplate) {
        transformString = transformTemplate(transform, transformIsDefault ? "" : transformString);
    }
    else if (allowTransformNone && transformIsDefault) {
        transformString = "none";
    }
    return transformString;
}
/**
 * Build a transformOrigin style. Uses the same defaults as the browser for
 * undefined origins.
 */
function buildTransformOrigin(_a) {
    var _b = _a.originX, originX = _b === void 0 ? "50%" : _b, _c = _a.originY, originY = _c === void 0 ? "50%" : _c, _d = _a.originZ, originZ = _d === void 0 ? 0 : _d;
    return originX + " " + originY + " " + originZ;
}

/**
 * Returns true if the provided key is a CSS variable
 */
function isCSSVariable(key) {
    return key.startsWith("--");
}

/**
 * Provided a value and a ValueType, returns the value as that value type.
 */
var getValueAsType = function (value, type) {
    return type && typeof value === "number"
        ? type.transform(value)
        : value;
};

var clamp = function (min, max) { return function (v) {
    return Math.max(Math.min(v, max), min);
}; };
var sanitize = function (v) { return (v % 1 ? Number(v.toFixed(5)) : v); };
var floatRegex = /(-)?([\d]*\.?[\d])+/g;
var colorRegex = /(#[0-9a-f]{6}|#[0-9a-f]{3}|#(?:[0-9a-f]{2}){2,4}|(rgb|hsl)a?\((-?[\d\.]+%?[,\s]+){2,3}\s*\/*\s*[\d\.]+%?\))/gi;
var singleColorRegex = /^(#[0-9a-f]{3}|#(?:[0-9a-f]{2}){2,4}|(rgb|hsl)a?\((-?[\d\.]+%?[,\s]+){2,3}\s*\/*\s*[\d\.]+%?\))$/i;
function isString(v) {
    return typeof v === 'string';
}

var number = {
    test: function (v) { return typeof v === 'number'; },
    parse: parseFloat,
    transform: function (v) { return v; },
};
var alpha = __assign(__assign({}, number), { transform: clamp(0, 1) });
var scale = __assign(__assign({}, number), { default: 1 });

var createUnitType = function (unit) { return ({
    test: function (v) {
        return isString(v) && v.endsWith(unit) && v.split(' ').length === 1;
    },
    parse: parseFloat,
    transform: function (v) { return "" + v + unit; },
}); };
var degrees = createUnitType('deg');
var percent = createUnitType('%');
var px = createUnitType('px');
var vh = createUnitType('vh');
var vw = createUnitType('vw');
var progressPercentage = __assign(__assign({}, percent), { parse: function (v) { return percent.parse(v) / 100; }, transform: function (v) { return percent.transform(v * 100); } });

var isColorString = function (type, testProp) { return function (v) {
    return Boolean((isString(v) && singleColorRegex.test(v) && v.startsWith(type)) ||
        (testProp && Object.prototype.hasOwnProperty.call(v, testProp)));
}; };
var splitColor = function (aName, bName, cName) { return function (v) {
    var _a;
    if (!isString(v))
        return v;
    var _b = v.match(floatRegex), a = _b[0], b = _b[1], c = _b[2], alpha = _b[3];
    return _a = {},
        _a[aName] = parseFloat(a),
        _a[bName] = parseFloat(b),
        _a[cName] = parseFloat(c),
        _a.alpha = alpha !== undefined ? parseFloat(alpha) : 1,
        _a;
}; };

var hsla = {
    test: isColorString('hsl', 'hue'),
    parse: splitColor('hue', 'saturation', 'lightness'),
    transform: function (_a) {
        var hue = _a.hue, saturation = _a.saturation, lightness = _a.lightness, _b = _a.alpha, alpha$1 = _b === void 0 ? 1 : _b;
        return ('hsla(' +
            Math.round(hue) +
            ', ' +
            percent.transform(sanitize(saturation)) +
            ', ' +
            percent.transform(sanitize(lightness)) +
            ', ' +
            sanitize(alpha.transform(alpha$1)) +
            ')');
    },
};

var clampRgbUnit = clamp(0, 255);
var rgbUnit = __assign(__assign({}, number), { transform: function (v) { return Math.round(clampRgbUnit(v)); } });
var rgba = {
    test: isColorString('rgb', 'red'),
    parse: splitColor('red', 'green', 'blue'),
    transform: function (_a) {
        var red = _a.red, green = _a.green, blue = _a.blue, _b = _a.alpha, alpha$1 = _b === void 0 ? 1 : _b;
        return 'rgba(' +
            rgbUnit.transform(red) +
            ', ' +
            rgbUnit.transform(green) +
            ', ' +
            rgbUnit.transform(blue) +
            ', ' +
            sanitize(alpha.transform(alpha$1)) +
            ')';
    },
};

function parseHex(v) {
    var r = '';
    var g = '';
    var b = '';
    var a = '';
    if (v.length > 5) {
        r = v.substr(1, 2);
        g = v.substr(3, 2);
        b = v.substr(5, 2);
        a = v.substr(7, 2);
    }
    else {
        r = v.substr(1, 1);
        g = v.substr(2, 1);
        b = v.substr(3, 1);
        a = v.substr(4, 1);
        r += r;
        g += g;
        b += b;
        a += a;
    }
    return {
        red: parseInt(r, 16),
        green: parseInt(g, 16),
        blue: parseInt(b, 16),
        alpha: a ? parseInt(a, 16) / 255 : 1,
    };
}
var hex = {
    test: isColorString('#'),
    parse: parseHex,
    transform: rgba.transform,
};

var color = {
    test: function (v) { return rgba.test(v) || hex.test(v) || hsla.test(v); },
    parse: function (v) {
        if (rgba.test(v)) {
            return rgba.parse(v);
        }
        else if (hsla.test(v)) {
            return hsla.parse(v);
        }
        else {
            return hex.parse(v);
        }
    },
    transform: function (v) {
        return isString(v)
            ? v
            : v.hasOwnProperty('red')
                ? rgba.transform(v)
                : hsla.transform(v);
    },
};

var colorToken = '${c}';
var numberToken = '${n}';
function test(v) {
    var _a, _b, _c, _d;
    return (isNaN(v) &&
        isString(v) &&
        ((_b = (_a = v.match(floatRegex)) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0) + ((_d = (_c = v.match(colorRegex)) === null || _c === void 0 ? void 0 : _c.length) !== null && _d !== void 0 ? _d : 0) > 0);
}
function analyse(v) {
    var values = [];
    var numColors = 0;
    var colors = v.match(colorRegex);
    if (colors) {
        numColors = colors.length;
        v = v.replace(colorRegex, colorToken);
        values.push.apply(values, colors.map(color.parse));
    }
    var numbers = v.match(floatRegex);
    if (numbers) {
        v = v.replace(floatRegex, numberToken);
        values.push.apply(values, numbers.map(number.parse));
    }
    return { values: values, numColors: numColors, tokenised: v };
}
function parse(v) {
    return analyse(v).values;
}
function createTransformer(v) {
    var _a = analyse(v), values = _a.values, numColors = _a.numColors, tokenised = _a.tokenised;
    var numValues = values.length;
    return function (v) {
        var output = tokenised;
        for (var i = 0; i < numValues; i++) {
            output = output.replace(i < numColors ? colorToken : numberToken, i < numColors ? color.transform(v[i]) : sanitize(v[i]));
        }
        return output;
    };
}
var convertNumbersToZero = function (v) {
    return typeof v === 'number' ? 0 : v;
};
function getAnimatableNone(v) {
    var parsed = parse(v);
    var transformer = createTransformer(v);
    return transformer(parsed.map(convertNumbersToZero));
}
var complex = { test: test, parse: parse, createTransformer: createTransformer, getAnimatableNone: getAnimatableNone };

var maxDefaults = new Set(['brightness', 'contrast', 'saturate', 'opacity']);
function applyDefaultFilter(v) {
    var _a = v.slice(0, -1).split('('), name = _a[0], value = _a[1];
    if (name === 'drop-shadow')
        return v;
    var number = (value.match(floatRegex) || [])[0];
    if (!number)
        return v;
    var unit = value.replace(number, '');
    var defaultValue = maxDefaults.has(name) ? 1 : 0;
    if (number !== value)
        defaultValue *= 100;
    return name + '(' + defaultValue + unit + ')';
}
var functionRegex = /([a-z-]*)\(.*?\)/g;
var filter = __assign(__assign({}, complex), { getAnimatableNone: function (v) {
        var functions = v.match(functionRegex);
        return functions ? functions.map(applyDefaultFilter).join(' ') : v;
    } });

var int = __assign(__assign({}, number), { transform: Math.round });

var numberValueTypes = {
    // Border props
    borderWidth: px,
    borderTopWidth: px,
    borderRightWidth: px,
    borderBottomWidth: px,
    borderLeftWidth: px,
    borderRadius: px,
    radius: px,
    borderTopLeftRadius: px,
    borderTopRightRadius: px,
    borderBottomRightRadius: px,
    borderBottomLeftRadius: px,
    // Positioning props
    width: px,
    maxWidth: px,
    height: px,
    maxHeight: px,
    size: px,
    top: px,
    right: px,
    bottom: px,
    left: px,
    // Spacing props
    padding: px,
    paddingTop: px,
    paddingRight: px,
    paddingBottom: px,
    paddingLeft: px,
    margin: px,
    marginTop: px,
    marginRight: px,
    marginBottom: px,
    marginLeft: px,
    // Transform props
    rotate: degrees,
    rotateX: degrees,
    rotateY: degrees,
    rotateZ: degrees,
    scale: scale,
    scaleX: scale,
    scaleY: scale,
    scaleZ: scale,
    skew: degrees,
    skewX: degrees,
    skewY: degrees,
    distance: px,
    translateX: px,
    translateY: px,
    translateZ: px,
    x: px,
    y: px,
    z: px,
    perspective: px,
    transformPerspective: px,
    opacity: alpha,
    originX: progressPercentage,
    originY: progressPercentage,
    originZ: px,
    // Misc
    zIndex: int,
    // SVG
    fillOpacity: alpha,
    strokeOpacity: alpha,
    numOctaves: int,
};

function buildHTMLStyles(state, latestValues, projection, layoutState, options, transformTemplate, buildProjectionTransform, buildProjectionTransformOrigin) {
    var _a;
    var style = state.style, vars = state.vars, transform = state.transform, transformKeys = state.transformKeys, transformOrigin = state.transformOrigin;
    // Empty the transformKeys array. As we're throwing out refs to its items
    // this might not be as cheap as suspected. Maybe using the array as a buffer
    // with a manual incrementation would be better.
    transformKeys.length = 0;
    // Track whether we encounter any transform or transformOrigin values.
    var hasTransform = false;
    var hasTransformOrigin = false;
    // Does the calculated transform essentially equal "none"?
    var transformIsNone = true;
    /**
     * Loop over all our latest animated values and decide whether to handle them
     * as a style or CSS variable.
     *
     * Transforms and transform origins are kept seperately for further processing.
     */
    for (var key in latestValues) {
        var value = latestValues[key];
        /**
         * If this is a CSS variable we don't do any further processing.
         */
        if (isCSSVariable(key)) {
            vars[key] = value;
            continue;
        }
        // Convert the value to its default value type, ie 0 -> "0px"
        var valueType = numberValueTypes[key];
        var valueAsType = getValueAsType(value, valueType);
        if (isTransformProp(key)) {
            // If this is a transform, flag to enable further transform processing
            hasTransform = true;
            transform[key] = valueAsType;
            transformKeys.push(key);
            // If we already know we have a non-default transform, early return
            if (!transformIsNone)
                continue;
            // Otherwise check to see if this is a default transform
            if (value !== ((_a = valueType.default) !== null && _a !== void 0 ? _a : 0))
                transformIsNone = false;
        }
        else if (isTransformOriginProp(key)) {
            transformOrigin[key] = valueAsType;
            // If this is a transform origin, flag and enable further transform-origin processing
            hasTransformOrigin = true;
        }
        else {
            /**
             * If layout projection is on, and we need to perform scale correction for this
             * value type, perform it.
             */
            if ((projection === null || projection === void 0 ? void 0 : projection.isHydrated) &&
                (layoutState === null || layoutState === void 0 ? void 0 : layoutState.isHydrated) &&
                valueScaleCorrection[key]) {
                var correctedValue = valueScaleCorrection[key].process(value, layoutState, projection);
                /**
                 * Scale-correctable values can define a number of other values to break
                 * down into. For instance borderRadius needs applying to borderBottomLeftRadius etc
                 */
                var applyTo = valueScaleCorrection[key].applyTo;
                if (applyTo) {
                    var num = applyTo.length;
                    for (var i = 0; i < num; i++) {
                        style[applyTo[i]] = correctedValue;
                    }
                }
                else {
                    style[key] = correctedValue;
                }
            }
            else {
                style[key] = valueAsType;
            }
        }
    }
    if (layoutState &&
        projection &&
        buildProjectionTransform &&
        buildProjectionTransformOrigin) {
        style.transform = buildProjectionTransform(layoutState.deltaFinal, layoutState.treeScale, hasTransform ? transform : undefined);
        if (transformTemplate) {
            style.transform = transformTemplate(transform, style.transform);
        }
        style.transformOrigin = buildProjectionTransformOrigin(layoutState);
    }
    else {
        if (hasTransform) {
            style.transform = buildTransform(state, options, transformIsNone, transformTemplate);
        }
        if (hasTransformOrigin) {
            style.transformOrigin = buildTransformOrigin(transformOrigin);
        }
    }
}

var createHtmlRenderState = function () { return ({
    style: {},
    transform: {},
    transformKeys: [],
    transformOrigin: {},
    vars: {},
}); };

function copyRawValuesOnly(target, source, props) {
    for (var key in source) {
        if (!isMotionValue(source[key]) && !isForcedMotionValue(key, props)) {
            target[key] = source[key];
        }
    }
}
function useInitialMotionValues(_a, visualState, isStatic) {
    var transformTemplate = _a.transformTemplate;
    return react.useMemo(function () {
        var state = createHtmlRenderState();
        buildHTMLStyles(state, visualState, undefined, undefined, { enableHardwareAcceleration: !isStatic }, transformTemplate);
        var vars = state.vars, style = state.style;
        return __assign(__assign({}, vars), style);
    }, [visualState]);
}
function useStyle(props, visualState, isStatic) {
    var styleProp = props.style || {};
    var style = {};
    /**
     * Copy non-Motion Values straight into style
     */
    copyRawValuesOnly(style, styleProp, props);
    Object.assign(style, useInitialMotionValues(props, visualState, isStatic));
    if (props.transformValues) {
        style = props.transformValues(style);
    }
    return style;
}
function useHTMLProps(props, visualState, isStatic) {
    // The `any` isn't ideal but it is the type of createElement props argument
    var htmlProps = {};
    var style = useStyle(props, visualState, isStatic);
    if (Boolean(props.drag)) {
        // Disable the ghost element when a user drags
        htmlProps.draggable = false;
        // Disable text selection
        style.userSelect = style.WebkitUserSelect = style.WebkitTouchCallout =
            "none";
        // Disable scrolling on the draggable direction
        style.touchAction =
            props.drag === true
                ? "none"
                : "pan-" + (props.drag === "x" ? "y" : "x");
    }
    htmlProps.style = style;
    return htmlProps;
}

/**
 * A list of all valid MotionProps.
 *
 * @internalremarks
 * This doesn't throw if a `MotionProp` name is missing - it should.
 */
var validMotionProps = new Set([
    "initial",
    "animate",
    "exit",
    "style",
    "variants",
    "transition",
    "transformTemplate",
    "transformValues",
    "custom",
    "inherit",
    "layout",
    "layoutId",
    "_layoutResetTransform",
    "onLayoutAnimationComplete",
    "onViewportBoxUpdate",
    "onLayoutMeasure",
    "onBeforeLayoutMeasure",
    "onAnimationStart",
    "onAnimationComplete",
    "onUpdate",
    "onDragStart",
    "onDrag",
    "onDragEnd",
    "onMeasureDragConstraints",
    "onDirectionLock",
    "onDragTransitionEnd",
    "drag",
    "dragControls",
    "dragListener",
    "dragConstraints",
    "dragDirectionLock",
    "_dragX",
    "_dragY",
    "dragElastic",
    "dragMomentum",
    "dragPropagation",
    "dragTransition",
    "whileDrag",
    "onPan",
    "onPanStart",
    "onPanEnd",
    "onPanSessionStart",
    "onTap",
    "onTapStart",
    "onTapCancel",
    "onHoverStart",
    "onHoverEnd",
    "whileFocus",
    "whileTap",
    "whileHover",
]);
/**
 * Check whether a prop name is a valid `MotionProp` key.
 *
 * @param key - Name of the property to check
 * @returns `true` is key is a valid `MotionProp`.
 *
 * @public
 */
function isValidMotionProp(key) {
    return validMotionProps.has(key);
}

var shouldForward = function (key) { return !isValidMotionProp(key); };
/**
 * Emotion and Styled Components both allow users to pass through arbitrary props to their components
 * to dynamically generate CSS. They both use the `@emotion/is-prop-valid` package to determine which
 * of these should be passed to the underlying DOM node.
 *
 * However, when styling a Motion component `styled(motion.div)`, both packages pass through *all* props
 * as it's seen as an arbitrary component rather than a DOM node. Motion only allows arbitrary props
 * passed through the `custom` prop so it doesn't *need* the payload or computational overhead of
 * `@emotion/is-prop-valid`, however to fix this problem we need to use it.
 *
 * By making it an optionalDependency we can offer this functionality only in the situations where it's
 * actually required.
 */
try {
    var emotionIsPropValid_1 = require("@emotion/is-prop-valid").default;
    shouldForward = function (key) {
        // Handle events explicitly as Emotion validates them all as true
        if (key.startsWith("on")) {
            return !isValidMotionProp(key);
        }
        else {
            return emotionIsPropValid_1(key);
        }
    };
}
catch (_a) {
    // We don't need to actually do anything here - the fallback is the existing `isPropValid`.
}
function filterProps(props, isDom, forwardMotionProps) {
    var filteredProps = {};
    for (var key in props) {
        if (shouldForward(key) ||
            (forwardMotionProps === true && isValidMotionProp(key)) ||
            (!isDom && !isValidMotionProp(key))) {
            filteredProps[key] = props[key];
        }
    }
    return filteredProps;
}

function calcOrigin(origin, offset, size) {
    return typeof origin === "string"
        ? origin
        : px.transform(offset + size * origin);
}
/**
 * The SVG transform origin defaults are different to CSS and is less intuitive,
 * so we use the measured dimensions of the SVG to reconcile these.
 */
function calcSVGTransformOrigin(dimensions, originX, originY) {
    var pxOriginX = calcOrigin(originX, dimensions.x, dimensions.width);
    var pxOriginY = calcOrigin(originY, dimensions.y, dimensions.height);
    return pxOriginX + " " + pxOriginY;
}

// Convert a progress 0-1 to a pixels value based on the provided length
var progressToPixels = function (progress, length) {
    return px.transform(progress * length);
};
var dashKeys = {
    offset: "stroke-dashoffset",
    array: "stroke-dasharray",
};
var camelKeys = {
    offset: "strokeDashoffset",
    array: "strokeDasharray",
};
/**
 * Build SVG path properties. Uses the path's measured length to convert
 * our custom pathLength, pathSpacing and pathOffset into stroke-dashoffset
 * and stroke-dasharray attributes.
 *
 * This function is mutative to reduce per-frame GC.
 */
function buildSVGPath(attrs, totalLength, length, spacing, offset, useDashCase) {
    if (spacing === void 0) { spacing = 1; }
    if (offset === void 0) { offset = 0; }
    if (useDashCase === void 0) { useDashCase = true; }
    // We use dash case when setting attributes directly to the DOM node and camel case
    // when defining props on a React component.
    var keys = useDashCase ? dashKeys : camelKeys;
    // Build the dash offset
    attrs[keys.offset] = progressToPixels(-offset, totalLength);
    // Build the dash array
    var pathLength = progressToPixels(length, totalLength);
    var pathSpacing = progressToPixels(spacing, totalLength);
    attrs[keys.array] = pathLength + " " + pathSpacing;
}

/**
 * Build SVG visual attrbutes, like cx and style.transform
 */
function buildSVGAttrs(state, _a, projection, layoutState, options, transformTemplate, buildProjectionTransform, buildProjectionTransformOrigin) {
    var attrX = _a.attrX, attrY = _a.attrY, originX = _a.originX, originY = _a.originY, pathLength = _a.pathLength, _b = _a.pathSpacing, pathSpacing = _b === void 0 ? 1 : _b, _c = _a.pathOffset, pathOffset = _c === void 0 ? 0 : _c, 
    // This is object creation, which we try to avoid per-frame.
    latest = __rest(_a, ["attrX", "attrY", "originX", "originY", "pathLength", "pathSpacing", "pathOffset"]);
    buildHTMLStyles(state, latest, projection, layoutState, options, transformTemplate, buildProjectionTransform, buildProjectionTransformOrigin);
    state.attrs = state.style;
    state.style = {};
    var attrs = state.attrs, style = state.style, dimensions = state.dimensions, totalPathLength = state.totalPathLength;
    /**
     * However, we apply transforms as CSS transforms. So if we detect a transform we take it from attrs
     * and copy it into style.
     */
    if (attrs.transform) {
        if (dimensions)
            style.transform = attrs.transform;
        delete attrs.transform;
    }
    // Parse transformOrigin
    if (dimensions &&
        (originX !== undefined || originY !== undefined || style.transform)) {
        style.transformOrigin = calcSVGTransformOrigin(dimensions, originX !== undefined ? originX : 0.5, originY !== undefined ? originY : 0.5);
    }
    // Treat x/y not as shortcuts but as actual attributes
    if (attrX !== undefined)
        attrs.x = attrX;
    if (attrY !== undefined)
        attrs.y = attrY;
    // Build SVG path if one has been measured
    if (totalPathLength !== undefined && pathLength !== undefined) {
        buildSVGPath(attrs, totalPathLength, pathLength, pathSpacing, pathOffset, false);
    }
}

var createSvgRenderState = function () { return (__assign(__assign({}, createHtmlRenderState()), { attrs: {} })); };

function useSVGProps(props, visualState) {
    var visualProps = react.useMemo(function () {
        var state = createSvgRenderState();
        buildSVGAttrs(state, visualState, undefined, undefined, { enableHardwareAcceleration: false }, props.transformTemplate);
        return __assign(__assign({}, state.attrs), { style: __assign({}, state.style) });
    }, [visualState]);
    if (props.style) {
        var rawStyles = {};
        copyRawValuesOnly(rawStyles, props.style, props);
        visualProps.style = __assign(__assign({}, rawStyles), visualProps.style);
    }
    return visualProps;
}

function createUseRender(forwardMotionProps) {
    if (forwardMotionProps === void 0) { forwardMotionProps = false; }
    var useRender = function (Component, props, ref, _a, isStatic) {
        var latestValues = _a.latestValues;
        var useVisualProps = isSVGComponent(Component)
            ? useSVGProps
            : useHTMLProps;
        var visualProps = useVisualProps(props, latestValues, isStatic);
        var filteredProps = filterProps(props, typeof Component === "string", forwardMotionProps);
        var elementProps = __assign(__assign(__assign({}, filteredProps), visualProps), { ref: ref });
        return react.createElement(Component, elementProps);
    };
    return useRender;
}

var CAMEL_CASE_PATTERN = /([a-z])([A-Z])/g;
var REPLACE_TEMPLATE = "$1-$2";
/**
 * Convert camelCase to dash-case properties.
 */
var camelToDash = function (str) {
    return str.replace(CAMEL_CASE_PATTERN, REPLACE_TEMPLATE).toLowerCase();
};

function renderHTML(element, _a) {
    var style = _a.style, vars = _a.vars;
    // Directly assign style into the Element's style prop. In tests Object.assign is the
    // fastest way to assign styles.
    Object.assign(element.style, style);
    // Loop over any CSS variables and assign those.
    for (var key in vars) {
        element.style.setProperty(key, vars[key]);
    }
}

/**
 * A set of attribute names that are always read/written as camel case.
 */
var camelCaseAttributes = new Set([
    "baseFrequency",
    "diffuseConstant",
    "kernelMatrix",
    "kernelUnitLength",
    "keySplines",
    "keyTimes",
    "limitingConeAngle",
    "markerHeight",
    "markerWidth",
    "numOctaves",
    "targetX",
    "targetY",
    "surfaceScale",
    "specularConstant",
    "specularExponent",
    "stdDeviation",
    "tableValues",
    "viewBox",
    "gradientTransform",
]);

function renderSVG(element, renderState) {
    renderHTML(element, renderState);
    for (var key in renderState.attrs) {
        element.setAttribute(!camelCaseAttributes.has(key) ? camelToDash(key) : key, renderState.attrs[key]);
    }
}

function scrapeMotionValuesFromProps(props) {
    var style = props.style;
    var newValues = {};
    for (var key in style) {
        if (isMotionValue(style[key]) || isForcedMotionValue(key, props)) {
            newValues[key] = style[key];
        }
    }
    return newValues;
}

function scrapeMotionValuesFromProps$1(props) {
    var newValues = scrapeMotionValuesFromProps(props);
    for (var key in props) {
        if (isMotionValue(props[key])) {
            var targetKey = key === "x" || key === "y" ? "attr" + key.toUpperCase() : key;
            newValues[targetKey] = props[key];
        }
    }
    return newValues;
}

function isAnimationControls(v) {
    return typeof v === "object" && typeof v.start === "function";
}

var isKeyframesTarget = function (v) {
    return Array.isArray(v);
};

var isCustomValue = function (v) {
    return Boolean(v && typeof v === "object" && v.mix && v.toValue);
};
var resolveFinalValueInKeyframes = function (v) {
    // TODO maybe throw if v.length - 1 is placeholder token?
    return isKeyframesTarget(v) ? v[v.length - 1] || 0 : v;
};

/**
 * If the provided value is a MotionValue, this returns the actual value, otherwise just the value itself
 *
 * TODO: Remove and move to library
 *
 * @internal
 */
function resolveMotionValue(value) {
    var unwrappedValue = isMotionValue(value) ? value.get() : value;
    return isCustomValue(unwrappedValue)
        ? unwrappedValue.toValue()
        : unwrappedValue;
}

function makeState(_a, props, context, presenceContext) {
    var scrapeMotionValuesFromProps = _a.scrapeMotionValuesFromProps, createRenderState = _a.createRenderState, onMount = _a.onMount;
    var state = {
        latestValues: makeLatestValues(props, context, presenceContext, scrapeMotionValuesFromProps),
        renderState: createRenderState(),
    };
    if (onMount) {
        state.mount = function (instance) { return onMount(props, instance, state); };
    }
    return state;
}
var makeUseVisualState = function (config) { return function (props, isStatic) {
    var context = react.useContext(MotionContext);
    var presenceContext = react.useContext(PresenceContext);
    return isStatic
        ? makeState(config, props, context, presenceContext)
        : useConstant(function () { return makeState(config, props, context, presenceContext); });
}; };
function makeLatestValues(props, context, presenceContext, scrapeMotionValues) {
    var values = {};
    var blockInitialAnimation = (presenceContext === null || presenceContext === void 0 ? void 0 : presenceContext.initial) === false;
    var motionValues = scrapeMotionValues(props);
    for (var key in motionValues) {
        values[key] = resolveMotionValue(motionValues[key]);
    }
    var initial = props.initial, animate = props.animate;
    var isControllingVariants = checkIfControllingVariants(props);
    var isVariantNode = checkIfVariantNode(props);
    if (context &&
        isVariantNode &&
        !isControllingVariants &&
        props.inherit !== false) {
        initial !== null && initial !== void 0 ? initial : (initial = context.initial);
        animate !== null && animate !== void 0 ? animate : (animate = context.animate);
    }
    var variantToSet = blockInitialAnimation || initial === false ? animate : initial;
    if (variantToSet &&
        typeof variantToSet !== "boolean" &&
        !isAnimationControls(variantToSet)) {
        var list = Array.isArray(variantToSet) ? variantToSet : [variantToSet];
        list.forEach(function (definition) {
            var resolved = resolveVariantFromProps(props, definition);
            if (!resolved)
                return;
            var transitionEnd = resolved.transitionEnd; resolved.transition; var target = __rest(resolved, ["transitionEnd", "transition"]);
            for (var key in target)
                values[key] = target[key];
            for (var key in transitionEnd)
                values[key] = transitionEnd[key];
        });
    }
    return values;
}

var svgMotionConfig = {
    useVisualState: makeUseVisualState({
        scrapeMotionValuesFromProps: scrapeMotionValuesFromProps$1,
        createRenderState: createSvgRenderState,
        onMount: function (props, instance, _a) {
            var renderState = _a.renderState, latestValues = _a.latestValues;
            try {
                renderState.dimensions =
                    typeof instance.getBBox ===
                        "function"
                        ? instance.getBBox()
                        : instance.getBoundingClientRect();
            }
            catch (e) {
                // Most likely trying to measure an unrendered element under Firefox
                renderState.dimensions = {
                    x: 0,
                    y: 0,
                    width: 0,
                    height: 0,
                };
            }
            if (isPath(instance)) {
                renderState.totalPathLength = instance.getTotalLength();
            }
            buildSVGAttrs(renderState, latestValues, undefined, undefined, { enableHardwareAcceleration: false }, props.transformTemplate);
            // TODO: Replace with direct assignment
            renderSVG(instance, renderState);
        },
    }),
};
function isPath(element) {
    return element.tagName === "path";
}

var htmlMotionConfig = {
    useVisualState: makeUseVisualState({
        scrapeMotionValuesFromProps: scrapeMotionValuesFromProps,
        createRenderState: createHtmlRenderState,
    }),
};

function createDomMotionConfig(Component, _a, preloadedFeatures, createVisualElement) {
    var _b = _a.forwardMotionProps, forwardMotionProps = _b === void 0 ? false : _b;
    var baseConfig = isSVGComponent(Component)
        ? svgMotionConfig
        : htmlMotionConfig;
    return __assign(__assign({}, baseConfig), { preloadedFeatures: preloadedFeatures, useRender: createUseRender(forwardMotionProps), createVisualElement: createVisualElement,
        Component: Component });
}

var AnimationType;
(function (AnimationType) {
    AnimationType["Animate"] = "animate";
    AnimationType["Hover"] = "whileHover";
    AnimationType["Tap"] = "whileTap";
    AnimationType["Drag"] = "whileDrag";
    AnimationType["Focus"] = "whileFocus";
    AnimationType["Exit"] = "exit";
})(AnimationType || (AnimationType = {}));

function addDomEvent(target, eventName, handler, options) {
    target.addEventListener(eventName, handler, options);
    return function () { return target.removeEventListener(eventName, handler, options); };
}
/**
 * Attaches an event listener directly to the provided DOM element.
 *
 * Bypassing React's event system can be desirable, for instance when attaching non-passive
 * event handlers.
 *
 * ```jsx
 * const ref = useRef(null)
 *
 * useDomEvent(ref, 'wheel', onWheel, { passive: false })
 *
 * return <div ref={ref} />
 * ```
 *
 * @param ref - React.RefObject that's been provided to the element you want to bind the listener to.
 * @param eventName - Name of the event you want listen for.
 * @param handler - Function to fire when receiving the event.
 * @param options - Options to pass to `Event.addEventListener`.
 *
 * @public
 */
function useDomEvent(ref, eventName, handler, options) {
    react.useEffect(function () {
        var element = ref.current;
        if (handler && element) {
            return addDomEvent(element, eventName, handler, options);
        }
    }, [ref, eventName, handler, options]);
}

/**
 *
 * @param props
 * @param ref
 * @internal
 */
function useFocusGesture(_a) {
    var whileFocus = _a.whileFocus, visualElement = _a.visualElement;
    var onFocus = function () {
        var _a;
        (_a = visualElement.animationState) === null || _a === void 0 ? void 0 : _a.setActive(AnimationType.Focus, true);
    };
    var onBlur = function () {
        var _a;
        (_a = visualElement.animationState) === null || _a === void 0 ? void 0 : _a.setActive(AnimationType.Focus, false);
    };
    useDomEvent(visualElement, "focus", whileFocus ? onFocus : undefined);
    useDomEvent(visualElement, "blur", whileFocus ? onBlur : undefined);
}

function isMouseEvent(event) {
    // PointerEvent inherits from MouseEvent so we can't use a straight instanceof check.
    if (typeof PointerEvent !== "undefined" && event instanceof PointerEvent) {
        return !!(event.pointerType === "mouse");
    }
    return event instanceof MouseEvent;
}
function isTouchEvent(event) {
    var hasTouches = !!event.touches;
    return hasTouches;
}

/**
 * Filters out events not attached to the primary pointer (currently left mouse button)
 * @param eventHandler
 */
function filterPrimaryPointer(eventHandler) {
    return function (event) {
        var isMouseEvent = event instanceof MouseEvent;
        var isPrimaryPointer = !isMouseEvent ||
            (isMouseEvent && event.button === 0);
        if (isPrimaryPointer) {
            eventHandler(event);
        }
    };
}
var defaultPagePoint = { pageX: 0, pageY: 0 };
function pointFromTouch(e, pointType) {
    if (pointType === void 0) { pointType = "page"; }
    var primaryTouch = e.touches[0] || e.changedTouches[0];
    var point = primaryTouch || defaultPagePoint;
    return {
        x: point[pointType + "X"],
        y: point[pointType + "Y"],
    };
}
function pointFromMouse(point, pointType) {
    if (pointType === void 0) { pointType = "page"; }
    return {
        x: point[pointType + "X"],
        y: point[pointType + "Y"],
    };
}
function extractEventInfo(event, pointType) {
    if (pointType === void 0) { pointType = "page"; }
    return {
        point: isTouchEvent(event)
            ? pointFromTouch(event, pointType)
            : pointFromMouse(event, pointType),
    };
}
function getViewportPointFromEvent(event) {
    return extractEventInfo(event, "client");
}
var wrapHandler = function (handler, shouldFilterPrimaryPointer) {
    if (shouldFilterPrimaryPointer === void 0) { shouldFilterPrimaryPointer = false; }
    var listener = function (event) {
        return handler(event, extractEventInfo(event));
    };
    return shouldFilterPrimaryPointer
        ? filterPrimaryPointer(listener)
        : listener;
};

// We check for event support via functions in case they've been mocked by a testing suite.
var supportsPointerEvents = function () {
    return isBrowser && window.onpointerdown === null;
};
var supportsTouchEvents = function () {
    return isBrowser && window.ontouchstart === null;
};
var supportsMouseEvents = function () {
    return isBrowser && window.onmousedown === null;
};

var mouseEventNames = {
    pointerdown: "mousedown",
    pointermove: "mousemove",
    pointerup: "mouseup",
    pointercancel: "mousecancel",
    pointerover: "mouseover",
    pointerout: "mouseout",
    pointerenter: "mouseenter",
    pointerleave: "mouseleave",
};
var touchEventNames = {
    pointerdown: "touchstart",
    pointermove: "touchmove",
    pointerup: "touchend",
    pointercancel: "touchcancel",
};
function getPointerEventName(name) {
    if (supportsPointerEvents()) {
        return name;
    }
    else if (supportsTouchEvents()) {
        return touchEventNames[name];
    }
    else if (supportsMouseEvents()) {
        return mouseEventNames[name];
    }
    return name;
}
function addPointerEvent(target, eventName, handler, options) {
    return addDomEvent(target, getPointerEventName(eventName), wrapHandler(handler, eventName === "pointerdown"), options);
}
function usePointerEvent$1(ref, eventName, handler, options) {
    return useDomEvent(ref, getPointerEventName(eventName), handler && wrapHandler(handler, eventName === "pointerdown"), options);
}

function createLock(name) {
    var lock = null;
    return function () {
        var openLock = function () {
            lock = null;
        };
        if (lock === null) {
            lock = name;
            return openLock;
        }
        return false;
    };
}
var globalHorizontalLock = createLock("dragHorizontal");
var globalVerticalLock = createLock("dragVertical");
function getGlobalLock(drag) {
    var lock = false;
    if (drag === "y") {
        lock = globalVerticalLock();
    }
    else if (drag === "x") {
        lock = globalHorizontalLock();
    }
    else {
        var openHorizontal_1 = globalHorizontalLock();
        var openVertical_1 = globalVerticalLock();
        if (openHorizontal_1 && openVertical_1) {
            lock = function () {
                openHorizontal_1();
                openVertical_1();
            };
        }
        else {
            // Release the locks because we don't use them
            if (openHorizontal_1)
                openHorizontal_1();
            if (openVertical_1)
                openVertical_1();
        }
    }
    return lock;
}
function isDragActive() {
    // Check the gesture lock - if we get it, it means no drag gesture is active
    // and we can safely fire the tap gesture.
    var openGestureLock = getGlobalLock(true);
    if (!openGestureLock)
        return true;
    openGestureLock();
    return false;
}

function createHoverEvent(visualElement, isActive, callback) {
    return function (event, info) {
        var _a;
        if (!isMouseEvent(event) || isDragActive())
            return;
        callback === null || callback === void 0 ? void 0 : callback(event, info);
        (_a = visualElement.animationState) === null || _a === void 0 ? void 0 : _a.setActive(AnimationType.Hover, isActive);
    };
}
function useHoverGesture(_a) {
    var onHoverStart = _a.onHoverStart, onHoverEnd = _a.onHoverEnd, whileHover = _a.whileHover, visualElement = _a.visualElement;
    usePointerEvent$1(visualElement, "pointerenter", onHoverStart || whileHover
        ? createHoverEvent(visualElement, true, onHoverStart)
        : undefined);
    usePointerEvent$1(visualElement, "pointerleave", onHoverEnd || whileHover
        ? createHoverEvent(visualElement, false, onHoverEnd)
        : undefined);
}

/**
 * Recursively traverse up the tree to check whether the provided child node
 * is the parent or a descendant of it.
 *
 * @param parent - Element to find
 * @param child - Element to test against parent
 */
var isNodeOrChild = function (parent, child) {
    if (!child) {
        return false;
    }
    else if (parent === child) {
        return true;
    }
    else {
        return isNodeOrChild(parent, child.parentElement);
    }
};

function useUnmountEffect(callback) {
    return react.useEffect(function () { return function () { return callback(); }; }, []);
}

var clamp$1 = function (min, max, v) {
    return Math.min(Math.max(v, min), max);
};

var safeMin = 0.001;
var minDuration = 0.01;
var maxDuration = 10.0;
var minDamping = 0.05;
var maxDamping = 1;
function findSpring(_a) {
    var _b = _a.duration, duration = _b === void 0 ? 800 : _b, _c = _a.bounce, bounce = _c === void 0 ? 0.25 : _c, _d = _a.velocity, velocity = _d === void 0 ? 0 : _d, _e = _a.mass, mass = _e === void 0 ? 1 : _e;
    var envelope;
    var derivative;
    var dampingRatio = 1 - bounce;
    dampingRatio = clamp$1(minDamping, maxDamping, dampingRatio);
    duration = clamp$1(minDuration, maxDuration, duration / 1000);
    if (dampingRatio < 1) {
        envelope = function (undampedFreq) {
            var exponentialDecay = undampedFreq * dampingRatio;
            var delta = exponentialDecay * duration;
            var a = exponentialDecay - velocity;
            var b = calcAngularFreq(undampedFreq, dampingRatio);
            var c = Math.exp(-delta);
            return safeMin - (a / b) * c;
        };
        derivative = function (undampedFreq) {
            var exponentialDecay = undampedFreq * dampingRatio;
            var delta = exponentialDecay * duration;
            var d = delta * velocity + velocity;
            var e = Math.pow(dampingRatio, 2) * Math.pow(undampedFreq, 2) * duration;
            var f = Math.exp(-delta);
            var g = calcAngularFreq(Math.pow(undampedFreq, 2), dampingRatio);
            var factor = -envelope(undampedFreq) + safeMin > 0 ? -1 : 1;
            return (factor * ((d - e) * f)) / g;
        };
    }
    else {
        envelope = function (undampedFreq) {
            var a = Math.exp(-undampedFreq * duration);
            var b = (undampedFreq - velocity) * duration + 1;
            return -safeMin + a * b;
        };
        derivative = function (undampedFreq) {
            var a = Math.exp(-undampedFreq * duration);
            var b = (velocity - undampedFreq) * (duration * duration);
            return a * b;
        };
    }
    var initialGuess = 5 / duration;
    var undampedFreq = approximateRoot(envelope, derivative, initialGuess);
    duration = duration * 1000;
    if (isNaN(undampedFreq)) {
        return {
            stiffness: 100,
            damping: 10,
            duration: duration,
        };
    }
    else {
        var stiffness = Math.pow(undampedFreq, 2) * mass;
        return {
            stiffness: stiffness,
            damping: dampingRatio * 2 * Math.sqrt(mass * stiffness),
            duration: duration,
        };
    }
}
var rootIterations = 12;
function approximateRoot(envelope, derivative, initialGuess) {
    var result = initialGuess;
    for (var i = 1; i < rootIterations; i++) {
        result = result - envelope(result) / derivative(result);
    }
    return result;
}
function calcAngularFreq(undampedFreq, dampingRatio) {
    return undampedFreq * Math.sqrt(1 - dampingRatio * dampingRatio);
}

var durationKeys = ["duration", "bounce"];
var physicsKeys = ["stiffness", "damping", "mass"];
function isSpringType(options, keys) {
    return keys.some(function (key) { return options[key] !== undefined; });
}
function getSpringOptions(options) {
    var springOptions = __assign({ velocity: 0.0, stiffness: 100, damping: 10, mass: 1.0, isResolvedFromDuration: false }, options);
    if (!isSpringType(options, physicsKeys) &&
        isSpringType(options, durationKeys)) {
        var derived = findSpring(options);
        springOptions = __assign(__assign(__assign({}, springOptions), derived), { velocity: 0.0, mass: 1.0 });
        springOptions.isResolvedFromDuration = true;
    }
    return springOptions;
}
function spring(_a) {
    var _b = _a.from, from = _b === void 0 ? 0.0 : _b, _c = _a.to, to = _c === void 0 ? 1.0 : _c, _d = _a.restSpeed, restSpeed = _d === void 0 ? 2 : _d, restDelta = _a.restDelta, options = __rest(_a, ["from", "to", "restSpeed", "restDelta"]);
    var state = { done: false, value: from };
    var _e = getSpringOptions(options), stiffness = _e.stiffness, damping = _e.damping, mass = _e.mass, velocity = _e.velocity, duration = _e.duration, isResolvedFromDuration = _e.isResolvedFromDuration;
    var resolveSpring = zero;
    var resolveVelocity = zero;
    function createSpring() {
        var initialVelocity = velocity ? -(velocity / 1000) : 0.0;
        var initialDelta = to - from;
        var dampingRatio = damping / (2 * Math.sqrt(stiffness * mass));
        var undampedAngularFreq = Math.sqrt(stiffness / mass) / 1000;
        restDelta !== null && restDelta !== void 0 ? restDelta : (restDelta = Math.abs(to - from) <= 1 ? 0.01 : 0.4);
        if (dampingRatio < 1) {
            var angularFreq_1 = calcAngularFreq(undampedAngularFreq, dampingRatio);
            resolveSpring = function (t) {
                var envelope = Math.exp(-dampingRatio * undampedAngularFreq * t);
                return (to -
                    envelope *
                        (((initialVelocity +
                            dampingRatio * undampedAngularFreq * initialDelta) /
                            angularFreq_1) *
                            Math.sin(angularFreq_1 * t) +
                            initialDelta * Math.cos(angularFreq_1 * t)));
            };
            resolveVelocity = function (t) {
                var envelope = Math.exp(-dampingRatio * undampedAngularFreq * t);
                return (dampingRatio *
                    undampedAngularFreq *
                    envelope *
                    ((Math.sin(angularFreq_1 * t) *
                        (initialVelocity +
                            dampingRatio *
                                undampedAngularFreq *
                                initialDelta)) /
                        angularFreq_1 +
                        initialDelta * Math.cos(angularFreq_1 * t)) -
                    envelope *
                        (Math.cos(angularFreq_1 * t) *
                            (initialVelocity +
                                dampingRatio *
                                    undampedAngularFreq *
                                    initialDelta) -
                            angularFreq_1 *
                                initialDelta *
                                Math.sin(angularFreq_1 * t)));
            };
        }
        else if (dampingRatio === 1) {
            resolveSpring = function (t) {
                return to -
                    Math.exp(-undampedAngularFreq * t) *
                        (initialDelta +
                            (initialVelocity + undampedAngularFreq * initialDelta) *
                                t);
            };
        }
        else {
            var dampedAngularFreq_1 = undampedAngularFreq * Math.sqrt(dampingRatio * dampingRatio - 1);
            resolveSpring = function (t) {
                var envelope = Math.exp(-dampingRatio * undampedAngularFreq * t);
                var freqForT = Math.min(dampedAngularFreq_1 * t, 300);
                return (to -
                    (envelope *
                        ((initialVelocity +
                            dampingRatio * undampedAngularFreq * initialDelta) *
                            Math.sinh(freqForT) +
                            dampedAngularFreq_1 *
                                initialDelta *
                                Math.cosh(freqForT))) /
                        dampedAngularFreq_1);
            };
        }
    }
    createSpring();
    return {
        next: function (t) {
            var current = resolveSpring(t);
            if (!isResolvedFromDuration) {
                var currentVelocity = resolveVelocity(t) * 1000;
                var isBelowVelocityThreshold = Math.abs(currentVelocity) <= restSpeed;
                var isBelowDisplacementThreshold = Math.abs(to - current) <= restDelta;
                state.done =
                    isBelowVelocityThreshold && isBelowDisplacementThreshold;
            }
            else {
                state.done = t >= duration;
            }
            state.value = state.done ? to : current;
            return state;
        },
        flipTarget: function () {
            var _a;
            velocity = -velocity;
            _a = [to, from], from = _a[0], to = _a[1];
            createSpring();
        },
    };
}
spring.needsInterpolation = function (a, b) {
    return typeof a === "string" || typeof b === "string";
};
var zero = function (_t) { return 0; };

var progress = function (from, to, value) {
    var toFromDifference = to - from;
    return toFromDifference === 0 ? 1 : (value - from) / toFromDifference;
};

var mix = function (from, to, progress) {
    return -progress * from + progress * to + from;
};

var mixLinearColor = function (from, to, v) {
    var fromExpo = from * from;
    var toExpo = to * to;
    return Math.sqrt(Math.max(0, v * (toExpo - fromExpo) + fromExpo));
};
var colorTypes = [hex, rgba, hsla];
var getColorType = function (v) {
    return colorTypes.find(function (type) { return type.test(v); });
};
var mixColor = function (from, to) {
    var fromColorType = getColorType(from);
    var toColorType = getColorType(to);
    invariant(fromColorType.transform === toColorType.transform);
    var fromColor = fromColorType.parse(from);
    var toColor = toColorType.parse(to);
    var blended = __assign({}, fromColor);
    var mixFunc = fromColorType === hsla ? mix : mixLinearColor;
    return function (v) {
        for (var key in blended) {
            if (key !== "alpha") {
                blended[key] = mixFunc(fromColor[key], toColor[key], v);
            }
        }
        blended.alpha = mix(fromColor.alpha, toColor.alpha, v);
        return fromColorType.transform(blended);
    };
};

var isNum = function (v) { return typeof v === 'number'; };

var combineFunctions = function (a, b) { return function (v) { return b(a(v)); }; };
var pipe = function () {
    var transformers = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        transformers[_i] = arguments[_i];
    }
    return transformers.reduce(combineFunctions);
};

function getMixer(origin, target) {
    if (isNum(origin)) {
        return function (v) { return mix(origin, target, v); };
    }
    else if (color.test(origin)) {
        return mixColor(origin, target);
    }
    else {
        return mixComplex(origin, target);
    }
}
var mixArray = function (from, to) {
    var output = __spreadArray([], from);
    var numValues = output.length;
    var blendValue = from.map(function (fromThis, i) { return getMixer(fromThis, to[i]); });
    return function (v) {
        for (var i = 0; i < numValues; i++) {
            output[i] = blendValue[i](v);
        }
        return output;
    };
};
var mixObject = function (origin, target) {
    var output = __assign(__assign({}, origin), target);
    var blendValue = {};
    for (var key in output) {
        if (origin[key] !== undefined && target[key] !== undefined) {
            blendValue[key] = getMixer(origin[key], target[key]);
        }
    }
    return function (v) {
        for (var key in blendValue) {
            output[key] = blendValue[key](v);
        }
        return output;
    };
};
function analyse$1(value) {
    var parsed = complex.parse(value);
    var numValues = parsed.length;
    var numNumbers = 0;
    var numRGB = 0;
    var numHSL = 0;
    for (var i = 0; i < numValues; i++) {
        if (numNumbers || typeof parsed[i] === "number") {
            numNumbers++;
        }
        else {
            if (parsed[i].hue !== undefined) {
                numHSL++;
            }
            else {
                numRGB++;
            }
        }
    }
    return { parsed: parsed, numNumbers: numNumbers, numRGB: numRGB, numHSL: numHSL };
}
var mixComplex = function (origin, target) {
    var template = complex.createTransformer(target);
    var originStats = analyse$1(origin);
    var targetStats = analyse$1(target);
    return pipe(mixArray(originStats.parsed, targetStats.parsed), template);
};

var mixNumber = function (from, to) { return function (p) { return mix(from, to, p); }; };
function detectMixerFactory(v) {
    if (typeof v === 'number') {
        return mixNumber;
    }
    else if (typeof v === 'string') {
        if (color.test(v)) {
            return mixColor;
        }
        else {
            return mixComplex;
        }
    }
    else if (Array.isArray(v)) {
        return mixArray;
    }
    else if (typeof v === 'object') {
        return mixObject;
    }
}
function createMixers(output, ease, customMixer) {
    var mixers = [];
    var mixerFactory = customMixer || detectMixerFactory(output[0]);
    var numMixers = output.length - 1;
    for (var i = 0; i < numMixers; i++) {
        var mixer = mixerFactory(output[i], output[i + 1]);
        if (ease) {
            var easingFunction = Array.isArray(ease) ? ease[i] : ease;
            mixer = pipe(easingFunction, mixer);
        }
        mixers.push(mixer);
    }
    return mixers;
}
function fastInterpolate(_a, _b) {
    var from = _a[0], to = _a[1];
    var mixer = _b[0];
    return function (v) { return mixer(progress(from, to, v)); };
}
function slowInterpolate(input, mixers) {
    var inputLength = input.length;
    var lastInputIndex = inputLength - 1;
    return function (v) {
        var mixerIndex = 0;
        var foundMixerIndex = false;
        if (v <= input[0]) {
            foundMixerIndex = true;
        }
        else if (v >= input[lastInputIndex]) {
            mixerIndex = lastInputIndex - 1;
            foundMixerIndex = true;
        }
        if (!foundMixerIndex) {
            var i = 1;
            for (; i < inputLength; i++) {
                if (input[i] > v || i === lastInputIndex) {
                    break;
                }
            }
            mixerIndex = i - 1;
        }
        var progressInRange = progress(input[mixerIndex], input[mixerIndex + 1], v);
        return mixers[mixerIndex](progressInRange);
    };
}
function interpolate(input, output, _a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.clamp, isClamp = _c === void 0 ? true : _c, ease = _b.ease, mixer = _b.mixer;
    var inputLength = input.length;
    invariant(inputLength === output.length);
    invariant(!ease || !Array.isArray(ease) || ease.length === inputLength - 1);
    if (input[0] > input[inputLength - 1]) {
        input = [].concat(input);
        output = [].concat(output);
        input.reverse();
        output.reverse();
    }
    var mixers = createMixers(output, ease, mixer);
    var interpolator = inputLength === 2
        ? fastInterpolate(input, mixers)
        : slowInterpolate(input, mixers);
    return isClamp
        ? function (v) { return interpolator(clamp$1(input[0], input[inputLength - 1], v)); }
        : interpolator;
}

var reverseEasing = function (easing) { return function (p) { return 1 - easing(1 - p); }; };
var mirrorEasing = function (easing) { return function (p) {
    return p <= 0.5 ? easing(2 * p) / 2 : (2 - easing(2 * (1 - p))) / 2;
}; };
var createExpoIn = function (power) { return function (p) { return Math.pow(p, power); }; };
var createBackIn = function (power) { return function (p) {
    return p * p * ((power + 1) * p - power);
}; };
var createAnticipate = function (power) {
    var backEasing = createBackIn(power);
    return function (p) {
        return (p *= 2) < 1
            ? 0.5 * backEasing(p)
            : 0.5 * (2 - Math.pow(2, -10 * (p - 1)));
    };
};

var DEFAULT_OVERSHOOT_STRENGTH = 1.525;
var BOUNCE_FIRST_THRESHOLD = 4.0 / 11.0;
var BOUNCE_SECOND_THRESHOLD = 8.0 / 11.0;
var BOUNCE_THIRD_THRESHOLD = 9.0 / 10.0;
var linear = function (p) { return p; };
var easeIn = createExpoIn(2);
var easeOut = reverseEasing(easeIn);
var easeInOut = mirrorEasing(easeIn);
var circIn = function (p) { return 1 - Math.sin(Math.acos(p)); };
var circOut = reverseEasing(circIn);
var circInOut = mirrorEasing(circOut);
var backIn = createBackIn(DEFAULT_OVERSHOOT_STRENGTH);
var backOut = reverseEasing(backIn);
var backInOut = mirrorEasing(backIn);
var anticipate = createAnticipate(DEFAULT_OVERSHOOT_STRENGTH);
var ca = 4356.0 / 361.0;
var cb = 35442.0 / 1805.0;
var cc = 16061.0 / 1805.0;
var bounceOut = function (p) {
    if (p === 1 || p === 0)
        return p;
    var p2 = p * p;
    return p < BOUNCE_FIRST_THRESHOLD
        ? 7.5625 * p2
        : p < BOUNCE_SECOND_THRESHOLD
            ? 9.075 * p2 - 9.9 * p + 3.4
            : p < BOUNCE_THIRD_THRESHOLD
                ? ca * p2 - cb * p + cc
                : 10.8 * p * p - 20.52 * p + 10.72;
};
var bounceIn = reverseEasing(bounceOut);
var bounceInOut = function (p) {
    return p < 0.5
        ? 0.5 * (1.0 - bounceOut(1.0 - p * 2.0))
        : 0.5 * bounceOut(p * 2.0 - 1.0) + 0.5;
};

function defaultEasing(values, easing) {
    return values.map(function () { return easing || easeInOut; }).splice(0, values.length - 1);
}
function defaultOffset(values) {
    var numValues = values.length;
    return values.map(function (_value, i) {
        return i !== 0 ? i / (numValues - 1) : 0;
    });
}
function convertOffsetToTimes(offset, duration) {
    return offset.map(function (o) { return o * duration; });
}
function keyframes(_a) {
    var _b = _a.from, from = _b === void 0 ? 0 : _b, _c = _a.to, to = _c === void 0 ? 1 : _c, ease = _a.ease, offset = _a.offset, _d = _a.duration, duration = _d === void 0 ? 300 : _d;
    var state = { done: false, value: from };
    var values = Array.isArray(to) ? to : [from, to];
    var times = convertOffsetToTimes(offset && offset.length === values.length
        ? offset
        : defaultOffset(values), duration);
    function createInterpolator() {
        return interpolate(times, values, {
            ease: Array.isArray(ease) ? ease : defaultEasing(values, ease),
        });
    }
    var interpolator = createInterpolator();
    return {
        next: function (t) {
            state.value = interpolator(t);
            state.done = t >= duration;
            return state;
        },
        flipTarget: function () {
            values.reverse();
            interpolator = createInterpolator();
        },
    };
}

function decay(_a) {
    var _b = _a.velocity, velocity = _b === void 0 ? 0 : _b, _c = _a.from, from = _c === void 0 ? 0 : _c, _d = _a.power, power = _d === void 0 ? 0.8 : _d, _e = _a.timeConstant, timeConstant = _e === void 0 ? 350 : _e, _f = _a.restDelta, restDelta = _f === void 0 ? 0.5 : _f, modifyTarget = _a.modifyTarget;
    var state = { done: false, value: from };
    var amplitude = power * velocity;
    var ideal = from + amplitude;
    var target = modifyTarget === undefined ? ideal : modifyTarget(ideal);
    if (target !== ideal)
        amplitude = target - from;
    return {
        next: function (t) {
            var delta = -amplitude * Math.exp(-t / timeConstant);
            state.done = !(delta > restDelta || delta < -restDelta);
            state.value = state.done ? target : target + delta;
            return state;
        },
        flipTarget: function () { },
    };
}

var types = { keyframes: keyframes, spring: spring, decay: decay };
function detectAnimationFromOptions(config) {
    if (Array.isArray(config.to)) {
        return keyframes;
    }
    else if (types[config.type]) {
        return types[config.type];
    }
    var keys = new Set(Object.keys(config));
    if (keys.has("ease") ||
        (keys.has("duration") && !keys.has("dampingRatio"))) {
        return keyframes;
    }
    else if (keys.has("dampingRatio") ||
        keys.has("stiffness") ||
        keys.has("mass") ||
        keys.has("damping") ||
        keys.has("restSpeed") ||
        keys.has("restDelta")) {
        return spring;
    }
    return keyframes;
}

function loopElapsed(elapsed, duration, delay) {
    if (delay === void 0) { delay = 0; }
    return elapsed - duration - delay;
}
function reverseElapsed(elapsed, duration, delay, isForwardPlayback) {
    if (delay === void 0) { delay = 0; }
    if (isForwardPlayback === void 0) { isForwardPlayback = true; }
    return isForwardPlayback
        ? loopElapsed(duration + -elapsed, duration, delay)
        : duration - (elapsed - duration) + delay;
}
function hasRepeatDelayElapsed(elapsed, duration, delay, isForwardPlayback) {
    return isForwardPlayback ? elapsed >= duration + delay : elapsed <= -delay;
}

var framesync = function (update) {
    var passTimestamp = function (_a) {
        var delta = _a.delta;
        return update(delta);
    };
    return {
        start: function () { return sync.update(passTimestamp, true); },
        stop: function () { return cancelSync.update(passTimestamp); },
    };
};
function animate(_a) {
    var _b, _c;
    var from = _a.from, _d = _a.autoplay, autoplay = _d === void 0 ? true : _d, _e = _a.driver, driver = _e === void 0 ? framesync : _e, _f = _a.elapsed, elapsed = _f === void 0 ? 0 : _f, _g = _a.repeat, repeatMax = _g === void 0 ? 0 : _g, _h = _a.repeatType, repeatType = _h === void 0 ? "loop" : _h, _j = _a.repeatDelay, repeatDelay = _j === void 0 ? 0 : _j, onPlay = _a.onPlay, onStop = _a.onStop, onComplete = _a.onComplete, onRepeat = _a.onRepeat, onUpdate = _a.onUpdate, options = __rest(_a, ["from", "autoplay", "driver", "elapsed", "repeat", "repeatType", "repeatDelay", "onPlay", "onStop", "onComplete", "onRepeat", "onUpdate"]);
    var to = options.to;
    var driverControls;
    var repeatCount = 0;
    var computedDuration = options.duration;
    var latest;
    var isComplete = false;
    var isForwardPlayback = true;
    var interpolateFromNumber;
    var animator = detectAnimationFromOptions(options);
    if ((_c = (_b = animator).needsInterpolation) === null || _c === void 0 ? void 0 : _c.call(_b, from, to)) {
        interpolateFromNumber = interpolate([0, 100], [from, to], {
            clamp: false,
        });
        from = 0;
        to = 100;
    }
    var animation = animator(__assign(__assign({}, options), { from: from, to: to }));
    function repeat() {
        repeatCount++;
        if (repeatType === "reverse") {
            isForwardPlayback = repeatCount % 2 === 0;
            elapsed = reverseElapsed(elapsed, computedDuration, repeatDelay, isForwardPlayback);
        }
        else {
            elapsed = loopElapsed(elapsed, computedDuration, repeatDelay);
            if (repeatType === "mirror")
                animation.flipTarget();
        }
        isComplete = false;
        onRepeat && onRepeat();
    }
    function complete() {
        driverControls.stop();
        onComplete && onComplete();
    }
    function update(delta) {
        if (!isForwardPlayback)
            delta = -delta;
        elapsed += delta;
        if (!isComplete) {
            var state = animation.next(Math.max(0, elapsed));
            latest = state.value;
            if (interpolateFromNumber)
                latest = interpolateFromNumber(latest);
            isComplete = isForwardPlayback ? state.done : elapsed <= 0;
        }
        onUpdate === null || onUpdate === void 0 ? void 0 : onUpdate(latest);
        if (isComplete) {
            if (repeatCount === 0)
                computedDuration !== null && computedDuration !== void 0 ? computedDuration : (computedDuration = elapsed);
            if (repeatCount < repeatMax) {
                hasRepeatDelayElapsed(elapsed, computedDuration, repeatDelay, isForwardPlayback) && repeat();
            }
            else {
                complete();
            }
        }
    }
    function play() {
        onPlay === null || onPlay === void 0 ? void 0 : onPlay();
        driverControls = driver(update);
        driverControls.start();
    }
    autoplay && play();
    return {
        stop: function () {
            onStop === null || onStop === void 0 ? void 0 : onStop();
            driverControls.stop();
        },
    };
}

function velocityPerSecond(velocity, frameDuration) {
    return frameDuration ? velocity * (1000 / frameDuration) : 0;
}

function inertia(_a) {
    var _b = _a.from, from = _b === void 0 ? 0 : _b, _c = _a.velocity, velocity = _c === void 0 ? 0 : _c, min = _a.min, max = _a.max, _d = _a.power, power = _d === void 0 ? 0.8 : _d, _e = _a.timeConstant, timeConstant = _e === void 0 ? 750 : _e, _f = _a.bounceStiffness, bounceStiffness = _f === void 0 ? 500 : _f, _g = _a.bounceDamping, bounceDamping = _g === void 0 ? 10 : _g, _h = _a.restDelta, restDelta = _h === void 0 ? 1 : _h, modifyTarget = _a.modifyTarget, driver = _a.driver, onUpdate = _a.onUpdate, onComplete = _a.onComplete;
    var currentAnimation;
    function isOutOfBounds(v) {
        return (min !== undefined && v < min) || (max !== undefined && v > max);
    }
    function boundaryNearest(v) {
        if (min === undefined)
            return max;
        if (max === undefined)
            return min;
        return Math.abs(min - v) < Math.abs(max - v) ? min : max;
    }
    function startAnimation(options) {
        currentAnimation === null || currentAnimation === void 0 ? void 0 : currentAnimation.stop();
        currentAnimation = animate(__assign(__assign({}, options), { driver: driver, onUpdate: function (v) {
                var _a;
                onUpdate === null || onUpdate === void 0 ? void 0 : onUpdate(v);
                (_a = options.onUpdate) === null || _a === void 0 ? void 0 : _a.call(options, v);
            }, onComplete: onComplete }));
    }
    function startSpring(options) {
        startAnimation(__assign({ type: "spring", stiffness: bounceStiffness, damping: bounceDamping, restDelta: restDelta }, options));
    }
    if (isOutOfBounds(from)) {
        startSpring({ from: from, velocity: velocity, to: boundaryNearest(from) });
    }
    else {
        var target = power * velocity + from;
        if (typeof modifyTarget !== "undefined")
            target = modifyTarget(target);
        var boundary_1 = boundaryNearest(target);
        var heading_1 = boundary_1 === min ? -1 : 1;
        var prev_1;
        var current_1;
        var checkBoundary = function (v) {
            prev_1 = current_1;
            current_1 = v;
            velocity = velocityPerSecond(v - prev_1, getFrameData().delta);
            if ((heading_1 === 1 && v > boundary_1) ||
                (heading_1 === -1 && v < boundary_1)) {
                startSpring({ from: v, to: boundary_1, velocity: velocity });
            }
        };
        startAnimation({
            type: "decay",
            from: from,
            velocity: velocity,
            timeConstant: timeConstant,
            power: power,
            restDelta: restDelta,
            modifyTarget: modifyTarget,
            onUpdate: isOutOfBounds(target) ? checkBoundary : undefined,
        });
    }
    return {
        stop: function () { return currentAnimation === null || currentAnimation === void 0 ? void 0 : currentAnimation.stop(); },
    };
}

var isPoint = function (point) {
    return point.hasOwnProperty('x') && point.hasOwnProperty('y');
};

var isPoint3D = function (point) {
    return isPoint(point) && point.hasOwnProperty('z');
};

var distance1D = function (a, b) { return Math.abs(a - b); };
function distance(a, b) {
    if (isNum(a) && isNum(b)) {
        return distance1D(a, b);
    }
    else if (isPoint(a) && isPoint(b)) {
        var xDelta = distance1D(a.x, b.x);
        var yDelta = distance1D(a.y, b.y);
        var zDelta = isPoint3D(a) && isPoint3D(b) ? distance1D(a.z, b.z) : 0;
        return Math.sqrt(Math.pow(xDelta, 2) + Math.pow(yDelta, 2) + Math.pow(zDelta, 2));
    }
}

var a = function (a1, a2) { return 1.0 - 3.0 * a2 + 3.0 * a1; };
var b = function (a1, a2) { return 3.0 * a2 - 6.0 * a1; };
var c = function (a1) { return 3.0 * a1; };
var calcBezier = function (t, a1, a2) {
    return ((a(a1, a2) * t + b(a1, a2)) * t + c(a1)) * t;
};
var getSlope = function (t, a1, a2) {
    return 3.0 * a(a1, a2) * t * t + 2.0 * b(a1, a2) * t + c(a1);
};
var subdivisionPrecision = 0.0000001;
var subdivisionMaxIterations = 10;
function binarySubdivide(aX, aA, aB, mX1, mX2) {
    var currentX;
    var currentT;
    var i = 0;
    do {
        currentT = aA + (aB - aA) / 2.0;
        currentX = calcBezier(currentT, mX1, mX2) - aX;
        if (currentX > 0.0) {
            aB = currentT;
        }
        else {
            aA = currentT;
        }
    } while (Math.abs(currentX) > subdivisionPrecision &&
        ++i < subdivisionMaxIterations);
    return currentT;
}
var newtonIterations = 8;
var newtonMinSlope = 0.001;
function newtonRaphsonIterate(aX, aGuessT, mX1, mX2) {
    for (var i = 0; i < newtonIterations; ++i) {
        var currentSlope = getSlope(aGuessT, mX1, mX2);
        if (currentSlope === 0.0) {
            return aGuessT;
        }
        var currentX = calcBezier(aGuessT, mX1, mX2) - aX;
        aGuessT -= currentX / currentSlope;
    }
    return aGuessT;
}
var kSplineTableSize = 11;
var kSampleStepSize = 1.0 / (kSplineTableSize - 1.0);
function cubicBezier(mX1, mY1, mX2, mY2) {
    if (mX1 === mY1 && mX2 === mY2)
        return linear;
    var sampleValues = new Float32Array(kSplineTableSize);
    for (var i = 0; i < kSplineTableSize; ++i) {
        sampleValues[i] = calcBezier(i * kSampleStepSize, mX1, mX2);
    }
    function getTForX(aX) {
        var intervalStart = 0.0;
        var currentSample = 1;
        var lastSample = kSplineTableSize - 1;
        for (; currentSample !== lastSample && sampleValues[currentSample] <= aX; ++currentSample) {
            intervalStart += kSampleStepSize;
        }
        --currentSample;
        var dist = (aX - sampleValues[currentSample]) /
            (sampleValues[currentSample + 1] - sampleValues[currentSample]);
        var guessForT = intervalStart + dist * kSampleStepSize;
        var initialSlope = getSlope(guessForT, mX1, mX2);
        if (initialSlope >= newtonMinSlope) {
            return newtonRaphsonIterate(aX, guessForT, mX1, mX2);
        }
        else if (initialSlope === 0.0) {
            return guessForT;
        }
        else {
            return binarySubdivide(aX, intervalStart, intervalStart + kSampleStepSize, mX1, mX2);
        }
    }
    return function (t) {
        return t === 0 || t === 1 ? t : calcBezier(getTForX(t), mY1, mY2);
    };
}

/**
 * @param handlers -
 * @internal
 */
function useTapGesture(_a) {
    var onTap = _a.onTap, onTapStart = _a.onTapStart, onTapCancel = _a.onTapCancel, whileTap = _a.whileTap, visualElement = _a.visualElement;
    var hasPressListeners = onTap || onTapStart || onTapCancel || whileTap;
    var isPressing = react.useRef(false);
    var cancelPointerEndListeners = react.useRef(null);
    function removePointerEndListener() {
        var _a;
        (_a = cancelPointerEndListeners.current) === null || _a === void 0 ? void 0 : _a.call(cancelPointerEndListeners);
        cancelPointerEndListeners.current = null;
    }
    function checkPointerEnd() {
        var _a;
        removePointerEndListener();
        isPressing.current = false;
        (_a = visualElement.animationState) === null || _a === void 0 ? void 0 : _a.setActive(AnimationType.Tap, false);
        return !isDragActive();
    }
    function onPointerUp(event, info) {
        if (!checkPointerEnd())
            return;
        /**
         * We only count this as a tap gesture if the event.target is the same
         * as, or a child of, this component's element
         */
        !isNodeOrChild(visualElement.getInstance(), event.target)
            ? onTapCancel === null || onTapCancel === void 0 ? void 0 : onTapCancel(event, info)
            : onTap === null || onTap === void 0 ? void 0 : onTap(event, info);
    }
    function onPointerCancel(event, info) {
        if (!checkPointerEnd())
            return;
        onTapCancel === null || onTapCancel === void 0 ? void 0 : onTapCancel(event, info);
    }
    function onPointerDown(event, info) {
        var _a;
        removePointerEndListener();
        if (isPressing.current)
            return;
        isPressing.current = true;
        cancelPointerEndListeners.current = pipe(addPointerEvent(window, "pointerup", onPointerUp), addPointerEvent(window, "pointercancel", onPointerCancel));
        onTapStart === null || onTapStart === void 0 ? void 0 : onTapStart(event, info);
        (_a = visualElement.animationState) === null || _a === void 0 ? void 0 : _a.setActive(AnimationType.Tap, true);
    }
    usePointerEvent$1(visualElement, "pointerdown", hasPressListeners ? onPointerDown : undefined);
    useUnmountEffect(removePointerEndListener);
}

var makeRenderlessComponent = function (hook) { return function (props) {
    hook(props);
    return null;
}; };

var gestureAnimations = {
    tap: makeRenderlessComponent(useTapGesture),
    focus: makeRenderlessComponent(useFocusGesture),
    hover: makeRenderlessComponent(useHoverGesture),
};

function shallowCompare(next, prev) {
    if (!Array.isArray(prev))
        return false;
    var prevLength = prev.length;
    if (prevLength !== next.length)
        return false;
    for (var i = 0; i < prevLength; i++) {
        if (prev[i] !== next[i])
            return false;
    }
    return true;
}

/**
 * Converts seconds to milliseconds
 *
 * @param seconds - Time in seconds.
 * @return milliseconds - Converted time in milliseconds.
 */
var secondsToMilliseconds = function (seconds) { return seconds * 1000; };

var easingLookup = {
    linear: linear,
    easeIn: easeIn,
    easeInOut: easeInOut,
    easeOut: easeOut,
    circIn: circIn,
    circInOut: circInOut,
    circOut: circOut,
    backIn: backIn,
    backInOut: backInOut,
    backOut: backOut,
    anticipate: anticipate,
    bounceIn: bounceIn,
    bounceInOut: bounceInOut,
    bounceOut: bounceOut,
};
var easingDefinitionToFunction = function (definition) {
    if (Array.isArray(definition)) {
        // If cubic bezier definition, create bezier curve
        invariant(definition.length === 4);
        var _a = __read(definition, 4), x1 = _a[0], y1 = _a[1], x2 = _a[2], y2 = _a[3];
        return cubicBezier(x1, y1, x2, y2);
    }
    else if (typeof definition === "string") {
        return easingLookup[definition];
    }
    return definition;
};
var isEasingArray = function (ease) {
    return Array.isArray(ease) && typeof ease[0] !== "number";
};

/**
 * Check if a value is animatable. Examples:
 *
 * ✅: 100, "100px", "#fff"
 * ❌: "block", "url(2.jpg)"
 * @param value
 *
 * @internal
 */
var isAnimatable = function (key, value) {
    // If the list of keys tat might be non-animatable grows, replace with Set
    if (key === "zIndex")
        return false;
    // If it's a number or a keyframes array, we can animate it. We might at some point
    // need to do a deep isAnimatable check of keyframes, or let Popmotion handle this,
    // but for now lets leave it like this for performance reasons
    if (typeof value === "number" || Array.isArray(value))
        return true;
    if (typeof value === "string" && // It's animatable if we have a string
        complex.test(value) && // And it contains numbers and/or colors
        !value.startsWith("url(") // Unless it starts with "url("
    ) {
        return true;
    }
    return false;
};

var underDampedSpring = function () { return ({
    type: "spring",
    stiffness: 500,
    damping: 25,
    restDelta: 0.5,
    restSpeed: 10,
}); };
var criticallyDampedSpring = function (to) { return ({
    type: "spring",
    stiffness: 550,
    damping: to === 0 ? 2 * Math.sqrt(550) : 30,
    restDelta: 0.01,
    restSpeed: 10,
}); };
var linearTween = function () { return ({
    type: "keyframes",
    ease: "linear",
    duration: 0.3,
}); };
var keyframes$1 = function (values) { return ({
    type: "keyframes",
    duration: 0.8,
    values: values,
}); };
var defaultTransitions = {
    x: underDampedSpring,
    y: underDampedSpring,
    z: underDampedSpring,
    rotate: underDampedSpring,
    rotateX: underDampedSpring,
    rotateY: underDampedSpring,
    rotateZ: underDampedSpring,
    scaleX: criticallyDampedSpring,
    scaleY: criticallyDampedSpring,
    scale: criticallyDampedSpring,
    opacity: linearTween,
    backgroundColor: linearTween,
    color: linearTween,
    default: criticallyDampedSpring,
};
var getDefaultTransition = function (valueKey, to) {
    var transitionFactory;
    if (isKeyframesTarget(to)) {
        transitionFactory = keyframes$1;
    }
    else {
        transitionFactory =
            defaultTransitions[valueKey] || defaultTransitions.default;
    }
    return __assign({ to: to }, transitionFactory(to));
};

/**
 * A map of default value types for common values
 */
var defaultValueTypes = __assign(__assign({}, numberValueTypes), { 
    // Color props
    color: color, backgroundColor: color, outlineColor: color, fill: color, stroke: color, 
    // Border props
    borderColor: color, borderTopColor: color, borderRightColor: color, borderBottomColor: color, borderLeftColor: color, filter: filter, WebkitFilter: filter });
/**
 * Gets the default ValueType for the provided value key
 */
var getDefaultValueType = function (key) { return defaultValueTypes[key]; };

function getAnimatableNone$1(key, value) {
    var _a;
    var defaultValueType = getDefaultValueType(key);
    if (defaultValueType !== filter)
        defaultValueType = complex;
    // If value is not recognised as animatable, ie "none", create an animatable version origin based on the target
    return (_a = defaultValueType.getAnimatableNone) === null || _a === void 0 ? void 0 : _a.call(defaultValueType, value);
}

/**
 * Decide whether a transition is defined on a given Transition.
 * This filters out orchestration options and returns true
 * if any options are left.
 */
function isTransitionDefined(_a) {
    _a.when; _a.delay; _a.delayChildren; _a.staggerChildren; _a.staggerDirection; _a.repeat; _a.repeatType; _a.repeatDelay; _a.from; var transition = __rest(_a, ["when", "delay", "delayChildren", "staggerChildren", "staggerDirection", "repeat", "repeatType", "repeatDelay", "from"]);
    return !!Object.keys(transition).length;
}
/**
 * Convert Framer Motion's Transition type into Popmotion-compatible options.
 */
function convertTransitionToAnimationOptions(_a) {
    var ease = _a.ease, times = _a.times, yoyo = _a.yoyo, flip = _a.flip, loop = _a.loop, transition = __rest(_a, ["ease", "times", "yoyo", "flip", "loop"]);
    var options = __assign({}, transition);
    if (times)
        options["offset"] = times;
    /**
     * Convert any existing durations from seconds to milliseconds
     */
    if (transition.duration)
        options["duration"] = secondsToMilliseconds(transition.duration);
    if (transition.repeatDelay)
        options.repeatDelay = secondsToMilliseconds(transition.repeatDelay);
    /**
     * Map easing names to Popmotion's easing functions
     */
    if (ease) {
        options["ease"] = isEasingArray(ease)
            ? ease.map(easingDefinitionToFunction)
            : easingDefinitionToFunction(ease);
    }
    /**
     * Support legacy transition API
     */
    if (transition.type === "tween")
        options.type = "keyframes";
    /**
     * TODO: These options are officially removed from the API.
     */
    if (yoyo || loop || flip) {
        if (yoyo) {
            options.repeatType = "reverse";
        }
        else if (loop) {
            options.repeatType = "loop";
        }
        else if (flip) {
            options.repeatType = "mirror";
        }
        options.repeat = loop || yoyo || flip || transition.repeat;
    }
    /**
     * TODO: Popmotion 9 has the ability to automatically detect whether to use
     * a keyframes or spring animation, but does so by detecting velocity and other spring options.
     * It'd be good to introduce a similar thing here.
     */
    if (transition.type !== "spring")
        options.type = "keyframes";
    return options;
}
/**
 * Get the delay for a value by checking Transition with decreasing specificity.
 */
function getDelayFromTransition(transition, key) {
    var _a;
    var valueTransition = getValueTransition(transition, key) || {};
    return (_a = valueTransition.delay) !== null && _a !== void 0 ? _a : 0;
}
function hydrateKeyframes(options) {
    if (Array.isArray(options.to) && options.to[0] === null) {
        options.to = __spreadArray([], __read(options.to));
        options.to[0] = options.from;
    }
    return options;
}
function getPopmotionAnimationOptions(transition, options, key) {
    var _a;
    if (Array.isArray(options.to)) {
        (_a = transition.duration) !== null && _a !== void 0 ? _a : (transition.duration = 0.8);
    }
    hydrateKeyframes(options);
    /**
     * Get a default transition if none is determined to be defined.
     */
    if (!isTransitionDefined(transition)) {
        transition = __assign(__assign({}, transition), getDefaultTransition(key, options.to));
    }
    return __assign(__assign({}, options), convertTransitionToAnimationOptions(transition));
}
/**
 *
 */
function getAnimation(key, value, target, transition, onComplete) {
    var _a;
    var valueTransition = getValueTransition(transition, key);
    var origin = (_a = valueTransition.from) !== null && _a !== void 0 ? _a : value.get();
    var isTargetAnimatable = isAnimatable(key, target);
    if (origin === "none" && isTargetAnimatable && typeof target === "string") {
        /**
         * If we're trying to animate from "none", try and get an animatable version
         * of the target. This could be improved to work both ways.
         */
        origin = getAnimatableNone$1(key, target);
    }
    else if (isZero(origin) && typeof target === "string") {
        origin = getZeroUnit(target);
    }
    else if (!Array.isArray(target) &&
        isZero(target) &&
        typeof origin === "string") {
        target = getZeroUnit(origin);
    }
    var isOriginAnimatable = isAnimatable(key, origin);
    function start() {
        var options = {
            from: origin,
            to: target,
            velocity: value.getVelocity(),
            onComplete: onComplete,
            onUpdate: function (v) { return value.set(v); },
        };
        return valueTransition.type === "inertia" ||
            valueTransition.type === "decay"
            ? inertia(__assign(__assign({}, options), valueTransition))
            : animate(__assign(__assign({}, getPopmotionAnimationOptions(valueTransition, options, key)), { onUpdate: function (v) {
                    var _a;
                    options.onUpdate(v);
                    (_a = valueTransition.onUpdate) === null || _a === void 0 ? void 0 : _a.call(valueTransition, v);
                }, onComplete: function () {
                    var _a;
                    options.onComplete();
                    (_a = valueTransition.onComplete) === null || _a === void 0 ? void 0 : _a.call(valueTransition);
                } }));
    }
    function set() {
        var _a;
        value.set(target);
        onComplete();
        (_a = valueTransition === null || valueTransition === void 0 ? void 0 : valueTransition.onComplete) === null || _a === void 0 ? void 0 : _a.call(valueTransition);
        return { stop: function () { } };
    }
    return !isOriginAnimatable ||
        !isTargetAnimatable ||
        valueTransition.type === false
        ? set
        : start;
}
function isZero(value) {
    return (value === 0 ||
        (typeof value === "string" &&
            parseFloat(value) === 0 &&
            value.indexOf(" ") === -1));
}
function getZeroUnit(potentialUnitType) {
    return typeof potentialUnitType === "number"
        ? 0
        : getAnimatableNone$1("", potentialUnitType);
}
function getValueTransition(transition, key) {
    return transition[key] || transition["default"] || transition;
}
/**
 * Start animation on a MotionValue. This function is an interface between
 * Framer Motion and Popmotion
 *
 * @internal
 */
function startAnimation(key, value, target, transition) {
    if (transition === void 0) { transition = {}; }
    return value.start(function (onComplete) {
        var delayTimer;
        var controls;
        var animation = getAnimation(key, value, target, transition, onComplete);
        var delay = getDelayFromTransition(transition, key);
        var start = function () { return (controls = animation()); };
        if (delay) {
            delayTimer = setTimeout(start, secondsToMilliseconds(delay));
        }
        else {
            start();
        }
        return function () {
            clearTimeout(delayTimer);
            controls === null || controls === void 0 ? void 0 : controls.stop();
        };
    });
}

/**
 * Check if value is a numerical string, ie a string that is purely a number eg "100" or "-100.1"
 */
var isNumericalString = function (v) { return /^\-?\d*\.?\d+$/.test(v); };

function addUniqueItem(arr, item) {
    arr.indexOf(item) === -1 && arr.push(item);
}
function removeItem(arr, item) {
    var index = arr.indexOf(item);
    index > -1 && arr.splice(index, 1);
}

var SubscriptionManager = /** @class */ (function () {
    function SubscriptionManager() {
        this.subscriptions = [];
    }
    SubscriptionManager.prototype.add = function (handler) {
        var _this = this;
        addUniqueItem(this.subscriptions, handler);
        return function () { return removeItem(_this.subscriptions, handler); };
    };
    SubscriptionManager.prototype.notify = function (a, b, c) {
        var numSubscriptions = this.subscriptions.length;
        if (!numSubscriptions)
            return;
        if (numSubscriptions === 1) {
            /**
             * If there's only a single handler we can just call it without invoking a loop.
             */
            this.subscriptions[0](a, b, c);
        }
        else {
            for (var i = 0; i < numSubscriptions; i++) {
                /**
                 * Check whether the handler exists before firing as it's possible
                 * the subscriptions were modified during this loop running.
                 */
                var handler = this.subscriptions[i];
                handler && handler(a, b, c);
            }
        }
    };
    SubscriptionManager.prototype.getSize = function () {
        return this.subscriptions.length;
    };
    SubscriptionManager.prototype.clear = function () {
        this.subscriptions.length = 0;
    };
    return SubscriptionManager;
}());

var isFloat = function (value) {
    return !isNaN(parseFloat(value));
};
/**
 * `MotionValue` is used to track the state and velocity of motion values.
 *
 * @public
 */
var MotionValue = /** @class */ (function () {
    /**
     * @param init - The initiating value
     * @param config - Optional configuration options
     *
     * -  `transformer`: A function to transform incoming values with.
     *
     * @internal
     */
    function MotionValue(init) {
        var _this = this;
        /**
         * Duration, in milliseconds, since last updating frame.
         *
         * @internal
         */
        this.timeDelta = 0;
        /**
         * Timestamp of the last time this `MotionValue` was updated.
         *
         * @internal
         */
        this.lastUpdated = 0;
        /**
         * Functions to notify when the `MotionValue` updates.
         *
         * @internal
         */
        this.updateSubscribers = new SubscriptionManager();
        /**
         * Functions to notify when the velocity updates.
         *
         * @internal
         */
        this.velocityUpdateSubscribers = new SubscriptionManager();
        /**
         * Functions to notify when the `MotionValue` updates and `render` is set to `true`.
         *
         * @internal
         */
        this.renderSubscribers = new SubscriptionManager();
        /**
         * Tracks whether this value can output a velocity. Currently this is only true
         * if the value is numerical, but we might be able to widen the scope here and support
         * other value types.
         *
         * @internal
         */
        this.canTrackVelocity = false;
        this.updateAndNotify = function (v, render) {
            if (render === void 0) { render = true; }
            _this.prev = _this.current;
            _this.current = v;
            // Update timestamp
            var _a = getFrameData(), delta = _a.delta, timestamp = _a.timestamp;
            if (_this.lastUpdated !== timestamp) {
                _this.timeDelta = delta;
                _this.lastUpdated = timestamp;
                sync.postRender(_this.scheduleVelocityCheck);
            }
            // Update update subscribers
            if (_this.prev !== _this.current) {
                _this.updateSubscribers.notify(_this.current);
            }
            // Update velocity subscribers
            if (_this.velocityUpdateSubscribers.getSize()) {
                _this.velocityUpdateSubscribers.notify(_this.getVelocity());
            }
            // Update render subscribers
            if (render) {
                _this.renderSubscribers.notify(_this.current);
            }
        };
        /**
         * Schedule a velocity check for the next frame.
         *
         * This is an instanced and bound function to prevent generating a new
         * function once per frame.
         *
         * @internal
         */
        this.scheduleVelocityCheck = function () { return sync.postRender(_this.velocityCheck); };
        /**
         * Updates `prev` with `current` if the value hasn't been updated this frame.
         * This ensures velocity calculations return `0`.
         *
         * This is an instanced and bound function to prevent generating a new
         * function once per frame.
         *
         * @internal
         */
        this.velocityCheck = function (_a) {
            var timestamp = _a.timestamp;
            if (timestamp !== _this.lastUpdated) {
                _this.prev = _this.current;
                _this.velocityUpdateSubscribers.notify(_this.getVelocity());
            }
        };
        this.hasAnimated = false;
        this.prev = this.current = init;
        this.canTrackVelocity = isFloat(this.current);
    }
    /**
     * Adds a function that will be notified when the `MotionValue` is updated.
     *
     * It returns a function that, when called, will cancel the subscription.
     *
     * When calling `onChange` inside a React component, it should be wrapped with the
     * `useEffect` hook. As it returns an unsubscribe function, this should be returned
     * from the `useEffect` function to ensure you don't add duplicate subscribers..
     *
     * @library
     *
     * ```jsx
     * function MyComponent() {
     *   const x = useMotionValue(0)
     *   const y = useMotionValue(0)
     *   const opacity = useMotionValue(1)
     *
     *   useEffect(() => {
     *     function updateOpacity() {
     *       const maxXY = Math.max(x.get(), y.get())
     *       const newOpacity = transform(maxXY, [0, 100], [1, 0])
     *       opacity.set(newOpacity)
     *     }
     *
     *     const unsubscribeX = x.onChange(updateOpacity)
     *     const unsubscribeY = y.onChange(updateOpacity)
     *
     *     return () => {
     *       unsubscribeX()
     *       unsubscribeY()
     *     }
     *   }, [])
     *
     *   return <Frame x={x} />
     * }
     * ```
     *
     * @motion
     *
     * ```jsx
     * export const MyComponent = () => {
     *   const x = useMotionValue(0)
     *   const y = useMotionValue(0)
     *   const opacity = useMotionValue(1)
     *
     *   useEffect(() => {
     *     function updateOpacity() {
     *       const maxXY = Math.max(x.get(), y.get())
     *       const newOpacity = transform(maxXY, [0, 100], [1, 0])
     *       opacity.set(newOpacity)
     *     }
     *
     *     const unsubscribeX = x.onChange(updateOpacity)
     *     const unsubscribeY = y.onChange(updateOpacity)
     *
     *     return () => {
     *       unsubscribeX()
     *       unsubscribeY()
     *     }
     *   }, [])
     *
     *   return <motion.div style={{ x }} />
     * }
     * ```
     *
     * @internalremarks
     *
     * We could look into a `useOnChange` hook if the above lifecycle management proves confusing.
     *
     * ```jsx
     * useOnChange(x, () => {})
     * ```
     *
     * @param subscriber - A function that receives the latest value.
     * @returns A function that, when called, will cancel this subscription.
     *
     * @public
     */
    MotionValue.prototype.onChange = function (subscription) {
        return this.updateSubscribers.add(subscription);
    };
    MotionValue.prototype.clearListeners = function () {
        this.updateSubscribers.clear();
    };
    /**
     * Adds a function that will be notified when the `MotionValue` requests a render.
     *
     * @param subscriber - A function that's provided the latest value.
     * @returns A function that, when called, will cancel this subscription.
     *
     * @internal
     */
    MotionValue.prototype.onRenderRequest = function (subscription) {
        // Render immediately
        subscription(this.get());
        return this.renderSubscribers.add(subscription);
    };
    /**
     * Attaches a passive effect to the `MotionValue`.
     *
     * @internal
     */
    MotionValue.prototype.attach = function (passiveEffect) {
        this.passiveEffect = passiveEffect;
    };
    /**
     * Sets the state of the `MotionValue`.
     *
     * @remarks
     *
     * ```jsx
     * const x = useMotionValue(0)
     * x.set(10)
     * ```
     *
     * @param latest - Latest value to set.
     * @param render - Whether to notify render subscribers. Defaults to `true`
     *
     * @public
     */
    MotionValue.prototype.set = function (v, render) {
        if (render === void 0) { render = true; }
        if (!render || !this.passiveEffect) {
            this.updateAndNotify(v, render);
        }
        else {
            this.passiveEffect(v, this.updateAndNotify);
        }
    };
    /**
     * Returns the latest state of `MotionValue`
     *
     * @returns - The latest state of `MotionValue`
     *
     * @public
     */
    MotionValue.prototype.get = function () {
        return this.current;
    };
    /**
     * @public
     */
    MotionValue.prototype.getPrevious = function () {
        return this.prev;
    };
    /**
     * Returns the latest velocity of `MotionValue`
     *
     * @returns - The latest velocity of `MotionValue`. Returns `0` if the state is non-numerical.
     *
     * @public
     */
    MotionValue.prototype.getVelocity = function () {
        // This could be isFloat(this.prev) && isFloat(this.current), but that would be wasteful
        return this.canTrackVelocity
            ? // These casts could be avoided if parseFloat would be typed better
                velocityPerSecond(parseFloat(this.current) -
                    parseFloat(this.prev), this.timeDelta)
            : 0;
    };
    /**
     * Registers a new animation to control this `MotionValue`. Only one
     * animation can drive a `MotionValue` at one time.
     *
     * ```jsx
     * value.start()
     * ```
     *
     * @param animation - A function that starts the provided animation
     *
     * @internal
     */
    MotionValue.prototype.start = function (animation) {
        var _this = this;
        this.stop();
        return new Promise(function (resolve) {
            _this.hasAnimated = true;
            _this.stopAnimation = animation(resolve);
        }).then(function () { return _this.clearAnimation(); });
    };
    /**
     * Stop the currently active animation.
     *
     * @public
     */
    MotionValue.prototype.stop = function () {
        if (this.stopAnimation)
            this.stopAnimation();
        this.clearAnimation();
    };
    /**
     * Returns `true` if this value is currently animating.
     *
     * @public
     */
    MotionValue.prototype.isAnimating = function () {
        return !!this.stopAnimation;
    };
    MotionValue.prototype.clearAnimation = function () {
        this.stopAnimation = null;
    };
    /**
     * Destroy and clean up subscribers to this `MotionValue`.
     *
     * The `MotionValue` hooks like `useMotionValue` and `useTransform` automatically
     * handle the lifecycle of the returned `MotionValue`, so this method is only necessary if you've manually
     * created a `MotionValue` via the `motionValue` function.
     *
     * @public
     */
    MotionValue.prototype.destroy = function () {
        this.updateSubscribers.clear();
        this.renderSubscribers.clear();
        this.stop();
    };
    return MotionValue;
}());
/**
 * @internal
 */
function motionValue(init) {
    return new MotionValue(init);
}

/**
 * Tests a provided value against a ValueType
 */
var testValueType = function (v) { return function (type) { return type.test(v); }; };

/**
 * ValueType for "auto"
 */
var auto = {
    test: function (v) { return v === "auto"; },
    parse: function (v) { return v; },
};

/**
 * A list of value types commonly used for dimensions
 */
var dimensionValueTypes = [number, px, percent, degrees, vw, vh, auto];
/**
 * Tests a dimensional value against the list of dimension ValueTypes
 */
var findDimensionValueType = function (v) {
    return dimensionValueTypes.find(testValueType(v));
};

/**
 * A list of all ValueTypes
 */
var valueTypes = __spreadArray(__spreadArray([], __read(dimensionValueTypes)), [color, complex]);
/**
 * Tests a value against the list of ValueTypes
 */
var findValueType = function (v) { return valueTypes.find(testValueType(v)); };

/**
 * Set VisualElement's MotionValue, creating a new MotionValue for it if
 * it doesn't exist.
 */
function setMotionValue(visualElement, key, value) {
    if (visualElement.hasValue(key)) {
        visualElement.getValue(key).set(value);
    }
    else {
        visualElement.addValue(key, motionValue(value));
    }
}
function setTarget(visualElement, definition) {
    var resolved = resolveVariant(visualElement, definition);
    var _a = resolved
        ? visualElement.makeTargetAnimatable(resolved, false)
        : {}, _b = _a.transitionEnd, transitionEnd = _b === void 0 ? {} : _b; _a.transition; var target = __rest(_a, ["transitionEnd", "transition"]);
    target = __assign(__assign({}, target), transitionEnd);
    for (var key in target) {
        var value = resolveFinalValueInKeyframes(target[key]);
        setMotionValue(visualElement, key, value);
    }
}
function checkTargetForNewValues(visualElement, target, origin) {
    var _a, _b, _c;
    var _d;
    var newValueKeys = Object.keys(target).filter(function (key) { return !visualElement.hasValue(key); });
    var numNewValues = newValueKeys.length;
    if (!numNewValues)
        return;
    for (var i = 0; i < numNewValues; i++) {
        var key = newValueKeys[i];
        var targetValue = target[key];
        var value = null;
        /**
         * If the target is a series of keyframes, we can use the first value
         * in the array. If this first value is null, we'll still need to read from the DOM.
         */
        if (Array.isArray(targetValue)) {
            value = targetValue[0];
        }
        /**
         * If the target isn't keyframes, or the first keyframe was null, we need to
         * first check if an origin value was explicitly defined in the transition as "from",
         * if not read the value from the DOM. As an absolute fallback, take the defined target value.
         */
        if (value === null) {
            value = (_b = (_a = origin[key]) !== null && _a !== void 0 ? _a : visualElement.readValue(key)) !== null && _b !== void 0 ? _b : target[key];
        }
        /**
         * If value is still undefined or null, ignore it. Preferably this would throw,
         * but this was causing issues in Framer.
         */
        if (value === undefined || value === null)
            continue;
        if (typeof value === "string" && isNumericalString(value)) {
            // If this is a number read as a string, ie "0" or "200", convert it to a number
            value = parseFloat(value);
        }
        else if (!findValueType(value) && complex.test(targetValue)) {
            value = getAnimatableNone$1(key, targetValue);
        }
        visualElement.addValue(key, motionValue(value));
        (_c = (_d = origin)[key]) !== null && _c !== void 0 ? _c : (_d[key] = value);
        visualElement.setBaseTarget(key, value);
    }
}
function getOriginFromTransition(key, transition) {
    if (!transition)
        return;
    var valueTransition = transition[key] || transition["default"] || transition;
    return valueTransition.from;
}
function getOrigin(target, transition, visualElement) {
    var _a, _b;
    var origin = {};
    for (var key in target) {
        origin[key] =
            (_a = getOriginFromTransition(key, transition)) !== null && _a !== void 0 ? _a : (_b = visualElement.getValue(key)) === null || _b === void 0 ? void 0 : _b.get();
    }
    return origin;
}

/**
 * @internal
 */
function animateVisualElement(visualElement, definition, options) {
    if (options === void 0) { options = {}; }
    visualElement.notifyAnimationStart();
    var animation;
    if (Array.isArray(definition)) {
        var animations = definition.map(function (variant) {
            return animateVariant(visualElement, variant, options);
        });
        animation = Promise.all(animations);
    }
    else if (typeof definition === "string") {
        animation = animateVariant(visualElement, definition, options);
    }
    else {
        var resolvedDefinition = typeof definition === "function"
            ? resolveVariant(visualElement, definition, options.custom)
            : definition;
        animation = animateTarget(visualElement, resolvedDefinition, options);
    }
    return animation.then(function () {
        return visualElement.notifyAnimationComplete(definition);
    });
}
function animateVariant(visualElement, variant, options) {
    var _a;
    if (options === void 0) { options = {}; }
    var resolved = resolveVariant(visualElement, variant, options.custom);
    var _b = (resolved || {}).transition, transition = _b === void 0 ? visualElement.getDefaultTransition() || {} : _b;
    if (options.transitionOverride) {
        transition = options.transitionOverride;
    }
    /**
     * If we have a variant, create a callback that runs it as an animation.
     * Otherwise, we resolve a Promise immediately for a composable no-op.
     */
    var getAnimation = resolved
        ? function () { return animateTarget(visualElement, resolved, options); }
        : function () { return Promise.resolve(); };
    /**
     * If we have children, create a callback that runs all their animations.
     * Otherwise, we resolve a Promise immediately for a composable no-op.
     */
    var getChildAnimations = ((_a = visualElement.variantChildren) === null || _a === void 0 ? void 0 : _a.size)
        ? function (forwardDelay) {
            if (forwardDelay === void 0) { forwardDelay = 0; }
            var _a = transition.delayChildren, delayChildren = _a === void 0 ? 0 : _a, staggerChildren = transition.staggerChildren, staggerDirection = transition.staggerDirection;
            return animateChildren(visualElement, variant, delayChildren + forwardDelay, staggerChildren, staggerDirection, options);
        }
        : function () { return Promise.resolve(); };
    /**
     * If the transition explicitly defines a "when" option, we need to resolve either
     * this animation or all children animations before playing the other.
     */
    var when = transition.when;
    if (when) {
        var _c = __read(when === "beforeChildren"
            ? [getAnimation, getChildAnimations]
            : [getChildAnimations, getAnimation], 2), first = _c[0], last = _c[1];
        return first().then(last);
    }
    else {
        return Promise.all([getAnimation(), getChildAnimations(options.delay)]);
    }
}
/**
 * @internal
 */
function animateTarget(visualElement, definition, _a) {
    var _b;
    var _c = _a === void 0 ? {} : _a, _d = _c.delay, delay = _d === void 0 ? 0 : _d, transitionOverride = _c.transitionOverride, type = _c.type;
    var _e = visualElement.makeTargetAnimatable(definition), _f = _e.transition, transition = _f === void 0 ? visualElement.getDefaultTransition() : _f, transitionEnd = _e.transitionEnd, target = __rest(_e, ["transition", "transitionEnd"]);
    if (transitionOverride)
        transition = transitionOverride;
    var animations = [];
    var animationTypeState = type && ((_b = visualElement.animationState) === null || _b === void 0 ? void 0 : _b.getState()[type]);
    for (var key in target) {
        var value = visualElement.getValue(key);
        var valueTarget = target[key];
        if (!value ||
            valueTarget === undefined ||
            (animationTypeState &&
                shouldBlockAnimation(animationTypeState, key))) {
            continue;
        }
        var animation = startAnimation(key, value, valueTarget, __assign({ delay: delay }, transition));
        animations.push(animation);
    }
    return Promise.all(animations).then(function () {
        transitionEnd && setTarget(visualElement, transitionEnd);
    });
}
function animateChildren(visualElement, variant, delayChildren, staggerChildren, staggerDirection, options) {
    if (delayChildren === void 0) { delayChildren = 0; }
    if (staggerChildren === void 0) { staggerChildren = 0; }
    if (staggerDirection === void 0) { staggerDirection = 1; }
    var animations = [];
    var maxStaggerDuration = (visualElement.variantChildren.size - 1) * staggerChildren;
    var generateStaggerDuration = staggerDirection === 1
        ? function (i) {
            if (i === void 0) { i = 0; }
            return i * staggerChildren;
        }
        : function (i) {
            if (i === void 0) { i = 0; }
            return maxStaggerDuration - i * staggerChildren;
        };
    Array.from(visualElement.variantChildren)
        .sort(sortByTreeOrder)
        .forEach(function (child, i) {
        animations.push(animateVariant(child, variant, __assign(__assign({}, options), { delay: delayChildren + generateStaggerDuration(i) })).then(function () { return child.notifyAnimationComplete(variant); }));
    });
    return Promise.all(animations);
}
function sortByTreeOrder(a, b) {
    return a.sortNodePosition(b);
}
/**
 * Decide whether we should block this animation. Previously, we achieved this
 * just by checking whether the key was listed in protectedKeys, but this
 * posed problems if an animation was triggered by afterChildren and protectedKeys
 * had been set to true in the meantime.
 */
function shouldBlockAnimation(_a, key) {
    var protectedKeys = _a.protectedKeys, needsAnimating = _a.needsAnimating;
    var shouldBlock = protectedKeys.hasOwnProperty(key) && needsAnimating[key] !== true;
    needsAnimating[key] = false;
    return shouldBlock;
}

var variantPriorityOrder = [
    AnimationType.Animate,
    AnimationType.Hover,
    AnimationType.Tap,
    AnimationType.Drag,
    AnimationType.Focus,
    AnimationType.Exit,
];
var reversePriorityOrder = __spreadArray([], __read(variantPriorityOrder)).reverse();
var numAnimationTypes = variantPriorityOrder.length;
function animateList(visualElement) {
    return function (animations) {
        return Promise.all(animations.map(function (_a) {
            var animation = _a.animation, options = _a.options;
            return animateVisualElement(visualElement, animation, options);
        }));
    };
}
function createAnimationState(visualElement) {
    var animate = animateList(visualElement);
    var state = createState();
    var allAnimatedKeys = {};
    var isInitialRender = true;
    /**
     * This function will be used to reduce the animation definitions for
     * each active animation type into an object of resolved values for it.
     */
    var buildResolvedTypeValues = function (acc, definition) {
        var resolved = resolveVariant(visualElement, definition);
        if (resolved) {
            resolved.transition; var transitionEnd = resolved.transitionEnd, target = __rest(resolved, ["transition", "transitionEnd"]);
            acc = __assign(__assign(__assign({}, acc), target), transitionEnd);
        }
        return acc;
    };
    function isAnimated(key) {
        return allAnimatedKeys[key] !== undefined;
    }
    /**
     * This just allows us to inject mocked animation functions
     * @internal
     */
    function setAnimateFunction(makeAnimator) {
        animate = makeAnimator(visualElement);
    }
    /**
     * When we receive new props, we need to:
     * 1. Create a list of protected keys for each type. This is a directory of
     *    value keys that are currently being "handled" by types of a higher priority
     *    so that whenever an animation is played of a given type, these values are
     *    protected from being animated.
     * 2. Determine if an animation type needs animating.
     * 3. Determine if any values have been removed from a type and figure out
     *    what to animate those to.
     */
    function animateChanges(options, changedActiveType) {
        var _a;
        var props = visualElement.getProps();
        var context = visualElement.getVariantContext(true) || {};
        /**
         * A list of animations that we'll build into as we iterate through the animation
         * types. This will get executed at the end of the function.
         */
        var animations = [];
        /**
         * Keep track of which values have been removed. Then, as we hit lower priority
         * animation types, we can check if they contain removed values and animate to that.
         */
        var removedKeys = new Set();
        /**
         * A dictionary of all encountered keys. This is an object to let us build into and
         * copy it without iteration. Each time we hit an animation type we set its protected
         * keys - the keys its not allowed to animate - to the latest version of this object.
         */
        var encounteredKeys = {};
        /**
         * If a variant has been removed at a given index, and this component is controlling
         * variant animations, we want to ensure lower-priority variants are forced to animate.
         */
        var removedVariantIndex = Infinity;
        var _loop_1 = function (i) {
            var type = reversePriorityOrder[i];
            var typeState = state[type];
            var prop = (_a = props[type]) !== null && _a !== void 0 ? _a : context[type];
            var propIsVariant = isVariantLabel(prop);
            /**
             * If this type has *just* changed isActive status, set activeDelta
             * to that status. Otherwise set to null.
             */
            var activeDelta = type === changedActiveType ? typeState.isActive : null;
            if (activeDelta === false)
                removedVariantIndex = i;
            /**
             * If this prop is an inherited variant, rather than been set directly on the
             * component itself, we want to make sure we allow the parent to trigger animations.
             *
             * TODO: Can probably change this to a !isControllingVariants check
             */
            var isInherited = prop === context[type] && prop !== props[type] && propIsVariant;
            /**
             *
             */
            if (isInherited &&
                isInitialRender &&
                visualElement.manuallyAnimateOnMount) {
                isInherited = false;
            }
            /**
             * Set all encountered keys so far as the protected keys for this type. This will
             * be any key that has been animated or otherwise handled by active, higher-priortiy types.
             */
            typeState.protectedKeys = __assign({}, encounteredKeys);
            // Check if we can skip analysing this prop early
            if (
            // If it isn't active and hasn't *just* been set as inactive
            (!typeState.isActive && activeDelta === null) ||
                // If we didn't and don't have any defined prop for this animation type
                (!prop && !typeState.prevProp) ||
                // Or if the prop doesn't define an animation
                isAnimationControls(prop) ||
                typeof prop === "boolean") {
                return "continue";
            }
            /**
             * As we go look through the values defined on this type, if we detect
             * a changed value or a value that was removed in a higher priority, we set
             * this to true and add this prop to the animation list.
             */
            var shouldAnimateType = variantsHaveChanged(typeState.prevProp, prop) ||
                // If we're making this variant active, we want to always make it active
                (type === changedActiveType &&
                    typeState.isActive &&
                    !isInherited &&
                    propIsVariant) ||
                // If we removed a higher-priority variant (i is in reverse order)
                (i > removedVariantIndex && propIsVariant);
            /**
             * As animations can be set as variant lists, variants or target objects, we
             * coerce everything to an array if it isn't one already
             */
            var definitionList = Array.isArray(prop) ? prop : [prop];
            /**
             * Build an object of all the resolved values. We'll use this in the subsequent
             * animateChanges calls to determine whether a value has changed.
             */
            var resolvedValues = definitionList.reduce(buildResolvedTypeValues, {});
            if (activeDelta === false)
                resolvedValues = {};
            /**
             * Now we need to loop through all the keys in the prev prop and this prop,
             * and decide:
             * 1. If the value has changed, and needs animating
             * 2. If it has been removed, and needs adding to the removedKeys set
             * 3. If it has been removed in a higher priority type and needs animating
             * 4. If it hasn't been removed in a higher priority but hasn't changed, and
             *    needs adding to the type's protectedKeys list.
             */
            var _b = typeState.prevResolvedValues, prevResolvedValues = _b === void 0 ? {} : _b;
            var allKeys = __assign(__assign({}, prevResolvedValues), resolvedValues);
            var markToAnimate = function (key) {
                shouldAnimateType = true;
                removedKeys.delete(key);
                typeState.needsAnimating[key] = true;
            };
            for (var key in allKeys) {
                var next = resolvedValues[key];
                var prev = prevResolvedValues[key];
                // If we've already handled this we can just skip ahead
                if (encounteredKeys.hasOwnProperty(key))
                    continue;
                /**
                 * If the value has changed, we probably want to animate it.
                 */
                if (next !== prev) {
                    /**
                     * If both values are keyframes, we need to shallow compare them to
                     * detect whether any value has changed. If it has, we animate it.
                     */
                    if (isKeyframesTarget(next) && isKeyframesTarget(prev)) {
                        if (!shallowCompare(next, prev)) {
                            markToAnimate(key);
                        }
                        else {
                            /**
                             * If it hasn't changed, we want to ensure it doesn't animate by
                             * adding it to the list of protected keys.
                             */
                            typeState.protectedKeys[key] = true;
                        }
                    }
                    else if (next !== undefined) {
                        // If next is defined and doesn't equal prev, it needs animating
                        markToAnimate(key);
                    }
                    else {
                        // If it's undefined, it's been removed.
                        removedKeys.add(key);
                    }
                }
                else if (next !== undefined && removedKeys.has(key)) {
                    /**
                     * If next hasn't changed and it isn't undefined, we want to check if it's
                     * been removed by a higher priority
                     */
                    markToAnimate(key);
                }
                else {
                    /**
                     * If it hasn't changed, we add it to the list of protected values
                     * to ensure it doesn't get animated.
                     */
                    typeState.protectedKeys[key] = true;
                }
            }
            /**
             * Update the typeState so next time animateChanges is called we can compare the
             * latest prop and resolvedValues to these.
             */
            typeState.prevProp = prop;
            typeState.prevResolvedValues = resolvedValues;
            /**
             *
             */
            if (typeState.isActive) {
                encounteredKeys = __assign(__assign({}, encounteredKeys), resolvedValues);
            }
            if (isInitialRender && visualElement.blockInitialAnimation) {
                shouldAnimateType = false;
            }
            /**
             * If this is an inherited prop we want to hard-block animations
             * TODO: Test as this should probably still handle animations triggered
             * by removed values?
             */
            if (shouldAnimateType && !isInherited) {
                animations.push.apply(animations, __spreadArray([], __read(definitionList.map(function (animation) { return ({
                    animation: animation,
                    options: __assign({ type: type }, options),
                }); }))));
            }
        };
        /**
         * Iterate through all animation types in reverse priority order. For each, we want to
         * detect which values it's handling and whether or not they've changed (and therefore
         * need to be animated). If any values have been removed, we want to detect those in
         * lower priority props and flag for animation.
         */
        for (var i = 0; i < numAnimationTypes; i++) {
            _loop_1(i);
        }
        allAnimatedKeys = __assign({}, encounteredKeys);
        /**
         * If there are some removed value that haven't been dealt with,
         * we need to create a new animation that falls back either to the value
         * defined in the style prop, or the last read value.
         */
        if (removedKeys.size) {
            var fallbackAnimation_1 = {};
            removedKeys.forEach(function (key) {
                var fallbackTarget = visualElement.getBaseTarget(key);
                if (fallbackTarget !== undefined) {
                    fallbackAnimation_1[key] = fallbackTarget;
                }
            });
            animations.push({ animation: fallbackAnimation_1 });
        }
        var shouldAnimate = Boolean(animations.length);
        if (isInitialRender &&
            props.initial === false &&
            !visualElement.manuallyAnimateOnMount) {
            shouldAnimate = false;
        }
        isInitialRender = false;
        return shouldAnimate ? animate(animations) : Promise.resolve();
    }
    /**
     * Change whether a certain animation type is active.
     */
    function setActive(type, isActive, options) {
        var _a;
        // If the active state hasn't changed, we can safely do nothing here
        if (state[type].isActive === isActive)
            return Promise.resolve();
        // Propagate active change to children
        (_a = visualElement.variantChildren) === null || _a === void 0 ? void 0 : _a.forEach(function (child) { var _a; return (_a = child.animationState) === null || _a === void 0 ? void 0 : _a.setActive(type, isActive); });
        state[type].isActive = isActive;
        return animateChanges(options, type);
    }
    return {
        isAnimated: isAnimated,
        animateChanges: animateChanges,
        setActive: setActive,
        setAnimateFunction: setAnimateFunction,
        getState: function () { return state; },
    };
}
function variantsHaveChanged(prev, next) {
    if (typeof next === "string") {
        return next !== prev;
    }
    else if (isVariantLabels(next)) {
        return !shallowCompare(next, prev);
    }
    return false;
}
function createTypeState(isActive) {
    if (isActive === void 0) { isActive = false; }
    return {
        isActive: isActive,
        protectedKeys: {},
        needsAnimating: {},
        prevResolvedValues: {},
    };
}
function createState() {
    var _a;
    return _a = {},
        _a[AnimationType.Animate] = createTypeState(true),
        _a[AnimationType.Hover] = createTypeState(),
        _a[AnimationType.Tap] = createTypeState(),
        _a[AnimationType.Drag] = createTypeState(),
        _a[AnimationType.Focus] = createTypeState(),
        _a[AnimationType.Exit] = createTypeState(),
        _a;
}

var animations = {
    animation: makeRenderlessComponent(function (_a) {
        var visualElement = _a.visualElement, animate = _a.animate;
        /**
         * We dynamically generate the AnimationState manager as it contains a reference
         * to the underlying animation library. We only want to load that if we load this,
         * so people can optionally code split it out using the `m` component.
         */
        visualElement.animationState || (visualElement.animationState = createAnimationState(visualElement));
        /**
         * Subscribe any provided AnimationControls to the component's VisualElement
         */
        if (isAnimationControls(animate)) {
            react.useEffect(function () { return animate.subscribe(visualElement); }, [animate]);
        }
    }),
    exit: makeRenderlessComponent(function (props) {
        var custom = props.custom, visualElement = props.visualElement;
        var _a = __read(usePresence(), 2), isPresent = _a[0], onExitComplete = _a[1];
        var presenceContext = react.useContext(PresenceContext);
        react.useEffect(function () {
            var _a, _b;
            var animation = (_a = visualElement.animationState) === null || _a === void 0 ? void 0 : _a.setActive(AnimationType.Exit, !isPresent, { custom: (_b = presenceContext === null || presenceContext === void 0 ? void 0 : presenceContext.custom) !== null && _b !== void 0 ? _b : custom });
            !isPresent && (animation === null || animation === void 0 ? void 0 : animation.then(onExitComplete));
        }, [isPresent]);
    }),
};

/**
 * @internal
 */
var PanSession = /** @class */ (function () {
    function PanSession(event, handlers, _a) {
        var _this = this;
        var _b = _a === void 0 ? {} : _a, transformPagePoint = _b.transformPagePoint;
        /**
         * @internal
         */
        this.startEvent = null;
        /**
         * @internal
         */
        this.lastMoveEvent = null;
        /**
         * @internal
         */
        this.lastMoveEventInfo = null;
        /**
         * @internal
         */
        this.handlers = {};
        this.updatePoint = function () {
            if (!(_this.lastMoveEvent && _this.lastMoveEventInfo))
                return;
            var info = getPanInfo(_this.lastMoveEventInfo, _this.history);
            var isPanStarted = _this.startEvent !== null;
            // Only start panning if the offset is larger than 3 pixels. If we make it
            // any larger than this we'll want to reset the pointer history
            // on the first update to avoid visual snapping to the cursoe.
            var isDistancePastThreshold = distance(info.offset, { x: 0, y: 0 }) >= 3;
            if (!isPanStarted && !isDistancePastThreshold)
                return;
            var point = info.point;
            var timestamp = getFrameData().timestamp;
            _this.history.push(__assign(__assign({}, point), { timestamp: timestamp }));
            var _a = _this.handlers, onStart = _a.onStart, onMove = _a.onMove;
            if (!isPanStarted) {
                onStart && onStart(_this.lastMoveEvent, info);
                _this.startEvent = _this.lastMoveEvent;
            }
            onMove && onMove(_this.lastMoveEvent, info);
        };
        this.handlePointerMove = function (event, info) {
            _this.lastMoveEvent = event;
            _this.lastMoveEventInfo = transformPoint(info, _this.transformPagePoint);
            // Because Safari doesn't trigger mouseup events when it's above a `<select>`
            if (isMouseEvent(event) && event.buttons === 0) {
                _this.handlePointerUp(event, info);
                return;
            }
            // Throttle mouse move event to once per frame
            sync.update(_this.updatePoint, true);
        };
        this.handlePointerUp = function (event, info) {
            _this.end();
            var _a = _this.handlers, onEnd = _a.onEnd, onSessionEnd = _a.onSessionEnd;
            var panInfo = getPanInfo(transformPoint(info, _this.transformPagePoint), _this.history);
            if (_this.startEvent && onEnd) {
                onEnd(event, panInfo);
            }
            onSessionEnd && onSessionEnd(event, panInfo);
        };
        // If we have more than one touch, don't start detecting this gesture
        if (isTouchEvent(event) && event.touches.length > 1)
            return;
        this.handlers = handlers;
        this.transformPagePoint = transformPagePoint;
        var info = extractEventInfo(event);
        var initialInfo = transformPoint(info, this.transformPagePoint);
        var point = initialInfo.point;
        var timestamp = getFrameData().timestamp;
        this.history = [__assign(__assign({}, point), { timestamp: timestamp })];
        var onSessionStart = handlers.onSessionStart;
        onSessionStart &&
            onSessionStart(event, getPanInfo(initialInfo, this.history));
        this.removeListeners = pipe(addPointerEvent(window, "pointermove", this.handlePointerMove), addPointerEvent(window, "pointerup", this.handlePointerUp), addPointerEvent(window, "pointercancel", this.handlePointerUp));
    }
    PanSession.prototype.updateHandlers = function (handlers) {
        this.handlers = handlers;
    };
    PanSession.prototype.end = function () {
        this.removeListeners && this.removeListeners();
        cancelSync.update(this.updatePoint);
    };
    return PanSession;
}());
function transformPoint(info, transformPagePoint) {
    return transformPagePoint ? { point: transformPagePoint(info.point) } : info;
}
function subtractPoint(a, b) {
    return { x: a.x - b.x, y: a.y - b.y };
}
function getPanInfo(_a, history) {
    var point = _a.point;
    return {
        point: point,
        delta: subtractPoint(point, lastDevicePoint(history)),
        offset: subtractPoint(point, startDevicePoint(history)),
        velocity: getVelocity$1(history, 0.1),
    };
}
function startDevicePoint(history) {
    return history[0];
}
function lastDevicePoint(history) {
    return history[history.length - 1];
}
function getVelocity$1(history, timeDelta) {
    if (history.length < 2) {
        return { x: 0, y: 0 };
    }
    var i = history.length - 1;
    var timestampedPoint = null;
    var lastPoint = lastDevicePoint(history);
    while (i >= 0) {
        timestampedPoint = history[i];
        if (lastPoint.timestamp - timestampedPoint.timestamp >
            secondsToMilliseconds(timeDelta)) {
            break;
        }
        i--;
    }
    if (!timestampedPoint) {
        return { x: 0, y: 0 };
    }
    var time = (lastPoint.timestamp - timestampedPoint.timestamp) / 1000;
    if (time === 0) {
        return { x: 0, y: 0 };
    }
    var currentVelocity = {
        x: (lastPoint.x - timestampedPoint.x) / time,
        y: (lastPoint.y - timestampedPoint.y) / time,
    };
    if (currentVelocity.x === Infinity) {
        currentVelocity.x = 0;
    }
    if (currentVelocity.y === Infinity) {
        currentVelocity.y = 0;
    }
    return currentVelocity;
}

function noop(any) {
    return any;
}

/**
 * Bounding boxes tend to be defined as top, left, right, bottom. For various operations
 * it's easier to consider each axis individually. This function returns a bounding box
 * as a map of single-axis min/max values.
 */
function convertBoundingBoxToAxisBox(_a) {
    var top = _a.top, left = _a.left, right = _a.right, bottom = _a.bottom;
    return {
        x: { min: left, max: right },
        y: { min: top, max: bottom },
    };
}
function convertAxisBoxToBoundingBox(_a) {
    var x = _a.x, y = _a.y;
    return {
        top: y.min,
        bottom: y.max,
        left: x.min,
        right: x.max,
    };
}
/**
 * Applies a TransformPoint function to a bounding box. TransformPoint is usually a function
 * provided by Framer to allow measured points to be corrected for device scaling. This is used
 * when measuring DOM elements and DOM event points.
 */
function transformBoundingBox(_a, transformPoint) {
    var top = _a.top, left = _a.left, bottom = _a.bottom, right = _a.right;
    if (transformPoint === void 0) { transformPoint = noop; }
    var topLeft = transformPoint({ x: left, y: top });
    var bottomRight = transformPoint({ x: right, y: bottom });
    return {
        top: topLeft.y,
        left: topLeft.x,
        bottom: bottomRight.y,
        right: bottomRight.x,
    };
}
/**
 * Create an empty axis box of zero size
 */
function axisBox() {
    return { x: { min: 0, max: 1 }, y: { min: 0, max: 1 } };
}
function copyAxisBox(box) {
    return {
        x: __assign({}, box.x),
        y: __assign({}, box.y),
    };
}
/**
 * Create an empty box delta
 */
var zeroDelta = {
    translate: 0,
    scale: 1,
    origin: 0,
    originPoint: 0,
};
function delta() {
    return {
        x: __assign({}, zeroDelta),
        y: __assign({}, zeroDelta),
    };
}

// Call a handler once for each axis
function eachAxis(handler) {
    return [handler("x"), handler("y")];
}

/**
 * Apply constraints to a point. These constraints are both physical along an
 * axis, and an elastic factor that determines how much to constrain the point
 * by if it does lie outside the defined parameters.
 */
function applyConstraints(point, _a, elastic) {
    var min = _a.min, max = _a.max;
    if (min !== undefined && point < min) {
        // If we have a min point defined, and this is outside of that, constrain
        point = elastic ? mix(min, point, elastic.min) : Math.max(point, min);
    }
    else if (max !== undefined && point > max) {
        // If we have a max point defined, and this is outside of that, constrain
        point = elastic ? mix(max, point, elastic.max) : Math.min(point, max);
    }
    return point;
}
/**
 * Calculates a min projection point based on a pointer, pointer progress
 * within the drag target, and constraints.
 *
 * For instance if an element was 100px width, we were dragging from 0.25
 * along this axis, the pointer is at 200px, and there were no constraints,
 * we would calculate a min projection point of 175px.
 */
function calcConstrainedMinPoint(point, length, progress, constraints, elastic) {
    // Calculate a min point for this axis and apply it to the current pointer
    var min = point - length * progress;
    return constraints ? applyConstraints(min, constraints, elastic) : min;
}
/**
 * Calculate constraints in terms of the viewport when defined relatively to the
 * measured axis. This is measured from the nearest edge, so a max constraint of 200
 * on an axis with a max value of 300 would return a constraint of 500 - axis length
 */
function calcRelativeAxisConstraints(axis, min, max) {
    return {
        min: min !== undefined ? axis.min + min : undefined,
        max: max !== undefined
            ? axis.max + max - (axis.max - axis.min)
            : undefined,
    };
}
/**
 * Calculate constraints in terms of the viewport when
 * defined relatively to the measured bounding box.
 */
function calcRelativeConstraints(layoutBox, _a) {
    var top = _a.top, left = _a.left, bottom = _a.bottom, right = _a.right;
    return {
        x: calcRelativeAxisConstraints(layoutBox.x, left, right),
        y: calcRelativeAxisConstraints(layoutBox.y, top, bottom),
    };
}
/**
 * Calculate viewport constraints when defined as another viewport-relative axis
 */
function calcViewportAxisConstraints(layoutAxis, constraintsAxis) {
    var _a;
    var min = constraintsAxis.min - layoutAxis.min;
    var max = constraintsAxis.max - layoutAxis.max;
    // If the constraints axis is actually smaller than the layout axis then we can
    // flip the constraints
    if (constraintsAxis.max - constraintsAxis.min <
        layoutAxis.max - layoutAxis.min) {
        _a = __read([max, min], 2), min = _a[0], max = _a[1];
    }
    return {
        min: layoutAxis.min + min,
        max: layoutAxis.min + max,
    };
}
/**
 * Calculate viewport constraints when defined as another viewport-relative box
 */
function calcViewportConstraints(layoutBox, constraintsBox) {
    return {
        x: calcViewportAxisConstraints(layoutBox.x, constraintsBox.x),
        y: calcViewportAxisConstraints(layoutBox.y, constraintsBox.y),
    };
}
/**
 * Calculate the an axis position based on two axes and a progress value.
 */
function calcPositionFromProgress(axis, constraints, progress) {
    var axisLength = axis.max - axis.min;
    var min = mix(constraints.min, constraints.max - axisLength, progress);
    return { min: min, max: min + axisLength };
}
/**
 * Rebase the calculated viewport constraints relative to the layout.min point.
 */
function rebaseAxisConstraints(layout, constraints) {
    var relativeConstraints = {};
    if (constraints.min !== undefined) {
        relativeConstraints.min = constraints.min - layout.min;
    }
    if (constraints.max !== undefined) {
        relativeConstraints.max = constraints.max - layout.min;
    }
    return relativeConstraints;
}
var defaultElastic = 0.35;
/**
 * Accepts a dragElastic prop and returns resolved elastic values for each axis.
 */
function resolveDragElastic(dragElastic) {
    if (dragElastic === false) {
        dragElastic = 0;
    }
    else if (dragElastic === true) {
        dragElastic = defaultElastic;
    }
    return {
        x: resolveAxisElastic(dragElastic, "left", "right"),
        y: resolveAxisElastic(dragElastic, "top", "bottom"),
    };
}
function resolveAxisElastic(dragElastic, minLabel, maxLabel) {
    return {
        min: resolvePointElastic(dragElastic, minLabel),
        max: resolvePointElastic(dragElastic, maxLabel),
    };
}
function resolvePointElastic(dragElastic, label) {
    var _a;
    return typeof dragElastic === "number"
        ? dragElastic
        : (_a = dragElastic[label]) !== null && _a !== void 0 ? _a : 0;
}

/**
 * Measure and return the element bounding box.
 *
 * We convert the box into an AxisBox2D to make it easier to work with each axis
 * individually and programmatically.
 *
 * This function optionally accepts a transformPagePoint function which allows us to compensate
 * for, for instance, measuring the element within a scaled plane like a Framer devivce preview component.
 */
function getBoundingBox(element, transformPagePoint) {
    var box = element.getBoundingClientRect();
    return convertBoundingBoxToAxisBox(transformBoundingBox(box, transformPagePoint));
}

var clampProgress = function (v) { return clamp$1(0, 1, v); };
/**
 * Returns true if the provided value is within maxDistance of the provided target
 */
function isNear(value, target, maxDistance) {
    if (target === void 0) { target = 0; }
    if (maxDistance === void 0) { maxDistance = 0.01; }
    return distance(value, target) < maxDistance;
}
function calcLength(axis) {
    return axis.max - axis.min;
}
/**
 * Calculate a transform origin relative to the source axis, between 0-1, that results
 * in an asthetically pleasing scale/transform needed to project from source to target.
 */
function calcOrigin$1(source, target) {
    var origin = 0.5;
    var sourceLength = calcLength(source);
    var targetLength = calcLength(target);
    if (targetLength > sourceLength) {
        origin = progress(target.min, target.max - sourceLength, source.min);
    }
    else if (sourceLength > targetLength) {
        origin = progress(source.min, source.max - targetLength, target.min);
    }
    return clampProgress(origin);
}
/**
 * Update the AxisDelta with a transform that projects source into target.
 *
 * The transform `origin` is optional. If not provided, it'll be automatically
 * calculated based on the relative positions of the two bounding boxes.
 */
function updateAxisDelta(delta, source, target, origin) {
    if (origin === void 0) { origin = 0.5; }
    delta.origin = origin;
    delta.originPoint = mix(source.min, source.max, delta.origin);
    delta.scale = calcLength(target) / calcLength(source);
    if (isNear(delta.scale, 1, 0.0001))
        delta.scale = 1;
    delta.translate =
        mix(target.min, target.max, delta.origin) - delta.originPoint;
    if (isNear(delta.translate))
        delta.translate = 0;
}
/**
 * Update the BoxDelta with a transform that projects the source into the target.
 *
 * The transform `origin` is optional. If not provided, it'll be automatically
 * calculated based on the relative positions of the two bounding boxes.
 */
function updateBoxDelta(delta, source, target, origin) {
    updateAxisDelta(delta.x, source.x, target.x, defaultOrigin(origin.originX));
    updateAxisDelta(delta.y, source.y, target.y, defaultOrigin(origin.originY));
}
/**
 * Currently this only accepts numerical origins, measured as 0-1, but could
 * accept pixel values by comparing to the target axis.
 */
function defaultOrigin(origin) {
    return typeof origin === "number" ? origin : 0.5;
}
function calcRelativeAxis(target, relative, parent) {
    target.min = parent.min + relative.min;
    target.max = target.min + calcLength(relative);
}
function calcRelativeBox(projection, parentProjection) {
    calcRelativeAxis(projection.target.x, projection.relativeTarget.x, parentProjection.target.x);
    calcRelativeAxis(projection.target.y, projection.relativeTarget.y, parentProjection.target.y);
}

var compareByDepth = function (a, b) {
    return a.depth - b.depth;
};

function isProjecting(visualElement) {
    var isEnabled = visualElement.projection.isEnabled;
    return isEnabled || visualElement.shouldResetTransform();
}
function collectProjectingAncestors(visualElement, ancestors) {
    if (ancestors === void 0) { ancestors = []; }
    var parent = visualElement.parent;
    if (parent)
        collectProjectingAncestors(parent, ancestors);
    if (isProjecting(visualElement))
        ancestors.push(visualElement);
    return ancestors;
}
function collectProjectingChildren(visualElement) {
    var children = [];
    var addChild = function (child) {
        if (isProjecting(child))
            children.push(child);
        child.children.forEach(addChild);
    };
    visualElement.children.forEach(addChild);
    return children.sort(compareByDepth);
}
/**
 * Update the layoutState by measuring the DOM layout. This
 * should be called after resetting any layout-affecting transforms.
 */
function updateLayoutMeasurement(visualElement) {
    if (visualElement.shouldResetTransform())
        return;
    var layoutState = visualElement.getLayoutState();
    visualElement.notifyBeforeLayoutMeasure(layoutState.layout);
    layoutState.isHydrated = true;
    layoutState.layout = visualElement.measureViewportBox();
    layoutState.layoutCorrected = copyAxisBox(layoutState.layout);
    visualElement.notifyLayoutMeasure(layoutState.layout, visualElement.prevViewportBox || layoutState.layout);
    sync.update(function () { return visualElement.rebaseProjectionTarget(); });
}
/**
 * Record the viewport box as it was before an expected mutation/re-render
 */
function snapshotViewportBox(visualElement) {
    if (visualElement.shouldResetTransform())
        return;
    visualElement.prevViewportBox = visualElement.measureViewportBox(false);
    /**
     * Update targetBox to match the prevViewportBox. This is just to ensure
     * that targetBox is affected by scroll in the same way as the measured box
     */
    visualElement.rebaseProjectionTarget(false, visualElement.prevViewportBox);
}

function tweenAxis(target, prev, next, p) {
    target.min = mix(prev.min, next.min, p);
    target.max = mix(prev.max, next.max, p);
}
function calcRelativeOffsetAxis(parent, child) {
    return {
        min: child.min - parent.min,
        max: child.max - parent.min,
    };
}
function calcRelativeOffset(parent, child) {
    return {
        x: calcRelativeOffsetAxis(parent.x, child.x),
        y: calcRelativeOffsetAxis(parent.y, child.y),
    };
}
function checkIfParentHasChanged(prev, next) {
    var prevId = prev.getLayoutId();
    var nextId = next.getLayoutId();
    return prevId !== nextId || (nextId === undefined && prev !== next);
}

function isDraggable(visualElement) {
    var _a = visualElement.getProps(), drag = _a.drag, _dragX = _a._dragX;
    return drag && !_dragX;
}

/**
 * Reset an axis to the provided origin box.
 *
 * This is a mutative operation.
 */
function resetAxis(axis, originAxis) {
    axis.min = originAxis.min;
    axis.max = originAxis.max;
}
/**
 * Reset a box to the provided origin box.
 *
 * This is a mutative operation.
 */
function resetBox(box, originBox) {
    resetAxis(box.x, originBox.x);
    resetAxis(box.y, originBox.y);
}
/**
 * Scales a point based on a factor and an originPoint
 */
function scalePoint(point, scale, originPoint) {
    var distanceFromOrigin = point - originPoint;
    var scaled = scale * distanceFromOrigin;
    return originPoint + scaled;
}
/**
 * Applies a translate/scale delta to a point
 */
function applyPointDelta(point, translate, scale, originPoint, boxScale) {
    if (boxScale !== undefined) {
        point = scalePoint(point, boxScale, originPoint);
    }
    return scalePoint(point, scale, originPoint) + translate;
}
/**
 * Applies a translate/scale delta to an axis
 */
function applyAxisDelta(axis, translate, scale, originPoint, boxScale) {
    if (translate === void 0) { translate = 0; }
    if (scale === void 0) { scale = 1; }
    axis.min = applyPointDelta(axis.min, translate, scale, originPoint, boxScale);
    axis.max = applyPointDelta(axis.max, translate, scale, originPoint, boxScale);
}
/**
 * Applies a translate/scale delta to a box
 */
function applyBoxDelta(box, _a) {
    var x = _a.x, y = _a.y;
    applyAxisDelta(box.x, x.translate, x.scale, x.originPoint);
    applyAxisDelta(box.y, y.translate, y.scale, y.originPoint);
}
/**
 * Apply a transform to an axis from the latest resolved motion values.
 * This function basically acts as a bridge between a flat motion value map
 * and applyAxisDelta
 */
function applyAxisTransforms(final, axis, transforms, _a) {
    var _b = __read(_a, 3), key = _b[0], scaleKey = _b[1], originKey = _b[2];
    // Copy the current axis to the final axis before mutation
    final.min = axis.min;
    final.max = axis.max;
    var axisOrigin = transforms[originKey] !== undefined ? transforms[originKey] : 0.5;
    var originPoint = mix(axis.min, axis.max, axisOrigin);
    // Apply the axis delta to the final axis
    applyAxisDelta(final, transforms[key], transforms[scaleKey], originPoint, transforms.scale);
}
/**
 * The names of the motion values we want to apply as translation, scale and origin.
 */
var xKeys = ["x", "scaleX", "originX"];
var yKeys = ["y", "scaleY", "originY"];
/**
 * Apply a transform to a box from the latest resolved motion values.
 */
function applyBoxTransforms(finalBox, box, transforms) {
    applyAxisTransforms(finalBox.x, box.x, transforms, xKeys);
    applyAxisTransforms(finalBox.y, box.y, transforms, yKeys);
}
/**
 * Remove a delta from a point. This is essentially the steps of applyPointDelta in reverse
 */
function removePointDelta(point, translate, scale, originPoint, boxScale) {
    point -= translate;
    point = scalePoint(point, 1 / scale, originPoint);
    if (boxScale !== undefined) {
        point = scalePoint(point, 1 / boxScale, originPoint);
    }
    return point;
}
/**
 * Remove a delta from an axis. This is essentially the steps of applyAxisDelta in reverse
 */
function removeAxisDelta(axis, translate, scale, origin, boxScale) {
    if (translate === void 0) { translate = 0; }
    if (scale === void 0) { scale = 1; }
    if (origin === void 0) { origin = 0.5; }
    var originPoint = mix(axis.min, axis.max, origin) - translate;
    axis.min = removePointDelta(axis.min, translate, scale, originPoint, boxScale);
    axis.max = removePointDelta(axis.max, translate, scale, originPoint, boxScale);
}
/**
 * Remove a transforms from an axis. This is essentially the steps of applyAxisTransforms in reverse
 * and acts as a bridge between motion values and removeAxisDelta
 */
function removeAxisTransforms(axis, transforms, _a) {
    var _b = __read(_a, 3), key = _b[0], scaleKey = _b[1], originKey = _b[2];
    removeAxisDelta(axis, transforms[key], transforms[scaleKey], transforms[originKey], transforms.scale);
}
/**
 * Remove a transforms from an box. This is essentially the steps of applyAxisBox in reverse
 * and acts as a bridge between motion values and removeAxisDelta
 */
function removeBoxTransforms(box, transforms) {
    removeAxisTransforms(box.x, transforms, xKeys);
    removeAxisTransforms(box.y, transforms, yKeys);
}
/**
 * Apply a tree of deltas to a box. We do this to calculate the effect of all the transforms
 * in a tree upon our box before then calculating how to project it into our desired viewport-relative box
 *
 * This is the final nested loop within updateLayoutDelta for future refactoring
 */
function applyTreeDeltas(box, treeScale, treePath) {
    var treeLength = treePath.length;
    if (!treeLength)
        return;
    // Reset the treeScale
    treeScale.x = treeScale.y = 1;
    var node;
    var delta;
    for (var i = 0; i < treeLength; i++) {
        node = treePath[i];
        delta = node.getLayoutState().delta;
        // Incoporate each ancestor's scale into a culmulative treeScale for this component
        treeScale.x *= delta.x.scale;
        treeScale.y *= delta.y.scale;
        // Apply each ancestor's calculated delta into this component's recorded layout box
        applyBoxDelta(box, delta);
        // If this is a draggable ancestor, also incorporate the node's transform to the layout box
        if (isDraggable(node)) {
            applyBoxTransforms(box, box, node.getLatestValues());
        }
    }
}

/**
 * Returns a boolean stating whether or not we converted the projection
 * to relative projection.
 */
function convertToRelativeProjection(visualElement, isLayoutDrag) {
    if (isLayoutDrag === void 0) { isLayoutDrag = true; }
    var projectionParent = visualElement.getProjectionParent();
    if (!projectionParent)
        return false;
    var offset;
    if (isLayoutDrag) {
        offset = calcRelativeOffset(projectionParent.projection.target, visualElement.projection.target);
        removeBoxTransforms(offset, projectionParent.getLatestValues());
    }
    else {
        offset = calcRelativeOffset(projectionParent.getLayoutState().layout, visualElement.getLayoutState().layout);
    }
    eachAxis(function (axis) {
        return visualElement.setProjectionTargetAxis(axis, offset[axis].min, offset[axis].max, true);
    });
    return true;
}

var unresolvedJobs = new Set();
function pushJob(stack, job, pointer) {
    if (!stack[pointer])
        stack[pointer] = [];
    stack[pointer].push(job);
}
function batchLayout(callback) {
    unresolvedJobs.add(callback);
    return function () { return unresolvedJobs.delete(callback); };
}
function flushLayout() {
    if (!unresolvedJobs.size)
        return;
    var pointer = 0;
    var reads = [[]];
    var writes = [];
    var setRead = function (job) { return pushJob(reads, job, pointer); };
    var setWrite = function (job) {
        pushJob(writes, job, pointer);
        pointer++;
    };
    /**
     * Resolve jobs into their array stacks
     */
    unresolvedJobs.forEach(function (callback) {
        callback(setRead, setWrite);
        pointer = 0;
    });
    unresolvedJobs.clear();
    /**
     * Execute jobs
     */
    var numStacks = writes.length;
    for (var i = 0; i <= numStacks; i++) {
        reads[i] && reads[i].forEach(executeJob);
        writes[i] && writes[i].forEach(executeJob);
    }
}
var executeJob = function (job) { return job(); };

var elementDragControls = new WeakMap();
/**
 *
 */
var lastPointerEvent;
var VisualElementDragControls = /** @class */ (function () {
    function VisualElementDragControls(_a) {
        var visualElement = _a.visualElement;
        /**
         * Track whether we're currently dragging.
         *
         * @internal
         */
        this.isDragging = false;
        /**
         * The current direction of drag, or `null` if both.
         *
         * @internal
         */
        this.currentDirection = null;
        /**
         * The permitted boundaries of travel, in pixels.
         *
         * @internal
         */
        this.constraints = false;
        /**
         * The per-axis resolved elastic values.
         *
         * @internal
         */
        this.elastic = axisBox();
        /**
         * A reference to the host component's latest props.
         *
         * @internal
         */
        this.props = {};
        /**
         * @internal
         */
        this.hasMutatedConstraints = false;
        /**
         * Track the initial position of the cursor relative to the dragging element
         * when dragging starts as a value of 0-1 on each axis. We then use this to calculate
         * an ideal bounding box for the VisualElement renderer to project into every frame.
         *
         * @internal
         */
        this.cursorProgress = {
            x: 0.5,
            y: 0.5,
        };
        // When updating _dragX, or _dragY instead of the VisualElement,
        // persist their values between drag gestures.
        this.originPoint = {};
        // This is a reference to the global drag gesture lock, ensuring only one component
        // can "capture" the drag of one or both axes.
        // TODO: Look into moving this into pansession?
        this.openGlobalLock = null;
        /**
         * @internal
         */
        this.panSession = null;
        this.visualElement = visualElement;
        this.visualElement.enableLayoutProjection();
        elementDragControls.set(visualElement, this);
    }
    /**
     * Instantiate a PanSession for the drag gesture
     *
     * @public
     */
    VisualElementDragControls.prototype.start = function (originEvent, _a) {
        var _this = this;
        var _b = _a === void 0 ? {} : _a, _c = _b.snapToCursor, snapToCursor = _c === void 0 ? false : _c, cursorProgress = _b.cursorProgress;
        var onSessionStart = function (event) {
            var _a;
            // Stop any animations on both axis values immediately. This allows the user to throw and catch
            // the component.
            _this.stopMotion();
            /**
             * Save the initial point. We'll use this to calculate the pointer's position rather
             * than the one we receive when the gesture actually starts. By then, the pointer will
             * have already moved, and the perception will be of the pointer "slipping" across the element
             */
            var initialPoint = getViewportPointFromEvent(event).point;
            (_a = _this.cancelLayout) === null || _a === void 0 ? void 0 : _a.call(_this);
            _this.cancelLayout = batchLayout(function (read, write) {
                var ancestors = collectProjectingAncestors(_this.visualElement);
                var children = collectProjectingChildren(_this.visualElement);
                var tree = __spreadArray(__spreadArray([], __read(ancestors)), __read(children));
                var hasManuallySetCursorOrigin = false;
                /**
                 * Apply a simple lock to the projection target. This ensures no animations
                 * can run on the projection box while this lock is active.
                 */
                _this.isLayoutDrag() && _this.visualElement.lockProjectionTarget();
                write(function () {
                    tree.forEach(function (element) { return element.resetTransform(); });
                });
                read(function () {
                    updateLayoutMeasurement(_this.visualElement);
                    children.forEach(updateLayoutMeasurement);
                });
                write(function () {
                    tree.forEach(function (element) { return element.restoreTransform(); });
                    if (snapToCursor) {
                        hasManuallySetCursorOrigin = _this.snapToCursor(initialPoint);
                    }
                });
                read(function () {
                    var isRelativeDrag = Boolean(_this.getAxisMotionValue("x") && !_this.isExternalDrag());
                    if (!isRelativeDrag) {
                        _this.visualElement.rebaseProjectionTarget(true, _this.visualElement.measureViewportBox(false));
                    }
                    _this.visualElement.scheduleUpdateLayoutProjection();
                    /**
                     * When dragging starts, we want to find where the cursor is relative to the bounding box
                     * of the element. Every frame, we calculate a new bounding box using this relative position
                     * and let the visualElement renderer figure out how to reproject the element into this bounding
                     * box.
                     *
                     * By doing it this way, rather than applying an x/y transform directly to the element,
                     * we can ensure the component always visually sticks to the cursor as we'd expect, even
                     * if the DOM element itself changes layout as a result of React updates the user might
                     * make based on the drag position.
                     */
                    var projection = _this.visualElement.projection;
                    eachAxis(function (axis) {
                        if (!hasManuallySetCursorOrigin) {
                            var _a = projection.target[axis], min = _a.min, max = _a.max;
                            _this.cursorProgress[axis] = cursorProgress
                                ? cursorProgress[axis]
                                : progress(min, max, initialPoint[axis]);
                        }
                        /**
                         * If we have external drag MotionValues, record their origin point. On pointermove
                         * we'll apply the pan gesture offset directly to this value.
                         */
                        var axisValue = _this.getAxisMotionValue(axis);
                        if (axisValue) {
                            _this.originPoint[axis] = axisValue.get();
                        }
                    });
                });
                write(function () {
                    flushSync.update();
                    flushSync.preRender();
                    flushSync.render();
                    flushSync.postRender();
                });
                read(function () { return _this.resolveDragConstraints(); });
            });
        };
        var onStart = function (event, info) {
            var _a, _b, _c;
            // Attempt to grab the global drag gesture lock - maybe make this part of PanSession
            var _d = _this.props, drag = _d.drag, dragPropagation = _d.dragPropagation;
            if (drag && !dragPropagation) {
                if (_this.openGlobalLock)
                    _this.openGlobalLock();
                _this.openGlobalLock = getGlobalLock(drag);
                // If we don 't have the lock, don't start dragging
                if (!_this.openGlobalLock)
                    return;
            }
            flushLayout();
            // Set current drag status
            _this.isDragging = true;
            _this.currentDirection = null;
            // Fire onDragStart event
            (_b = (_a = _this.props).onDragStart) === null || _b === void 0 ? void 0 : _b.call(_a, event, info);
            (_c = _this.visualElement.animationState) === null || _c === void 0 ? void 0 : _c.setActive(AnimationType.Drag, true);
        };
        var onMove = function (event, info) {
            var _a, _b, _c, _d;
            var _e = _this.props, dragPropagation = _e.dragPropagation, dragDirectionLock = _e.dragDirectionLock;
            // If we didn't successfully receive the gesture lock, early return.
            if (!dragPropagation && !_this.openGlobalLock)
                return;
            var offset = info.offset;
            // Attempt to detect drag direction if directionLock is true
            if (dragDirectionLock && _this.currentDirection === null) {
                _this.currentDirection = getCurrentDirection(offset);
                // If we've successfully set a direction, notify listener
                if (_this.currentDirection !== null) {
                    (_b = (_a = _this.props).onDirectionLock) === null || _b === void 0 ? void 0 : _b.call(_a, _this.currentDirection);
                }
                return;
            }
            // Update each point with the latest position
            _this.updateAxis("x", info.point, offset);
            _this.updateAxis("y", info.point, offset);
            // Fire onDrag event
            (_d = (_c = _this.props).onDrag) === null || _d === void 0 ? void 0 : _d.call(_c, event, info);
            // Update the last pointer event
            lastPointerEvent = event;
        };
        var onSessionEnd = function (event, info) {
            return _this.stop(event, info);
        };
        var transformPagePoint = this.props.transformPagePoint;
        this.panSession = new PanSession(originEvent, {
            onSessionStart: onSessionStart,
            onStart: onStart,
            onMove: onMove,
            onSessionEnd: onSessionEnd,
        }, { transformPagePoint: transformPagePoint });
    };
    VisualElementDragControls.prototype.resolveDragConstraints = function () {
        var _this = this;
        var _a = this.props, dragConstraints = _a.dragConstraints, dragElastic = _a.dragElastic;
        var layout = this.visualElement.getLayoutState().layoutCorrected;
        if (dragConstraints) {
            this.constraints = isRefObject(dragConstraints)
                ? this.resolveRefConstraints(layout, dragConstraints)
                : calcRelativeConstraints(layout, dragConstraints);
        }
        else {
            this.constraints = false;
        }
        this.elastic = resolveDragElastic(dragElastic);
        /**
         * If we're outputting to external MotionValues, we want to rebase the measured constraints
         * from viewport-relative to component-relative.
         */
        if (this.constraints && !this.hasMutatedConstraints) {
            eachAxis(function (axis) {
                if (_this.getAxisMotionValue(axis)) {
                    _this.constraints[axis] = rebaseAxisConstraints(layout[axis], _this.constraints[axis]);
                }
            });
        }
    };
    VisualElementDragControls.prototype.resolveRefConstraints = function (layoutBox, constraints) {
        var _a = this.props, onMeasureDragConstraints = _a.onMeasureDragConstraints, transformPagePoint = _a.transformPagePoint;
        var constraintsElement = constraints.current;
        this.constraintsBox = getBoundingBox(constraintsElement, transformPagePoint);
        var measuredConstraints = calcViewportConstraints(layoutBox, this.constraintsBox);
        /**
         * If there's an onMeasureDragConstraints listener we call it and
         * if different constraints are returned, set constraints to that
         */
        if (onMeasureDragConstraints) {
            var userConstraints = onMeasureDragConstraints(convertAxisBoxToBoundingBox(measuredConstraints));
            this.hasMutatedConstraints = !!userConstraints;
            if (userConstraints) {
                measuredConstraints = convertBoundingBoxToAxisBox(userConstraints);
            }
        }
        return measuredConstraints;
    };
    VisualElementDragControls.prototype.cancelDrag = function () {
        var _a, _b;
        this.visualElement.unlockProjectionTarget();
        (_a = this.cancelLayout) === null || _a === void 0 ? void 0 : _a.call(this);
        this.isDragging = false;
        this.panSession && this.panSession.end();
        this.panSession = null;
        if (!this.props.dragPropagation && this.openGlobalLock) {
            this.openGlobalLock();
            this.openGlobalLock = null;
        }
        (_b = this.visualElement.animationState) === null || _b === void 0 ? void 0 : _b.setActive(AnimationType.Drag, false);
    };
    VisualElementDragControls.prototype.stop = function (event, info) {
        var _a, _b, _c;
        (_a = this.panSession) === null || _a === void 0 ? void 0 : _a.end();
        this.panSession = null;
        var isDragging = this.isDragging;
        this.cancelDrag();
        if (!isDragging)
            return;
        var velocity = info.velocity;
        this.animateDragEnd(velocity);
        (_c = (_b = this.props).onDragEnd) === null || _c === void 0 ? void 0 : _c.call(_b, event, info);
    };
    VisualElementDragControls.prototype.snapToCursor = function (point) {
        var _this = this;
        return eachAxis(function (axis) {
            var drag = _this.props.drag;
            // If we're not dragging this axis, do an early return.
            if (!shouldDrag(axis, drag, _this.currentDirection))
                return;
            var axisValue = _this.getAxisMotionValue(axis);
            if (axisValue) {
                var box = _this.visualElement.getLayoutState().layout;
                var length_1 = box[axis].max - box[axis].min;
                var center = box[axis].min + length_1 / 2;
                var offset = point[axis] - center;
                _this.originPoint[axis] = point[axis];
                axisValue.set(offset);
            }
            else {
                _this.cursorProgress[axis] = 0.5;
                return true;
            }
        }).includes(true);
    };
    /**
     * Update the specified axis with the latest pointer information.
     */
    VisualElementDragControls.prototype.updateAxis = function (axis, point, offset) {
        var drag = this.props.drag;
        // If we're not dragging this axis, do an early return.
        if (!shouldDrag(axis, drag, this.currentDirection))
            return;
        return this.getAxisMotionValue(axis)
            ? this.updateAxisMotionValue(axis, offset)
            : this.updateVisualElementAxis(axis, point);
    };
    VisualElementDragControls.prototype.updateAxisMotionValue = function (axis, offset) {
        var axisValue = this.getAxisMotionValue(axis);
        if (!offset || !axisValue)
            return;
        var nextValue = this.originPoint[axis] + offset[axis];
        var update = this.constraints
            ? applyConstraints(nextValue, this.constraints[axis], this.elastic[axis])
            : nextValue;
        axisValue.set(update);
    };
    VisualElementDragControls.prototype.updateVisualElementAxis = function (axis, point) {
        var _a;
        // Get the actual layout bounding box of the element
        var axisLayout = this.visualElement.getLayoutState().layout[axis];
        // Calculate its current length. In the future we might want to lerp this to animate
        // between lengths if the layout changes as we change the DOM
        var axisLength = axisLayout.max - axisLayout.min;
        // Get the initial progress that the pointer sat on this axis on gesture start.
        var axisProgress = this.cursorProgress[axis];
        // Calculate a new min point based on the latest pointer position, constraints and elastic
        var min = calcConstrainedMinPoint(point[axis], axisLength, axisProgress, (_a = this.constraints) === null || _a === void 0 ? void 0 : _a[axis], this.elastic[axis]);
        // Update the axis viewport target with this new min and the length
        this.visualElement.setProjectionTargetAxis(axis, min, min + axisLength);
    };
    VisualElementDragControls.prototype.setProps = function (_a) {
        var _b = _a.drag, drag = _b === void 0 ? false : _b, _c = _a.dragDirectionLock, dragDirectionLock = _c === void 0 ? false : _c, _d = _a.dragPropagation, dragPropagation = _d === void 0 ? false : _d, _e = _a.dragConstraints, dragConstraints = _e === void 0 ? false : _e, _f = _a.dragElastic, dragElastic = _f === void 0 ? defaultElastic : _f, _g = _a.dragMomentum, dragMomentum = _g === void 0 ? true : _g, remainingProps = __rest(_a, ["drag", "dragDirectionLock", "dragPropagation", "dragConstraints", "dragElastic", "dragMomentum"]);
        this.props = __assign({ drag: drag,
            dragDirectionLock: dragDirectionLock,
            dragPropagation: dragPropagation,
            dragConstraints: dragConstraints,
            dragElastic: dragElastic,
            dragMomentum: dragMomentum }, remainingProps);
    };
    /**
     * Drag works differently depending on which props are provided.
     *
     * - If _dragX and _dragY are provided, we output the gesture delta directly to those motion values.
     * - If the component will perform layout animations, we output the gesture to the component's
     *      visual bounding box
     * - Otherwise, we apply the delta to the x/y motion values.
     */
    VisualElementDragControls.prototype.getAxisMotionValue = function (axis) {
        var _a = this.props, layout = _a.layout, layoutId = _a.layoutId;
        var dragKey = "_drag" + axis.toUpperCase();
        if (this.props[dragKey]) {
            return this.props[dragKey];
        }
        else if (!layout && layoutId === undefined) {
            return this.visualElement.getValue(axis, 0);
        }
    };
    VisualElementDragControls.prototype.isLayoutDrag = function () {
        return !this.getAxisMotionValue("x");
    };
    VisualElementDragControls.prototype.isExternalDrag = function () {
        var _a = this.props, _dragX = _a._dragX, _dragY = _a._dragY;
        return _dragX || _dragY;
    };
    VisualElementDragControls.prototype.animateDragEnd = function (velocity) {
        var _this = this;
        var _a = this.props, drag = _a.drag, dragMomentum = _a.dragMomentum, dragElastic = _a.dragElastic, dragTransition = _a.dragTransition;
        /**
         * Everything beyond the drag gesture should be performed with
         * relative projection so children stay in sync with their parent element.
         */
        var isRelative = convertToRelativeProjection(this.visualElement, this.isLayoutDrag() && !this.isExternalDrag());
        /**
         * If we had previously resolved constraints relative to the viewport,
         * we need to also convert those to a relative coordinate space for the animation
         */
        var constraints = this.constraints || {};
        if (isRelative &&
            Object.keys(constraints).length &&
            this.isLayoutDrag()) {
            var projectionParent = this.visualElement.getProjectionParent();
            if (projectionParent) {
                var relativeConstraints_1 = calcRelativeOffset(projectionParent.projection.targetFinal, constraints);
                eachAxis(function (axis) {
                    var _a = relativeConstraints_1[axis], min = _a.min, max = _a.max;
                    constraints[axis] = {
                        min: isNaN(min) ? undefined : min,
                        max: isNaN(max) ? undefined : max,
                    };
                });
            }
        }
        var momentumAnimations = eachAxis(function (axis) {
            var _a;
            if (!shouldDrag(axis, drag, _this.currentDirection)) {
                return;
            }
            var transition = (_a = constraints === null || constraints === void 0 ? void 0 : constraints[axis]) !== null && _a !== void 0 ? _a : {};
            /**
             * Overdamp the boundary spring if `dragElastic` is disabled. There's still a frame
             * of spring animations so we should look into adding a disable spring option to `inertia`.
             * We could do something here where we affect the `bounceStiffness` and `bounceDamping`
             * using the value of `dragElastic`.
             */
            var bounceStiffness = dragElastic ? 200 : 1000000;
            var bounceDamping = dragElastic ? 40 : 10000000;
            var inertia = __assign(__assign({ type: "inertia", velocity: dragMomentum ? velocity[axis] : 0, bounceStiffness: bounceStiffness,
                bounceDamping: bounceDamping, timeConstant: 750, restDelta: 1, restSpeed: 10 }, dragTransition), transition);
            // If we're not animating on an externally-provided `MotionValue` we can use the
            // component's animation controls which will handle interactions with whileHover (etc),
            // otherwise we just have to animate the `MotionValue` itself.
            return _this.getAxisMotionValue(axis)
                ? _this.startAxisValueAnimation(axis, inertia)
                : _this.visualElement.startLayoutAnimation(axis, inertia, isRelative);
        });
        // Run all animations and then resolve the new drag constraints.
        return Promise.all(momentumAnimations).then(function () {
            var _a, _b;
            (_b = (_a = _this.props).onDragTransitionEnd) === null || _b === void 0 ? void 0 : _b.call(_a);
        });
    };
    VisualElementDragControls.prototype.stopMotion = function () {
        var _this = this;
        eachAxis(function (axis) {
            var axisValue = _this.getAxisMotionValue(axis);
            axisValue
                ? axisValue.stop()
                : _this.visualElement.stopLayoutAnimation();
        });
    };
    VisualElementDragControls.prototype.startAxisValueAnimation = function (axis, transition) {
        var axisValue = this.getAxisMotionValue(axis);
        if (!axisValue)
            return;
        var currentValue = axisValue.get();
        axisValue.set(currentValue);
        axisValue.set(currentValue); // Set twice to hard-reset velocity
        return startAnimation(axis, axisValue, 0, transition);
    };
    VisualElementDragControls.prototype.scalePoint = function () {
        var _this = this;
        var _a = this.props, drag = _a.drag, dragConstraints = _a.dragConstraints;
        if (!isRefObject(dragConstraints) || !this.constraintsBox)
            return;
        // Stop any current animations as there can be some visual glitching if we resize mid animation
        this.stopMotion();
        // Record the relative progress of the targetBox relative to the constraintsBox
        var boxProgress = { x: 0, y: 0 };
        eachAxis(function (axis) {
            boxProgress[axis] = calcOrigin$1(_this.visualElement.projection.target[axis], _this.constraintsBox[axis]);
        });
        /**
         * For each axis, calculate the current progress of the layout axis within the constraints.
         * Then, using the latest layout and constraints measurements, reposition the new layout axis
         * proportionally within the constraints.
         */
        this.updateConstraints(function () {
            eachAxis(function (axis) {
                if (!shouldDrag(axis, drag, null))
                    return;
                // Calculate the position of the targetBox relative to the constraintsBox using the
                // previously calculated progress
                var _a = calcPositionFromProgress(_this.visualElement.projection.target[axis], _this.constraintsBox[axis], boxProgress[axis]), min = _a.min, max = _a.max;
                _this.visualElement.setProjectionTargetAxis(axis, min, max);
            });
        });
        /**
         * If any other draggable components are queuing the same tasks synchronously
         * this will wait until they've all been scheduled before flushing.
         */
        setTimeout(flushLayout, 1);
    };
    VisualElementDragControls.prototype.updateConstraints = function (onReady) {
        var _this = this;
        this.cancelLayout = batchLayout(function (read, write) {
            var ancestors = collectProjectingAncestors(_this.visualElement);
            write(function () {
                return ancestors.forEach(function (element) { return element.resetTransform(); });
            });
            read(function () { return updateLayoutMeasurement(_this.visualElement); });
            write(function () {
                return ancestors.forEach(function (element) { return element.restoreTransform(); });
            });
            read(function () {
                _this.resolveDragConstraints();
            });
            if (onReady)
                write(onReady);
        });
    };
    VisualElementDragControls.prototype.mount = function (visualElement) {
        var _this = this;
        var element = visualElement.getInstance();
        /**
         * Attach a pointerdown event listener on this DOM element to initiate drag tracking.
         */
        var stopPointerListener = addPointerEvent(element, "pointerdown", function (event) {
            var _a = _this.props, drag = _a.drag, _b = _a.dragListener, dragListener = _b === void 0 ? true : _b;
            drag && dragListener && _this.start(event);
        });
        /**
         * Attach a window resize listener to scale the draggable target within its defined
         * constraints as the window resizes.
         */
        var stopResizeListener = addDomEvent(window, "resize", function () {
            _this.scalePoint();
        });
        /**
         * Ensure drag constraints are resolved correctly relative to the dragging element
         * whenever its layout changes.
         */
        var stopLayoutUpdateListener = visualElement.onLayoutUpdate(function () {
            if (_this.isDragging) {
                _this.resolveDragConstraints();
            }
        });
        /**
         * If the previous component with this same layoutId was dragging at the time
         * it was unmounted, we want to continue the same gesture on this component.
         */
        var prevDragCursor = visualElement.prevDragCursor;
        if (prevDragCursor) {
            this.start(lastPointerEvent, { cursorProgress: prevDragCursor });
        }
        /**
         * Return a function that will teardown the drag gesture
         */
        return function () {
            stopPointerListener === null || stopPointerListener === void 0 ? void 0 : stopPointerListener();
            stopResizeListener === null || stopResizeListener === void 0 ? void 0 : stopResizeListener();
            stopLayoutUpdateListener === null || stopLayoutUpdateListener === void 0 ? void 0 : stopLayoutUpdateListener();
            _this.cancelDrag();
        };
    };
    return VisualElementDragControls;
}());
function shouldDrag(direction, drag, currentDirection) {
    return ((drag === true || drag === direction) &&
        (currentDirection === null || currentDirection === direction));
}
/**
 * Based on an x/y offset determine the current drag direction. If both axis' offsets are lower
 * than the provided threshold, return `null`.
 *
 * @param offset - The x/y offset from origin.
 * @param lockThreshold - (Optional) - the minimum absolute offset before we can determine a drag direction.
 */
function getCurrentDirection(offset, lockThreshold) {
    if (lockThreshold === void 0) { lockThreshold = 10; }
    var direction = null;
    if (Math.abs(offset.y) > lockThreshold) {
        direction = "y";
    }
    else if (Math.abs(offset.x) > lockThreshold) {
        direction = "x";
    }
    return direction;
}

/**
 * A hook that allows an element to be dragged.
 *
 * @internal
 */
function useDrag(props) {
    var groupDragControls = props.dragControls, visualElement = props.visualElement;
    var transformPagePoint = react.useContext(MotionConfigContext).transformPagePoint;
    var dragControls = useConstant(function () {
        return new VisualElementDragControls({
            visualElement: visualElement,
        });
    });
    dragControls.setProps(__assign(__assign({}, props), { transformPagePoint: transformPagePoint }));
    // If we've been provided a DragControls for manual control over the drag gesture,
    // subscribe this component to it on mount.
    react.useEffect(function () { return groupDragControls && groupDragControls.subscribe(dragControls); }, [dragControls]);
    // Mount the drag controls with the visualElement
    react.useEffect(function () { return dragControls.mount(visualElement); }, []);
}

/**
 *
 * @param handlers -
 * @param ref -
 *
 * @internalremarks
 * Currently this sets new pan gesture functions every render. The memo route has been explored
 * in the past but ultimately we're still creating new functions every render. An optimisation
 * to explore is creating the pan gestures and loading them into a `ref`.
 *
 * @internal
 */
function usePanGesture(_a) {
    var onPan = _a.onPan, onPanStart = _a.onPanStart, onPanEnd = _a.onPanEnd, onPanSessionStart = _a.onPanSessionStart, visualElement = _a.visualElement;
    var hasPanEvents = onPan || onPanStart || onPanEnd || onPanSessionStart;
    var panSession = react.useRef(null);
    var transformPagePoint = react.useContext(MotionConfigContext).transformPagePoint;
    var handlers = {
        onSessionStart: onPanSessionStart,
        onStart: onPanStart,
        onMove: onPan,
        onEnd: function (event, info) {
            panSession.current = null;
            onPanEnd && onPanEnd(event, info);
        },
    };
    react.useEffect(function () {
        if (panSession.current !== null) {
            panSession.current.updateHandlers(handlers);
        }
    });
    function onPointerDown(event) {
        panSession.current = new PanSession(event, handlers, {
            transformPagePoint: transformPagePoint,
        });
    }
    usePointerEvent$1(visualElement, "pointerdown", hasPanEvents && onPointerDown);
    useUnmountEffect(function () { return panSession.current && panSession.current.end(); });
}

var drag = {
    pan: makeRenderlessComponent(usePanGesture),
    drag: makeRenderlessComponent(useDrag),
};

/**
 * @public
 */
var Presence;
(function (Presence) {
    Presence[Presence["Entering"] = 0] = "Entering";
    Presence[Presence["Present"] = 1] = "Present";
    Presence[Presence["Exiting"] = 2] = "Exiting";
})(Presence || (Presence = {}));
/**
 * @public
 */
var VisibilityAction;
(function (VisibilityAction) {
    VisibilityAction[VisibilityAction["Hide"] = 0] = "Hide";
    VisibilityAction[VisibilityAction["Show"] = 1] = "Show";
})(VisibilityAction || (VisibilityAction = {}));

function isCSSVariable$1(value) {
    return typeof value === "string" && value.startsWith("var(--");
}
/**
 * Parse Framer's special CSS variable format into a CSS token and a fallback.
 *
 * ```
 * `var(--foo, #fff)` => [`--foo`, '#fff']
 * ```
 *
 * @param current
 */
var cssVariableRegex = /var\((--[a-zA-Z0-9-_]+),? ?([a-zA-Z0-9 ()%#.,-]+)?\)/;
function parseCSSVariable(current) {
    var match = cssVariableRegex.exec(current);
    if (!match)
        return [,];
    var _a = __read(match, 3), token = _a[1], fallback = _a[2];
    return [token, fallback];
}
function getVariableValue(current, element, depth) {
    var _a = __read(parseCSSVariable(current), 2), token = _a[0], fallback = _a[1];
    // No CSS variable detected
    if (!token)
        return;
    // Attempt to read this CSS variable off the element
    var resolved = window.getComputedStyle(element).getPropertyValue(token);
    if (resolved) {
        return resolved.trim();
    }
    else if (isCSSVariable$1(fallback)) {
        // The fallback might itself be a CSS variable, in which case we attempt to resolve it too.
        return getVariableValue(fallback, element);
    }
    else {
        return fallback;
    }
}
/**
 * Resolve CSS variables from
 *
 * @internal
 */
function resolveCSSVariables(visualElement, _a, transitionEnd) {
    var _b;
    var target = __rest(_a, []);
    var element = visualElement.getInstance();
    if (!(element instanceof HTMLElement))
        return { target: target, transitionEnd: transitionEnd };
    // If `transitionEnd` isn't `undefined`, clone it. We could clone `target` and `transitionEnd`
    // only if they change but I think this reads clearer and this isn't a performance-critical path.
    if (transitionEnd) {
        transitionEnd = __assign({}, transitionEnd);
    }
    // Go through existing `MotionValue`s and ensure any existing CSS variables are resolved
    visualElement.forEachValue(function (value) {
        var current = value.get();
        if (!isCSSVariable$1(current))
            return;
        var resolved = getVariableValue(current, element);
        if (resolved)
            value.set(resolved);
    });
    // Cycle through every target property and resolve CSS variables. Currently
    // we only read single-var properties like `var(--foo)`, not `calc(var(--foo) + 20px)`
    for (var key in target) {
        var current = target[key];
        if (!isCSSVariable$1(current))
            continue;
        var resolved = getVariableValue(current, element);
        if (!resolved)
            continue;
        // Clone target if it hasn't already been
        target[key] = resolved;
        // If the user hasn't already set this key on `transitionEnd`, set it to the unresolved
        // CSS variable. This will ensure that after the animation the component will reflect
        // changes in the value of the CSS variable.
        if (transitionEnd)
            (_b = transitionEnd[key]) !== null && _b !== void 0 ? _b : (transitionEnd[key] = current);
    }
    return { target: target, transitionEnd: transitionEnd };
}

function pixelsToPercent(pixels, axis) {
    return (pixels / (axis.max - axis.min)) * 100;
}
/**
 * We always correct borderRadius as a percentage rather than pixels to reduce paints.
 * For example, if you are projecting a box that is 100px wide with a 10px borderRadius
 * into a box that is 200px wide with a 20px borderRadius, that is actually a 10%
 * borderRadius in both states. If we animate between the two in pixels that will trigger
 * a paint each time. If we animate between the two in percentage we'll avoid a paint.
 */
function correctBorderRadius(latest, _layoutState, _a) {
    var target = _a.target;
    /**
     * If latest is a string, if it's a percentage we can return immediately as it's
     * going to be stretched appropriately. Otherwise, if it's a pixel, convert it to a number.
     */
    if (typeof latest === "string") {
        if (px.test(latest)) {
            latest = parseFloat(latest);
        }
        else {
            return latest;
        }
    }
    /**
     * If latest is a number, it's a pixel value. We use the current viewportBox to calculate that
     * pixel value as a percentage of each axis
     */
    var x = pixelsToPercent(latest, target.x);
    var y = pixelsToPercent(latest, target.y);
    return x + "% " + y + "%";
}
var varToken = "_$css";
function correctBoxShadow(latest, _a) {
    var delta = _a.delta, treeScale = _a.treeScale;
    var original = latest;
    /**
     * We need to first strip and store CSS variables from the string.
     */
    var containsCSSVariables = latest.includes("var(");
    var cssVariables = [];
    if (containsCSSVariables) {
        latest = latest.replace(cssVariableRegex, function (match) {
            cssVariables.push(match);
            return varToken;
        });
    }
    var shadow = complex.parse(latest);
    // TODO: Doesn't support multiple shadows
    if (shadow.length > 5)
        return original;
    var template = complex.createTransformer(latest);
    var offset = typeof shadow[0] !== "number" ? 1 : 0;
    // Calculate the overall context scale
    var xScale = delta.x.scale * treeScale.x;
    var yScale = delta.y.scale * treeScale.y;
    shadow[0 + offset] /= xScale;
    shadow[1 + offset] /= yScale;
    /**
     * Ideally we'd correct x and y scales individually, but because blur and
     * spread apply to both we have to take a scale average and apply that instead.
     * We could potentially improve the outcome of this by incorporating the ratio between
     * the two scales.
     */
    var averageScale = mix(xScale, yScale, 0.5);
    // Blur
    if (typeof shadow[2 + offset] === "number")
        shadow[2 + offset] /= averageScale;
    // Spread
    if (typeof shadow[3 + offset] === "number")
        shadow[3 + offset] /= averageScale;
    var output = template(shadow);
    if (containsCSSVariables) {
        var i_1 = 0;
        output = output.replace(varToken, function () {
            var cssVariable = cssVariables[i_1];
            i_1++;
            return cssVariable;
        });
    }
    return output;
}
var borderCorrectionDefinition = {
    process: correctBorderRadius,
};
var defaultScaleCorrectors = {
    borderRadius: __assign(__assign({}, borderCorrectionDefinition), { applyTo: [
            "borderTopLeftRadius",
            "borderTopRightRadius",
            "borderBottomLeftRadius",
            "borderBottomRightRadius",
        ] }),
    borderTopLeftRadius: borderCorrectionDefinition,
    borderTopRightRadius: borderCorrectionDefinition,
    borderBottomLeftRadius: borderCorrectionDefinition,
    borderBottomRightRadius: borderCorrectionDefinition,
    boxShadow: {
        process: correctBoxShadow,
    },
};

var progressTarget = 1000;
var Animate = /** @class */ (function (_super) {
    __extends(Animate, _super);
    function Animate() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * A mutable object that tracks the target viewport box
         * for the current animation frame.
         */
        _this.frameTarget = axisBox();
        /**
         * The current animation target, we use this to check whether to start
         * a new animation or continue the existing one.
         */
        _this.currentAnimationTarget = axisBox();
        /**
         * Track whether we're animating this axis.
         */
        _this.isAnimating = {
            x: false,
            y: false,
        };
        _this.stopAxisAnimation = {
            x: undefined,
            y: undefined,
        };
        _this.isAnimatingTree = false;
        _this.animate = function (target, origin, _a) {
            if (_a === void 0) { _a = {}; }
            var originBox = _a.originBox, targetBox = _a.targetBox, visibilityAction = _a.visibilityAction, shouldStackAnimate = _a.shouldStackAnimate, onComplete = _a.onComplete, prevParent = _a.prevParent, config = __rest(_a, ["originBox", "targetBox", "visibilityAction", "shouldStackAnimate", "onComplete", "prevParent"]);
            var _b = _this.props, visualElement = _b.visualElement, layout = _b.layout;
            /**
             * Early return if we've been instructed not to animate this render.
             */
            if (shouldStackAnimate === false) {
                _this.isAnimatingTree = false;
                return _this.safeToRemove();
            }
            /**
             * Prioritise tree animations
             */
            if (_this.isAnimatingTree && shouldStackAnimate !== true) {
                return;
            }
            else if (shouldStackAnimate) {
                _this.isAnimatingTree = true;
            }
            /**
             * Allow the measured origin (prev bounding box) and target (actual layout) to be
             * overridden by the provided config.
             */
            origin = originBox || origin;
            target = targetBox || target;
            /**
             * If this element has a projecting parent, there's an opportunity to animate
             * it relatively to that parent rather than relatively to the viewport. This
             * allows us to add orchestrated animations.
             */
            var isRelative = false;
            var projectionParent = visualElement.getProjectionParent();
            if (projectionParent) {
                var prevParentViewportBox = projectionParent.prevViewportBox;
                var parentLayout = projectionParent.getLayoutState().layout;
                /**
                 * If we're being provided a previous parent VisualElement by AnimateSharedLayout
                 */
                if (prevParent) {
                    /**
                     * If we've been provided an explicit target box it means we're animating back
                     * to this previous parent. So we can make a relative box by comparing to the previous
                     * parent's layout
                     */
                    if (targetBox) {
                        parentLayout = prevParent.getLayoutState().layout;
                    }
                    /**
                     * Likewise if we've been provided an explicit origin box it means we're
                     * animating out from a different element. So we should figure out where that was
                     * on screen relative to the new parent element.
                     */
                    if (originBox &&
                        !checkIfParentHasChanged(prevParent, projectionParent) &&
                        prevParent.prevViewportBox) {
                        prevParentViewportBox = prevParent.prevViewportBox;
                    }
                }
                if (prevParentViewportBox &&
                    isProvidedCorrectDataForRelativeSharedLayout(prevParent, originBox, targetBox)) {
                    isRelative = true;
                    origin = calcRelativeOffset(prevParentViewportBox, origin);
                    target = calcRelativeOffset(parentLayout, target);
                }
            }
            var boxHasMoved = hasMoved(origin, target);
            var animations = eachAxis(function (axis) {
                var _a, _b;
                /**
                 * If layout is set to "position", we can resize the origin box based on the target
                 * box and only animate its position.
                 */
                if (layout === "position") {
                    var targetLength = target[axis].max - target[axis].min;
                    origin[axis].max = origin[axis].min + targetLength;
                }
                if (visualElement.projection.isTargetLocked) {
                    return;
                }
                else if (visibilityAction !== undefined) {
                    visualElement.setVisibility(visibilityAction === VisibilityAction.Show);
                }
                else if (boxHasMoved) {
                    // If the box has moved, animate between it's current visual state and its
                    // final state
                    return _this.animateAxis(axis, target[axis], origin[axis], __assign(__assign({}, config), { isRelative: isRelative }));
                }
                else {
                    (_b = (_a = _this.stopAxisAnimation)[axis]) === null || _b === void 0 ? void 0 : _b.call(_a);
                    // If the box has remained in the same place, immediately set the axis target
                    // to the final desired state
                    return visualElement.setProjectionTargetAxis(axis, target[axis].min, target[axis].max, isRelative);
                }
            });
            // Force a render to ensure there's no flash of uncorrected bounding box.
            visualElement.syncRender();
            /**
             * If this visualElement isn't present (ie it's been removed from the tree by the user but
             * kept in by the tree by AnimatePresence) then call safeToRemove when all axis animations
             * have successfully finished.
             */
            return Promise.all(animations).then(function () {
                _this.isAnimatingTree = false;
                onComplete && onComplete();
                visualElement.notifyLayoutAnimationComplete();
            });
        };
        return _this;
    }
    Animate.prototype.componentDidMount = function () {
        var _this = this;
        var visualElement = this.props.visualElement;
        visualElement.animateMotionValue = startAnimation;
        visualElement.enableLayoutProjection();
        this.unsubLayoutReady = visualElement.onLayoutUpdate(this.animate);
        visualElement.layoutSafeToRemove = function () { return _this.safeToRemove(); };
        addScaleCorrection(defaultScaleCorrectors);
    };
    Animate.prototype.componentWillUnmount = function () {
        var _this = this;
        this.unsubLayoutReady();
        eachAxis(function (axis) { var _a, _b; return (_b = (_a = _this.stopAxisAnimation)[axis]) === null || _b === void 0 ? void 0 : _b.call(_a); });
    };
    /**
     * TODO: This manually performs animations on the visualElement's layout progress
     * values. It'd be preferable to amend the startLayoutAxisAnimation
     * API to accept more custom animations like this.
     */
    Animate.prototype.animateAxis = function (axis, target, origin, _a) {
        var _this = this;
        var _b, _c;
        var _d = _a === void 0 ? {} : _a, transition = _d.transition, isRelative = _d.isRelative;
        /**
         * If we're not animating to a new target, don't run this animation
         */
        if (this.isAnimating[axis] &&
            axisIsEqual(target, this.currentAnimationTarget[axis])) {
            return;
        }
        (_c = (_b = this.stopAxisAnimation)[axis]) === null || _c === void 0 ? void 0 : _c.call(_b);
        this.isAnimating[axis] = true;
        var visualElement = this.props.visualElement;
        var frameTarget = this.frameTarget[axis];
        var layoutProgress = visualElement.getProjectionAnimationProgress()[axis];
        /**
         * Set layout progress back to 0. We set it twice to hard-reset any velocity that might
         * be re-incoporated into a subsequent spring animation.
         */
        layoutProgress.clearListeners();
        layoutProgress.set(0);
        layoutProgress.set(0);
        /**
         * Create an animation function to run once per frame. This will tween the visual bounding box from
         * origin to target using the latest progress value.
         */
        var frame = function () {
            // Convert the latest layoutProgress, which is a value from 0-1000, into a 0-1 progress
            var p = layoutProgress.get() / progressTarget;
            // Tween the axis and update the visualElement with the latest values
            tweenAxis(frameTarget, origin, target, p);
            visualElement.setProjectionTargetAxis(axis, frameTarget.min, frameTarget.max, isRelative);
        };
        // Synchronously run a frame to ensure there's no flash of the uncorrected bounding box.
        frame();
        // Create a function to stop animation on this specific axis
        var unsubscribeProgress = layoutProgress.onChange(frame);
        this.stopAxisAnimation[axis] = function () {
            _this.isAnimating[axis] = false;
            layoutProgress.stop();
            unsubscribeProgress();
        };
        this.currentAnimationTarget[axis] = target;
        var layoutTransition = transition ||
            visualElement.getDefaultTransition() ||
            defaultLayoutTransition;
        // Start the animation on this axis
        var animation = startAnimation(axis === "x" ? "layoutX" : "layoutY", layoutProgress, progressTarget, layoutTransition && getValueTransition(layoutTransition, "layout")).then(this.stopAxisAnimation[axis]);
        return animation;
    };
    Animate.prototype.safeToRemove = function () {
        var _a, _b;
        (_b = (_a = this.props).safeToRemove) === null || _b === void 0 ? void 0 : _b.call(_a);
    };
    Animate.prototype.render = function () {
        return null;
    };
    return Animate;
}(react.Component));
function AnimateLayoutContextProvider(props) {
    var _a = __read(usePresence(), 2), safeToRemove = _a[1];
    return react.createElement(Animate, __assign({}, props, { safeToRemove: safeToRemove }));
}
function hasMoved(a, b) {
    return (!isZeroBox(a) &&
        !isZeroBox(b) &&
        (!axisIsEqual(a.x, b.x) || !axisIsEqual(a.y, b.y)));
}
var zeroAxis = { min: 0, max: 0 };
function isZeroBox(a) {
    return axisIsEqual(a.x, zeroAxis) && axisIsEqual(a.y, zeroAxis);
}
function axisIsEqual(a, b) {
    return a.min === b.min && a.max === b.max;
}
var defaultLayoutTransition = {
    duration: 0.45,
    ease: [0.4, 0, 0.1, 1],
};
function isProvidedCorrectDataForRelativeSharedLayout(prevParent, originBox, targetBox) {
    return prevParent || (!prevParent && !(originBox || targetBox));
}

/**
 * Default handlers for batching VisualElements
 */
var defaultHandler = {
    layoutReady: function (child) { return child.notifyLayoutReady(); },
};
/**
 * Create a batcher to process VisualElements
 */
function createBatcher() {
    var queue = new Set();
    return {
        add: function (child) { return queue.add(child); },
        flush: function (_a) {
            var _b = _a === void 0 ? defaultHandler : _a, layoutReady = _b.layoutReady, parent = _b.parent;
            batchLayout(function (read, write) {
                var order = Array.from(queue).sort(compareByDepth);
                var ancestors = parent
                    ? collectProjectingAncestors(parent)
                    : [];
                write(function () {
                    var allElements = __spreadArray(__spreadArray([], __read(ancestors)), __read(order));
                    allElements.forEach(function (element) { return element.resetTransform(); });
                });
                read(function () {
                    order.forEach(updateLayoutMeasurement);
                });
                write(function () {
                    ancestors.forEach(function (element) { return element.restoreTransform(); });
                    order.forEach(layoutReady);
                });
                read(function () {
                    /**
                     * After all children have started animating, ensure any Entering components are set to Present.
                     * If we add deferred animations (set up all animations and then start them in two loops) this
                     * could be moved to the start loop. But it needs to happen after all the animations configs
                     * are generated in AnimateSharedLayout as this relies on presence data
                     */
                    order.forEach(function (child) {
                        if (child.isPresent)
                            child.presence = Presence.Present;
                    });
                });
                write(function () {
                    /**
                     * Starting these animations will have queued jobs on the frame loop. In some situations,
                     * like when removing an element, these will be processed too late after the DOM is manipulated,
                     * leaving a flash of incorrectly-projected content. By manually flushing these jobs
                     * we ensure there's no flash.
                     */
                    flushSync.preRender();
                    flushSync.render();
                });
                read(function () {
                    /**
                     * Schedule a callback at the end of the following frame to assign the latest projection
                     * box to the prevViewportBox snapshot. Once global batching is in place this could be run
                     * synchronously. But for now it ensures that if any nested `AnimateSharedLayout` top-level
                     * child attempts to calculate its previous relative position against a prevViewportBox
                     * it will be against its latest projection box instead, as the snapshot is useless beyond this
                     * render.
                     */
                    sync.postRender(function () {
                        return order.forEach(assignProjectionToSnapshot);
                    });
                    queue.clear();
                });
            });
            // TODO: Need to find a layout-synchronous way of flushing this
            flushLayout();
        },
    };
}
function assignProjectionToSnapshot(child) {
    child.prevViewportBox = child.projection.target;
}

var SharedLayoutContext = react.createContext(createBatcher());
/**
 * @internal
 */
var FramerTreeLayoutContext = react.createContext(createBatcher());
function isSharedLayout(context) {
    return !!context.forceUpdate;
}

/**
 * This component is responsible for scheduling the measuring of the motion component
 */
var Measure = /** @class */ (function (_super) {
    __extends(Measure, _super);
    function Measure() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * If this is a child of a SyncContext, register the VisualElement with it on mount.
     */
    Measure.prototype.componentDidMount = function () {
        var _a = this.props, syncLayout = _a.syncLayout, framerSyncLayout = _a.framerSyncLayout, visualElement = _a.visualElement;
        isSharedLayout(syncLayout) && syncLayout.register(visualElement);
        isSharedLayout(framerSyncLayout) &&
            framerSyncLayout.register(visualElement);
        visualElement.onUnmount(function () {
            if (isSharedLayout(syncLayout)) {
                syncLayout.remove(visualElement);
            }
            if (isSharedLayout(framerSyncLayout)) {
                framerSyncLayout.remove(visualElement);
            }
        });
    };
    /**
     * If this is a child of a SyncContext, notify it that it needs to re-render. It will then
     * handle the snapshotting.
     *
     * If it is stand-alone component, add it to the batcher.
     */
    Measure.prototype.getSnapshotBeforeUpdate = function () {
        var _a = this.props, syncLayout = _a.syncLayout, visualElement = _a.visualElement;
        if (isSharedLayout(syncLayout)) {
            syncLayout.syncUpdate();
        }
        else {
            snapshotViewportBox(visualElement);
            syncLayout.add(visualElement);
        }
        return null;
    };
    Measure.prototype.componentDidUpdate = function () {
        var syncLayout = this.props.syncLayout;
        if (!isSharedLayout(syncLayout))
            syncLayout.flush();
    };
    Measure.prototype.render = function () {
        return null;
    };
    return Measure;
}(react.Component));
function MeasureContextProvider(props) {
    var syncLayout = react.useContext(SharedLayoutContext);
    var framerSyncLayout = react.useContext(FramerTreeLayoutContext);
    return (react.createElement(Measure, __assign({}, props, { syncLayout: syncLayout, framerSyncLayout: framerSyncLayout })));
}

var layoutAnimations = {
    measureLayout: MeasureContextProvider,
    layoutAnimation: AnimateLayoutContextProvider,
};

var createProjectionState = function () { return ({
    isEnabled: false,
    isHydrated: false,
    isTargetLocked: false,
    target: axisBox(),
    targetFinal: axisBox(),
}); };
function createLayoutState() {
    return {
        isHydrated: false,
        layout: axisBox(),
        layoutCorrected: axisBox(),
        treeScale: { x: 1, y: 1 },
        delta: delta(),
        deltaFinal: delta(),
        deltaTransform: "",
    };
}
var zeroLayout = createLayoutState();

/**
 * Build a transform style that takes a calculated delta between the element's current
 * space on screen and projects it into the desired space.
 */
function buildLayoutProjectionTransform(_a, treeScale, latestTransform) {
    var x = _a.x, y = _a.y;
    /**
     * The translations we use to calculate are always relative to the viewport coordinate space.
     * But when we apply scales, we also scale the coordinate space of an element and its children.
     * For instance if we have a treeScale (the culmination of all parent scales) of 0.5 and we need
     * to move an element 100 pixels, we actually need to move it 200 in within that scaled space.
     */
    var xTranslate = x.translate / treeScale.x;
    var yTranslate = y.translate / treeScale.y;
    var transform = "translate3d(" + xTranslate + "px, " + yTranslate + "px, 0) ";
    if (latestTransform) {
        var rotate = latestTransform.rotate, rotateX = latestTransform.rotateX, rotateY = latestTransform.rotateY;
        if (rotate)
            transform += "rotate(" + rotate + ") ";
        if (rotateX)
            transform += "rotateX(" + rotateX + ") ";
        if (rotateY)
            transform += "rotateY(" + rotateY + ") ";
    }
    transform += "scale(" + x.scale + ", " + y.scale + ")";
    return !latestTransform && transform === identityProjection ? "" : transform;
}
/**
 * Take the calculated delta origin and apply it as a transform string.
 */
function buildLayoutProjectionTransformOrigin(_a) {
    var deltaFinal = _a.deltaFinal;
    return deltaFinal.x.origin * 100 + "% " + deltaFinal.y.origin * 100 + "% 0";
}
var identityProjection = buildLayoutProjectionTransform(zeroLayout.delta, zeroLayout.treeScale, { x: 1, y: 1 });

var names$1 = [
    "LayoutMeasure",
    "BeforeLayoutMeasure",
    "LayoutUpdate",
    "ViewportBoxUpdate",
    "Update",
    "Render",
    "AnimationComplete",
    "LayoutAnimationComplete",
    "AnimationStart",
    "SetAxisTarget",
    "Unmount",
];
function createLifecycles() {
    var managers = names$1.map(function () { return new SubscriptionManager(); });
    var propSubscriptions = {};
    var lifecycles = {
        clearAllListeners: function () { return managers.forEach(function (manager) { return manager.clear(); }); },
        updatePropListeners: function (props) {
            return names$1.forEach(function (name) {
                var _a;
                (_a = propSubscriptions[name]) === null || _a === void 0 ? void 0 : _a.call(propSubscriptions);
                var on = "on" + name;
                var propListener = props[on];
                if (propListener) {
                    propSubscriptions[name] = lifecycles[on](propListener);
                }
            });
        },
    };
    managers.forEach(function (manager, i) {
        lifecycles["on" + names$1[i]] = function (handler) { return manager.add(handler); };
        lifecycles["notify" + names$1[i]] = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return manager.notify.apply(manager, __spreadArray([], __read(args)));
        };
    });
    return lifecycles;
}

function updateMotionValuesFromProps(element, next, prev) {
    var _a;
    for (var key in next) {
        var nextValue = next[key];
        var prevValue = prev[key];
        if (isMotionValue(nextValue)) {
            /**
             * If this is a motion value found in props or style, we want to add it
             * to our visual element's motion value map.
             */
            element.addValue(key, nextValue);
        }
        else if (isMotionValue(prevValue)) {
            /**
             * If we're swapping to a new motion value, create a new motion value
             * from that
             */
            element.addValue(key, motionValue(nextValue));
        }
        else if (prevValue !== nextValue) {
            /**
             * If this is a flat value that has changed, update the motion value
             * or create one if it doesn't exist. We only want to do this if we're
             * not handling the value with our animation state.
             */
            if (element.hasValue(key)) {
                var existingValue = element.getValue(key);
                // TODO: Only update values that aren't being animated or even looked at
                !existingValue.hasAnimated && existingValue.set(nextValue);
            }
            else {
                element.addValue(key, motionValue((_a = element.getStaticValue(key)) !== null && _a !== void 0 ? _a : nextValue));
            }
        }
    }
    // Handle removed values
    for (var key in prev) {
        if (next[key] === undefined)
            element.removeValue(key);
    }
    return next;
}

function updateLayoutDeltas(_a, _b, treePath, transformOrigin) {
    var delta = _a.delta, layout = _a.layout, layoutCorrected = _a.layoutCorrected, treeScale = _a.treeScale;
    var target = _b.target;
    /**
     * Reset the corrected box with the latest values from box, as we're then going
     * to perform mutative operations on it.
     */
    resetBox(layoutCorrected, layout);
    /**
     * Apply all the parent deltas to this box to produce the corrected box. This
     * is the layout box, as it will appear on screen as a result of the transforms of its parents.
     */
    applyTreeDeltas(layoutCorrected, treeScale, treePath);
    /**
     * Update the delta between the corrected box and the target box before user-set transforms were applied.
     * This will allow us to calculate the corrected borderRadius and boxShadow to compensate
     * for our layout reprojection, but still allow them to be scaled correctly by the user.
     * It might be that to simplify this we may want to accept that user-set scale is also corrected
     * and we wouldn't have to keep and calc both deltas, OR we could support a user setting
     * to allow people to choose whether these styles are corrected based on just the
     * layout reprojection or the final bounding box.
     */
    updateBoxDelta(delta, layoutCorrected, target, transformOrigin);
}

var FlatTree = /** @class */ (function () {
    function FlatTree() {
        this.children = [];
        this.isDirty = false;
    }
    FlatTree.prototype.add = function (child) {
        addUniqueItem(this.children, child);
        this.isDirty = true;
    };
    FlatTree.prototype.remove = function (child) {
        removeItem(this.children, child);
        this.isDirty = true;
    };
    FlatTree.prototype.forEach = function (callback) {
        this.isDirty && this.children.sort(compareByDepth);
        this.isDirty = false;
        this.children.forEach(callback);
    };
    return FlatTree;
}());

function setCurrentViewportBox(visualElement) {
    var projectionParent = visualElement.getProjectionParent();
    if (!projectionParent) {
        visualElement.rebaseProjectionTarget();
        return;
    }
    var relativeOffset = calcRelativeOffset(projectionParent.getLayoutState().layout, visualElement.getLayoutState().layout);
    eachAxis(function (axis) {
        visualElement.setProjectionTargetAxis(axis, relativeOffset[axis].min, relativeOffset[axis].max, true);
    });
}

var visualElement = function (_a) {
    var _b = _a.treeType, treeType = _b === void 0 ? "" : _b, build = _a.build, getBaseTarget = _a.getBaseTarget, makeTargetAnimatable = _a.makeTargetAnimatable, measureViewportBox = _a.measureViewportBox, renderInstance = _a.render, readValueFromInstance = _a.readValueFromInstance, resetTransform = _a.resetTransform, restoreTransform = _a.restoreTransform, removeValueFromRenderState = _a.removeValueFromRenderState, sortNodePosition = _a.sortNodePosition, scrapeMotionValuesFromProps = _a.scrapeMotionValuesFromProps;
    return function (_a, options) {
        var parent = _a.parent, props = _a.props, presenceId = _a.presenceId, blockInitialAnimation = _a.blockInitialAnimation, visualState = _a.visualState;
        if (options === void 0) { options = {}; }
        var latestValues = visualState.latestValues, renderState = visualState.renderState;
        /**
         * The instance of the render-specific node that will be hydrated by the
         * exposed React ref. So for example, this visual element can host a
         * HTMLElement, plain object, or Three.js object. The functions provided
         * in VisualElementConfig allow us to interface with this instance.
         */
        var instance;
        /**
         * Manages the subscriptions for a visual element's lifecycle, for instance
         * onRender and onViewportBoxUpdate.
         */
        var lifecycles = createLifecycles();
        /**
         *
         */
        var projection = createProjectionState();
        /**
         * A reference to the nearest projecting parent. This is either
         * undefined if we haven't looked for the nearest projecting parent,
         * false if there is no parent performing layout projection, or a reference
         * to the projecting parent.
         */
        var projectionParent;
        /**
         * This is a reference to the visual state of the "lead" visual element.
         * Usually, this will be this visual element. But if it shares a layoutId
         * with other visual elements, only one of them will be designated lead by
         * AnimateSharedLayout. All the other visual elements will take on the visual
         * appearance of the lead while they crossfade to it.
         */
        var leadProjection = projection;
        var leadLatestValues = latestValues;
        var unsubscribeFromLeadVisualElement;
        /**
         * The latest layout measurements and calculated projections. This
         * is seperate from the target projection data in visualState as
         * many visual elements might point to the same piece of visualState as
         * a target, whereas they might each have different layouts and thus
         * projection calculations needed to project into the same viewport box.
         */
        var layoutState = createLayoutState();
        /**
         *
         */
        var crossfader;
        /**
         * Keep track of whether the viewport box has been updated since the
         * last time the layout projection was re-calculated.
         */
        var hasViewportBoxUpdated = false;
        /**
         * A map of all motion values attached to this visual element. Motion
         * values are source of truth for any given animated value. A motion
         * value might be provided externally by the component via props.
         */
        var values = new Map();
        /**
         * A map of every subscription that binds the provided or generated
         * motion values onChange listeners to this visual element.
         */
        var valueSubscriptions = new Map();
        /**
         * A reference to the previously-provided motion values as returned
         * from scrapeMotionValuesFromProps. We use the keys in here to determine
         * if any motion values need to be removed after props are updated.
         */
        var prevMotionValues = {};
        /**
         * x/y motion values that track the progress of initiated layout
         * animations.
         *
         * TODO: Target for removal
         */
        var projectionTargetProgress;
        /**
         * When values are removed from all animation props we need to search
         * for a fallback value to animate to. These values are tracked in baseTarget.
         */
        var baseTarget = __assign({}, latestValues);
        // Internal methods ========================
        /**
         * On mount, this will be hydrated with a callback to disconnect
         * this visual element from its parent on unmount.
         */
        var removeFromVariantTree;
        /**
         *
         */
        function render() {
            if (!instance)
                return;
            if (element.isProjectionReady()) {
                /**
                 * Apply the latest user-set transforms to the targetBox to produce the targetBoxFinal.
                 * This is the final box that we will then project into by calculating a transform delta and
                 * applying it to the corrected box.
                 */
                applyBoxTransforms(leadProjection.targetFinal, leadProjection.target, leadLatestValues);
                /**
                 * Update the delta between the corrected box and the final target box, after
                 * user-set transforms are applied to it. This will be used by the renderer to
                 * create a transform style that will reproject the element from its actual layout
                 * into the desired bounding box.
                 */
                updateBoxDelta(layoutState.deltaFinal, layoutState.layoutCorrected, leadProjection.targetFinal, latestValues);
            }
            triggerBuild();
            renderInstance(instance, renderState);
        }
        function triggerBuild() {
            var valuesToRender = latestValues;
            if (crossfader && crossfader.isActive()) {
                var crossfadedValues = crossfader.getCrossfadeState(element);
                if (crossfadedValues)
                    valuesToRender = crossfadedValues;
            }
            build(element, renderState, valuesToRender, leadProjection, layoutState, options, props);
        }
        function update() {
            lifecycles.notifyUpdate(latestValues);
        }
        function updateLayoutProjection() {
            if (!element.isProjectionReady())
                return;
            var delta = layoutState.delta, treeScale = layoutState.treeScale;
            var prevTreeScaleX = treeScale.x;
            var prevTreeScaleY = treeScale.y;
            var prevDeltaTransform = layoutState.deltaTransform;
            updateLayoutDeltas(layoutState, leadProjection, element.path, latestValues);
            hasViewportBoxUpdated &&
                element.notifyViewportBoxUpdate(leadProjection.target, delta);
            hasViewportBoxUpdated = false;
            var deltaTransform = buildLayoutProjectionTransform(delta, treeScale);
            if (deltaTransform !== prevDeltaTransform ||
                // Also compare calculated treeScale, for values that rely on this only for scale correction
                prevTreeScaleX !== treeScale.x ||
                prevTreeScaleY !== treeScale.y) {
                element.scheduleRender();
            }
            layoutState.deltaTransform = deltaTransform;
        }
        function updateTreeLayoutProjection() {
            element.layoutTree.forEach(fireUpdateLayoutProjection);
        }
        /**
         *
         */
        function bindToMotionValue(key, value) {
            var removeOnChange = value.onChange(function (latestValue) {
                latestValues[key] = latestValue;
                props.onUpdate && sync.update(update, false, true);
            });
            var removeOnRenderRequest = value.onRenderRequest(element.scheduleRender);
            valueSubscriptions.set(key, function () {
                removeOnChange();
                removeOnRenderRequest();
            });
        }
        /**
         * Any motion values that are provided to the element when created
         * aren't yet bound to the element, as this would technically be impure.
         * However, we iterate through the motion values and set them to the
         * initial values for this component.
         *
         * TODO: This is impure and we should look at changing this to run on mount.
         * Doing so will break some tests but this isn't neccessarily a breaking change,
         * more a reflection of the test.
         */
        var initialMotionValues = scrapeMotionValuesFromProps(props);
        for (var key in initialMotionValues) {
            var value = initialMotionValues[key];
            if (latestValues[key] !== undefined && isMotionValue(value)) {
                value.set(latestValues[key], false);
            }
        }
        /**
         * Determine what role this visual element should take in the variant tree.
         */
        var isControllingVariants = checkIfControllingVariants(props);
        var isVariantNode = checkIfVariantNode(props);
        var element = __assign(__assign({ treeType: treeType, 
            /**
             * This is a mirror of the internal instance prop, which keeps
             * VisualElement type-compatible with React's RefObject.
             */
            current: null, 
            /**
             * The depth of this visual element within the visual element tree.
             */
            depth: parent ? parent.depth + 1 : 0, parent: parent, children: new Set(), 
            /**
             * An ancestor path back to the root visual element. This is used
             * by layout projection to quickly recurse back up the tree.
             */
            path: parent ? __spreadArray(__spreadArray([], __read(parent.path)), [parent]) : [], layoutTree: parent ? parent.layoutTree : new FlatTree(), 
            /**
             *
             */
            presenceId: presenceId,
            projection: projection, 
            /**
             * If this component is part of the variant tree, it should track
             * any children that are also part of the tree. This is essentially
             * a shadow tree to simplify logic around how to stagger over children.
             */
            variantChildren: isVariantNode ? new Set() : undefined, 
            /**
             * Whether this instance is visible. This can be changed imperatively
             * by AnimateSharedLayout, is analogous to CSS's visibility in that
             * hidden elements should take up layout, and needs enacting by the configured
             * render function.
             */
            isVisible: undefined, 
            /**
             * Normally, if a component is controlled by a parent's variants, it can
             * rely on that ancestor to trigger animations further down the tree.
             * However, if a component is created after its parent is mounted, the parent
             * won't trigger that mount animation so the child needs to.
             *
             * TODO: This might be better replaced with a method isParentMounted
             */
            manuallyAnimateOnMount: Boolean(parent === null || parent === void 0 ? void 0 : parent.isMounted()), 
            /**
             * This can be set by AnimatePresence to force components that mount
             * at the same time as it to mount as if they have initial={false} set.
             */
            blockInitialAnimation: blockInitialAnimation, 
            /**
             * Determine whether this component has mounted yet. This is mostly used
             * by variant children to determine whether they need to trigger their
             * own animations on mount.
             */
            isMounted: function () { return Boolean(instance); }, mount: function (newInstance) {
                instance = element.current = newInstance;
                element.pointTo(element);
                if (isVariantNode && parent && !isControllingVariants) {
                    removeFromVariantTree = parent === null || parent === void 0 ? void 0 : parent.addVariantChild(element);
                }
                parent === null || parent === void 0 ? void 0 : parent.children.add(element);
            },
            /**
             *
             */
            unmount: function () {
                cancelSync.update(update);
                cancelSync.render(render);
                cancelSync.preRender(element.updateLayoutProjection);
                valueSubscriptions.forEach(function (remove) { return remove(); });
                element.stopLayoutAnimation();
                element.layoutTree.remove(element);
                removeFromVariantTree === null || removeFromVariantTree === void 0 ? void 0 : removeFromVariantTree();
                parent === null || parent === void 0 ? void 0 : parent.children.delete(element);
                unsubscribeFromLeadVisualElement === null || unsubscribeFromLeadVisualElement === void 0 ? void 0 : unsubscribeFromLeadVisualElement();
                lifecycles.clearAllListeners();
            },
            /**
             * Add a child visual element to our set of children.
             */
            addVariantChild: function (child) {
                var _a;
                var closestVariantNode = element.getClosestVariantNode();
                if (closestVariantNode) {
                    (_a = closestVariantNode.variantChildren) === null || _a === void 0 ? void 0 : _a.add(child);
                    return function () { return closestVariantNode.variantChildren.delete(child); };
                }
            },
            sortNodePosition: function (other) {
                /**
                 * If these nodes aren't even of the same type we can't compare their depth.
                 */
                if (!sortNodePosition || treeType !== other.treeType)
                    return 0;
                return sortNodePosition(element.getInstance(), other.getInstance());
            }, 
            /**
             * Returns the closest variant node in the tree starting from
             * this visual element.
             */
            getClosestVariantNode: function () {
                return isVariantNode ? element : parent === null || parent === void 0 ? void 0 : parent.getClosestVariantNode();
            }, 
            /**
             * A method that schedules an update to layout projections throughout
             * the tree. We inherit from the parent so there's only ever one
             * job scheduled on the next frame - that of the root visual element.
             */
            scheduleUpdateLayoutProjection: parent
                ? parent.scheduleUpdateLayoutProjection
                : function () {
                    return sync.preRender(element.updateTreeLayoutProjection, false, true);
                }, 
            /**
             * Expose the latest layoutId prop.
             */
            getLayoutId: function () { return props.layoutId; }, 
            /**
             * Returns the current instance.
             */
            getInstance: function () { return instance; }, 
            /**
             * Get/set the latest static values.
             */
            getStaticValue: function (key) { return latestValues[key]; }, setStaticValue: function (key, value) { return (latestValues[key] = value); }, 
            /**
             * Returns the latest motion value state. Currently only used to take
             * a snapshot of the visual element - perhaps this can return the whole
             * visual state
             */
            getLatestValues: function () { return latestValues; }, 
            /**
             * Set the visiblity of the visual element. If it's changed, schedule
             * a render to reflect these changes.
             */
            setVisibility: function (visibility) {
                if (element.isVisible === visibility)
                    return;
                element.isVisible = visibility;
                element.scheduleRender();
            },
            /**
             * Make a target animatable by Popmotion. For instance, if we're
             * trying to animate width from 100px to 100vw we need to measure 100vw
             * in pixels to determine what we really need to animate to. This is also
             * pluggable to support Framer's custom value types like Color,
             * and CSS variables.
             */
            makeTargetAnimatable: function (target, canMutate) {
                if (canMutate === void 0) { canMutate = true; }
                return makeTargetAnimatable(element, target, props, canMutate);
            },
            // Motion values ========================
            /**
             * Add a motion value and bind it to this visual element.
             */
            addValue: function (key, value) {
                // Remove existing value if it exists
                if (element.hasValue(key))
                    element.removeValue(key);
                values.set(key, value);
                latestValues[key] = value.get();
                bindToMotionValue(key, value);
            },
            /**
             * Remove a motion value and unbind any active subscriptions.
             */
            removeValue: function (key) {
                var _a;
                values.delete(key);
                (_a = valueSubscriptions.get(key)) === null || _a === void 0 ? void 0 : _a();
                valueSubscriptions.delete(key);
                delete latestValues[key];
                removeValueFromRenderState(key, renderState);
            }, 
            /**
             * Check whether we have a motion value for this key
             */
            hasValue: function (key) { return values.has(key); }, 
            /**
             * Get a motion value for this key. If called with a default
             * value, we'll create one if none exists.
             */
            getValue: function (key, defaultValue) {
                var value = values.get(key);
                if (value === undefined && defaultValue !== undefined) {
                    value = motionValue(defaultValue);
                    element.addValue(key, value);
                }
                return value;
            }, 
            /**
             * Iterate over our motion values.
             */
            forEachValue: function (callback) { return values.forEach(callback); }, 
            /**
             * If we're trying to animate to a previously unencountered value,
             * we need to check for it in our state and as a last resort read it
             * directly from the instance (which might have performance implications).
             */
            readValue: function (key) { var _a; return (_a = latestValues[key]) !== null && _a !== void 0 ? _a : readValueFromInstance(instance, key, options); }, 
            /**
             * Set the base target to later animate back to. This is currently
             * only hydrated on creation and when we first read a value.
             */
            setBaseTarget: function (key, value) {
                baseTarget[key] = value;
            },
            /**
             * Find the base target for a value thats been removed from all animation
             * props.
             */
            getBaseTarget: function (key) {
                if (getBaseTarget) {
                    var target = getBaseTarget(props, key);
                    if (target !== undefined && !isMotionValue(target))
                        return target;
                }
                return baseTarget[key];
            } }, lifecycles), { 
            /**
             * Build the renderer state based on the latest visual state.
             */
            build: function () {
                triggerBuild();
                return renderState;
            },
            /**
             * Schedule a render on the next animation frame.
             */
            scheduleRender: function () {
                sync.render(render, false, true);
            }, 
            /**
             * Synchronously fire render. It's prefered that we batch renders but
             * in many circumstances, like layout measurement, we need to run this
             * synchronously. However in those instances other measures should be taken
             * to batch reads/writes.
             */
            syncRender: render, 
            /**
             * Update the provided props. Ensure any newly-added motion values are
             * added to our map, old ones removed, and listeners updated.
             */
            setProps: function (newProps) {
                props = newProps;
                lifecycles.updatePropListeners(newProps);
                prevMotionValues = updateMotionValuesFromProps(element, scrapeMotionValuesFromProps(props), prevMotionValues);
            }, getProps: function () { return props; }, 
            // Variants ==============================
            /**
             * Returns the variant definition with a given name.
             */
            getVariant: function (name) { var _a; return (_a = props.variants) === null || _a === void 0 ? void 0 : _a[name]; }, 
            /**
             * Returns the defined default transition on this component.
             */
            getDefaultTransition: function () { return props.transition; }, 
            /**
             * Used by child variant nodes to get the closest ancestor variant props.
             */
            getVariantContext: function (startAtParent) {
                if (startAtParent === void 0) { startAtParent = false; }
                if (startAtParent)
                    return parent === null || parent === void 0 ? void 0 : parent.getVariantContext();
                if (!isControllingVariants) {
                    var context_1 = (parent === null || parent === void 0 ? void 0 : parent.getVariantContext()) || {};
                    if (props.initial !== undefined) {
                        context_1.initial = props.initial;
                    }
                    return context_1;
                }
                var context = {};
                for (var i = 0; i < numVariantProps; i++) {
                    var name_1 = variantProps[i];
                    var prop = props[name_1];
                    if (isVariantLabel(prop) || prop === false) {
                        context[name_1] = prop;
                    }
                }
                return context;
            },
            // Layout projection ==============================
            /**
             * Enable layout projection for this visual element. Won't actually
             * occur until we also have hydrated layout measurements.
             */
            enableLayoutProjection: function () {
                projection.isEnabled = true;
                element.layoutTree.add(element);
            },
            /**
             * Lock the projection target, for instance when dragging, so
             * nothing else can try and animate it.
             */
            lockProjectionTarget: function () {
                projection.isTargetLocked = true;
            },
            unlockProjectionTarget: function () {
                element.stopLayoutAnimation();
                projection.isTargetLocked = false;
            }, getLayoutState: function () { return layoutState; }, setCrossfader: function (newCrossfader) {
                crossfader = newCrossfader;
            }, isProjectionReady: function () {
                return projection.isEnabled &&
                    projection.isHydrated &&
                    layoutState.isHydrated;
            }, 
            /**
             * Start a layout animation on a given axis.
             */
            startLayoutAnimation: function (axis, transition, isRelative) {
                if (isRelative === void 0) { isRelative = false; }
                var progress = element.getProjectionAnimationProgress()[axis];
                var _a = isRelative
                    ? projection.relativeTarget[axis]
                    : projection.target[axis], min = _a.min, max = _a.max;
                var length = max - min;
                progress.clearListeners();
                progress.set(min);
                progress.set(min); // Set twice to hard-reset velocity
                progress.onChange(function (v) {
                    element.setProjectionTargetAxis(axis, v, v + length, isRelative);
                });
                return element.animateMotionValue(axis, progress, 0, transition);
            },
            /**
             * Stop layout animations.
             */
            stopLayoutAnimation: function () {
                eachAxis(function (axis) {
                    return element.getProjectionAnimationProgress()[axis].stop();
                });
            },
            /**
             * Measure the current viewport box with or without transforms.
             * Only measures axis-aligned boxes, rotate and skew must be manually
             * removed with a re-render to work.
             */
            measureViewportBox: function (withTransform) {
                if (withTransform === void 0) { withTransform = true; }
                var viewportBox = measureViewportBox(instance, options);
                if (!withTransform)
                    removeBoxTransforms(viewportBox, latestValues);
                return viewportBox;
            },
            /**
             * Get the motion values tracking the layout animations on each
             * axis. Lazy init if not already created.
             */
            getProjectionAnimationProgress: function () {
                projectionTargetProgress || (projectionTargetProgress = {
                    x: motionValue(0),
                    y: motionValue(0),
                });
                return projectionTargetProgress;
            },
            /**
             * Update the projection of a single axis. Schedule an update to
             * the tree layout projection.
             */
            setProjectionTargetAxis: function (axis, min, max, isRelative) {
                if (isRelative === void 0) { isRelative = false; }
                var target;
                if (isRelative) {
                    if (!projection.relativeTarget) {
                        projection.relativeTarget = axisBox();
                    }
                    target = projection.relativeTarget[axis];
                }
                else {
                    projection.relativeTarget = undefined;
                    target = projection.target[axis];
                }
                projection.isHydrated = true;
                target.min = min;
                target.max = max;
                // Flag that we want to fire the onViewportBoxUpdate event handler
                hasViewportBoxUpdated = true;
                lifecycles.notifySetAxisTarget();
            },
            /**
             * Rebase the projection target on top of the provided viewport box
             * or the measured layout. This ensures that non-animating elements
             * don't fall out of sync differences in measurements vs projections
             * after a page scroll or other relayout.
             */
            rebaseProjectionTarget: function (force, box) {
                if (box === void 0) { box = layoutState.layout; }
                var _a = element.getProjectionAnimationProgress(), x = _a.x, y = _a.y;
                var shouldRebase = !projection.relativeTarget &&
                    !projection.isTargetLocked &&
                    !x.isAnimating() &&
                    !y.isAnimating();
                if (force || shouldRebase) {
                    eachAxis(function (axis) {
                        var _a = box[axis], min = _a.min, max = _a.max;
                        element.setProjectionTargetAxis(axis, min, max);
                    });
                }
            },
            /**
             * Notify the visual element that its layout is up-to-date.
             * Currently Animate.tsx uses this to check whether a layout animation
             * needs to be performed.
             */
            notifyLayoutReady: function (config) {
                setCurrentViewportBox(element);
                element.notifyLayoutUpdate(layoutState.layout, element.prevViewportBox || layoutState.layout, config);
            }, 
            /**
             * Temporarily reset the transform of the instance.
             */
            resetTransform: function () { return resetTransform(element, instance, props); }, restoreTransform: function () { return restoreTransform(instance, renderState); }, updateLayoutProjection: updateLayoutProjection,
            updateTreeLayoutProjection: function () {
                element.layoutTree.forEach(fireResolveRelativeTargetBox);
                /**
                 * Schedule the projection updates at the end of the current preRender
                 * step. This will ensure that all layout trees will first resolve
                 * relative projection boxes into viewport boxes, and *then*
                 * update projections.
                 */
                sync.preRender(updateTreeLayoutProjection, false, true);
                // sync.postRender(() => element.scheduleUpdateLayoutProjection())
            },
            getProjectionParent: function () {
                if (projectionParent === undefined) {
                    var foundParent = false;
                    // Search backwards through the tree path
                    for (var i = element.path.length - 1; i >= 0; i--) {
                        var ancestor = element.path[i];
                        if (ancestor.projection.isEnabled) {
                            foundParent = ancestor;
                            break;
                        }
                    }
                    projectionParent = foundParent;
                }
                return projectionParent;
            },
            resolveRelativeTargetBox: function () {
                var relativeParent = element.getProjectionParent();
                if (!projection.relativeTarget || !relativeParent)
                    return;
                calcRelativeBox(projection, relativeParent.projection);
                if (isDraggable(relativeParent)) {
                    var target = projection.target;
                    applyBoxTransforms(target, target, relativeParent.getLatestValues());
                }
            },
            shouldResetTransform: function () {
                return Boolean(props._layoutResetTransform);
            },
            /**
             *
             */
            pointTo: function (newLead) {
                leadProjection = newLead.projection;
                leadLatestValues = newLead.getLatestValues();
                /**
                 * Subscribe to lead component's layout animations
                 */
                unsubscribeFromLeadVisualElement === null || unsubscribeFromLeadVisualElement === void 0 ? void 0 : unsubscribeFromLeadVisualElement();
                unsubscribeFromLeadVisualElement = pipe(newLead.onSetAxisTarget(element.scheduleUpdateLayoutProjection), newLead.onLayoutAnimationComplete(function () {
                    var _a;
                    if (element.isPresent) {
                        element.presence = Presence.Present;
                    }
                    else {
                        (_a = element.layoutSafeToRemove) === null || _a === void 0 ? void 0 : _a.call(element);
                    }
                }));
            }, 
            // TODO: Clean this up
            isPresent: true, presence: Presence.Entering });
        return element;
    };
};
function fireResolveRelativeTargetBox(child) {
    child.resolveRelativeTargetBox();
}
function fireUpdateLayoutProjection(child) {
    child.updateLayoutProjection();
}
var variantProps = __spreadArray(["initial"], __read(variantPriorityOrder));
var numVariantProps = variantProps.length;

var positionalKeys = new Set([
    "width",
    "height",
    "top",
    "left",
    "right",
    "bottom",
    "x",
    "y",
]);
var isPositionalKey = function (key) { return positionalKeys.has(key); };
var hasPositionalKey = function (target) {
    return Object.keys(target).some(isPositionalKey);
};
var setAndResetVelocity = function (value, to) {
    // Looks odd but setting it twice doesn't render, it'll just
    // set both prev and current to the latest value
    value.set(to, false);
    value.set(to);
};
var isNumOrPxType = function (v) {
    return v === number || v === px;
};
var BoundingBoxDimension;
(function (BoundingBoxDimension) {
    BoundingBoxDimension["width"] = "width";
    BoundingBoxDimension["height"] = "height";
    BoundingBoxDimension["left"] = "left";
    BoundingBoxDimension["right"] = "right";
    BoundingBoxDimension["top"] = "top";
    BoundingBoxDimension["bottom"] = "bottom";
})(BoundingBoxDimension || (BoundingBoxDimension = {}));
var getPosFromMatrix = function (matrix, pos) {
    return parseFloat(matrix.split(", ")[pos]);
};
var getTranslateFromMatrix = function (pos2, pos3) { return function (_bbox, _a) {
    var transform = _a.transform;
    if (transform === "none" || !transform)
        return 0;
    var matrix3d = transform.match(/^matrix3d\((.+)\)$/);
    if (matrix3d) {
        return getPosFromMatrix(matrix3d[1], pos3);
    }
    else {
        var matrix = transform.match(/^matrix\((.+)\)$/);
        if (matrix) {
            return getPosFromMatrix(matrix[1], pos2);
        }
        else {
            return 0;
        }
    }
}; };
var transformKeys = new Set(["x", "y", "z"]);
var nonTranslationalTransformKeys = transformProps.filter(function (key) { return !transformKeys.has(key); });
function removeNonTranslationalTransform(visualElement) {
    var removedTransforms = [];
    nonTranslationalTransformKeys.forEach(function (key) {
        var value = visualElement.getValue(key);
        if (value !== undefined) {
            removedTransforms.push([key, value.get()]);
            value.set(key.startsWith("scale") ? 1 : 0);
        }
    });
    // Apply changes to element before measurement
    if (removedTransforms.length)
        visualElement.syncRender();
    return removedTransforms;
}
var positionalValues = {
    // Dimensions
    width: function (_a) {
        var x = _a.x;
        return x.max - x.min;
    },
    height: function (_a) {
        var y = _a.y;
        return y.max - y.min;
    },
    top: function (_bbox, _a) {
        var top = _a.top;
        return parseFloat(top);
    },
    left: function (_bbox, _a) {
        var left = _a.left;
        return parseFloat(left);
    },
    bottom: function (_a, _b) {
        var y = _a.y;
        var top = _b.top;
        return parseFloat(top) + (y.max - y.min);
    },
    right: function (_a, _b) {
        var x = _a.x;
        var left = _b.left;
        return parseFloat(left) + (x.max - x.min);
    },
    // Transform
    x: getTranslateFromMatrix(4, 13),
    y: getTranslateFromMatrix(5, 14),
};
var convertChangedValueTypes = function (target, visualElement, changedKeys) {
    var originBbox = visualElement.measureViewportBox();
    var element = visualElement.getInstance();
    var elementComputedStyle = getComputedStyle(element);
    var display = elementComputedStyle.display, top = elementComputedStyle.top, left = elementComputedStyle.left, bottom = elementComputedStyle.bottom, right = elementComputedStyle.right, transform = elementComputedStyle.transform;
    var originComputedStyle = { top: top, left: left, bottom: bottom, right: right, transform: transform };
    // If the element is currently set to display: "none", make it visible before
    // measuring the target bounding box
    if (display === "none") {
        visualElement.setStaticValue("display", target.display || "block");
    }
    // Apply the latest values (as set in checkAndConvertChangedValueTypes)
    visualElement.syncRender();
    var targetBbox = visualElement.measureViewportBox();
    changedKeys.forEach(function (key) {
        // Restore styles to their **calculated computed style**, not their actual
        // originally set style. This allows us to animate between equivalent pixel units.
        var value = visualElement.getValue(key);
        setAndResetVelocity(value, positionalValues[key](originBbox, originComputedStyle));
        target[key] = positionalValues[key](targetBbox, elementComputedStyle);
    });
    return target;
};
var checkAndConvertChangedValueTypes = function (visualElement, target, origin, transitionEnd) {
    if (origin === void 0) { origin = {}; }
    if (transitionEnd === void 0) { transitionEnd = {}; }
    target = __assign({}, target);
    transitionEnd = __assign({}, transitionEnd);
    var targetPositionalKeys = Object.keys(target).filter(isPositionalKey);
    // We want to remove any transform values that could affect the element's bounding box before
    // it's measured. We'll reapply these later.
    var removedTransformValues = [];
    var hasAttemptedToRemoveTransformValues = false;
    var changedValueTypeKeys = [];
    targetPositionalKeys.forEach(function (key) {
        var value = visualElement.getValue(key);
        if (!visualElement.hasValue(key))
            return;
        var from = origin[key];
        var to = target[key];
        var fromType = findDimensionValueType(from);
        var toType;
        // TODO: The current implementation of this basically throws an error
        // if you try and do value conversion via keyframes. There's probably
        // a way of doing this but the performance implications would need greater scrutiny,
        // as it'd be doing multiple resize-remeasure operations.
        if (isKeyframesTarget(to)) {
            var numKeyframes = to.length;
            for (var i = to[0] === null ? 1 : 0; i < numKeyframes; i++) {
                if (!toType) {
                    toType = findDimensionValueType(to[i]);
                }
                else {
                    invariant(findDimensionValueType(to[i]) === toType);
                }
            }
        }
        else {
            toType = findDimensionValueType(to);
        }
        if (fromType !== toType) {
            // If they're both just number or px, convert them both to numbers rather than
            // relying on resize/remeasure to convert (which is wasteful in this situation)
            if (isNumOrPxType(fromType) && isNumOrPxType(toType)) {
                var current = value.get();
                if (typeof current === "string") {
                    value.set(parseFloat(current));
                }
                if (typeof to === "string") {
                    target[key] = parseFloat(to);
                }
                else if (Array.isArray(to) && toType === px) {
                    target[key] = to.map(parseFloat);
                }
            }
            else if ((fromType === null || fromType === void 0 ? void 0 : fromType.transform) &&
                (toType === null || toType === void 0 ? void 0 : toType.transform) &&
                (from === 0 || to === 0)) {
                // If one or the other value is 0, it's safe to coerce it to the
                // type of the other without measurement
                if (from === 0) {
                    value.set(toType.transform(from));
                }
                else {
                    target[key] = fromType.transform(to);
                }
            }
            else {
                // If we're going to do value conversion via DOM measurements, we first
                // need to remove non-positional transform values that could affect the bbox measurements.
                if (!hasAttemptedToRemoveTransformValues) {
                    removedTransformValues = removeNonTranslationalTransform(visualElement);
                    hasAttemptedToRemoveTransformValues = true;
                }
                changedValueTypeKeys.push(key);
                transitionEnd[key] =
                    transitionEnd[key] !== undefined
                        ? transitionEnd[key]
                        : target[key];
                setAndResetVelocity(value, to);
            }
        }
    });
    if (changedValueTypeKeys.length) {
        var convertedTarget = convertChangedValueTypes(target, visualElement, changedValueTypeKeys);
        // If we removed transform values, reapply them before the next render
        if (removedTransformValues.length) {
            removedTransformValues.forEach(function (_a) {
                var _b = __read(_a, 2), key = _b[0], value = _b[1];
                visualElement.getValue(key).set(value);
            });
        }
        // Reapply original values
        visualElement.syncRender();
        return { target: convertedTarget, transitionEnd: transitionEnd };
    }
    else {
        return { target: target, transitionEnd: transitionEnd };
    }
};
/**
 * Convert value types for x/y/width/height/top/left/bottom/right
 *
 * Allows animation between `'auto'` -> `'100%'` or `0` -> `'calc(50% - 10vw)'`
 *
 * @internal
 */
function unitConversion(visualElement, target, origin, transitionEnd) {
    return hasPositionalKey(target)
        ? checkAndConvertChangedValueTypes(visualElement, target, origin, transitionEnd)
        : { target: target, transitionEnd: transitionEnd };
}

/**
 * Parse a DOM variant to make it animatable. This involves resolving CSS variables
 * and ensuring animations like "20%" => "calc(50vw)" are performed in pixels.
 */
var parseDomVariant = function (visualElement, target, origin, transitionEnd) {
    var resolved = resolveCSSVariables(visualElement, target, transitionEnd);
    target = resolved.target;
    transitionEnd = resolved.transitionEnd;
    return unitConversion(visualElement, target, origin, transitionEnd);
};

function getComputedStyle$1(element) {
    return window.getComputedStyle(element);
}
var htmlConfig = {
    treeType: "dom",
    readValueFromInstance: function (domElement, key) {
        if (isTransformProp(key)) {
            var defaultType = getDefaultValueType(key);
            return defaultType ? defaultType.default || 0 : 0;
        }
        else {
            var computedStyle = getComputedStyle$1(domElement);
            return ((isCSSVariable(key)
                ? computedStyle.getPropertyValue(key)
                : computedStyle[key]) || 0);
        }
    },
    sortNodePosition: function (a, b) {
        /**
         * compareDocumentPosition returns a bitmask, by using the bitwise &
         * we're returning true if 2 in that bitmask is set to true. 2 is set
         * to true if b preceeds a.
         */
        return a.compareDocumentPosition(b) & 2 ? 1 : -1;
    },
    getBaseTarget: function (props, key) {
        var _a;
        return (_a = props.style) === null || _a === void 0 ? void 0 : _a[key];
    },
    measureViewportBox: function (element, _a) {
        var transformPagePoint = _a.transformPagePoint;
        return getBoundingBox(element, transformPagePoint);
    },
    /**
     * Reset the transform on the current Element. This is called as part
     * of a batched process across the entire layout tree. To remove this write
     * cycle it'd be interesting to see if it's possible to "undo" all the current
     * layout transforms up the tree in the same way this.getBoundingBoxWithoutTransforms
     * works
     */
    resetTransform: function (element, domElement, props) {
        var transformTemplate = props.transformTemplate;
        domElement.style.transform = transformTemplate
            ? transformTemplate({}, "")
            : "none";
        // Ensure that whatever happens next, we restore our transform on the next frame
        element.scheduleRender();
    },
    restoreTransform: function (instance, mutableState) {
        instance.style.transform = mutableState.style.transform;
    },
    removeValueFromRenderState: function (key, _a) {
        var vars = _a.vars, style = _a.style;
        delete vars[key];
        delete style[key];
    },
    /**
     * Ensure that HTML and Framer-specific value types like `px`->`%` and `Color`
     * can be animated by Motion.
     */
    makeTargetAnimatable: function (element, _a, _b, isMounted) {
        var transformValues = _b.transformValues;
        if (isMounted === void 0) { isMounted = true; }
        var transition = _a.transition, transitionEnd = _a.transitionEnd, target = __rest(_a, ["transition", "transitionEnd"]);
        var origin = getOrigin(target, transition || {}, element);
        /**
         * If Framer has provided a function to convert `Color` etc value types, convert them
         */
        if (transformValues) {
            if (transitionEnd)
                transitionEnd = transformValues(transitionEnd);
            if (target)
                target = transformValues(target);
            if (origin)
                origin = transformValues(origin);
        }
        if (isMounted) {
            checkTargetForNewValues(element, target, origin);
            var parsed = parseDomVariant(element, target, origin, transitionEnd);
            transitionEnd = parsed.transitionEnd;
            target = parsed.target;
        }
        return __assign({ transition: transition,
            transitionEnd: transitionEnd }, target);
    },
    scrapeMotionValuesFromProps: scrapeMotionValuesFromProps,
    build: function (element, renderState, latestValues, projection, layoutState, options, props) {
        if (element.isVisible !== undefined) {
            renderState.style.visibility = element.isVisible
                ? "visible"
                : "hidden";
        }
        var isProjectionTranform = projection.isEnabled && layoutState.isHydrated;
        buildHTMLStyles(renderState, latestValues, projection, layoutState, options, props.transformTemplate, isProjectionTranform ? buildLayoutProjectionTransform : undefined, isProjectionTranform
            ? buildLayoutProjectionTransformOrigin
            : undefined);
    },
    render: renderHTML,
};
var htmlVisualElement = visualElement(htmlConfig);

var svgVisualElement = visualElement(__assign(__assign({}, htmlConfig), { getBaseTarget: function (props, key) {
        return props[key];
    },
    readValueFromInstance: function (domElement, key) {
        var _a;
        if (isTransformProp(key)) {
            return ((_a = getDefaultValueType(key)) === null || _a === void 0 ? void 0 : _a.default) || 0;
        }
        key = !camelCaseAttributes.has(key) ? camelToDash(key) : key;
        return domElement.getAttribute(key);
    },
    scrapeMotionValuesFromProps: scrapeMotionValuesFromProps$1,
    build: function (_element, renderState, latestValues, projection, layoutState, options, props) {
        var isProjectionTranform = projection.isEnabled && layoutState.isHydrated;
        buildSVGAttrs(renderState, latestValues, projection, layoutState, options, props.transformTemplate, isProjectionTranform ? buildLayoutProjectionTransform : undefined, isProjectionTranform
            ? buildLayoutProjectionTransformOrigin
            : undefined);
    }, render: renderSVG }));

var createDomVisualElement = function (Component, options) {
    return isSVGComponent(Component)
        ? svgVisualElement(options, { enableHardwareAcceleration: false })
        : htmlVisualElement(options, { enableHardwareAcceleration: true });
};

var featureBundle = __assign(__assign(__assign(__assign({}, animations), gestureAnimations), drag), layoutAnimations);
/**
 * HTML & SVG components, optimised for use with gestures and animation. These can be used as
 * drop-in replacements for any HTML & SVG component, all CSS & SVG properties are supported.
 *
 * @public
 */
var motion = /*@__PURE__*/ createMotionProxy(function (Component, config) {
    return createDomMotionConfig(Component, config, featureBundle, createDomVisualElement);
});

function useForceUpdate() {
    var unloadingRef = react.useRef(false);
    var _a = __read(react.useState(0), 2), forcedRenderCount = _a[0], setForcedRenderCount = _a[1];
    useUnmountEffect(function () { return (unloadingRef.current = true); });
    return react.useCallback(function () {
        !unloadingRef.current && setForcedRenderCount(forcedRenderCount + 1);
    }, [forcedRenderCount]);
}

var presenceId = 0;
function getPresenceId() {
    var id = presenceId;
    presenceId++;
    return id;
}
var PresenceChild = function (_a) {
    var children = _a.children, initial = _a.initial, isPresent = _a.isPresent, onExitComplete = _a.onExitComplete, custom = _a.custom, presenceAffectsLayout = _a.presenceAffectsLayout;
    var presenceChildren = useConstant(newChildrenMap);
    var id = useConstant(getPresenceId);
    var context = react.useMemo(function () { return ({
        id: id,
        initial: initial,
        isPresent: isPresent,
        custom: custom,
        onExitComplete: function (childId) {
            presenceChildren.set(childId, true);
            var allComplete = true;
            presenceChildren.forEach(function (isComplete) {
                if (!isComplete)
                    allComplete = false;
            });
            allComplete && (onExitComplete === null || onExitComplete === void 0 ? void 0 : onExitComplete());
        },
        register: function (childId) {
            presenceChildren.set(childId, false);
            return function () { return presenceChildren.delete(childId); };
        },
    }); }, 
    /**
     * If the presence of a child affects the layout of the components around it,
     * we want to make a new context value to ensure they get re-rendered
     * so they can detect that layout change.
     */
    presenceAffectsLayout ? undefined : [isPresent]);
    react.useMemo(function () {
        presenceChildren.forEach(function (_, key) { return presenceChildren.set(key, false); });
    }, [isPresent]);
    /**
     * If there's no `motion` components to fire exit animations, we want to remove this
     * component immediately.
     */
    react.useEffect(function () {
        !isPresent && !presenceChildren.size && (onExitComplete === null || onExitComplete === void 0 ? void 0 : onExitComplete());
    }, [isPresent]);
    return (react.createElement(PresenceContext.Provider, { value: context }, children));
};
function newChildrenMap() {
    return new Map();
}

function getChildKey(child) {
    return child.key || "";
}
function updateChildLookup(children, allChildren) {
    children.forEach(function (child) {
        var key = getChildKey(child);
        allChildren.set(key, child);
    });
}
function onlyElements(children) {
    var filtered = [];
    // We use forEach here instead of map as map mutates the component key by preprending `.$`
    react.Children.forEach(children, function (child) {
        if (react.isValidElement(child))
            filtered.push(child);
    });
    return filtered;
}
/**
 * `AnimatePresence` enables the animation of components that have been removed from the tree.
 *
 * When adding/removing more than a single child, every child **must** be given a unique `key` prop.
 *
 * @library
 *
 * Any `Frame` components that have an `exit` property defined will animate out when removed from
 * the tree.
 *
 * ```jsx
 * import { Frame, AnimatePresence } from 'framer'
 *
 * // As items are added and removed from `items`
 * export function Items({ items }) {
 *   return (
 *     <AnimatePresence>
 *       {items.map(item => (
 *         <Frame
 *           key={item.id}
 *           initial={{ opacity: 0 }}
 *           animate={{ opacity: 1 }}
 *           exit={{ opacity: 0 }}
 *         />
 *       ))}
 *     </AnimatePresence>
 *   )
 * }
 * ```
 *
 * You can sequence exit animations throughout a tree using variants.
 *
 * @motion
 *
 * Any `motion` components that have an `exit` property defined will animate out when removed from
 * the tree.
 *
 * ```jsx
 * import { motion, AnimatePresence } from 'framer-motion'
 *
 * export const Items = ({ items }) => (
 *   <AnimatePresence>
 *     {items.map(item => (
 *       <motion.div
 *         key={item.id}
 *         initial={{ opacity: 0 }}
 *         animate={{ opacity: 1 }}
 *         exit={{ opacity: 0 }}
 *       />
 *     ))}
 *   </AnimatePresence>
 * )
 * ```
 *
 * You can sequence exit animations throughout a tree using variants.
 *
 * If a child contains multiple `motion` components with `exit` props, it will only unmount the child
 * once all `motion` components have finished animating out. Likewise, any components using
 * `usePresence` all need to call `safeToRemove`.
 *
 * @public
 */
var AnimatePresence = function (_a) {
    var children = _a.children, custom = _a.custom, _b = _a.initial, initial = _b === void 0 ? true : _b, onExitComplete = _a.onExitComplete, exitBeforeEnter = _a.exitBeforeEnter, _c = _a.presenceAffectsLayout, presenceAffectsLayout = _c === void 0 ? true : _c;
    // We want to force a re-render once all exiting animations have finished. We
    // either use a local forceRender function, or one from a parent context if it exists.
    var forceRender = useForceUpdate();
    var layoutContext = react.useContext(SharedLayoutContext);
    if (isSharedLayout(layoutContext)) {
        forceRender = layoutContext.forceUpdate;
    }
    var isInitialRender = react.useRef(true);
    // Filter out any children that aren't ReactElements. We can only track ReactElements with a props.key
    var filteredChildren = onlyElements(children);
    // Keep a living record of the children we're actually rendering so we
    // can diff to figure out which are entering and exiting
    var presentChildren = react.useRef(filteredChildren);
    // A lookup table to quickly reference components by key
    var allChildren = react.useRef(new Map())
        .current;
    // A living record of all currently exiting components.
    var exiting = react.useRef(new Set()).current;
    updateChildLookup(filteredChildren, allChildren);
    // If this is the initial component render, just deal with logic surrounding whether
    // we play onMount animations or not.
    if (isInitialRender.current) {
        isInitialRender.current = false;
        return (react.createElement(react.Fragment, null, filteredChildren.map(function (child) { return (react.createElement(PresenceChild, { key: getChildKey(child), isPresent: true, initial: initial ? undefined : false, presenceAffectsLayout: presenceAffectsLayout }, child)); })));
    }
    // If this is a subsequent render, deal with entering and exiting children
    var childrenToRender = __spreadArray([], __read(filteredChildren));
    // Diff the keys of the currently-present and target children to update our
    // exiting list.
    var presentKeys = presentChildren.current.map(getChildKey);
    var targetKeys = filteredChildren.map(getChildKey);
    // Diff the present children with our target children and mark those that are exiting
    var numPresent = presentKeys.length;
    for (var i = 0; i < numPresent; i++) {
        var key = presentKeys[i];
        if (targetKeys.indexOf(key) === -1) {
            exiting.add(key);
        }
        else {
            // In case this key has re-entered, remove from the exiting list
            exiting.delete(key);
        }
    }
    // If we currently have exiting children, and we're deferring rendering incoming children
    // until after all current children have exiting, empty the childrenToRender array
    if (exitBeforeEnter && exiting.size) {
        childrenToRender = [];
    }
    // Loop through all currently exiting components and clone them to overwrite `animate`
    // with any `exit` prop they might have defined.
    exiting.forEach(function (key) {
        // If this component is actually entering again, early return
        if (targetKeys.indexOf(key) !== -1)
            return;
        var child = allChildren.get(key);
        if (!child)
            return;
        var insertionIndex = presentKeys.indexOf(key);
        var onExit = function () {
            allChildren.delete(key);
            exiting.delete(key);
            // Remove this child from the present children
            var removeIndex = presentChildren.current.findIndex(function (presentChild) { return presentChild.key === key; });
            presentChildren.current.splice(removeIndex, 1);
            // Defer re-rendering until all exiting children have indeed left
            if (!exiting.size) {
                presentChildren.current = filteredChildren;
                forceRender();
                onExitComplete && onExitComplete();
            }
        };
        childrenToRender.splice(insertionIndex, 0, react.createElement(PresenceChild, { key: getChildKey(child), isPresent: false, onExitComplete: onExit, custom: custom, presenceAffectsLayout: presenceAffectsLayout }, child));
    });
    // Add `MotionContext` even to children that don't need it to ensure we're rendering
    // the same tree between renders
    childrenToRender = childrenToRender.map(function (child) {
        var key = child.key;
        return exiting.has(key) ? (child) : (react.createElement(PresenceChild, { key: getChildKey(child), isPresent: true, presenceAffectsLayout: presenceAffectsLayout }, child));
    });
    presentChildren.current = childrenToRender;
    return (react.createElement(react.Fragment, null, exiting.size
        ? childrenToRender
        : childrenToRender.map(function (child) { return react.cloneElement(child); })));
};

/**
 * Styles to visually hide an element
 * but make it accessible to screen-readers
 */
var visuallyHiddenStyle = {
  border: "0px",
  clip: "rect(0px, 0px, 0px, 0px)",
  height: "1px",
  width: "1px",
  margin: "-1px",
  padding: "0px",
  overflow: "hidden",
  whiteSpace: "nowrap",
  position: "absolute"
};
/**
 * Visually hidden component used to hide
 * elements on screen
 */

var VisuallyHidden = chakra("span", {
  baseStyle: visuallyHiddenStyle
});
/**
 * Visually hidden input component for designing
 * custom input components using the html `input`
 * as a proxy
 */


var VisuallyHiddenInput = chakra("input", {
  baseStyle: visuallyHiddenStyle
});

function _extends$3() {
  _extends$3 = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends$3.apply(this, arguments);
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

var _excluded = ["label", "thickness", "speed", "emptyColor", "className"];
var spin = keyframes$2({
  "0%": {
    transform: "rotate(0deg)"
  },
  "100%": {
    transform: "rotate(360deg)"
  }
});

/**
 * Spinner is used to indicate the loading state of a page or a component,
 * It renders a `div` by default.
 *
 * @see Docs https://chakra-ui.com/spinner
 */
var Spinner$1 = /*#__PURE__*/forwardRef(function (props, ref) {
  var styles = useStyleConfig("Spinner", props);

  var _omitThemingProps = omitThemingProps(props),
      _omitThemingProps$lab = _omitThemingProps.label,
      label = _omitThemingProps$lab === void 0 ? "Loading..." : _omitThemingProps$lab,
      _omitThemingProps$thi = _omitThemingProps.thickness,
      thickness = _omitThemingProps$thi === void 0 ? "2px" : _omitThemingProps$thi,
      _omitThemingProps$spe = _omitThemingProps.speed,
      speed = _omitThemingProps$spe === void 0 ? "0.45s" : _omitThemingProps$spe,
      _omitThemingProps$emp = _omitThemingProps.emptyColor,
      emptyColor = _omitThemingProps$emp === void 0 ? "transparent" : _omitThemingProps$emp,
      className = _omitThemingProps.className,
      rest = _objectWithoutPropertiesLoose(_omitThemingProps, _excluded);

  var _className = cx("chakra-spinner", className);

  var spinnerStyles = _extends$3({
    display: "inline-block",
    borderColor: "currentColor",
    borderStyle: "solid",
    borderRadius: "99999px",
    borderWidth: thickness,
    borderBottomColor: emptyColor,
    borderLeftColor: emptyColor,
    animation: spin + " " + speed + " linear infinite"
  }, styles);

  return /*#__PURE__*/react.createElement(chakra.div, _extends$3({
    ref: ref,
    __css: spinnerStyles,
    className: _className
  }, rest), label && /*#__PURE__*/react.createElement(VisuallyHidden, null, label));
});

function _objectWithoutPropertiesLoose$1(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _extends$4() {
  _extends$4 = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends$4.apply(this, arguments);
}

var _excluded$4 = ["size", "colorScheme", "variant", "className", "spacing", "isAttached", "isDisabled"];

var _createContext$2 = createContext({
  strict: false,
  name: "ButtonGroupContext"
}),
    ButtonGroupProvider = _createContext$2[0],
    useButtonGroup = _createContext$2[1];
var ButtonGroup = /*#__PURE__*/forwardRef(function (props, ref) {
  var size = props.size,
      colorScheme = props.colorScheme,
      variant = props.variant,
      className = props.className,
      _props$spacing = props.spacing,
      spacing = _props$spacing === void 0 ? "0.5rem" : _props$spacing,
      isAttached = props.isAttached,
      isDisabled = props.isDisabled,
      rest = _objectWithoutPropertiesLoose$1(props, _excluded$4);

  var _className = cx("chakra-button__group", className);

  var context = react.useMemo(function () {
    return {
      size: size,
      colorScheme: colorScheme,
      variant: variant,
      isDisabled: isDisabled
    };
  }, [size, colorScheme, variant, isDisabled]);
  var groupStyles = {
    display: "inline-flex"
  };

  if (isAttached) {
    groupStyles = _extends$4({}, groupStyles, {
      "> *:first-of-type:not(:last-of-type)": {
        borderEndRadius: 0
      },
      "> *:not(:first-of-type):not(:last-of-type)": {
        borderRadius: 0
      },
      "> *:not(:first-of-type):last-of-type": {
        borderStartRadius: 0
      }
    });
  } else {
    groupStyles = _extends$4({}, groupStyles, {
      "& > *:not(style) ~ *:not(style)": {
        marginStart: spacing
      }
    });
  }

  return /*#__PURE__*/react.createElement(ButtonGroupProvider, {
    value: context
  }, /*#__PURE__*/react.createElement(chakra.div, _extends$4({
    ref: ref,
    role: "group",
    __css: groupStyles,
    className: _className
  }, rest)));
});

var _excluded$3 = ["label", "placement", "spacing", "children", "className", "__css"];
var ButtonSpinner = function ButtonSpinner(props) {
  var label = props.label,
      placement = props.placement;
      props.spacing;
      var _props$children = props.children,
      children = _props$children === void 0 ? /*#__PURE__*/react.createElement(Spinner$1, {
    color: "currentColor",
    width: "1em",
    height: "1em"
  }) : _props$children,
      className = props.className,
      __css = props.__css,
      rest = _objectWithoutPropertiesLoose$1(props, _excluded$3);

  var _className = cx("chakra-button__spinner", className);

  var marginProp = placement === "start" ? "marginEnd" : "marginStart";
  var spinnerStyles = react.useMemo(function () {
    var _extends2;

    return _extends$4((_extends2 = {
      display: "flex",
      alignItems: "center",
      position: label ? "relative" : "absolute"
    }, _extends2[marginProp] = label ? "0.5rem" : 0, _extends2.fontSize = "1em", _extends2.lineHeight = "normal", _extends2), __css);
  }, [__css, label, marginProp]);
  return /*#__PURE__*/react.createElement(chakra.div, _extends$4({
    className: _className
  }, rest, {
    __css: spinnerStyles
  }), children);
};

var _excluded$2 = ["children", "className"];
var ButtonIcon = function ButtonIcon(props) {
  var children = props.children,
      className = props.className,
      rest = _objectWithoutPropertiesLoose$1(props, _excluded$2);

  var _children = /*#__PURE__*/react.isValidElement(children) ? /*#__PURE__*/react.cloneElement(children, {
    "aria-hidden": true,
    focusable: false
  }) : children;

  var _className = cx("chakra-button__icon", className);

  return /*#__PURE__*/react.createElement(chakra.span, _extends$4({
    display: "inline-flex",
    alignSelf: "center",
    flexShrink: 0
  }, rest, {
    className: _className
  }), _children);
};

function useButtonType(value) {
  var _React$useState = react.useState(!value),
      isButton = _React$useState[0],
      setIsButton = _React$useState[1];

  var refCallback = react.useCallback(function (node) {
    if (!node) return;
    setIsButton(node.tagName === "BUTTON");
  }, []);
  var type = isButton ? "button" : undefined;
  return {
    ref: refCallback,
    type: type
  };
}

var _excluded$1 = ["isDisabled", "isLoading", "isActive", "isFullWidth", "children", "leftIcon", "rightIcon", "loadingText", "iconSpacing", "type", "spinner", "spinnerPlacement", "className", "as"];
var Button$1 = /*#__PURE__*/forwardRef(function (props, ref) {
  var group = useButtonGroup();
  var styles = useStyleConfig("Button", _extends$4({}, group, props));

  var _omitThemingProps = omitThemingProps(props),
      _omitThemingProps$isD = _omitThemingProps.isDisabled,
      isDisabled = _omitThemingProps$isD === void 0 ? group == null ? void 0 : group.isDisabled : _omitThemingProps$isD,
      isLoading = _omitThemingProps.isLoading,
      isActive = _omitThemingProps.isActive,
      isFullWidth = _omitThemingProps.isFullWidth,
      children = _omitThemingProps.children,
      leftIcon = _omitThemingProps.leftIcon,
      rightIcon = _omitThemingProps.rightIcon,
      loadingText = _omitThemingProps.loadingText,
      _omitThemingProps$ico = _omitThemingProps.iconSpacing,
      iconSpacing = _omitThemingProps$ico === void 0 ? "0.5rem" : _omitThemingProps$ico,
      type = _omitThemingProps.type,
      spinner = _omitThemingProps.spinner,
      _omitThemingProps$spi = _omitThemingProps.spinnerPlacement,
      spinnerPlacement = _omitThemingProps$spi === void 0 ? "start" : _omitThemingProps$spi,
      className = _omitThemingProps.className,
      as = _omitThemingProps.as,
      rest = _objectWithoutPropertiesLoose$1(_omitThemingProps, _excluded$1);
  /**
   * When button is used within ButtonGroup (i.e flushed with sibling buttons),
   * it is important to add a `zIndex` on focus.
   *
   * So let's read the component styles and then add `zIndex` to it.
   */


  var buttonStyles = react.useMemo(function () {
    var _styles$_focus;

    var _focus = lodash_mergewith({}, (_styles$_focus = styles == null ? void 0 : styles["_focus"]) != null ? _styles$_focus : {}, {
      zIndex: 1
    });

    return _extends$4({
      display: "inline-flex",
      appearance: "none",
      alignItems: "center",
      justifyContent: "center",
      userSelect: "none",
      position: "relative",
      whiteSpace: "nowrap",
      verticalAlign: "middle",
      outline: "none",
      width: isFullWidth ? "100%" : "auto"
    }, styles, !!group && {
      _focus: _focus
    });
  }, [styles, group, isFullWidth]);

  var _useButtonType = useButtonType(as),
      _ref = _useButtonType.ref,
      defaultType = _useButtonType.type;

  var contentProps = {
    rightIcon: rightIcon,
    leftIcon: leftIcon,
    iconSpacing: iconSpacing,
    children: children
  };
  return /*#__PURE__*/react.createElement(chakra.button, _extends$4({
    disabled: isDisabled || isLoading,
    ref: useMergeRefs(ref, _ref),
    as: as,
    type: type != null ? type : defaultType,
    "data-active": dataAttr(isActive),
    "data-loading": dataAttr(isLoading),
    __css: buttonStyles,
    className: cx("chakra-button", className)
  }, rest), isLoading && spinnerPlacement === "start" && /*#__PURE__*/react.createElement(ButtonSpinner, {
    className: "chakra-button__spinner--start",
    label: loadingText,
    placement: "start"
  }, spinner), isLoading ? loadingText || /*#__PURE__*/react.createElement(chakra.span, {
    opacity: 0
  }, /*#__PURE__*/react.createElement(ButtonContent, contentProps)) : /*#__PURE__*/react.createElement(ButtonContent, contentProps), isLoading && spinnerPlacement === "end" && /*#__PURE__*/react.createElement(ButtonSpinner, {
    className: "chakra-button__spinner--end",
    label: loadingText,
    placement: "end"
  }, spinner));
});

function ButtonContent(props) {
  var leftIcon = props.leftIcon,
      rightIcon = props.rightIcon,
      children = props.children,
      iconSpacing = props.iconSpacing;
  return /*#__PURE__*/react.createElement(react.Fragment, null, leftIcon && /*#__PURE__*/react.createElement(ButtonIcon, {
    marginEnd: iconSpacing
  }, leftIcon), children, rightIcon && /*#__PURE__*/react.createElement(ButtonIcon, {
    marginStart: iconSpacing
  }, rightIcon));
}

var _excluded$5 = ["icon", "children", "isRound", "aria-label"];
var IconButton = /*#__PURE__*/forwardRef(function (props, ref) {
  var icon = props.icon,
      children = props.children,
      isRound = props.isRound,
      ariaLabel = props["aria-label"],
      rest = _objectWithoutPropertiesLoose$1(props, _excluded$5);
  /**
   * Passing the icon as prop or children should work
   */


  var element = icon || children;

  var _children = /*#__PURE__*/react.isValidElement(element) ? /*#__PURE__*/react.cloneElement(element, {
    "aria-hidden": true,
    focusable: false
  }) : null;

  return /*#__PURE__*/react.createElement(Button$1, _extends$4({
    padding: "0",
    borderRadius: isRound ? "full" : undefined,
    ref: ref,
    "aria-label": ariaLabel
  }, rest), _children);
});

function _extends$5() {
  _extends$5 = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends$5.apply(this, arguments);
}

var _createContext$3 = createContext({
  name: "CheckboxGroupContext",
  strict: false
}),
    useCheckboxGroupContext = _createContext$3[1];

function _objectWithoutPropertiesLoose$2(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

var _excluded$2$1 = ["isIndeterminate", "isChecked"];

var MotionSvg = "custom" in motion ? motion.custom(chakra.svg) : motion(chakra.svg);

var CheckIcon = function CheckIcon(props) {
  return /*#__PURE__*/react.createElement(MotionSvg, _extends$5({
    width: "1.2em",
    viewBox: "0 0 12 10",
    variants: {
      unchecked: {
        opacity: 0,
        strokeDashoffset: 16
      },
      checked: {
        opacity: 1,
        strokeDashoffset: 0,
        transition: {
          duration: 0.2
        }
      }
    },
    style: {
      fill: "none",
      strokeWidth: 2,
      stroke: "currentColor",
      strokeDasharray: 16
    }
  }, props), /*#__PURE__*/react.createElement("polyline", {
    points: "1.5 6 4.5 9 10.5 1"
  }));
};

var IndeterminateIcon = function IndeterminateIcon(props) {
  return /*#__PURE__*/react.createElement(MotionSvg, _extends$5({
    width: "1.2em",
    viewBox: "0 0 24 24",
    variants: {
      unchecked: {
        scaleX: 0.65,
        opacity: 0
      },
      checked: {
        scaleX: 1,
        opacity: 1,
        transition: {
          scaleX: {
            duration: 0
          },
          opacity: {
            duration: 0.02
          }
        }
      }
    },
    style: {
      stroke: "currentColor",
      strokeWidth: 4
    }
  }, props), /*#__PURE__*/react.createElement("line", {
    x1: "21",
    x2: "3",
    y1: "12",
    y2: "12"
  }));
};

var CheckboxTransition = function CheckboxTransition(_ref) {
  var open = _ref.open,
      children = _ref.children;
  return /*#__PURE__*/react.createElement(AnimatePresence, {
    initial: false
  }, open && /*#__PURE__*/react.createElement(motion.div, {
    variants: {
      unchecked: {
        scale: 0.5
      },
      checked: {
        scale: 1
      }
    },
    initial: "unchecked",
    animate: "checked",
    exit: "unchecked",
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100%"
    }
  }, children));
};

/**
 * CheckboxIcon is used to visually indicate the checked or indeterminate
 * state of a checkbox.
 *
 * @todo allow users pass their own icon svgs
 */
var CheckboxIcon = function CheckboxIcon(props) {
  var isIndeterminate = props.isIndeterminate,
      isChecked = props.isChecked,
      rest = _objectWithoutPropertiesLoose$2(props, _excluded$2$1);

  var IconEl = isIndeterminate ? IndeterminateIcon : CheckIcon;
  return /*#__PURE__*/react.createElement(CheckboxTransition, {
    open: isChecked || isIndeterminate
  }, /*#__PURE__*/react.createElement(IconEl, rest));
};

var _excluded$1$1 = ["defaultIsChecked", "defaultChecked", "isChecked", "isFocusable", "isDisabled", "isReadOnly", "isRequired", "onChange", "isIndeterminate", "isInvalid", "name", "value", "id", "onBlur", "onFocus", "tabIndex", "aria-label", "aria-labelledby", "aria-invalid", "aria-describedby"];

/**
 * useCheckbox that provides all the state and focus management logic
 * for a checkbox. It is consumed by the `Checkbox` component
 *
 * @see Docs https://chakra-ui.com/checkbox#hooks
 */
function useCheckbox(props) {
  if (props === void 0) {
    props = {};
  }

  var _props = props,
      defaultIsChecked = _props.defaultIsChecked,
      _props$defaultChecked = _props.defaultChecked,
      defaultChecked = _props$defaultChecked === void 0 ? defaultIsChecked : _props$defaultChecked,
      checkedProp = _props.isChecked,
      isFocusable = _props.isFocusable,
      isDisabled = _props.isDisabled,
      isReadOnly = _props.isReadOnly,
      isRequired = _props.isRequired,
      onChange = _props.onChange,
      isIndeterminate = _props.isIndeterminate,
      isInvalid = _props.isInvalid,
      name = _props.name,
      value = _props.value,
      id = _props.id,
      onBlur = _props.onBlur,
      onFocus = _props.onFocus,
      _props$tabIndex = _props.tabIndex,
      tabIndex = _props$tabIndex === void 0 ? undefined : _props$tabIndex,
      ariaLabel = _props["aria-label"],
      ariaLabelledBy = _props["aria-labelledby"],
      ariaInvalid = _props["aria-invalid"],
      ariaDescribedBy = _props["aria-describedby"],
      htmlProps = _objectWithoutPropertiesLoose$2(_props, _excluded$1$1);

  var onChangeProp = useCallbackRef(onChange);
  var onBlurProp = useCallbackRef(onBlur);
  var onFocusProp = useCallbackRef(onFocus);

  var _useBoolean = useBoolean(),
      isFocused = _useBoolean[0],
      setFocused = _useBoolean[1];

  var _useBoolean2 = useBoolean(),
      isHovered = _useBoolean2[0],
      setHovered = _useBoolean2[1];

  var _useBoolean3 = useBoolean(),
      isActive = _useBoolean3[0],
      setActive = _useBoolean3[1];

  var inputRef = react.useRef(null);

  var _useState = react.useState(true),
      rootIsLabelElement = _useState[0],
      setRootIsLabelElement = _useState[1];

  var _useState2 = react.useState(!!defaultChecked),
      checkedState = _useState2[0],
      setCheckedState = _useState2[1];

  var _useControllableProp = useControllableProp(checkedProp, checkedState),
      isControlled = _useControllableProp[0],
      isChecked = _useControllableProp[1];

  warn({
    condition: !!defaultIsChecked,
    message: 'The "defaultIsChecked" prop has been deprecated and will be removed in a future version. ' + 'Please use the "defaultChecked" prop instead, which mirrors default React checkbox behavior.'
  });
  var handleChange = react.useCallback(function (event) {
    if (isReadOnly || isDisabled) {
      event.preventDefault();
      return;
    }

    if (!isControlled) {
      if (isChecked) {
        setCheckedState(event.target.checked);
      } else {
        setCheckedState(isIndeterminate ? true : event.target.checked);
      }
    }

    onChangeProp == null ? void 0 : onChangeProp(event);
  }, [isReadOnly, isDisabled, isChecked, isControlled, isIndeterminate, onChangeProp]);
  useSafeLayoutEffect(function () {
    if (inputRef.current) {
      inputRef.current.indeterminate = Boolean(isIndeterminate);
    }
  }, [isIndeterminate]);
  var trulyDisabled = isDisabled && !isFocusable;
  var onKeyDown = react.useCallback(function (event) {
    if (event.key === " ") {
      setActive.on();
    }
  }, [setActive]);
  var onKeyUp = react.useCallback(function (event) {
    if (event.key === " ") {
      setActive.off();
    }
  }, [setActive]);
  /**
   * Sync state with uncontrolled form libraries like `react-hook-form`.
   *
   * These libraries set the checked value for input fields
   * using their refs. For the checkbox, it sets `ref.current.checked = true | false` directly.
   *
   * This means the `isChecked` state will get out of sync with `ref.current.checked`,
   * even though the input validation with work, the UI will not be up to date.
   *
   * Let's correct that by checking and syncing the state accordingly.
   */

  useSafeLayoutEffect(function () {
    if (!inputRef.current) return;
    var notInSync = inputRef.current.checked !== isChecked;

    if (notInSync) {
      setCheckedState(inputRef.current.checked);
    }
  }, [inputRef.current]);
  var getCheckboxProps = react.useCallback(function (props, forwardedRef) {
    if (props === void 0) {
      props = {};
    }

    if (forwardedRef === void 0) {
      forwardedRef = null;
    }

    var onPressDown = function onPressDown(event) {
      // On mousedown, the input blurs and returns focus to the `body`,
      // we need to prevent this. Native checkboxes keeps focus on `input`
      event.preventDefault();
      setActive.on();
    };

    return _extends$5({}, props, {
      ref: forwardedRef,
      "data-active": dataAttr(isActive),
      "data-hover": dataAttr(isHovered),
      "data-checked": dataAttr(isChecked),
      "data-focus": dataAttr(isFocused),
      "data-indeterminate": dataAttr(isIndeterminate),
      "data-disabled": dataAttr(isDisabled),
      "data-invalid": dataAttr(isInvalid),
      "data-readonly": dataAttr(isReadOnly),
      "aria-hidden": true,
      onMouseDown: callAllHandlers(props.onMouseDown, onPressDown),
      onMouseUp: callAllHandlers(props.onMouseUp, setActive.off),
      onMouseEnter: callAllHandlers(props.onMouseEnter, setHovered.on),
      onMouseLeave: callAllHandlers(props.onMouseLeave, setHovered.off)
    });
  }, [isActive, isChecked, isDisabled, isFocused, isHovered, isIndeterminate, isInvalid, isReadOnly, setActive, setHovered.off, setHovered.on]);
  var getRootProps = react.useCallback(function (props, forwardedRef) {
    if (props === void 0) {
      props = {};
    }

    if (forwardedRef === void 0) {
      forwardedRef = null;
    }

    return _extends$5({}, htmlProps, props, {
      ref: mergeRefs(forwardedRef, function (node) {
        if (!node) return;
        setRootIsLabelElement(node.tagName === "LABEL");
      }),
      onClick: callAllHandlers(props.onClick, function () {
        /**
         * Accessibility:
         *
         * Ideally, `getRootProps` should be spread unto a `label` element.
         *
         * If the element was changed using the `as` prop or changing
         * the dom node `getRootProps` is spread unto (to a `div` or `span`), we'll trigger
         * click on the input when the element is clicked.
         * @see Issue https://github.com/chakra-ui/chakra-ui/issues/3480
         */
        if (!rootIsLabelElement) {
          var _inputRef$current;

          (_inputRef$current = inputRef.current) == null ? void 0 : _inputRef$current.click();
          focus(inputRef.current, {
            nextTick: true
          });
        }
      }),
      "data-disabled": dataAttr(isDisabled),
      "data-checked": dataAttr(isChecked),
      "data-invalid": dataAttr(isInvalid)
    });
  }, [htmlProps, isDisabled, isChecked, isInvalid, rootIsLabelElement]);
  var getInputProps = react.useCallback(function (props, forwardedRef) {
    if (props === void 0) {
      props = {};
    }

    if (forwardedRef === void 0) {
      forwardedRef = null;
    }

    return _extends$5({}, props, {
      ref: mergeRefs(inputRef, forwardedRef),
      type: "checkbox",
      name: name,
      value: value,
      id: id,
      tabIndex: tabIndex,
      onChange: callAllHandlers(props.onChange, handleChange),
      onBlur: callAllHandlers(props.onBlur, onBlurProp, setFocused.off),
      onFocus: callAllHandlers(props.onFocus, onFocusProp, setFocused.on),
      onKeyDown: callAllHandlers(props.onKeyDown, onKeyDown),
      onKeyUp: callAllHandlers(props.onKeyUp, onKeyUp),
      required: isRequired,
      checked: isChecked,
      disabled: trulyDisabled,
      readOnly: isReadOnly,
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
      "aria-invalid": ariaInvalid ? Boolean(ariaInvalid) : isInvalid,
      "aria-describedby": ariaDescribedBy,
      "aria-disabled": isDisabled,
      style: visuallyHiddenStyle
    });
  }, [name, value, id, handleChange, setFocused.off, setFocused.on, onBlurProp, onFocusProp, onKeyDown, onKeyUp, isRequired, isChecked, trulyDisabled, isReadOnly, ariaLabel, ariaLabelledBy, ariaInvalid, isInvalid, ariaDescribedBy, isDisabled, tabIndex]);
  var getLabelProps = react.useCallback(function (props, forwardedRef) {
    if (props === void 0) {
      props = {};
    }

    if (forwardedRef === void 0) {
      forwardedRef = null;
    }

    return _extends$5({}, props, {
      ref: forwardedRef,
      onMouseDown: callAllHandlers(props.onMouseDown, stopEvent),
      onTouchStart: callAllHandlers(props.onTouchStart, stopEvent),
      "data-disabled": dataAttr(isDisabled),
      "data-checked": dataAttr(isChecked),
      "data-invalid": dataAttr(isInvalid)
    });
  }, [isChecked, isDisabled, isInvalid]);
  return {
    state: {
      isInvalid: isInvalid,
      isFocused: isFocused,
      isChecked: isChecked,
      isActive: isActive,
      isHovered: isHovered,
      isIndeterminate: isIndeterminate,
      isDisabled: isDisabled,
      isReadOnly: isReadOnly,
      isRequired: isRequired
    },
    getRootProps: getRootProps,
    getCheckboxProps: getCheckboxProps,
    getInputProps: getInputProps,
    getLabelProps: getLabelProps,
    htmlProps: htmlProps
  };
}
/**
 * Prevent `onBlur` being fired when the checkbox label is touched
 */

function stopEvent(event) {
  event.preventDefault();
  event.stopPropagation();
}

var _excluded$6 = ["spacing", "className", "children", "iconColor", "iconSize", "icon", "isChecked", "isDisabled", "onChange"];
var CheckboxControl = chakra("span", {
  baseStyle: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    verticalAlign: "top",
    userSelect: "none",
    flexShrink: 0
  }
});
var Label = chakra("label", {
  baseStyle: {
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    verticalAlign: "top",
    position: "relative",
    _disabled: {
      cursor: "not-allowed"
    }
  }
});

/**
 * Checkbox
 *
 * React component used in forms when a user needs to select
 * multiple values from several options.
 *
 * @see Docs https://chakra-ui.com/checkbox
 */
var Checkbox$1 = /*#__PURE__*/forwardRef(function (props, ref) {
  var group = useCheckboxGroupContext();

  var mergedProps = _extends$5({}, group, props);

  var styles = useMultiStyleConfig("Checkbox", mergedProps);
  var ownProps = omitThemingProps(props);

  var _ownProps$spacing = ownProps.spacing,
      spacing = _ownProps$spacing === void 0 ? "0.5rem" : _ownProps$spacing,
      className = ownProps.className,
      children = ownProps.children,
      iconColor = ownProps.iconColor,
      iconSize = ownProps.iconSize,
      _ownProps$icon = ownProps.icon,
      icon = _ownProps$icon === void 0 ? /*#__PURE__*/react.createElement(CheckboxIcon, null) : _ownProps$icon,
      isCheckedProp = ownProps.isChecked,
      _ownProps$isDisabled = ownProps.isDisabled,
      isDisabled = _ownProps$isDisabled === void 0 ? group == null ? void 0 : group.isDisabled : _ownProps$isDisabled,
      onChangeProp = ownProps.onChange,
      rest = _objectWithoutPropertiesLoose$2(ownProps, _excluded$6);

  var isChecked = isCheckedProp;

  if (group != null && group.value && ownProps.value) {
    isChecked = group.value.includes(ownProps.value);
  }

  var onChange = onChangeProp;

  if (group != null && group.onChange && ownProps.value) {
    onChange = callAll(group.onChange, onChangeProp);
  }

  var _useCheckbox = useCheckbox(_extends$5({}, rest, {
    isDisabled: isDisabled,
    isChecked: isChecked,
    onChange: onChange
  })),
      state = _useCheckbox.state,
      getInputProps = _useCheckbox.getInputProps,
      getCheckboxProps = _useCheckbox.getCheckboxProps,
      getLabelProps = _useCheckbox.getLabelProps,
      getRootProps = _useCheckbox.getRootProps;

  var iconStyles = react.useMemo(function () {
    return _extends$5({
      opacity: state.isChecked || state.isIndeterminate ? 1 : 0,
      transform: state.isChecked || state.isIndeterminate ? "scale(1)" : "scale(0.95)",
      fontSize: iconSize,
      color: iconColor
    }, styles.icon);
  }, [iconColor, iconSize, state.isChecked, state.isIndeterminate, styles.icon]);
  var clonedIcon = /*#__PURE__*/react.cloneElement(icon, {
    __css: iconStyles,
    isIndeterminate: state.isIndeterminate,
    isChecked: state.isChecked
  });
  return /*#__PURE__*/react.createElement(Label, _extends$5({
    __css: styles.container,
    className: cx("chakra-checkbox", className)
  }, getRootProps()), /*#__PURE__*/react.createElement("input", _extends$5({
    className: "chakra-checkbox__input"
  }, getInputProps({}, ref))), /*#__PURE__*/react.createElement(CheckboxControl, _extends$5({
    __css: styles.control,
    className: "chakra-checkbox__control"
  }, getCheckboxProps()), clonedIcon), children && /*#__PURE__*/react.createElement(chakra.span, _extends$5({
    className: "chakra-checkbox__label"
  }, getLabelProps(), {
    __css: _extends$5({
      marginStart: spacing
    }, styles.label)
  }), children));
});

function _extends$6() {
  _extends$6 = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends$6.apply(this, arguments);
}

function _objectWithoutPropertiesLoose$3(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

var _excluded$2$2 = ["id", "isRequired", "isInvalid", "isDisabled", "isReadOnly"],
    _excluded2$1 = ["getRootProps", "htmlProps"];

var _createContext$4 = createContext({
  strict: false,
  name: "FormControlContext"
}),
    FormControlProvider = _createContext$4[0],
    useFormControlContext = _createContext$4[1];

function useFormControlProvider(props) {
  var idProp = props.id,
      isRequired = props.isRequired,
      isInvalid = props.isInvalid,
      isDisabled = props.isDisabled,
      isReadOnly = props.isReadOnly,
      htmlProps = _objectWithoutPropertiesLoose$3(props, _excluded$2$2); // Generate all the required ids


  var uuid = useId();
  var id = idProp || "field-" + uuid;
  var labelId = id + "-label";
  var feedbackId = id + "-feedback";
  var helpTextId = id + "-helptext";
  /**
   * Track whether the `FormErrorMessage` has been rendered.
   * We use this to append its id the the `aria-describedby` of the `input`.
   */

  var _React$useState = react.useState(false),
      hasFeedbackText = _React$useState[0],
      setHasFeedbackText = _React$useState[1];
  /**
   * Track whether the `FormHelperText` has been rendered.
   * We use this to append its id the the `aria-describedby` of the `input`.
   */


  var _React$useState2 = react.useState(false),
      hasHelpText = _React$useState2[0],
      setHasHelpText = _React$useState2[1]; // Track whether the form element (e.g, `input`) has focus.


  var _useBoolean = useBoolean(),
      isFocused = _useBoolean[0],
      setFocus = _useBoolean[1];

  var getHelpTextProps = react.useCallback(function (props, forwardedRef) {
    if (props === void 0) {
      props = {};
    }

    if (forwardedRef === void 0) {
      forwardedRef = null;
    }

    return _extends$6({
      id: helpTextId
    }, props, {
      /**
       * Notify the field context when the help text is rendered on screen,
       * so we can apply the correct `aria-describedby` to the field (e.g. input, textarea).
       */
      ref: mergeRefs(forwardedRef, function (node) {
        if (!node) return;
        setHasHelpText(true);
      })
    });
  }, [helpTextId]);
  var getLabelProps = react.useCallback(function (props, forwardedRef) {
    var _props$id, _props$htmlFor;

    if (props === void 0) {
      props = {};
    }

    if (forwardedRef === void 0) {
      forwardedRef = null;
    }

    return _extends$6({}, props, {
      ref: forwardedRef,
      "data-focus": dataAttr(isFocused),
      "data-disabled": dataAttr(isDisabled),
      "data-invalid": dataAttr(isInvalid),
      "data-readonly": dataAttr(isReadOnly),
      id: (_props$id = props.id) != null ? _props$id : labelId,
      htmlFor: (_props$htmlFor = props.htmlFor) != null ? _props$htmlFor : id
    });
  }, [id, isDisabled, isFocused, isInvalid, isReadOnly, labelId]);
  var getErrorMessageProps = react.useCallback(function (props, forwardedRef) {
    if (props === void 0) {
      props = {};
    }

    if (forwardedRef === void 0) {
      forwardedRef = null;
    }

    return _extends$6({
      id: feedbackId
    }, props, {
      /**
       * Notify the field context when the error message is rendered on screen,
       * so we can apply the correct `aria-describedby` to the field (e.g. input, textarea).
       */
      ref: mergeRefs(forwardedRef, function (node) {
        if (!node) return;
        setHasFeedbackText(true);
      }),
      "aria-live": "polite"
    });
  }, [feedbackId]);
  var getRootProps = react.useCallback(function (props, forwardedRef) {
    if (props === void 0) {
      props = {};
    }

    if (forwardedRef === void 0) {
      forwardedRef = null;
    }

    return _extends$6({}, props, htmlProps, {
      ref: forwardedRef,
      role: "group"
    });
  }, [htmlProps]);
  var getRequiredIndicatorProps = react.useCallback(function (props, forwardedRef) {
    if (props === void 0) {
      props = {};
    }

    if (forwardedRef === void 0) {
      forwardedRef = null;
    }

    return _extends$6({}, props, {
      ref: forwardedRef,
      role: "presentation",
      "aria-hidden": true,
      children: props.children || "*"
    });
  }, []);
  return {
    isRequired: !!isRequired,
    isInvalid: !!isInvalid,
    isReadOnly: !!isReadOnly,
    isDisabled: !!isDisabled,
    isFocused: !!isFocused,
    onFocus: setFocus.on,
    onBlur: setFocus.off,
    hasFeedbackText: hasFeedbackText,
    setHasFeedbackText: setHasFeedbackText,
    hasHelpText: hasHelpText,
    setHasHelpText: setHasHelpText,
    id: id,
    labelId: labelId,
    feedbackId: feedbackId,
    helpTextId: helpTextId,
    htmlProps: htmlProps,
    getHelpTextProps: getHelpTextProps,
    getErrorMessageProps: getErrorMessageProps,
    getRootProps: getRootProps,
    getLabelProps: getLabelProps,
    getRequiredIndicatorProps: getRequiredIndicatorProps
  };
}

/**
 * FormControl provides context such as
 * `isInvalid`, `isDisabled`, and `isRequired` to form elements.
 *
 * This is commonly used in form elements such as `input`,
 * `select`, `textarea`, etc.
 */
var FormControl = /*#__PURE__*/forwardRef(function (props, ref) {
  var styles = useMultiStyleConfig("Form", props);
  var ownProps = omitThemingProps(props);

  var _useFormControlProvid = useFormControlProvider(ownProps),
      getRootProps = _useFormControlProvid.getRootProps;
      var context = _objectWithoutPropertiesLoose$3(_useFormControlProvid, _excluded2$1);

  var className = cx("chakra-form-control", props.className);
  var contextValue = react.useMemo(function () {
    return context;
  }, [context]);
  return /*#__PURE__*/react.createElement(FormControlProvider, {
    value: contextValue
  }, /*#__PURE__*/react.createElement(StylesProvider, {
    value: styles
  }, /*#__PURE__*/react.createElement(chakra.div, _extends$6({}, getRootProps({}, ref), {
    className: className,
    __css: styles["container"]
  }))));
});

var _excluded$1$2 = ["isDisabled", "isInvalid", "isReadOnly", "isRequired"],
    _excluded2 = ["id", "disabled", "readOnly", "required", "isRequired", "isInvalid", "isReadOnly", "isDisabled", "onFocus", "onBlur"];

/**
 * React hook that provides the props that should be spread on to
 * input fields (`input`, `select`, `textarea`, etc.).
 *
 * It provides a convenient way to control a form fields, validation
 * and helper text.
 *
 * @internal
 */
function useFormControl(props) {
  var _useFormControlProps = useFormControlProps(props),
      isDisabled = _useFormControlProps.isDisabled,
      isInvalid = _useFormControlProps.isInvalid,
      isReadOnly = _useFormControlProps.isReadOnly,
      isRequired = _useFormControlProps.isRequired,
      rest = _objectWithoutPropertiesLoose$3(_useFormControlProps, _excluded$1$2);

  return _extends$6({}, rest, {
    disabled: isDisabled,
    readOnly: isReadOnly,
    required: isRequired,
    "aria-invalid": ariaAttr(isInvalid),
    "aria-required": ariaAttr(isRequired),
    "aria-readonly": ariaAttr(isReadOnly)
  });
}
/**
 * @internal
 */

function useFormControlProps(props) {
  var _ref, _ref2, _ref3;

  var field = useFormControlContext();

  var id = props.id,
      disabled = props.disabled,
      readOnly = props.readOnly,
      required = props.required,
      isRequired = props.isRequired,
      isInvalid = props.isInvalid,
      isReadOnly = props.isReadOnly,
      isDisabled = props.isDisabled,
      onFocus = props.onFocus,
      onBlur = props.onBlur,
      rest = _objectWithoutPropertiesLoose$3(props, _excluded2);

  var labelIds = props["aria-describedby"] ? [props["aria-describedby"]] : []; // Error message must be described first in all scenarios.

  if (field != null && field.hasFeedbackText && field != null && field.isInvalid) {
    labelIds.push(field.feedbackId);
  }

  if (field != null && field.hasHelpText) {
    labelIds.push(field.helpTextId);
  }

  return _extends$6({}, rest, {
    "aria-describedby": labelIds.join(" ") || undefined,
    id: id != null ? id : field == null ? void 0 : field.id,
    isDisabled: (_ref = disabled != null ? disabled : isDisabled) != null ? _ref : field == null ? void 0 : field.isDisabled,
    isReadOnly: (_ref2 = readOnly != null ? readOnly : isReadOnly) != null ? _ref2 : field == null ? void 0 : field.isReadOnly,
    isRequired: (_ref3 = required != null ? required : isRequired) != null ? _ref3 : field == null ? void 0 : field.isRequired,
    isInvalid: isInvalid != null ? isInvalid : field == null ? void 0 : field.isInvalid,
    onFocus: callAllHandlers(field == null ? void 0 : field.onFocus, onFocus),
    onBlur: callAllHandlers(field == null ? void 0 : field.onBlur, onBlur)
  });
}

/**
 * Used to provide feedback about an invalid input,
 * and suggest clear instructions on how to fix it.
 */
var FormErrorMessage = /*#__PURE__*/forwardRef(function (props, ref) {
  var styles = useMultiStyleConfig("FormError", props);
  var ownProps = omitThemingProps(props);
  var field = useFormControlContext();
  if (!(field != null && field.isInvalid)) return null;
  return /*#__PURE__*/react.createElement(StylesProvider, {
    value: styles
  }, /*#__PURE__*/react.createElement(chakra.div, _extends$6({}, field == null ? void 0 : field.getErrorMessageProps(ownProps, ref), {
    className: cx("chakra-form__error-message", props.className),
    __css: _extends$6({
      display: "flex",
      alignItems: "center"
    }, styles.text)
  })));
});

var _excluded$7 = ["className", "children", "requiredIndicator"];

/**
 * Used to enhance the usability of form controls.
 *
 * It is used to inform users as to what information
 * is requested for a form field.
 *
 * ♿️ Accessibility: Every form field should have a form label.
 */
var FormLabel$1 = /*#__PURE__*/forwardRef(function (passedProps, ref) {
  var _field$getLabelProps;

  var styles = useStyleConfig("FormLabel", passedProps);
  var props = omitThemingProps(passedProps);
      var children = props.children,
      _props$requiredIndica = props.requiredIndicator,
      requiredIndicator = _props$requiredIndica === void 0 ? /*#__PURE__*/react.createElement(RequiredIndicator, null) : _props$requiredIndica,
      rest = _objectWithoutPropertiesLoose$3(props, _excluded$7);

  var field = useFormControlContext();
  var ownProps = (_field$getLabelProps = field == null ? void 0 : field.getLabelProps(rest, ref)) != null ? _field$getLabelProps : _extends$6({
    ref: ref
  }, rest);
  return /*#__PURE__*/react.createElement(chakra.label, _extends$6({}, ownProps, {
    className: cx("chakra-form__label", props.className),
    __css: _extends$6({
      display: "block",
      textAlign: "start"
    }, styles)
  }), children, field != null && field.isRequired ? requiredIndicator : null);
});

/**
 * Used to show a "required" text or an asterisks (*) to indicate that
 * a field is required.
 */
var RequiredIndicator = /*#__PURE__*/forwardRef(function (props, ref) {
  var field = useFormControlContext();
  var styles = useStyles();
  if (!(field != null && field.isRequired)) return null;
  var className = cx("chakra-form__required-indicator", props.className);
  return /*#__PURE__*/react.createElement(chakra.span, _extends$6({}, field == null ? void 0 : field.getRequiredIndicatorProps(props, ref), {
    __css: styles.requiredIndicator,
    className: className
  }));
});

function _extends$7() {
  _extends$7 = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends$7.apply(this, arguments);
}

/**
 * Input
 *
 * Element that allows users enter single valued data.
 */
var Input$1 = /*#__PURE__*/forwardRef(function (props, ref) {
  var styles = useMultiStyleConfig("Input", props);
  var ownProps = omitThemingProps(props);
  var input = useFormControl(ownProps);

  var _className = cx("chakra-input", props.className);

  return /*#__PURE__*/react.createElement(chakra.input, _extends$7({}, input, {
    __css: styles.field,
    ref: ref,
    className: _className
  }));
});


Input$1.id = "Input";

function _objectWithoutPropertiesLoose$4(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

var _excluded$2$3 = ["placement"];
var placements = {
  left: {
    marginEnd: "-1px",
    borderEndRadius: 0,
    borderEndColor: "transparent"
  },
  right: {
    marginStart: "-1px",
    borderStartRadius: 0,
    borderStartColor: "transparent"
  }
};
var StyledAddon = chakra("div", {
  baseStyle: {
    flex: "0 0 auto",
    width: "auto",
    display: "flex",
    alignItems: "center",
    whiteSpace: "nowrap"
  }
});

/**
 * InputAddon
 *
 * Element to append or prepend to an input
 */
var InputAddon = /*#__PURE__*/forwardRef(function (props, ref) {
  var _placements$placement;

  var _props$placement = props.placement,
      placement = _props$placement === void 0 ? "left" : _props$placement,
      rest = _objectWithoutPropertiesLoose$4(props, _excluded$2$3);

  var placementStyles = (_placements$placement = placements[placement]) != null ? _placements$placement : {};
  var styles = useStyles();
  return /*#__PURE__*/react.createElement(StyledAddon, _extends$7({
    ref: ref
  }, rest, {
    __css: _extends$7({}, styles.addon, placementStyles)
  }));
});
/**
 * InputLeftAddon
 *
 * Element to append to the left of an input
 */


var InputLeftAddon = /*#__PURE__*/forwardRef(function (props, ref) {
  return /*#__PURE__*/react.createElement(InputAddon, _extends$7({
    ref: ref,
    placement: "left"
  }, props, {
    className: cx("chakra-input__left-addon", props.className)
  }));
});


InputLeftAddon.id = "InputLeftAddon";
/**
 * InputRightAddon
 *
 * Element to append to the right of an input
 */

var InputRightAddon = /*#__PURE__*/forwardRef(function (props, ref) {
  return /*#__PURE__*/react.createElement(InputAddon, _extends$7({
    ref: ref,
    placement: "right"
  }, props, {
    className: cx("chakra-input__right-addon", props.className)
  }));
});


InputRightAddon.id = "InputRightAddon";

var _excluded$8 = ["placement"],
    _excluded2$2 = ["className"],
    _excluded3 = ["className"];
var StyledElement = chakra("div", {
  baseStyle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: "0",
    zIndex: 2
  }
});
var InputElement = /*#__PURE__*/forwardRef(function (props, ref) {
  var _input$height, _input$height2, _elementStyles;

  var _props$placement = props.placement,
      placement = _props$placement === void 0 ? "left" : _props$placement,
      rest = _objectWithoutPropertiesLoose$4(props, _excluded$8);

  var styles = useStyles();
  var input = styles.field;
  var attr = placement === "left" ? "insetStart" : "insetEnd";
  var elementStyles = (_elementStyles = {}, _elementStyles[attr] = "0", _elementStyles.width = (_input$height = input == null ? void 0 : input.height) != null ? _input$height : input == null ? void 0 : input.h, _elementStyles.height = (_input$height2 = input == null ? void 0 : input.height) != null ? _input$height2 : input == null ? void 0 : input.h, _elementStyles.fontSize = input == null ? void 0 : input.fontSize, _elementStyles);
  return /*#__PURE__*/react.createElement(StyledElement, _extends$7({
    ref: ref,
    __css: elementStyles
  }, rest));
}); // This is used in `input-group.tsx`

InputElement.id = "InputElement";

var InputLeftElement = /*#__PURE__*/forwardRef(function (props, ref) {
  var className = props.className,
      rest = _objectWithoutPropertiesLoose$4(props, _excluded2$2);

  var _className = cx("chakra-input__left-element", className);

  return /*#__PURE__*/react.createElement(InputElement, _extends$7({
    ref: ref,
    placement: "left",
    className: _className
  }, rest));
}); // This is used in `input-group.tsx`

InputLeftElement.id = "InputLeftElement";

var InputRightElement = /*#__PURE__*/forwardRef(function (props, ref) {
  var className = props.className,
      rest = _objectWithoutPropertiesLoose$4(props, _excluded3);

  var _className = cx("chakra-input__right-element", className);

  return /*#__PURE__*/react.createElement(InputElement, _extends$7({
    ref: ref,
    placement: "right",
    className: _className
  }, rest));
}); // This is used in `input-group.tsx`

InputRightElement.id = "InputRightElement";

function _extends$8() {
  _extends$8 = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends$8.apply(this, arguments);
}

function _objectWithoutPropertiesLoose$5(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

var _excluded$f = ["size", "centerContent"],
    _excluded2$5 = ["size"];

/**
 * Box is the most abstract component on top of which other chakra
 * components are built. It renders a `div` element by default.
 *
 * @see Docs https://chakra-ui.com/box
 */
var Box = chakra("div");
/**
 * As a constraint, you can't pass size related props
 * Only `size` would be allowed
 */


var Square = /*#__PURE__*/forwardRef(function (props, ref) {
  var size = props.size,
      _props$centerContent = props.centerContent,
      centerContent = _props$centerContent === void 0 ? true : _props$centerContent,
      rest = _objectWithoutPropertiesLoose$5(props, _excluded$f);

  var styles = centerContent ? {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  } : {};
  return /*#__PURE__*/react.createElement(Box, _extends$8({
    ref: ref,
    boxSize: size,
    __css: _extends$8({}, styles, {
      flexShrink: 0,
      flexGrow: 0
    })
  }, rest));
});

var Circle = /*#__PURE__*/forwardRef(function (props, ref) {
  var size = props.size,
      rest = _objectWithoutPropertiesLoose$5(props, _excluded2$5);

  return /*#__PURE__*/react.createElement(Square, _extends$8({
    size: size,
    ref: ref,
    borderRadius: "9999px"
  }, rest));
});

/**
 * React component used to horizontally and vertically center its child.
 * It uses the popular `display: flex` centering technique.
 *
 * @see Docs https://chakra-ui.com/center
 */
var Center = chakra("div", {
  baseStyle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
});

var _excluded$c = ["className", "centerContent"];

/**
 * Layout component used to wrap app or website content
 *
 * It sets `margin-left` and `margin-right` to `auto`,
 * to keep its content centered.
 *
 * It also sets a default max-width of `60ch` (60 characters).
 */
var Container$1 = /*#__PURE__*/forwardRef(function (props, ref) {
  var _omitThemingProps = omitThemingProps(props),
      className = _omitThemingProps.className,
      centerContent = _omitThemingProps.centerContent,
      rest = _objectWithoutPropertiesLoose$5(_omitThemingProps, _excluded$c);

  var styles = useStyleConfig("Container", props);
  return /*#__PURE__*/react.createElement(chakra.div, _extends$8({
    ref: ref,
    className: cx("chakra-container", className)
  }, rest, {
    __css: _extends$8({}, styles, centerContent && {
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    })
  }));
});

var _excluded$a = ["direction", "align", "justify", "wrap", "basis", "grow", "shrink"];

/**
 * React component used to create flexbox layouts.
 *
 * It renders a `div` with `display: flex` and
 * comes with helpful style shorthand.
 *
 * @see Docs https://chakra-ui.com/flex
 */
var Flex = /*#__PURE__*/forwardRef(function (props, ref) {
  var direction = props.direction,
      align = props.align,
      justify = props.justify,
      wrap = props.wrap,
      basis = props.basis,
      grow = props.grow,
      shrink = props.shrink,
      rest = _objectWithoutPropertiesLoose$5(props, _excluded$a);

  var styles = {
    display: "flex",
    flexDirection: direction,
    alignItems: align,
    justifyContent: justify,
    flexWrap: wrap,
    flexBasis: basis,
    flexGrow: grow,
    flexShrink: shrink
  };
  return /*#__PURE__*/react.createElement(chakra.div, _extends$8({
    ref: ref,
    __css: styles
  }, rest));
});

var _excluded$8$1 = ["className"];
var Heading$1 = /*#__PURE__*/forwardRef(function (props, ref) {
  var styles = useStyleConfig("Heading", props);

  var _omitThemingProps = omitThemingProps(props);
      var rest = _objectWithoutPropertiesLoose$5(_omitThemingProps, _excluded$8$1);

  return /*#__PURE__*/react.createElement(chakra.h2, _extends$8({
    ref: ref,
    className: cx("chakra-heading", props.className)
  }, rest, {
    __css: styles
  }));
});

var _excluded$6$1 = ["className", "isExternal"];

/**
 * Links are accessible elements used primarily for navigation.
 *
 * It integrates well with other routing libraries like
 * React Router, Reach Router and Next.js Link.
 *
 * @example
 *
 * ```jsx
 * <Link as={ReactRouterLink} to="/home">Home</Link>
 * ```
 *
 * @see Docs https://chakra-ui.com/link
 */
var Link$1 = /*#__PURE__*/forwardRef(function (props, ref) {
  var styles = useStyleConfig("Link", props);

  var _omitThemingProps = omitThemingProps(props),
      className = _omitThemingProps.className,
      isExternal = _omitThemingProps.isExternal,
      rest = _objectWithoutPropertiesLoose$5(_omitThemingProps, _excluded$6$1);

  return /*#__PURE__*/react.createElement(chakra.a, _extends$8({
    target: isExternal ? "_blank" : undefined,
    rel: isExternal ? "noopener noreferrer" : undefined,
    ref: ref,
    className: cx("chakra-link", className)
  }, rest, {
    __css: styles
  }));
});

/**
 * A flexible flex spacer that expands along the major axis of its containing flex layout.
 * It renders a `div` by default, and takes up any available space.
 *
 * @see Docs https://chakra-ui.com/flex#using-the-spacer
 */
var Spacer = chakra("div", {
  baseStyle: {
    flex: 1,
    justifySelf: "stretch",
    alignSelf: "stretch"
  }
});

/**
 * If we ever run into SSR issues with this, check this post to find a fix for it:
 * @see https://medium.com/@emmenko/patching-lobotomized-owl-selector-for-emotion-ssr-5a582a3c424c
 */
var selector = "& > *:not(style) ~ *:not(style)";
function getStackStyles(options) {
  var _ref;

  var spacing = options.spacing,
      direction = options.direction;
  var directionStyles = {
    column: {
      marginTop: spacing,
      marginEnd: 0,
      marginBottom: 0,
      marginStart: 0
    },
    row: {
      marginTop: 0,
      marginEnd: 0,
      marginBottom: 0,
      marginStart: spacing
    },
    "column-reverse": {
      marginTop: 0,
      marginEnd: 0,
      marginBottom: spacing,
      marginStart: 0
    },
    "row-reverse": {
      marginTop: 0,
      marginEnd: spacing,
      marginBottom: 0,
      marginStart: 0
    }
  };
  return _ref = {
    flexDirection: direction
  }, _ref[selector] = mapResponsive(direction, function (value) {
    return directionStyles[value];
  }), _ref;
}
function getDividerStyles(options) {
  var spacing = options.spacing,
      direction = options.direction;
  var dividerStyles = {
    column: {
      my: spacing,
      mx: 0,
      borderLeftWidth: 0,
      borderBottomWidth: "1px"
    },
    "column-reverse": {
      my: spacing,
      mx: 0,
      borderLeftWidth: 0,
      borderBottomWidth: "1px"
    },
    row: {
      mx: spacing,
      my: 0,
      borderLeftWidth: "1px",
      borderBottomWidth: 0
    },
    "row-reverse": {
      mx: spacing,
      my: 0,
      borderLeftWidth: "1px",
      borderBottomWidth: 0
    }
  };
  return {
    "&": mapResponsive(direction, function (value) {
      return dividerStyles[value];
    })
  };
}

var _excluded$3$1 = ["isInline", "direction", "align", "justify", "spacing", "wrap", "children", "divider", "className", "shouldWrapChildren"];
var StackDivider = function StackDivider(props) {
  return /*#__PURE__*/react.createElement(chakra.div, _extends$8({
    className: "chakra-stack__divider"
  }, props, {
    __css: _extends$8({}, props["__css"], {
      borderWidth: 0,
      alignSelf: "stretch",
      borderColor: "inherit",
      width: "auto",
      height: "auto"
    })
  }));
};
var StackItem = function StackItem(props) {
  return /*#__PURE__*/react.createElement(chakra.div, _extends$8({
    className: "chakra-stack__item"
  }, props, {
    __css: _extends$8({
      display: "inline-block",
      flex: "0 0 auto",
      minWidth: 0
    }, props["__css"])
  }));
};

/**
 * Stacks help you easily create flexible and automatically distributed layouts
 *
 * You can stack elements in the horizontal or vertical direction,
 * and apply a space or/and divider between each element.
 *
 * It uses `display: flex` internally and renders a `div`.
 *
 * @see Docs https://chakra-ui.com/stack
 *
 */
var Stack = /*#__PURE__*/forwardRef(function (props, ref) {
  var _ref;

  var isInline = props.isInline,
      directionProp = props.direction,
      align = props.align,
      justify = props.justify,
      _props$spacing = props.spacing,
      spacing = _props$spacing === void 0 ? "0.5rem" : _props$spacing,
      wrap = props.wrap,
      children = props.children,
      divider = props.divider,
      className = props.className,
      shouldWrapChildren = props.shouldWrapChildren,
      rest = _objectWithoutPropertiesLoose$5(props, _excluded$3$1);

  var direction = isInline ? "row" : directionProp != null ? directionProp : "column";
  var styles = react.useMemo(function () {
    return getStackStyles({
      direction: direction,
      spacing: spacing
    });
  }, [direction, spacing]);
  var dividerStyle = react.useMemo(function () {
    return getDividerStyles({
      spacing: spacing,
      direction: direction
    });
  }, [spacing, direction]);
  var hasDivider = !!divider;
  var shouldUseChildren = !shouldWrapChildren && !hasDivider;
  var validChildren = getValidChildren(children);
  var clones = shouldUseChildren ? validChildren : validChildren.map(function (child, index) {
    // Prefer provided child key, fallback to index
    var key = typeof child.key !== "undefined" ? child.key : index;
    var isLast = index + 1 === validChildren.length;
    var wrappedChild = /*#__PURE__*/react.createElement(StackItem, {
      key: key
    }, child);

    var _child = shouldWrapChildren ? wrappedChild : child;

    if (!hasDivider) return _child;
    var clonedDivider = /*#__PURE__*/react.cloneElement(divider, {
      __css: dividerStyle
    });

    var _divider = isLast ? null : clonedDivider;

    return /*#__PURE__*/react.createElement(react.Fragment, {
      key: key
    }, _child, _divider);
  });

  var _className = cx("chakra-stack", className);

  return /*#__PURE__*/react.createElement(chakra.div, _extends$8({
    ref: ref,
    display: "flex",
    alignItems: align,
    justifyContent: justify,
    flexDirection: styles.flexDirection,
    flexWrap: wrap,
    className: _className,
    __css: hasDivider ? {} : (_ref = {}, _ref[selector] = styles[selector], _ref)
  }, rest), clones);
});
/**
 * A view that arranges its children in a vertical line.
 */


var VStack = /*#__PURE__*/forwardRef(function (props, ref) {
  return /*#__PURE__*/react.createElement(Stack, _extends$8({
    align: "center"
  }, props, {
    direction: "column",
    ref: ref
  }));
});

var _excluded$2$4 = ["className", "align", "decoration", "casing"];

/**
 * Used to render texts or paragraphs.
 *
 * @see Docs https://chakra-ui.com/text
 */
var Text = /*#__PURE__*/forwardRef(function (props, ref) {
  var styles = useStyleConfig("Text", props);

  var _omitThemingProps = omitThemingProps(props);
      var rest = _objectWithoutPropertiesLoose$5(_omitThemingProps, _excluded$2$4);

  var aliasedProps = filterUndefined({
    textAlign: props.align,
    textDecoration: props.decoration,
    textTransform: props.casing
  });
  return /*#__PURE__*/react.createElement(chakra.p, _extends$8({
    ref: ref,
    className: cx("chakra-text", props.className)
  }, aliasedProps, rest, {
    __css: styles
  }));
});

function _objectWithoutPropertiesLoose$6(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _extends$9() {
  _extends$9 = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends$9.apply(this, arguments);
}

var toVar$1 = function toVar(value, fallback) {
  return {
    "var": value,
    varRef: fallback ? "var(" + value + ", " + fallback + ")" : "var(" + value + ")"
  };
};

var cssVars = {
  arrowShadowColor: toVar$1("--popper-arrow-shadow-color"),
  arrowSize: toVar$1("--popper-arrow-size", "8px"),
  arrowSizeHalf: toVar$1("--popper-arrow-size-half"),
  arrowBg: toVar$1("--popper-arrow-bg"),
  transformOrigin: toVar$1("--popper-transform-origin"),
  arrowOffset: toVar$1("--popper-arrow-offset")
};
function getBoxShadow(placement) {
  if (placement.includes("top")) return "1px 1px 1px 0 var(--popper-arrow-shadow-color)";
  if (placement.includes("bottom")) return "-1px -1px 1px 0 var(--popper-arrow-shadow-color)";
  if (placement.includes("right")) return "-1px 1px 1px 0 var(--popper-arrow-shadow-color)";
  if (placement.includes("left")) return "1px -1px 1px 0 var(--popper-arrow-shadow-color)";
}
var transforms = {
  top: "bottom center",
  "top-start": "bottom left",
  "top-end": "bottom right",
  bottom: "top center",
  "bottom-start": "top left",
  "bottom-end": "top right",
  left: "right center",
  "left-start": "right top",
  "left-end": "right bottom",
  right: "left center",
  "right-start": "left top",
  "right-end": "left bottom"
};
var toTransformOrigin = function toTransformOrigin(placement) {
  return transforms[placement];
};
var defaultEventListeners = {
  scroll: true,
  resize: true
};
function getEventListenerOptions(value) {
  var eventListeners;

  if (typeof value === "object") {
    eventListeners = {
      enabled: true,
      options: _extends$9({}, defaultEventListeners, value)
    };
  } else {
    eventListeners = {
      enabled: value,
      options: defaultEventListeners
    };
  }

  return eventListeners;
}

/* -------------------------------------------------------------------------------------------------
 The match width modifier sets the popper width to match the reference.
 It us useful for custom selects, autocomplete, etc.
* -----------------------------------------------------------------------------------------------*/

var matchWidth = {
  name: "matchWidth",
  enabled: true,
  phase: "beforeWrite",
  requires: ["computeStyles"],
  fn: function fn(_ref) {
    var state = _ref.state;
    state.styles.popper.width = state.rects.reference.width + "px";
  },
  effect: function effect(_ref2) {
    var state = _ref2.state;
    return function () {
      var reference = state.elements.reference;
      state.elements.popper.style.width = reference.offsetWidth + "px";
    };
  }
};
/* -------------------------------------------------------------------------------------------------
  The transform origin modifier sets the css `transformOrigin` value of the popper
  based on the dynamic placement state of the popper.
  
  Useful when we need to animate/transition the popper.
* -----------------------------------------------------------------------------------------------*/

var transformOrigin = {
  name: "transformOrigin",
  enabled: true,
  phase: "write",
  fn: function fn(_ref3) {
    var state = _ref3.state;
    setTransformOrigin(state);
  },
  effect: function effect(_ref4) {
    var state = _ref4.state;
    return function () {
      setTransformOrigin(state);
    };
  }
};

var setTransformOrigin = function setTransformOrigin(state) {
  state.elements.popper.style.setProperty(cssVars.transformOrigin["var"], toTransformOrigin(state.placement));
};
/* -------------------------------------------------------------------------------------------------
  The position arrow modifier adds width, height and overrides the `top/left/right/bottom`
  styles generated by popper.js to properly position the arrow
* -----------------------------------------------------------------------------------------------*/


var positionArrow = {
  name: "positionArrow",
  enabled: true,
  phase: "afterWrite",
  fn: function fn(_ref5) {
    var state = _ref5.state;
    setArrowStyles(state);
  }
};

var setArrowStyles = function setArrowStyles(state) {
  var _state$elements;

  if (!state.placement) return;
  var overrides = getArrowStyle$1(state.placement);

  if ((_state$elements = state.elements) != null && _state$elements.arrow && overrides) {
    var _Object$assign, _vars;

    Object.assign(state.elements.arrow.style, (_Object$assign = {}, _Object$assign[overrides.property] = overrides.value, _Object$assign.width = cssVars.arrowSize.varRef, _Object$assign.height = cssVars.arrowSize.varRef, _Object$assign.zIndex = -1, _Object$assign));
    var vars = (_vars = {}, _vars[cssVars.arrowSizeHalf["var"]] = "calc(" + cssVars.arrowSize.varRef + " / 2)", _vars[cssVars.arrowOffset["var"]] = "calc(" + cssVars.arrowSizeHalf.varRef + " * -1)", _vars);

    for (var property in vars) {
      state.elements.arrow.style.setProperty(property, vars[property]);
    }
  }
};

var getArrowStyle$1 = function getArrowStyle(placement) {
  if (placement.startsWith("top")) {
    return {
      property: "bottom",
      value: cssVars.arrowOffset.varRef
    };
  }

  if (placement.startsWith("bottom")) {
    return {
      property: "top",
      value: cssVars.arrowOffset.varRef
    };
  }

  if (placement.startsWith("left")) {
    return {
      property: "right",
      value: cssVars.arrowOffset.varRef
    };
  }

  if (placement.startsWith("right")) {
    return {
      property: "left",
      value: cssVars.arrowOffset.varRef
    };
  }
};
/* -------------------------------------------------------------------------------------------------
  The inner arrow modifier, sets the placement styles for the inner arrow that forms
  the popper arrow tip.
* -----------------------------------------------------------------------------------------------*/


var innerArrow = {
  name: "innerArrow",
  enabled: true,
  phase: "main",
  requires: ["arrow"],
  fn: function fn(_ref6) {
    var state = _ref6.state;
    setInnerArrowStyles(state);
  },
  effect: function effect(_ref7) {
    var state = _ref7.state;
    return function () {
      setInnerArrowStyles(state);
    };
  }
};

var setInnerArrowStyles = function setInnerArrowStyles(state) {
  if (!state.elements.arrow) return;
  var inner = state.elements.arrow.querySelector("[data-popper-arrow-inner]");
  if (!inner) return;
  Object.assign(inner.style, {
    transform: "rotate(45deg)",
    background: cssVars.arrowBg.varRef,
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    position: "absolute",
    zIndex: "inherit",
    boxShadow: getBoxShadow(state.placement)
  });
};

var logicals = {
  "start-start": {
    ltr: "left-start",
    rtl: "right-start"
  },
  "start-end": {
    ltr: "left-end",
    rtl: "right-end"
  },
  "end-start": {
    ltr: "right-start",
    rtl: "left-start"
  },
  "end-end": {
    ltr: "right-end",
    rtl: "left-end"
  },
  start: {
    ltr: "left",
    rtl: "right"
  },
  end: {
    ltr: "right",
    rtl: "left"
  }
};
var opposites = {
  "auto-start": "auto-end",
  "auto-end": "auto-start",
  "top-start": "top-end",
  "top-end": "top-start",
  "bottom-start": "bottom-end",
  "bottom-end": "bottom-start"
};
function getPopperPlacement(placement, dir) {
  var _logicals$placement, _opposites$placement;

  if (dir === void 0) {
    dir = "ltr";
  }

  var value = ((_logicals$placement = logicals[placement]) == null ? void 0 : _logicals$placement[dir]) || placement;
  if (dir === "ltr") return value;
  return (_opposites$placement = opposites[placement]) != null ? _opposites$placement : value;
}

var _excluded$9 = ["size", "shadowColor", "bg", "style"];
function usePopper(props) {
  if (props === void 0) {
    props = {};
  }

  var _props = props,
      _props$enabled = _props.enabled,
      enabled = _props$enabled === void 0 ? true : _props$enabled,
      modifiers = _props.modifiers,
      _props$placement = _props.placement,
      placementProp = _props$placement === void 0 ? "bottom" : _props$placement,
      _props$strategy = _props.strategy,
      strategy = _props$strategy === void 0 ? "absolute" : _props$strategy,
      _props$arrowPadding = _props.arrowPadding,
      arrowPadding = _props$arrowPadding === void 0 ? 8 : _props$arrowPadding,
      _props$eventListeners = _props.eventListeners,
      eventListeners = _props$eventListeners === void 0 ? true : _props$eventListeners,
      offset = _props.offset,
      _props$gutter = _props.gutter,
      gutter = _props$gutter === void 0 ? 8 : _props$gutter,
      _props$flip = _props.flip,
      flip = _props$flip === void 0 ? true : _props$flip,
      _props$boundary = _props.boundary,
      boundary = _props$boundary === void 0 ? "clippingParents" : _props$boundary,
      _props$preventOverflo = _props.preventOverflow,
      preventOverflow = _props$preventOverflo === void 0 ? true : _props$preventOverflo,
      matchWidth$1 = _props.matchWidth,
      _props$direction = _props.direction,
      direction = _props$direction === void 0 ? "ltr" : _props$direction;
  var reference = react.useRef(null);
  var popper = react.useRef(null);
  var instance = react.useRef(null);
  var placement = getPopperPlacement(placementProp, direction);
  var cleanup = react.useRef(function () {});
  var setupPopper = react.useCallback(function () {
    if (!enabled || !reference.current || !popper.current) return; // If popper instance exists, destroy it so we can create a new one

    cleanup.current == null ? void 0 : cleanup.current();
    instance.current = createPopper(reference.current, popper.current, {
      placement: placement,
      modifiers: [innerArrow, positionArrow, transformOrigin, _extends$9({}, matchWidth, {
        enabled: !!matchWidth$1
      }), _extends$9({
        name: "eventListeners"
      }, getEventListenerOptions(eventListeners)), {
        name: "arrow",
        options: {
          padding: arrowPadding
        }
      }, {
        name: "offset",
        options: {
          offset: offset != null ? offset : [0, gutter]
        }
      }, {
        name: "flip",
        enabled: !!flip,
        options: {
          padding: 8
        }
      }, {
        name: "preventOverflow",
        enabled: !!preventOverflow,
        options: {
          boundary: boundary
        }
      }].concat(modifiers != null ? modifiers : []),
      strategy: strategy
    }); // force update one-time to fix any positioning issues

    instance.current.forceUpdate();
    cleanup.current = instance.current.destroy;
  }, [placement, enabled, modifiers, matchWidth$1, eventListeners, arrowPadding, offset, gutter, flip, preventOverflow, boundary, strategy]);
  react.useEffect(function () {
    return function () {
      /**
       * Fast refresh might call this function and tear down the popper
       * even if the reference still exists. This checks against that
       */
      if (!reference.current && !popper.current) {
        var _instance$current;

        (_instance$current = instance.current) == null ? void 0 : _instance$current.destroy();
        instance.current = null;
      }
    };
  }, []);
  var referenceRef = react.useCallback(function (node) {
    reference.current = node;
    setupPopper();
  }, [setupPopper]);
  var getReferenceProps = react.useCallback(function (props, ref) {
    if (props === void 0) {
      props = {};
    }

    if (ref === void 0) {
      ref = null;
    }

    return _extends$9({}, props, {
      ref: mergeRefs(referenceRef, ref)
    });
  }, [referenceRef]);
  var popperRef = react.useCallback(function (node) {
    popper.current = node;
    setupPopper();
  }, [setupPopper]);
  var getPopperProps = react.useCallback(function (props, ref) {
    if (props === void 0) {
      props = {};
    }

    if (ref === void 0) {
      ref = null;
    }

    return _extends$9({}, props, {
      ref: mergeRefs(popperRef, ref),
      style: _extends$9({}, props.style, {
        position: strategy,
        minWidth: "max-content",
        inset: "0 auto auto 0"
      })
    });
  }, [strategy, popperRef]);
  var getArrowProps = react.useCallback(function (props, ref) {
    if (props === void 0) {
      props = {};
    }

    if (ref === void 0) {
      ref = null;
    }

    var _props2 = props;
        _props2.size;
        _props2.shadowColor;
        _props2.bg;
        _props2.style;
        var rest = _objectWithoutPropertiesLoose$6(_props2, _excluded$9);

    return _extends$9({}, rest, {
      ref: ref,
      "data-popper-arrow": "",
      style: getArrowStyle(props)
    });
  }, []);
  var getArrowInnerProps = react.useCallback(function (props, ref) {
    if (props === void 0) {
      props = {};
    }

    if (ref === void 0) {
      ref = null;
    }

    return _extends$9({}, props, {
      ref: ref,
      "data-popper-arrow-inner": ""
    });
  }, []);
  return {
    update: function update() {
      var _instance$current2;

      (_instance$current2 = instance.current) == null ? void 0 : _instance$current2.update();
    },
    forceUpdate: function forceUpdate() {
      var _instance$current3;

      (_instance$current3 = instance.current) == null ? void 0 : _instance$current3.forceUpdate();
    },
    transformOrigin: cssVars.transformOrigin.varRef,
    referenceRef: referenceRef,
    popperRef: popperRef,
    getPopperProps: getPopperProps,
    getArrowProps: getArrowProps,
    getArrowInnerProps: getArrowInnerProps,
    getReferenceProps: getReferenceProps
  };
}

function getArrowStyle(props) {
  var size = props.size,
      shadowColor = props.shadowColor,
      bg = props.bg,
      style = props.style;

  var computedStyle = _extends$9({}, style, {
    position: "absolute"
  });

  if (size) {
    computedStyle["--popper-arrow-size"] = size;
  }

  if (shadowColor) {
    computedStyle["--popper-arrow-shadow-color"] = shadowColor;
  }

  if (bg) {
    computedStyle["--popper-arrow-bg"] = bg;
  }

  return computedStyle;
}

function _extends$a() {
  _extends$a = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends$a.apply(this, arguments);
}

function _objectWithoutPropertiesLoose$7(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

var _createContext$5 = createContext({
  name: "PopoverContext",
  errorMessage: "usePopoverContext: `context` is undefined. Seems you forgot to wrap all popover components within `<Popover />`"
}),
    PopoverProvider = _createContext$5[0],
    usePopoverContext = _createContext$5[1];

var mergeVariants = function mergeVariants(variants) {
  if (!variants) return;
  return lodash_mergewith(variants, {
    enter: {
      visibility: "visible"
    },
    exit: {
      transitionEnd: {
        visibility: "hidden"
      }
    }
  });
};

var scaleFade = {
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 0.1,
      ease: [0.4, 0, 1, 1]
    }
  },
  enter: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.15,
      ease: [0, 0, 0.2, 1]
    }
  }
};
var Section = motion(chakra.section);
var PopoverTransition = /*#__PURE__*/react.forwardRef(function (props, ref) {
  var _usePopoverContext = usePopoverContext(),
      isOpen = _usePopoverContext.isOpen;

  return /*#__PURE__*/react.createElement(Section, _extends$a({
    ref: ref,
    variants: mergeVariants(props.variants)
  }, props, {
    initial: false,
    animate: isOpen ? "enter" : "exit"
  }));
});
PopoverTransition.defaultProps = {
  variants: scaleFade
};

var _excluded$1$3 = ["closeOnBlur", "closeOnEsc", "initialFocusRef", "id", "returnFocusOnClose", "autoFocus", "arrowSize", "arrowShadowColor", "trigger", "openDelay", "closeDelay", "isLazy", "lazyBehavior", "computePositionOnMount"];
var TRIGGER = {
  click: "click",
  hover: "hover"
};

/**
 * @internal
 */
function usePopover(props) {
  if (props === void 0) {
    props = {};
  }

  var _props = props,
      _props$closeOnBlur = _props.closeOnBlur,
      closeOnBlur = _props$closeOnBlur === void 0 ? true : _props$closeOnBlur,
      _props$closeOnEsc = _props.closeOnEsc,
      closeOnEsc = _props$closeOnEsc === void 0 ? true : _props$closeOnEsc,
      initialFocusRef = _props.initialFocusRef,
      id = _props.id,
      _props$returnFocusOnC = _props.returnFocusOnClose,
      returnFocusOnClose = _props$returnFocusOnC === void 0 ? true : _props$returnFocusOnC,
      _props$autoFocus = _props.autoFocus,
      autoFocus = _props$autoFocus === void 0 ? true : _props$autoFocus,
      arrowSize = _props.arrowSize,
      arrowShadowColor = _props.arrowShadowColor,
      _props$trigger = _props.trigger,
      trigger = _props$trigger === void 0 ? TRIGGER.click : _props$trigger,
      _props$openDelay = _props.openDelay,
      openDelay = _props$openDelay === void 0 ? 200 : _props$openDelay,
      _props$closeDelay = _props.closeDelay,
      closeDelay = _props$closeDelay === void 0 ? 200 : _props$closeDelay,
      isLazy = _props.isLazy,
      _props$lazyBehavior = _props.lazyBehavior,
      lazyBehavior = _props$lazyBehavior === void 0 ? "unmount" : _props$lazyBehavior,
      computePositionOnMount = _props.computePositionOnMount,
      popperProps = _objectWithoutPropertiesLoose$7(_props, _excluded$1$3);

  var _useDisclosure = useDisclosure(props),
      isOpen = _useDisclosure.isOpen,
      onClose = _useDisclosure.onClose,
      onOpen = _useDisclosure.onOpen,
      onToggle = _useDisclosure.onToggle;

  var anchorRef = react.useRef(null);
  var triggerRef = react.useRef(null);
  var popoverRef = react.useRef(null);
  var isHoveringRef = react.useRef(false);
  var hasBeenOpened = react.useRef(false);

  if (isOpen) {
    hasBeenOpened.current = true;
  }

  var _useState = react.useState(false),
      hasHeader = _useState[0],
      setHasHeader = _useState[1];

  var _useState2 = react.useState(false),
      hasBody = _useState2[0],
      setHasBody = _useState2[1];

  var _useIds = useIds(id, "popover-trigger", "popover-content", "popover-header", "popover-body"),
      triggerId = _useIds[0],
      popoverId = _useIds[1],
      headerId = _useIds[2],
      bodyId = _useIds[3];

  var _usePopper = usePopper(_extends$a({}, popperProps, {
    enabled: isOpen || !!computePositionOnMount
  })),
      referenceRef = _usePopper.referenceRef,
      getArrowProps = _usePopper.getArrowProps,
      getPopperProps = _usePopper.getPopperProps,
      getArrowInnerProps = _usePopper.getArrowInnerProps,
      forceUpdate = _usePopper.forceUpdate;

  useFocusOnPointerDown({
    enabled: isOpen,
    ref: triggerRef
  });
  useFocusOnHide(popoverRef, {
    focusRef: triggerRef,
    visible: isOpen,
    shouldFocus: returnFocusOnClose && trigger === TRIGGER.click
  });
  useFocusOnShow(popoverRef, {
    focusRef: initialFocusRef,
    visible: isOpen,
    shouldFocus: autoFocus && trigger === TRIGGER.click
  });
  var shouldRenderChildren = determineLazyBehavior({
    hasBeenSelected: hasBeenOpened.current,
    isLazy: isLazy,
    lazyBehavior: lazyBehavior,
    isSelected: isOpen
  });
  var getPopoverProps = react.useCallback(function (props, _ref) {
    var _extends2;

    if (props === void 0) {
      props = {};
    }

    if (_ref === void 0) {
      _ref = null;
    }

    var popoverProps = _extends$a({}, props, {
      style: _extends$a({}, props.style, (_extends2 = {
        transformOrigin: cssVars.transformOrigin.varRef
      }, _extends2[cssVars.arrowSize["var"]] = arrowSize ? px$1(arrowSize) : undefined, _extends2[cssVars.arrowShadowColor["var"]] = arrowShadowColor, _extends2)),
      ref: mergeRefs(popoverRef, _ref),
      children: shouldRenderChildren ? props.children : null,
      id: popoverId,
      tabIndex: -1,
      role: "dialog",
      onKeyDown: callAllHandlers(props.onKeyDown, function (event) {
        if (closeOnEsc && event.key === "Escape") {
          onClose();
        }
      }),
      onBlur: callAllHandlers(props.onBlur, function (event) {
        var relatedTarget = getRelatedTarget(event);
        var targetIsPopover = contains(popoverRef.current, relatedTarget);
        var targetIsTrigger = contains(triggerRef.current, relatedTarget);
        var isValidBlur = !targetIsPopover && !targetIsTrigger;

        if (isOpen && closeOnBlur && isValidBlur) {
          onClose();
        }
      }),
      "aria-labelledby": hasHeader ? headerId : undefined,
      "aria-describedby": hasBody ? bodyId : undefined
    });

    if (trigger === TRIGGER.hover) {
      popoverProps.role = "tooltip";
      popoverProps.onMouseEnter = callAllHandlers(props.onMouseEnter, function () {
        isHoveringRef.current = true;
      });
      popoverProps.onMouseLeave = callAllHandlers(props.onMouseLeave, function () {
        isHoveringRef.current = false;
        setTimeout(onClose, closeDelay);
      });
    }

    return popoverProps;
  }, [shouldRenderChildren, popoverId, hasHeader, headerId, hasBody, bodyId, trigger, closeOnEsc, onClose, isOpen, closeOnBlur, closeDelay, arrowShadowColor, arrowSize]);
  var getPopoverPositionerProps = react.useCallback(function (props, forwardedRef) {
    if (props === void 0) {
      props = {};
    }

    if (forwardedRef === void 0) {
      forwardedRef = null;
    }

    return getPopperProps(_extends$a({}, props, {
      style: _extends$a({
        visibility: isOpen ? "visible" : "hidden"
      }, props.style)
    }), forwardedRef);
  }, [isOpen, getPopperProps]);
  var getAnchorProps = react.useCallback(function (props, _ref) {
    if (_ref === void 0) {
      _ref = null;
    }

    var anchorProps = _extends$a({}, props, {
      // If anchor is rendered, it is used as reference.
      ref: mergeRefs(_ref, anchorRef, referenceRef)
    });

    return anchorProps;
  }, [anchorRef, referenceRef]);
  var openTimeout = react.useRef();
  var closeTimeout = react.useRef();
  var maybeReferenceRef = react.useCallback(function (node) {
    // Don't override referenceRef in case the PopoverAnchor is rendered.
    if (anchorRef.current == null) {
      referenceRef(node);
    }
  }, [referenceRef]);
  var getTriggerProps = react.useCallback(function (props, _ref) {
    if (props === void 0) {
      props = {};
    }

    if (_ref === void 0) {
      _ref = null;
    }

    var triggerProps = _extends$a({}, props, {
      ref: mergeRefs(triggerRef, _ref, maybeReferenceRef),
      id: triggerId,
      "aria-haspopup": "dialog",
      "aria-expanded": isOpen,
      "aria-controls": popoverId
    });

    if (trigger === TRIGGER.click) {
      triggerProps.onClick = callAllHandlers(props.onClick, onToggle);
    }

    if (trigger === TRIGGER.hover) {
      /**
       * Any content that shows on pointer hover should also show on keyboard focus.
       * Consider focus and blur to be the `hover` for keyboard users.
       *
       * @see https://www.w3.org/WAI/WCAG21/Understanding/content-on-hover-or-focus.html
       */
      triggerProps.onFocus = callAllHandlers(props.onFocus, onOpen);
      triggerProps.onBlur = callAllHandlers(props.onBlur, function (event) {
        var relatedTarget = getRelatedTarget(event);
        var isValidBlur = !contains(popoverRef.current, relatedTarget);

        if (isOpen && closeOnBlur && isValidBlur) {
          onClose();
        }
      });
      /**
       * Any content that shows on hover or focus must be dismissible.
       * This case pressing `Escape` will dismiss the popover
       */

      triggerProps.onKeyDown = callAllHandlers(props.onKeyDown, function (event) {
        if (event.key === "Escape") {
          onClose();
        }
      });
      triggerProps.onMouseEnter = callAllHandlers(props.onMouseEnter, function () {
        isHoveringRef.current = true;
        openTimeout.current = window.setTimeout(onOpen, openDelay);
      });
      triggerProps.onMouseLeave = callAllHandlers(props.onMouseLeave, function () {
        isHoveringRef.current = false;

        if (openTimeout.current) {
          clearTimeout(openTimeout.current);
          openTimeout.current = undefined;
        }

        closeTimeout.current = window.setTimeout(function () {
          if (isHoveringRef.current === false) {
            onClose();
          }
        }, closeDelay);
      });
    }

    return triggerProps;
  }, [triggerId, isOpen, popoverId, trigger, maybeReferenceRef, onToggle, onOpen, closeOnBlur, onClose, openDelay, closeDelay]);
  react.useEffect(function () {
    return function () {
      if (openTimeout.current) {
        clearTimeout(openTimeout.current);
      }

      if (closeTimeout.current) {
        clearTimeout(closeTimeout.current);
      }
    };
  }, []);
  var getHeaderProps = react.useCallback(function (props, ref) {
    if (props === void 0) {
      props = {};
    }

    if (ref === void 0) {
      ref = null;
    }

    return _extends$a({}, props, {
      id: headerId,
      ref: mergeRefs(ref, function (node) {
        setHasHeader(!!node);
      })
    });
  }, [headerId]);
  var getBodyProps = react.useCallback(function (props, ref) {
    if (props === void 0) {
      props = {};
    }

    if (ref === void 0) {
      ref = null;
    }

    return _extends$a({}, props, {
      id: bodyId,
      ref: mergeRefs(ref, function (node) {
        setHasBody(!!node);
      })
    });
  }, [bodyId]);
  return {
    forceUpdate: forceUpdate,
    isOpen: isOpen,
    onClose: onClose,
    getAnchorProps: getAnchorProps,
    getArrowProps: getArrowProps,
    getArrowInnerProps: getArrowInnerProps,
    getPopoverPositionerProps: getPopoverPositionerProps,
    getPopoverProps: getPopoverProps,
    getTriggerProps: getTriggerProps,
    getHeaderProps: getHeaderProps,
    getBodyProps: getBodyProps
  };
}

var _excluded$b = ["children"],
    _excluded2$3 = ["rootProps"];

/**
 * Popover is used to bring attention to specific user interface elements,
 * typically to suggest an action or to guide users through a new experience.
 */
var Popover$1 = function Popover(props) {
  var styles = useMultiStyleConfig("Popover", props);

  var _omitThemingProps = omitThemingProps(props),
      children = _omitThemingProps.children,
      rest = _objectWithoutPropertiesLoose$7(_omitThemingProps, _excluded$b);

  var theme = useTheme();
  var context = usePopover(_extends$a({}, rest, {
    direction: theme.direction
  }));
  return /*#__PURE__*/react.createElement(PopoverProvider, {
    value: context
  }, /*#__PURE__*/react.createElement(StylesProvider, {
    value: styles
  }, runIfFn(children, {
    isOpen: context.isOpen,
    onClose: context.onClose,
    forceUpdate: context.forceUpdate
  })));
};
/**
 * PopoverTrigger opens the popover's content. It must be an interactive element
 * such as `button` or `a`.
 */


var PopoverTrigger = function PopoverTrigger(props) {
  // enforce a single child
  var child = react.Children.only(props.children);

  var _usePopoverContext2 = usePopoverContext(),
      getTriggerProps = _usePopoverContext2.getTriggerProps;

  return /*#__PURE__*/react.cloneElement(child, getTriggerProps(child.props, child.ref));
};

var PopoverContent = /*#__PURE__*/forwardRef(function (props, ref) {
  var rootProps = props.rootProps,
      contentProps = _objectWithoutPropertiesLoose$7(props, _excluded2$3);

  var _usePopoverContext3 = usePopoverContext(),
      getPopoverProps = _usePopoverContext3.getPopoverProps,
      getPopoverPositionerProps = _usePopoverContext3.getPopoverPositionerProps;

  var styles = useStyles();

  var contentStyles = _extends$a({
    position: "relative",
    display: "flex",
    flexDirection: "column"
  }, styles.content);

  return /*#__PURE__*/react.createElement(chakra.div, _extends$a({}, getPopoverPositionerProps(rootProps), {
    __css: styles.popper,
    className: "chakra-popover__popper"
  }), /*#__PURE__*/react.createElement(PopoverTransition, _extends$a({}, getPopoverProps(contentProps, ref), {
    className: cx("chakra-popover__content", props.className),
    __css: contentStyles
  })));
});

/**
 * PopoverBody is the main content area for the popover. Should contain
 * at least one interactive element.
 */
var PopoverBody = /*#__PURE__*/forwardRef(function (props, ref) {
  var _usePopoverContext5 = usePopoverContext(),
      getBodyProps = _usePopoverContext5.getBodyProps;

  var styles = useStyles();
  return /*#__PURE__*/react.createElement(chakra.div, _extends$a({}, getBodyProps(props, ref), {
    className: cx("chakra-popover__body", props.className),
    __css: styles.body
  }));
});

var PopoverArrow = function PopoverArrow(props) {
  var _ref;

  var bg = props.bg,
      bgColor = props.bgColor,
      backgroundColor = props.backgroundColor;

  var _usePopoverContext7 = usePopoverContext(),
      getArrowProps = _usePopoverContext7.getArrowProps,
      getArrowInnerProps = _usePopoverContext7.getArrowInnerProps;

  var styles = useStyles();
  var arrowBg = (_ref = bg != null ? bg : bgColor) != null ? _ref : backgroundColor;
  return /*#__PURE__*/react.createElement(chakra.div, _extends$a({}, getArrowProps(), {
    className: "chakra-popover__arrow-positioner"
  }), /*#__PURE__*/react.createElement(chakra.div, _extends$a({
    className: cx("chakra-popover__arrow", props.className)
  }, getArrowInnerProps(props), {
    __css: _extends$a({}, styles.arrow, {
      "--popper-arrow-bg": arrowBg ? "colors." + arrowBg + ", " + arrowBg : undefined
    })
  })));
};

var ChakraProvider$1 = ChakraProvider;
ChakraProvider$1.defaultProps = {
  theme: theme
};

/**
 * NOTE: This got too complex to manage and it's not worth the extra complexity.
 * We'll re-evaluate this API in the future releases.
 *
 * Function to override or customize the Chakra UI theme conveniently.
 * First extension overrides the baseTheme and following extensions override the preceding extensions.
 *
 * @example:
 * import { theme as baseTheme, extendTheme, withDefaultColorScheme } from '@chakra-ui/react'
 *
 * const customTheme = extendTheme(
 *   {
 *     colors: {
 *       brand: {
 *         500: "#b4d455",
 *       },
 *     },
 *   },
 *   withDefaultColorScheme({ colorScheme: "red" }),
 *   baseTheme // optional
 * )
 */
function extendTheme() {
  for (var _len = arguments.length, extensions = new Array(_len), _key = 0; _key < _len; _key++) {
    extensions[_key] = arguments[_key];
  }

  var overrides = [].concat(extensions);
  var baseTheme = extensions[extensions.length - 1];

  if (isChakraTheme(baseTheme) && // this ensures backward compatibility
  // previously only `extendTheme(override, baseTheme?)` was allowed
  overrides.length > 1) {
    overrides = overrides.slice(0, overrides.length - 1);
  } else {
    baseTheme = theme;
  }

  return pipe$1.apply(void 0, overrides.map(function (extension) {
    return function (prevTheme) {
      return isFunction(extension) ? extension(prevTheme) : mergeThemeOverride(prevTheme, extension);
    };
  }))(baseTheme);
}
function mergeThemeOverride() {
  for (var _len2 = arguments.length, overrides = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    overrides[_key2] = arguments[_key2];
  }

  return lodash_mergewith.apply(void 0, [{}].concat(overrides, [mergeThemeCustomizer]));
}

function mergeThemeCustomizer(source, override, key, object) {
  if ((isFunction(source) || isFunction(override)) && Object.prototype.hasOwnProperty.call(object, key)) {
    return function () {
      var sourceValue = isFunction(source) ? source.apply(void 0, arguments) : source;
      var overrideValue = isFunction(override) ? override.apply(void 0, arguments) : override;
      return lodash_mergewith({}, sourceValue, overrideValue, mergeThemeCustomizer);
    };
  } // fallback to default behaviour


  return undefined;
}

export { Box, Button$1 as Button, ButtonGroup, Center, ChakraProvider$1 as ChakraProvider, Checkbox$1 as Checkbox, Circle, Container$1 as Container, Flex, FormControl, FormErrorMessage, FormLabel$1 as FormLabel, Heading$1 as Heading, IconButton, Input$1 as Input, Link$1 as Link, Popover$1 as Popover, PopoverArrow, PopoverBody, PopoverContent, PopoverTrigger, StackDivider, Text, VStack, extendTheme };
