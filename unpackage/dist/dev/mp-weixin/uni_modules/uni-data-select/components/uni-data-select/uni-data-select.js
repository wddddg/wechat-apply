"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "uni-stat-select",
  mixins: [common_vendor.Es.mixinDatacom || {}],
  data() {
    return {
      showSelector: false,
      current: "",
      mixinDatacomResData: [],
      apps: [],
      channels: []
    };
  },
  props: {
    localdata: {
      type: Array,
      default() {
        return [];
      }
    },
    value: {
      type: [String, Number],
      default: ""
    },
    modelValue: {
      type: [String, Number],
      default: ""
    },
    label: {
      type: String,
      default: ""
    },
    placeholder: {
      type: String,
      default: "请选择"
    },
    emptyTips: {
      type: String,
      default: "无选项"
    },
    clear: {
      type: Boolean,
      default: true
    },
    defItem: {
      type: Number,
      default: 0
    },
    disabled: {
      type: Boolean,
      default: false
    },
    // 格式化输出 用法 field="_id as value, version as text, uni_platform as label" format="{label} - {text}"
    format: {
      type: String,
      default: ""
    }
  },
  created() {
    this.last = `${this.collection}_last_selected_option_value`;
    if (this.collection && !this.localdata.length) {
      this.query();
    }
  },
  computed: {
    typePlaceholder() {
      const text = {
        "opendb-stat-app-versions": "版本",
        "opendb-app-channels": "渠道",
        "opendb-app-list": "应用"
      };
      const common = this.placeholder;
      const placeholder = text[this.collection];
      return placeholder ? common + placeholder : common;
    }
  },
  watch: {
    localdata: {
      immediate: true,
      handler(val, old) {
        if (Array.isArray(val) && old !== val) {
          this.mixinDatacomResData = val;
        }
      }
    },
    modelValue() {
      this.initDefVal();
    },
    mixinDatacomResData: {
      immediate: true,
      handler(val) {
        if (val.length) {
          this.initDefVal();
        }
      }
    }
  },
  methods: {
    // 执行数据库查询
    query() {
      this.mixinDatacomEasyGet();
    },
    // 监听查询条件变更事件
    onMixinDatacomPropsChange() {
      if (this.collection) {
        this.query();
      }
    },
    initDefVal() {
      let defValue = "";
      if ((this.value || this.value === 0) && !this.isDisabled(this.value)) {
        defValue = this.value;
      } else if ((this.modelValue || this.modelValue === 0) && !this.isDisabled(this.modelValue)) {
        defValue = this.modelValue;
      } else {
        let strogeValue;
        if (this.collection) {
          strogeValue = common_vendor.index.getStorageSync(this.last);
        }
        if (strogeValue || strogeValue === 0) {
          defValue = strogeValue;
        } else {
          let defItem = "";
          if (this.defItem > 0 && this.defItem <= this.mixinDatacomResData.length) {
            defItem = this.mixinDatacomResData[this.defItem - 1].value;
          }
          defValue = defItem;
        }
        if (defValue || defValue === 0) {
          this.emit(defValue);
        }
      }
      const def = this.mixinDatacomResData.find((item) => item.value === defValue);
      this.current = def ? this.formatItemName(def) : "";
    },
    /**
     * @param {[String, Number]} value
     * 判断用户给的 value 是否同时为禁用状态
     */
    isDisabled(value) {
      let isDisabled = false;
      this.mixinDatacomResData.forEach((item) => {
        if (item.value === value) {
          isDisabled = item.disable;
        }
      });
      return isDisabled;
    },
    clearVal() {
      this.emit("");
      if (this.collection) {
        common_vendor.index.removeStorageSync(this.last);
      }
    },
    change(item) {
      if (!item.disable) {
        this.showSelector = false;
        this.current = this.formatItemName(item);
        this.emit(item.value);
      }
    },
    emit(val) {
      this.$emit("change", val);
      this.$emit("input", val);
      this.$emit("update:modelValue", val);
      if (this.collection) {
        common_vendor.index.setStorageSync(this.last, val);
      }
    },
    toggleSelector() {
      if (this.disabled) {
        return;
      }
      this.showSelector = !this.showSelector;
    },
    formatItemName(item) {
      let {
        text,
        value,
        channel_code
      } = item;
      channel_code = channel_code ? `(${channel_code})` : "";
      if (this.format) {
        let str = "";
        str = this.format;
        for (let key in item) {
          str = str.replace(new RegExp(`{${key}}`, "g"), item[key]);
        }
        return str;
      } else {
        return this.collection.indexOf("app-list") > 0 ? `${text}(${value})` : text ? text : `未命名${channel_code}`;
      }
    }
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../../uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $props.label
  }, $props.label ? {
    b: common_vendor.t($props.label + "：")
  } : {}, {
    c: $data.current
  }, $data.current ? {
    d: common_vendor.t($data.current)
  } : {
    e: common_vendor.t($options.typePlaceholder)
  }, {
    f: $data.current && $props.clear
  }, $data.current && $props.clear ? {
    g: common_vendor.o($options.clearVal),
    h: common_vendor.p({
      type: "clear",
      color: "#c0c4cc",
      size: "24"
    })
  } : {
    i: common_vendor.p({
      type: $data.showSelector ? "top" : "bottom",
      size: "14",
      color: "#999"
    })
  }, {
    j: common_vendor.o((...args) => $options.toggleSelector && $options.toggleSelector(...args)),
    k: $data.showSelector
  }, $data.showSelector ? {
    l: common_vendor.o((...args) => $options.toggleSelector && $options.toggleSelector(...args))
  } : {}, {
    m: $data.showSelector
  }, $data.showSelector ? common_vendor.e({
    n: $data.mixinDatacomResData.length === 0
  }, $data.mixinDatacomResData.length === 0 ? {
    o: common_vendor.t($props.emptyTips)
  } : {
    p: common_vendor.f($data.mixinDatacomResData, (item, index, i0) => {
      return {
        a: common_vendor.t($options.formatItemName(item)),
        b: item.disable ? 1 : "",
        c: index,
        d: common_vendor.o(($event) => $options.change(item), index)
      };
    })
  }) : {}, {
    q: $props.disabled ? 1 : "",
    r: $data.current ? 1 : ""
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/code/wechat-apply/wechat-apply/uni_modules/uni-data-select/components/uni-data-select/uni-data-select.vue"]]);
wx.createComponent(Component);
