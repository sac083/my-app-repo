"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const React = require("react");
const KeyNames = {
  Enter: "Enter",
  Escape: "Escape",
  Tab: "Tab",
  Backspace: "Backspace",
  UpArrow: "ArrowUp",
  UpArrowCompat: "Up",
  DownArrow: "ArrowDown",
  DownArrowCompat: "Down",
  PageDown: "PageDown",
  PageUp: "PageUp"
};
const NewOptionValue = Symbol("Create new tag");
const NoOptionsValue = Symbol("No options");
const VoidFn = () => void 0;
const GlobalContext = React.createContext(void 0);
function arrayDiff(a, b) {
  if (a === b) {
    return [];
  } else {
    return a.filter((item) => !b.includes(item));
  }
}
function isCaretAtStart(target) {
  return target.selectionStart === 0 && target.selectionEnd === 0;
}
function isCaretAtEnd(target) {
  const length = target.value.length;
  return target.selectionStart === length && target.selectionEnd === length;
}
function rootId(id) {
  return id;
}
function labelId(id) {
  return `${id}-label`;
}
function comboBoxId(id) {
  return `${id}-combobox`;
}
function inputId(id) {
  return `${id}-input`;
}
function listBoxId(id) {
  return `${id}-listbox`;
}
function optionId(id, tag) {
  return `${id}-option-${tagToId(tag)}`;
}
function getNewTag(option, value) {
  if ((option == null ? void 0 : option.value) === NewOptionValue && option.disabled === false) {
    return { value, label: value };
  }
}
function findSelectedOption(state) {
  const tag = getNewTag(state.activeOption, state.value) || state.activeOption || matchTagExact(state.value, state.options);
  return tag && !tag.disabled ? tag : void 0;
}
function loopOptionsIndex(next, size, min) {
  const max = size - 1;
  if (next > max) {
    return min;
  }
  if (next < min) {
    return max;
  }
  return next;
}
const ReplaceRegExp = /%value%/;
function replacePlaceholder(string, value) {
  return string.replace(ReplaceRegExp, value);
}
function highlightText(text, query) {
  const regexp = partialRegExp(query);
  const matches = text.match(regexp);
  if (matches) {
    const match = matches[0];
    const lastIndex = matches.index + match.length;
    return [
      text.slice(0, matches.index),
      text.slice(matches.index, lastIndex),
      text.slice(lastIndex)
    ];
  }
}
const Whitespace = /\s+/g;
function tagToKey(tag) {
  return `${String(tag.value)}-${tag.label}`;
}
function tagToId(tag) {
  return tagToKey(tag).replace(Whitespace, "_");
}
function findTagIndex(tag, tags) {
  return tags.findIndex(({ value }) => value === tag.value);
}
const EscapeRegExp = /[-\\^$*+?.()|[\]{}]/g;
function escapeForRegExp(string) {
  return string.replace(EscapeRegExp, "\\$&");
}
function partialRegExp(query) {
  return new RegExp(escapeForRegExp(query), "i");
}
function exactRegExp(query) {
  return new RegExp(`^${escapeForRegExp(query)}$`, "i");
}
function matchTagsPartial(query, suggestions) {
  if (query) {
    const regexp = partialRegExp(query);
    return suggestions.filter((item) => regexp.test(item.label));
  } else {
    return [].concat(suggestions);
  }
}
function matchTagExact(query, suggestions) {
  const regexp = exactRegExp(query);
  return suggestions.find((item) => regexp.test(item.label)) || null;
}
const DisableAutoCompleteAttrs = {
  autoComplete: "off",
  autoCorrect: "off",
  "data-form-type": "other",
  spellCheck: false
};
function useInput({
  allowBackspace,
  ariaDescribedBy,
  ariaErrorMessage,
  delimiterKeys
}) {
  const { id, comboBoxRef, inputRef, isDisabled, isInvalid, managerRef } = React.useContext(GlobalContext);
  const events = React.useMemo(() => {
    const onChange = (e) => {
      const value2 = e.currentTarget.value;
      managerRef.current.updateInputValue(value2);
      if (document.activeElement === inputRef.current) {
        managerRef.current.listBoxExpand(value2);
      }
    };
    const onFocus = () => {
      managerRef.current.listBoxExpand();
    };
    const onBlur = (e) => {
      var _a;
      if (((_a = comboBoxRef.current) == null ? void 0 : _a.contains(e.relatedTarget)) === false) {
        managerRef.current.listBoxCollapse();
      }
    };
    const onClick = () => {
      managerRef.current.listBoxExpand();
    };
    const onDownArrowKey = (e) => {
      const { activeIndex, isExpanded: isExpanded2 } = managerRef.current.state;
      if (isExpanded2) {
        e.preventDefault();
        managerRef.current.updateActiveIndex(activeIndex + 1);
      } else if (isCaretAtEnd(e.currentTarget) || e.altKey) {
        e.preventDefault();
        managerRef.current.listBoxExpand();
      }
    };
    const onUpArrowKey = (e) => {
      const { activeIndex, isExpanded: isExpanded2 } = managerRef.current.state;
      if (isExpanded2) {
        e.preventDefault();
        managerRef.current.updateActiveIndex(activeIndex - 1);
      } else if (isCaretAtStart(e.currentTarget)) {
        e.preventDefault();
        managerRef.current.listBoxExpand();
      }
    };
    const onPageDownKey = (e) => {
      const { isExpanded: isExpanded2, options } = managerRef.current.state;
      if (isExpanded2) {
        e.preventDefault();
        managerRef.current.updateActiveIndex(options.length - 1);
      }
    };
    const onPageUpKey = (e) => {
      if (managerRef.current.state.isExpanded) {
        e.preventDefault();
        managerRef.current.updateActiveIndex(0);
      }
    };
    const onEscapeKey = () => {
      if (managerRef.current.state.isExpanded) {
        managerRef.current.listBoxCollapse();
      } else {
        managerRef.current.updateInputValue("");
      }
    };
    const onBackspaceKey = () => {
      if (allowBackspace) {
        const { value: value2, selected } = managerRef.current.state;
        const lastTag = selected[selected.length - 1];
        if (value2 === "" && lastTag) {
          managerRef.current.selectTag(lastTag);
        }
      }
    };
    const onDelimiterKey = (e) => {
      if (managerRef.current.state.isExpanded) {
        e.preventDefault();
        managerRef.current.selectTag();
      }
    };
    const onKeyDown = (e) => {
      if (e.key === KeyNames.UpArrow)
        return onUpArrowKey(e);
      if (e.key === KeyNames.DownArrow)
        return onDownArrowKey(e);
      if (e.key === KeyNames.PageUp)
        return onPageUpKey(e);
      if (e.key === KeyNames.PageDown)
        return onPageDownKey(e);
      if (e.key === KeyNames.Escape)
        return onEscapeKey();
      if (e.key === KeyNames.Backspace)
        return onBackspaceKey();
      if (delimiterKeys.includes(e.key))
        return onDelimiterKey(e);
    };
    return { onBlur, onChange, onClick, onFocus, onKeyDown };
  }, [allowBackspace, comboBoxRef, delimiterKeys, inputRef, managerRef]);
  const { activeOption, isExpanded, value } = managerRef.current.state;
  return {
    ...DisableAutoCompleteAttrs,
    "aria-autocomplete": "list",
    "aria-activedescendant": activeOption ? optionId(id, activeOption) : void 0,
    "aria-controls": listBoxId(id),
    "aria-describedby": ariaDescribedBy || void 0,
    "aria-disabled": isDisabled,
    "aria-errormessage": isInvalid && ariaErrorMessage || void 0,
    "aria-invalid": isInvalid,
    "aria-labelledby": labelId(id),
    "aria-expanded": isExpanded,
    id: inputId(id),
    onBlur: isDisabled ? VoidFn : events.onBlur,
    onChange: isDisabled ? VoidFn : events.onChange,
    onClick: isDisabled ? VoidFn : events.onClick,
    onFocus: isDisabled ? VoidFn : events.onFocus,
    onKeyDown: isDisabled ? VoidFn : events.onKeyDown,
    ref: inputRef,
    role: "combobox",
    type: "text",
    value
  };
}
const SizerStyles = {
  position: "absolute",
  width: 0,
  height: 0,
  visibility: "hidden",
  overflow: "scroll",
  whiteSpace: "pre"
};
const StyleProps = [
  "font-family",
  "font-size",
  "font-style",
  "font-weight",
  "letter-spacing",
  "text-transform"
];
function useInputSizer({ allowResize = true, text }) {
  const sizerRef = React.useRef(null);
  const { inputRef } = React.useContext(GlobalContext);
  const [width, setWidth] = React.useState(null);
  React.useLayoutEffect(() => {
    if (allowResize && inputRef.current && sizerRef.current && window.getComputedStyle) {
      const inputStyle = window.getComputedStyle(inputRef.current);
      StyleProps.forEach((prop) => {
        const value = inputStyle.getPropertyValue(prop);
        sizerRef.current.style.setProperty(prop, value);
      });
    }
  }, [allowResize, inputRef, sizerRef]);
  React.useLayoutEffect(() => {
    var _a;
    if (allowResize) {
      const newWidth = Math.ceil(((_a = sizerRef.current) == null ? void 0 : _a.scrollWidth) ?? 0) + 2;
      if (width !== newWidth)
        setWidth(newWidth);
    }
  }, [allowResize, text, width]);
  return {
    width,
    sizerProps: {
      ref: sizerRef,
      style: SizerStyles
    }
  };
}
function useListBox() {
  const { id, inputRef, listBoxRef, managerRef } = React.useContext(GlobalContext);
  const scrollToTop = managerRef.current.state.activeIndex === -1;
  const onFocus = React.useCallback(
    (e) => {
      var _a;
      if (e.target !== inputRef.current) {
        (_a = inputRef.current) == null ? void 0 : _a.focus({ preventScroll: true });
      }
    },
    [inputRef]
  );
  React.useEffect(() => {
    var _a;
    if (scrollToTop) {
      (_a = listBoxRef.current) == null ? void 0 : _a.scrollTo({ top: 0 });
    }
  }, [listBoxRef, scrollToTop]);
  return {
    "aria-labelledby": labelId(id),
    id: listBoxId(id),
    onFocus,
    ref: listBoxRef,
    role: "listbox",
    tabIndex: -1
  };
}
function useManager({
  activateFirstOption,
  allowNew,
  collapseOnSelect,
  newOptionText,
  noOptionsText,
  onAdd,
  onDelete,
  onCollapse,
  onExpand,
  onInput,
  onShouldCollapse,
  onShouldExpand,
  onValidate,
  selected,
  suggestions,
  suggestionsTransform
}) {
  const ref = React.useRef();
  const [lastActiveOption, setLastActiveOption] = React.useState(null);
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [value, setValue] = React.useState("");
  const options = React.useMemo(() => {
    const opts = suggestionsTransform(value, suggestions);
    if (value) {
      if (allowNew) {
        opts.push({
          disabled: onValidate ? !onValidate(value) : false,
          label: newOptionText,
          value: NewOptionValue
        });
      }
      if (opts.length === 0) {
        opts.push({
          disabled: true,
          label: noOptionsText,
          value: NoOptionsValue
        });
      }
    }
    return opts;
  }, [allowNew, newOptionText, noOptionsText, onValidate, suggestions, suggestionsTransform, value]);
  const optionIndex = lastActiveOption ? findTagIndex(lastActiveOption, options) : -1;
  const activeIndex = activateFirstOption ? Math.max(optionIndex, 0) : optionIndex;
  const activeOption = options[activeIndex];
  const state = {
    activeIndex,
    activeOption,
    isExpanded,
    options,
    selected,
    value
  };
  const flags = {
    tagsAdded: ref.current ? arrayDiff(selected, ref.current.state.selected) : [],
    tagsDeleted: ref.current ? arrayDiff(ref.current.state.selected, selected) : []
  };
  const api = {
    listBoxCollapse(value2) {
      if (!isExpanded)
        return;
      if (onShouldCollapse ? onShouldCollapse(value2 ?? state.value) : true) {
        setIsExpanded(false);
        setLastActiveOption(null);
        onCollapse == null ? void 0 : onCollapse();
      }
    },
    listBoxExpand(value2) {
      if (isExpanded)
        return;
      if (onShouldExpand ? onShouldExpand(value2 ?? state.value) : true) {
        setIsExpanded(true);
        setLastActiveOption(options[activeIndex]);
        onExpand == null ? void 0 : onExpand();
      }
    },
    updateActiveIndex(index) {
      const activeIndex2 = loopOptionsIndex(index, options.length, activateFirstOption ? 0 : -1);
      setLastActiveOption(options[activeIndex2]);
    },
    updateInputValue(newValue) {
      if (value !== newValue) {
        setValue(newValue);
        onInput == null ? void 0 : onInput(newValue);
      }
    },
    selectTag(tag) {
      tag ?? (tag = findSelectedOption(state));
      if (tag) {
        const tagIndex = findTagIndex(tag, state.selected);
        if (tagIndex > -1) {
          onDelete(tagIndex);
        } else {
          onAdd(tag);
        }
        if (collapseOnSelect) {
          this.listBoxCollapse();
        }
        this.updateInputValue("");
      }
    }
  };
  ref.current = { ...api, flags, state };
  return ref;
}
function useOption(index) {
  const { id, inputRef, listBoxRef, managerRef } = React.useContext(GlobalContext);
  const optionRef = React.useRef(null);
  const option = managerRef.current.state.options[index];
  const active = index === managerRef.current.state.activeIndex;
  const disabled = option.disabled ?? false;
  const selected = findTagIndex(option, managerRef.current.state.selected) > -1;
  const onClick = React.useCallback(() => {
    var _a;
    managerRef.current.selectTag();
    (_a = inputRef.current) == null ? void 0 : _a.focus();
  }, [inputRef, managerRef]);
  const onMouseDown = React.useCallback(() => {
    if (index !== managerRef.current.state.activeIndex) {
      managerRef.current.updateActiveIndex(index);
    }
  }, [index, managerRef]);
  useScrollIntoView(optionRef, listBoxRef, active);
  return {
    option: {
      ...option,
      active,
      disabled,
      index,
      selected
    },
    optionProps: {
      "aria-disabled": disabled,
      "aria-posinset": index + 1,
      "aria-selected": disabled ? void 0 : selected,
      "aria-setsize": managerRef.current.state.options.length,
      id: optionId(id, option),
      onClick,
      onMouseDown,
      ref: optionRef,
      role: "option",
      tabIndex: -1
    }
  };
}
function usePublicAPI({ inputRef, managerRef }) {
  const api = React.useRef({
    input: {
      blur() {
        var _a;
        (_a = inputRef.current) == null ? void 0 : _a.blur();
      },
      focus() {
        var _a;
        (_a = inputRef.current) == null ? void 0 : _a.focus();
      },
      get value() {
        return managerRef.current.state.value;
      },
      set value(value) {
        if (typeof value !== "string") {
          value = String(value);
        }
        managerRef.current.updateInputValue(value);
      }
    },
    listBox: {
      collapse() {
        managerRef.current.listBoxCollapse();
      },
      expand() {
        managerRef.current.listBoxExpand();
      },
      get activeOption() {
        return managerRef.current.state.activeOption;
      },
      get isExpanded() {
        return managerRef.current.state.isExpanded;
      }
    },
    select(tag) {
      managerRef.current.selectTag(tag);
    }
  });
  return api.current;
}
function useRoot({ onBlur, onFocus }) {
  const [isActive, setIsActive] = React.useState(false);
  const { id, inputRef } = React.useContext(GlobalContext);
  const rootRef = React.useRef(null);
  const rootProps = React.useMemo(() => {
    return {
      "aria-describedby": labelId(id),
      id: rootId(id),
      onFocus() {
        setIsActive(true);
        onFocus == null ? void 0 : onFocus();
      },
      onBlur() {
        var _a;
        if (!((_a = rootRef.current) == null ? void 0 : _a.contains(document.activeElement))) {
          setIsActive(false);
          onBlur == null ? void 0 : onBlur();
        }
      },
      onClick() {
        var _a;
        if (document.activeElement === rootRef.current) {
          (_a = inputRef.current) == null ? void 0 : _a.focus();
        }
      },
      ref: rootRef,
      tabIndex: -1
    };
  }, [inputRef, id, onBlur, onFocus, rootRef]);
  return {
    isActive,
    rootProps
  };
}
function useScrollIntoView(targetRef, containerRef, shouldScroll) {
  React.useEffect(() => {
    var _a, _b, _c, _d;
    if (shouldScroll) {
      const targetHeight = (_a = targetRef.current) == null ? void 0 : _a.offsetHeight;
      const targetOffset = (_b = targetRef.current) == null ? void 0 : _b.offsetTop;
      const containerHeight = (_c = containerRef.current) == null ? void 0 : _c.offsetHeight;
      const containerScroll = (_d = containerRef.current) == null ? void 0 : _d.scrollTop;
      if (targetOffset < containerScroll) {
        containerRef.current.scrollTo(0, targetOffset);
      }
      if (targetOffset + targetHeight > containerScroll + containerHeight) {
        containerRef.current.scrollTo(0, targetOffset + targetHeight - containerHeight);
      }
    }
  }, [shouldScroll, containerRef, targetRef]);
}
function useSelectedTag(index, title) {
  const { isDisabled, managerRef } = React.useContext(GlobalContext);
  const tag = managerRef.current.state.selected[index];
  const onClick = React.useCallback(() => managerRef.current.selectTag(tag), [managerRef, tag]);
  return {
    tag,
    tagProps: {
      "aria-disabled": isDisabled,
      title: replacePlaceholder(title, tag.label),
      onClick: isDisabled ? VoidFn : onClick
    }
  };
}
function useTagList() {
  var _a;
  const { inputRef, managerRef } = React.useContext(GlobalContext);
  const listRef = React.useRef();
  const tagDeleted = managerRef.current.flags.tagsDeleted.length;
  const isFocusInList = (_a = listRef.current) == null ? void 0 : _a.contains(document.activeElement);
  React.useLayoutEffect(() => {
    var _a2, _b;
    if (tagDeleted) {
      const isFocusInListNow = (_a2 = listRef.current) == null ? void 0 : _a2.contains(document.activeElement);
      if (isFocusInList && !isFocusInListNow) {
        (_b = inputRef.current) == null ? void 0 : _b.focus({ preventScroll: true });
      }
    }
  }, [inputRef, isFocusInList, listRef, tagDeleted]);
  return { listRef };
}
const VisuallyHiddenStyles = {
  position: "absolute",
  width: 1,
  height: 1,
  left: -9999,
  overflow: "hidden",
  clip: "rect(0 0 0 0)"
};
function Announcements({ ariaAddedText, ariaDeletedText }) {
  const { managerRef } = React.useContext(GlobalContext);
  const logsRef = React.useRef([]);
  managerRef.current.flags.tagsAdded.forEach((tag) => {
    logsRef.current.push(replacePlaceholder(ariaAddedText, tag.label));
  });
  managerRef.current.flags.tagsDeleted.forEach((tag) => {
    logsRef.current.push(replacePlaceholder(ariaDeletedText, tag.label));
  });
  return /* @__PURE__ */ React.createElement("div", { "aria-live": "polite", "aria-relevant": "additions", role: "status", style: VisuallyHiddenStyles }, logsRef.current.join("\n"));
}
function ComboBox({ children }) {
  const { classNames, comboBoxRef, id } = React.useContext(GlobalContext);
  return /* @__PURE__ */ React.createElement("div", { className: classNames.comboBox, id: comboBoxId(id), ref: comboBoxRef }, children);
}
const DefaultHighlight = ({ classNames, text }) => {
  return /* @__PURE__ */ React.createElement("mark", { className: classNames.highlight }, text);
};
function Highlight({ option, query, render = DefaultHighlight }) {
  const { classNames } = React.useContext(GlobalContext);
  if (option.value === NewOptionValue || option.value === NoOptionsValue) {
    return /* @__PURE__ */ React.createElement(React.Fragment, null, replacePlaceholder(option.label, query));
  }
  if (query) {
    const result = highlightText(option.label, query);
    if (result) {
      const highlighted = render({ text: result[1], classNames });
      return /* @__PURE__ */ React.createElement(React.Fragment, null, result[0], highlighted, result[2]);
    }
  }
  return /* @__PURE__ */ React.createElement(React.Fragment, null, option.label);
}
const MemoizedHighlight = React.memo(Highlight);
const DefaultInput = ({ classNames, inputWidth, ...inputProps }) => {
  return /* @__PURE__ */ React.createElement("input", { className: classNames.input, style: { width: inputWidth }, ...inputProps });
};
function Input({
  allowBackspace = true,
  allowResize = true,
  ariaDescribedBy,
  ariaErrorMessage,
  delimiterKeys,
  placeholderText,
  render = DefaultInput
}) {
  const { classNames } = React.useContext(GlobalContext);
  const { value, ...inputProps } = useInput({
    allowBackspace,
    ariaDescribedBy,
    ariaErrorMessage,
    delimiterKeys
  });
  const text = value.length < placeholderText.length ? placeholderText : value;
  const { width, sizerProps } = useInputSizer({ allowResize, text });
  return /* @__PURE__ */ React.createElement(React.Fragment, null, render({
    classNames,
    inputWidth: width,
    placeholder: placeholderText,
    value,
    ...inputProps
  }), allowResize ? /* @__PURE__ */ React.createElement("div", { ...sizerProps }, text) : null);
}
const DefaultLabel = ({ children, classNames, id }) => {
  return /* @__PURE__ */ React.createElement("div", { className: classNames.label, id }, children);
};
function Label({ children, render = DefaultLabel }) {
  const { classNames, id } = React.useContext(GlobalContext);
  return render({ children, classNames, id: labelId(id) });
}
const DefaultListBox = ({ children, classNames, ...listBoxProps }) => {
  return /* @__PURE__ */ React.createElement("div", { className: classNames.listBox, ...listBoxProps }, children);
};
function ListBox({ children, render = DefaultListBox }) {
  const { classNames, managerRef } = React.useContext(GlobalContext);
  const listBoxProps = useListBox();
  if (!managerRef.current.state.isExpanded || React.Children.count(children) === 0)
    return null;
  return render({ children, classNames, ...listBoxProps });
}
const DefaultOption = ({ children, classNames, option, ...optionProps }) => {
  const classes = [classNames.option];
  if (option.active)
    classes.push(classNames.optionIsActive);
  return /* @__PURE__ */ React.createElement("div", { className: classes.join(" "), ...optionProps }, children);
};
function Option({ children, index, render = DefaultOption }) {
  const { classNames } = React.useContext(GlobalContext);
  const { option, optionProps } = useOption(index);
  return render({ classNames, children, option, ...optionProps });
}
const DefaultRoot = ({
  children,
  classNames,
  isActive,
  isDisabled,
  isInvalid,
  ...rootProps
}) => {
  const classes = [classNames.root];
  if (isActive)
    classes.push(classNames.rootIsActive);
  if (isDisabled)
    classes.push(classNames.rootIsDisabled);
  if (isInvalid)
    classes.push(classNames.rootIsInvalid);
  return /* @__PURE__ */ React.createElement("div", { className: classes.join(" "), ...rootProps }, children);
};
function Root({ children, onBlur, onFocus, render = DefaultRoot }) {
  const { classNames, isDisabled, isInvalid } = React.useContext(GlobalContext);
  const { isActive, rootProps } = useRoot({ onBlur, onFocus });
  return render({ children, classNames, isActive, isDisabled, isInvalid, ...rootProps });
}
const DefaultTag = ({ classNames, tag, ...tagProps }) => {
  return /* @__PURE__ */ React.createElement("button", { type: "button", className: classNames.tag, ...tagProps }, /* @__PURE__ */ React.createElement("span", { className: classNames.tagName }, tag.label));
};
function Tag({ render = DefaultTag, index, title }) {
  const { classNames } = React.useContext(GlobalContext);
  const { tag, tagProps } = useSelectedTag(index, title);
  return render({ classNames, tag, ...tagProps });
}
function TagList({ children, label }) {
  const { classNames } = React.useContext(GlobalContext);
  const { listRef } = useTagList();
  return /* @__PURE__ */ React.createElement("ul", { className: classNames.tagList, "aria-label": label, ref: listRef, role: "list" }, children.map((child) => /* @__PURE__ */ React.createElement("li", { className: classNames.tagListItem, key: child.key, role: "listitem" }, child)));
}
const DefaultClassNames = {
  root: "react-tags",
  rootIsActive: "is-active",
  rootIsDisabled: "is-disabled",
  rootIsInvalid: "is-invalid",
  label: "react-tags__label",
  tagList: "react-tags__list",
  tagListItem: "react-tags__list-item",
  tag: "react-tags__tag",
  tagName: "react-tags__tag-name",
  comboBox: "react-tags__combobox",
  input: "react-tags__combobox-input",
  listBox: "react-tags__listbox",
  option: "react-tags__listbox-option",
  optionIsActive: "is-active",
  highlight: "react-tags__listbox-option-highlight"
};
const DefaultDelimiterKeys = [KeyNames.Enter];
function ReactTags({
  activateFirstOption = false,
  allowBackspace = true,
  allowNew = false,
  allowResize = true,
  ariaAddedText = "Added tag %value%",
  ariaDescribedBy,
  ariaErrorMessage,
  ariaDeletedText = "Removed tag %value%",
  classNames = DefaultClassNames,
  collapseOnSelect = false,
  deleteButtonText = "Remove %value% from the list",
  delimiterKeys = DefaultDelimiterKeys,
  id = "react-tags",
  isDisabled = false,
  isInvalid = false,
  labelText = "Select tags",
  newOptionText = "Add %value%",
  noOptionsText = "No options found for %value%",
  onAdd,
  onBlur,
  onCollapse,
  onDelete,
  onExpand,
  onFocus,
  onInput,
  onShouldCollapse,
  onShouldExpand,
  onValidate,
  placeholderText = "Add a tag",
  renderHighlight,
  renderInput,
  renderLabel,
  renderListBox,
  renderOption,
  renderRoot,
  renderTag,
  selected = [],
  suggestions = [],
  suggestionsTransform = matchTagsPartial,
  tagListLabelText = "Selected tags"
}, ref) {
  const comboBoxRef = React.useRef(null);
  const inputRef = React.useRef(null);
  const listBoxRef = React.useRef(null);
  const managerRef = useManager({
    activateFirstOption,
    allowNew,
    collapseOnSelect,
    newOptionText,
    noOptionsText,
    onAdd,
    onDelete,
    onCollapse,
    onExpand,
    onInput,
    onShouldCollapse,
    onShouldExpand,
    onValidate,
    selected,
    suggestions,
    suggestionsTransform
  });
  const publicAPI = usePublicAPI({ inputRef, managerRef });
  if (ref) {
    if (typeof ref === "function") {
      ref(publicAPI);
    } else {
      ref.current = publicAPI;
    }
  }
  return /* @__PURE__ */ React.createElement(
    GlobalContext.Provider,
    {
      value: {
        classNames,
        comboBoxRef,
        id,
        inputRef,
        isDisabled,
        isInvalid,
        listBoxRef,
        managerRef
      }
    },
    /* @__PURE__ */ React.createElement(Root, { onBlur, onFocus, render: renderRoot }, /* @__PURE__ */ React.createElement(Label, { render: renderLabel }, labelText), /* @__PURE__ */ React.createElement(TagList, { label: tagListLabelText }, managerRef.current.state.selected.map((tag, index) => /* @__PURE__ */ React.createElement(Tag, { key: tagToKey(tag), index, render: renderTag, title: deleteButtonText }))), /* @__PURE__ */ React.createElement(ComboBox, null, /* @__PURE__ */ React.createElement(
      Input,
      {
        allowBackspace,
        allowResize,
        ariaDescribedBy,
        ariaErrorMessage,
        delimiterKeys,
        placeholderText,
        render: renderInput
      }
    ), /* @__PURE__ */ React.createElement(ListBox, { render: renderListBox }, managerRef.current.state.options.map((option, index) => /* @__PURE__ */ React.createElement(Option, { key: tagToKey(option), index, render: renderOption }, /* @__PURE__ */ React.createElement(
      MemoizedHighlight,
      {
        option,
        query: managerRef.current.state.value,
        render: renderHighlight
      }
    ))))), /* @__PURE__ */ React.createElement(Announcements, { ariaAddedText, ariaDeletedText }))
  );
}
const ReactTagsWithRef = React.forwardRef(ReactTags);
exports.ReactTags = ReactTagsWithRef;
